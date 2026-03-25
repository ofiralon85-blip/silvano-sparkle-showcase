import { motion } from "framer-motion";
import inspiration1 from "@/assets/inspiration1.jpg";
import inspiration2 from "@/assets/inspiration2.jpg";
import craftsmanship from "@/assets/craftsmanship.jpg";

const InspirationSection = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-gold text-center tracking-[0.3em] text-sm font-body uppercase mb-4"
        >
          השראה
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl md:text-5xl text-center font-light text-foreground mb-16"
        >
          כל תכשיט הוא <span className="text-gold italic">יצירה</span>
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="row-span-2"
          >
            <img src={inspiration1} alt="טבעת זהב על משי" loading="lazy" width={640} height={800} className="w-full h-full object-cover" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <img src={craftsmanship} alt="עבודת יד - יצירת תכשיטים" loading="lazy" width={800} height={600} className="w-full h-full object-cover" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="row-span-2"
          >
            <img src={inspiration2} alt="שרשראות זהב שכבות" loading="lazy" width={640} height={800} className="w-full h-full object-cover" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-secondary h-full flex items-center justify-center p-8 text-center">
              <p className="font-display text-2xl md:text-3xl text-foreground font-light leading-relaxed">
                ״כל אבן נבחרת
                <br />
                <span className="text-gold">בקפידה</span>
                <br />
                כמו כל רגע בחיים״
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InspirationSection;
