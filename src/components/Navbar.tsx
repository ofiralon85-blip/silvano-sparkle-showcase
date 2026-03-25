import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/90 backdrop-blur-md shadow-soft" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="font-display text-2xl tracking-wider">
          <span className={scrolled ? "text-foreground" : "text-primary-foreground"}>
            Silvano
          </span>
        </a>

        <div className="flex gap-8 items-center">
          {[
            { label: "קולקציות", href: "#collections" },
            { label: "הסיפור שלנו", href: "#story" },
            { label: "מיקום", href: "#location" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`hidden md:block font-body text-sm tracking-wide transition-colors hover:text-gold ${
                scrolled ? "text-foreground" : "text-primary-foreground"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#club"
            className="font-body text-xs tracking-[0.15em] uppercase px-5 py-2 border border-gold text-gold hover:bg-gold hover:text-primary-foreground transition-all duration-300"
          >
            מועדון
          </a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
