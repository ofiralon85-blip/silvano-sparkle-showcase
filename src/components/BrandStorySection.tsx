import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const CRYSTAL_IMG_1 = "https://cdn.shopify.com/s/files/1/0827/7278/7421/files/IMG_4377.jpg?v=1778514718";
const CRYSTAL_IMG_2 = "https://cdn.shopify.com/s/files/1/0827/7278/7421/files/IMG_4378.jpg?v=1778514718";

const BrandStorySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const imageY2 = useTransform(scrollYProgress, [0, 1], [100, -40]);
  const textX = useTransform(scrollYProgress, [0, 0.5], [40, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section ref={sectionRef} className="py-28 px-6 bg-background overflow-hidden">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 md:gap-24 items-center">
        <motion.div
          style={{ x: textX, opacity: textOpacity }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-gold-dark tracking-[0.4em] text-xs font-body uppercase mb-5"
          >
            Our Story
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl md:text-5xl font-light text-foreground mb-10 leading-[1.15]"
          >
            אבנים טבעיות,
            <br />
            <span className="text-gold-dark italic">אנרגיה שאת לובשת</span>
          </motion.h2>
          <div className="space-y-6 text-muted-foreground font-body text-sm leading-[1.9]">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              סילבנו נולד מתוך אהבה עמוקה לעולם הקריסטלים והאנרגיה שלהם.
              אנחנו מאמינים שלכל אבן יש סיפור, משמעות ואנרגיה ייחודית —
              וכשהיא נמצאת קרוב ללב, היא יכולה ללוות, לחזק ולהעצים.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              כל שרשרת מעוצבת בקפידה עם קריסטל טבעי, משובץ בשרשרת זהב או כסף
              איכותית. לכל שרשרת מצורף <span className="text-foreground">כרטיס משמעות אישי</span> —
              כי אנחנו מאמינים שהקשר לאבן מתחיל מהידע והכוונה.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              13 סוגי קריסטלים שנבחרו בקפידה: אמתיסט, רוז קוורץ, אקוומרין,
              סיטרין, ספיר ועוד — כל אחד עם המסר שלו, בשבילך.
            </motion.p>
          </div>
        </motion.div>

        <div className="relative grid grid-cols-2 gap-3">
          <motion.div className="overflow-hidden rounded-lg" style={{ y: imageY1 }}>
            <motion.img
              src={CRYSTAL_IMG_1}
              alt="שרשראות קריסטל בקולקציית זהב של סילבנו"
              loading="lazy"
              initial={{ opacity: 0, scale: 1.1 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full object-cover aspect-[3/4]"
            />
          </motion.div>
          <motion.div className="overflow-hidden rounded-lg mt-12" style={{ y: imageY2 }}>
            <motion.img
              src={CRYSTAL_IMG_2}
              alt="קולקציית שרשראות קריסטל סילבנו"
              loading="lazy"
              initial={{ opacity: 0, scale: 1.1 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="w-full object-cover aspect-[3/4]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BrandStorySection;
