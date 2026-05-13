import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getProducts, formatPrice, ShopifyProduct } from "@/lib/shopify";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

const chunkArray = <T,>(array: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

const useItemsPerPage = () => {
  const [itemsPerPage, setItemsPerPage] = useState(8);

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      if (width >= 1024) setItemsPerPage(8);
      else if (width >= 768) setItemsPerPage(6);
      else setItemsPerPage(4);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return itemsPerPage;
};

const ProductCard = ({ product }: { product: ShopifyProduct }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <div ref={ref}>
      <Link to={`/product/${product.handle}`} className="group block">
        <div className="relative overflow-hidden rounded-lg mb-5 aspect-[3/4] bg-secondary">
          {product.featuredImage && (
            <motion.img
              src={product.featuredImage.url}
              alt={product.featuredImage.altText ?? product.title}
              loading="lazy"
              style={{ y }}
              className="w-full h-[115%] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-500" />
        </div>
        <h3 className="font-display text-lg md:text-xl text-center text-foreground group-hover:text-silver-dark transition-colors duration-300 tracking-wide leading-tight">
          {product.title}
        </h3>
        <p className="text-center text-sm text-muted-foreground font-body mt-2 tracking-wider">
          {formatPrice(product.priceRange.minVariantPrice)}
        </p>
      </Link>
    </div>
  );
};

const ProductsSection = () => {
  const { data: products, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(50),
    staleTime: 1000 * 60 * 5,
  });

  const itemsPerPage = useItemsPerPage();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    direction: "rtl",
    containScroll: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
      emblaApi.scrollTo(0);
    }
  }, [itemsPerPage, emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const chunks = products ? chunkArray(products, itemsPerPage) : [];
  const totalSlides = chunks.length;

  return (
    <section className="py-28 px-6 bg-secondary/50" id="collections">
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-gold-dark text-center tracking-[0.4em] text-xs font-body uppercase mb-5"
        >
          The Crystals
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-4xl md:text-5xl text-center font-light text-foreground mb-6"
        >
          לבחירת <span className="italic">הקריסטל שלך</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-muted-foreground text-center max-w-lg mx-auto mb-20 leading-relaxed"
        >
          13 סוגי קריסטלים טבעיים, כל אחד עם משמעות ואנרגיה ייחודיים לו.
          <br />
          כל שרשרת זמינה בצבע זהב או כסף.
        </motion.p>

        {isLoading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i}>
                <div className="aspect-[3/4] bg-secondary rounded-lg mb-5 animate-pulse" />
                <div className="h-5 bg-secondary rounded w-3/4 mx-auto animate-pulse" />
              </div>
            ))}
          </div>
        )}

        {isError && (
          <p className="text-center text-muted-foreground py-20">
            אירעה שגיאה בטעינת המוצרים. נסה לרענן את הדף.
          </p>
        )}

        {products && products.length > 0 && (
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {chunks.map((chunk, pageIndex) => (
                  <div
                    key={`${itemsPerPage}-${pageIndex}`}
                    className="min-w-0 shrink-0 grow-0 basis-full px-2 md:px-4"
                  >
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8">
                      {chunk.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {totalSlides > 1 && (
              <>
                <button
                  onClick={scrollPrev}
                  disabled={!canScrollPrev}
                  className="absolute top-1/2 -translate-y-1/2 right-0 md:-right-5 lg:-right-16 w-10 h-10 md:w-12 md:h-12 rounded-full border border-foreground/20 bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed z-10 shadow-soft"
                  aria-label="הקודם"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button
                  onClick={scrollNext}
                  disabled={!canScrollNext}
                  className="absolute top-1/2 -translate-y-1/2 left-0 md:-left-5 lg:-left-16 w-10 h-10 md:w-12 md:h-12 rounded-full border border-foreground/20 bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed z-10 shadow-soft"
                  aria-label="הבא"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex justify-center gap-2 mt-10">
                  {chunks.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => emblaApi?.scrollTo(i)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === selectedIndex
                          ? "bg-foreground w-6"
                          : "bg-foreground/30 w-2 hover:bg-foreground/50"
                      }`}
                      aria-label={`עבור לעמוד ${i + 1}`}
                    />
                  ))}
                </div>
              </>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center mt-12"
            >
              <span className="inline-flex items-center gap-2 px-10 py-4 border border-foreground/20 rounded-full text-sm tracking-[0.2em] uppercase text-foreground">
                לכל המוצרים
              </span>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;
