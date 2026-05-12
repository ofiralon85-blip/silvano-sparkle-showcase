import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/shopify";

const CartDrawer = () => {
  const { cart, isOpen, closeCart, updateItem, removeItem, loading } = useCart();

  const handleCheckout = () => {
    if (cart?.checkoutUrl) {
      window.location.href = cart.checkoutUrl;
    }
  };

  const hasItems = cart && cart.lines.length > 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-[60]"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 h-full w-full max-w-md bg-background z-[70] shadow-elevated flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-border">
              <h2 className="font-display text-2xl text-foreground tracking-wide">
                סל הקניות
              </h2>
              <button
                onClick={closeCart}
                aria-label="סגירה"
                className="p-2 hover:bg-secondary rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Empty state */}
            {!hasItems && (
              <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
                <ShoppingBag className="w-16 h-16 text-silver mb-6" strokeWidth={1} />
                <p className="font-display text-xl text-foreground mb-2">
                  הסל ריק
                </p>
                <p className="text-muted-foreground text-sm">
                  הוסיפי שרשרת ראשונה לקולקציה שלך
                </p>
              </div>
            )}

            {/* Items */}
            {hasItems && (
              <>
                <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
                  {cart!.lines.map((line) => (
                    <div key={line.id} className="flex gap-4 items-start">
                      {/* Image */}
                      <div className="w-20 h-24 bg-secondary rounded-md overflow-hidden flex-shrink-0">
                        {line.merchandise.product.featuredImage ? (
                          <img
                            src={line.merchandise.product.featuredImage.url}
                            alt={line.merchandise.product.featuredImage.altText ?? ""}
                            className="w-full h-full object-cover"
                          />
                        ) : null}
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display text-base text-foreground leading-tight mb-1">
                          {line.merchandise.product.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mb-3">
                          {line.merchandise.selectedOptions
                            .filter((o) => o.name !== "Title")
                            .map((o) => o.value)
                            .join(" / ")}
                        </p>

                        {/* Qty */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-border rounded-md">
                            <button
                              disabled={loading}
                              onClick={() =>
                                line.quantity > 1
                                  ? updateItem(line.id, line.quantity - 1)
                                  : removeItem(line.id)
                              }
                              className="p-1.5 hover:bg-secondary disabled:opacity-50"
                              aria-label="פחות"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-3 text-sm">{line.quantity}</span>
                            <button
                              disabled={loading}
                              onClick={() => updateItem(line.id, line.quantity + 1)}
                              className="p-1.5 hover:bg-secondary disabled:opacity-50"
                              aria-label="עוד"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="font-body text-sm text-foreground">
                            {formatPrice({
                              amount: (
                                parseFloat(line.merchandise.price.amount) * line.quantity
                              ).toString(),
                              currencyCode: line.merchandise.price.currencyCode,
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer / Checkout */}
                <div className="border-t border-border px-8 py-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-body text-sm text-muted-foreground">
                      סך הכל
                    </span>
                    <span className="font-display text-2xl text-foreground">
                      {formatPrice(cart!.cost.subtotalAmount)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    משלוח ומיסים יחושבו בקופה
                  </p>
                  <button
                    onClick={handleCheckout}
                    disabled={loading}
                    className="w-full bg-foreground text-primary-foreground py-4 rounded-lg font-body text-xs tracking-[0.25em] uppercase hover:bg-foreground/85 transition-all disabled:opacity-50"
                  >
                    מעבר לתשלום
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
