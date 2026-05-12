import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { getProductByHandle, formatPrice } from "@/lib/shopify";
import { useCart } from "@/lib/cart-context";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ProductPage = () => {
  const { handle } = useParams<{ handle: string }>();
  const navigate = useNavigate();
  const { addItem, loading: cartLoading } = useCart();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", handle],
    queryFn: () => getProductByHandle(handle!),
    enabled: !!handle,
  });

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [selectedImage, setSelectedImage] = useState(0);

  // Initialize selected options when product loads
  useEffect(() => {
    if (product) {
      const initial: Record<string, string> = {};
      product.options.forEach((opt) => {
        initial[opt.name] = opt.values[0];
      });
      setSelectedOptions(initial);
    }
  }, [product]);

  // Find matching variant for selected options
  const selectedVariant = product?.variants.find((v) =>
    v.selectedOptions.every((o) => selectedOptions[o.name] === o.value)
  );

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    try {
      await addItem(selectedVariant.id, 1);
    } catch (e) {
      console.error(e);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-silver border-t-foreground rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <h1 className="font-display text-3xl mb-4">המוצר לא נמצא</h1>
        <button
          onClick={() => navigate("/")}
          className="bg-foreground text-primary-foreground px-8 py-3 rounded-lg text-xs tracking-[0.25em] uppercase"
        >
          חזרה לדף הבית
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-28 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-xs text-muted-foreground mb-10 tracking-wider"
          >
            <Link to="/" className="hover:text-foreground transition-colors">
              ראשי
            </Link>
            <ArrowRight className="w-3 h-3 rotate-180" />
            <Link to="/#collections" className="hover:text-foreground transition-colors">
              שרשראות
            </Link>
            <ArrowRight className="w-3 h-3 rotate-180" />
            <span className="text-foreground">{product.title}</span>
          </motion.nav>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            {/* Images */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="aspect-[4/5] bg-secondary rounded-lg overflow-hidden mb-4">
                {product.images[selectedImage] && (
                  <img
                    src={product.images[selectedImage].url}
                    alt={product.images[selectedImage].altText ?? product.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`aspect-square bg-secondary rounded-md overflow-hidden border-2 transition-all ${
                        selectedImage === i ? "border-foreground" : "border-transparent"
                      }`}
                    >
                      <img
                        src={img.url}
                        alt=""
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="md:pt-8"
            >
              <p className="text-silver-dark tracking-[0.4em] text-xs font-body uppercase mb-4">
                {product.productType || "Silvano"}
              </p>
              <h1 className="font-display text-4xl md:text-5xl font-light text-foreground leading-tight mb-6">
                {product.title}
              </h1>
              <p className="font-display text-2xl text-foreground mb-10">
                {formatPrice(product.priceRange.minVariantPrice)}
              </p>

              {/* Description */}
              <div
                className="prose prose-sm max-w-none text-muted-foreground leading-relaxed mb-10 font-body
                          [&_h3]:font-display [&_h3]:text-foreground [&_h3]:text-xl [&_h3]:mb-3 [&_h3]:font-light
                          [&_p]:mb-4 [&_strong]:text-foreground [&_strong]:font-medium
                          [&_ul]:my-4 [&_ul]:pr-5 [&_li]:mb-2 [&_li]:list-disc"
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
              />

              {/* Options */}
              {product.options
                .filter((opt) => opt.name !== "Title" || opt.values.length > 1)
                .map((option) => (
                  <div key={option.id} className="mb-8">
                    <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">
                      {option.name}
                    </p>
                    <div className="flex gap-3 flex-wrap">
                      {option.values.map((value) => {
                        const isSelected = selectedOptions[option.name] === value;
                        return (
                          <button
                            key={value}
                            onClick={() =>
                              setSelectedOptions((prev) => ({ ...prev, [option.name]: value }))
                            }
                            className={`px-5 py-2.5 border rounded-md text-sm transition-all ${
                              isSelected
                                ? "border-foreground bg-foreground text-primary-foreground"
                                : "border-border hover:border-foreground"
                            }`}
                          >
                            {value}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}

              {/* CTA */}
              <button
                onClick={handleAddToCart}
                disabled={cartLoading || !selectedVariant?.availableForSale}
                className="w-full bg-foreground text-primary-foreground py-4 rounded-lg font-body text-xs tracking-[0.25em] uppercase hover:bg-foreground/85 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3"
              >
                <ShoppingBag className="w-4 h-4" />
                {cartLoading
                  ? "מוסיף..."
                  : !selectedVariant?.availableForSale
                  ? "לא זמין"
                  : "הוספה לסל"}
              </button>

              <p className="text-xs text-muted-foreground mt-4 text-center tracking-wider">
                ✨ כולל כרטיסיית משמעות אישית ואריזת מתנה מהודרת
              </p>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductPage;
