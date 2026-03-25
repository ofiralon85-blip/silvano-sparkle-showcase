import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import lifestyleNecklaces from "@/assets/lifestyle-necklaces.jpg";
import lifestyleMan from "@/assets/lifestyle-man.jpg";
import lifestyleRings from "@/assets/lifestyle-rings.jpg";
import productEarrings from "@/assets/product-earrings-stones.jpg";

const ParallaxImage = ({
  src,
  alt,
  className,
  speed = 0.15,
}: {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * -100}%`, `${speed * 100}%`]);

  return (
    <div ref={ref} className={`overflow-hidden ${className || ""}`}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        style={{ y }}
        className="w-full h-[120%] object-cover hover:scale-105 transition-transform duration-700"
      />
    </div>
  );
};

const InspirationSection = () => {
  return (
    <section className="py-28 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-silver-dark text-center tracking-[0.4em] text-xs font-body uppercase mb-5"
        >
          Inspiration
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-4xl md:text-5xl text-center font-light text-foreground mb-20"
        >
          כל תכשיט הוא <span className="text-silver-dark italic">יצירה</span>
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="row-span-2 rounded-lg"
          >
            <ParallaxImage src={lifestyleNecklaces} alt="שרשראות כסף ואבני טורקיז" className="rounded-lg h-full" speed={0.1} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-lg"
          >
            <ParallaxImage src={productEarrings} alt="עגילים ושרשרת עץ החיים עם אבנים" className="rounded-lg h-full" speed={0.08} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="row-span-2 rounded-lg"
          >
            <ParallaxImage src={lifestyleMan} alt="שרשראות כסף לגבר" className="rounded-lg h-full" speed={0.12} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-lg"
          >
            <ParallaxImage src={lifestyleRings} alt="טבעות על הידיים" className="rounded-lg h-full" speed={0.08} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InspirationSection;
