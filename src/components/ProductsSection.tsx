import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getProducts, formatPrice, ShopifyProduct } from "@/lib/shopify";

const ProductCard = ({ product, index }: { product: ShopifyProduct; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: (index % 4) * 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
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
    </motion.div>
  );
};

const ProductsSection = () => {
  const { data: products, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(20),
    staleTime: 1000 * 60 * 5,
  });

  return (
    <section className="py-28 px-6 bg-secondary/50" id="collections">
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-silver-dark text-center tracking-[0.4em] text-xs font-body uppercase mb-5"
        >
          Collection
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-4xl md:text-5xl text-center font-light text-foreground mb-6"
        >
          שרשראות <span className="text-silver-dark italic">קריסטל</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-muted-foreground text-center max-w-lg mx-auto mb-20 leading-relaxed"
        >
          כל קריסטל נושא משמעות, סיפור ואנרגיה ייחודית. בחרי את זו שמדברת אליך.
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8">
            {products.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;
