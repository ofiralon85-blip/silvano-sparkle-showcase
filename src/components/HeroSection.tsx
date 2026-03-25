import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroImg from "@/assets/hero-jewelry.jpg";

const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [0.3, 0.7]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <motion.div className="absolute inset-0" style={{ y: imageY, scale: imageScale }}>
        <img
          src={heroImg}
          alt="תכשיטי כסף סילבנו - שרשראות, טבעות וצמידים"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
      </motion.div>
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/80"
        style={{ opacity: overlayOpacity }}
      />

      <motion.div
        className="relative z-10 text-center px-6 max-w-3xl mx-auto mt-20"
        style={{ y: textY, opacity: textOpacity }}
      >
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-silver-dark tracking-[0.5em] text-xs font-body uppercase mb-6"
        >
          Silver Collection
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: "easeOut" }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-foreground leading-[1.1] mb-8"
        >
          תכשיטים שמספרים
          <br />
          <span className="text-silver-dark italic font-light">סיפור</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-muted-foreground font-body text-base md:text-lg font-light mb-12 max-w-md mx-auto leading-relaxed"
        >
          עבודת יד עדינה, כסף 925, ועיצוב שנולד מתוך אהבה
        </motion.p>

        <motion.a
          href="#club"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.45 }}
          className="inline-block bg-foreground text-primary-foreground px-10 py-4 rounded-lg font-body text-xs tracking-[0.25em] uppercase hover:bg-foreground/85 transition-all duration-300"
        >
          הצטרפי למועדון
        </motion.a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        style={{ opacity: textOpacity }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-px h-20 bg-gradient-to-b from-transparent via-silver to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
