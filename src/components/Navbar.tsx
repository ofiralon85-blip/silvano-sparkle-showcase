import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { openCart, itemCount } = useCart();
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On non-home pages, navbar is always solid
  const isSolid = scrolled || !isHome;

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isSolid ? "bg-background/95 backdrop-blur-md shadow-soft" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link to="/" className="font-display text-xl tracking-[0.15em]">
          <span className="text-foreground">Silvano</span>
        </Link>

        <div className="flex gap-6 md:gap-8 items-center">
          {[
            { label: "קולקציה", href: "/#collections" },
            { label: "הסיפור שלנו", href: "/#story" },
            { label: "מיקום", href: "/#location" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hidden md:block font-body text-xs tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}

          {/* Cart button */}
          <button
            onClick={openCart}
            aria-label="פתח סל קניות"
            className="relative p-2 hover:bg-secondary rounded-full transition-colors"
          >
            <ShoppingBag className="w-5 h-5 text-foreground" strokeWidth={1.5} />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-foreground text-primary-foreground text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-medium">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
