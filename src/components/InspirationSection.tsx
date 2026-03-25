import { motion } from "framer-motion";
import lifestyleNecklaces from "@/assets/lifestyle-necklaces.jpg";
import lifestyleMan from "@/assets/lifestyle-man.jpg";
import lifestyleRings from "@/assets/lifestyle-rings.jpg";
import productEarrings from "@/assets/product-earrings-stones.jpg";

const InspirationSection = () => {
  return (
    <section className="py-28 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-silver-dark text-center tracking-[0.4em] text-xs font-body uppercase mb-5"
        >
          Inspiration
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl md:text-5xl text-center font-light text-foreground mb-20"
        >
          כל תכשיט הוא <span className="text-silver-dark italic">יצירה</span>
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="row-span-2 overflow-hidden rounded-lg"
          >
            <img src={lifestyleNecklaces} alt="שרשראות כסף ואבני טורקיז" loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="overflow-hidden rounded-lg"
          >
            <img src={productEarrings} alt="עגילים ושרשרת עץ החיים עם אבנים" loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="row-span-2 overflow-hidden rounded-lg"
          >
            <img src={lifestyleMan} alt="שרשראות כסף לגבר" loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="overflow-hidden rounded-lg"
          >
            <img src={lifestyleRings} alt="טבעות זהב על הידיים" loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InspirationSection;
