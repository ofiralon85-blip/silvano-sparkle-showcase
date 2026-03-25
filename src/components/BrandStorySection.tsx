import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import crystals from "@/assets/crystals.jpg";
import lifestyleWoman from "@/assets/lifestyle-woman.jpg";

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
            className="text-silver-dark tracking-[0.4em] text-xs font-body uppercase mb-5"
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
            עבודת יד עדינה,
            <br />
            <span className="text-silver-dark italic">אבנים עם משמעות</span>
          </motion.h2>
          <div className="space-y-6 text-muted-foreground font-body text-sm leading-[1.9]">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              סילבנו תכשיטים נולד מתוך אהבה עמוקה לאומנות ולעיצוב. כל תכשיט
              שלנו נוצר בעבודת יד קפדנית עם אבנים טבעיות — כל אבן נבחרה
              בקפידה לפי המשמעות והאנרגיה שלה.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              מאמתיסט לרוגע, טורקיז להגנה, אקוומרין לאומץ — אצלנו כל תכשיט
              מגיע עם כרטיס משמעות אישי. לא סתם תכשיטים, אלא אנרגיה שאת
              לובשת.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              בואי לגלות את הקולקציה שלנו בדוכן בקניון עזריאלי תל אביב,
              ולמצוא את האבן שמדברת אלייך.
            </motion.p>
          </div>
        </motion.div>

        <div className="relative grid grid-cols-2 gap-3">
          <motion.div className="overflow-hidden rounded-lg" style={{ y: imageY1 }}>
            <motion.img
              src={crystals}
              alt="שרשראות קריסטלים - כל אבן עם משמעות"
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
              src={lifestyleWoman}
              alt="דוגמנית עם תכשיטי סילבנו"
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
