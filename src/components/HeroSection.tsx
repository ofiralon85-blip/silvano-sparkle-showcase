import { motion } from "framer-motion";
import heroImg from "@/assets/hero-jewelry.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="תכשיטי סילבנו - שרשראות, טבעות וצמידי זהב"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/30 to-transparent" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-gold-light tracking-[0.4em] text-sm font-body uppercase mb-4"
        >
          Silvano Jewelry
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-primary-foreground leading-tight mb-6"
        >
          תכשיטים שמספרים
          <br />
          <span className="text-gold-light italic">סיפור</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-primary-foreground/80 font-body text-lg md:text-xl font-light mb-10 max-w-xl mx-auto"
        >
          עבודת יד עדינה, אבנים עם משמעות, ועיצוב שנולד מתוך אהבה
        </motion.p>

        <motion.a
          href="#club"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="inline-block bg-gold-gradient text-primary-foreground px-10 py-4 font-body text-sm tracking-[0.2em] uppercase hover:shadow-gold transition-shadow duration-300"
        >
          הצטרפי למועדון
        </motion.a>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-gold-light to-transparent" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
