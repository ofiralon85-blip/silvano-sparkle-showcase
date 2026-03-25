import { motion } from "framer-motion";
import crystals from "@/assets/crystals.jpg";
import lifestyleWoman from "@/assets/lifestyle-woman.jpg";

const BrandStorySection = () => {
  return (
    <section className="py-28 px-6 bg-background">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 md:gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <p className="text-silver-dark tracking-[0.4em] text-xs font-body uppercase mb-5">
            Our Story
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-foreground mb-10 leading-[1.15]">
            עבודת יד עדינה,
            <br />
            <span className="text-silver-dark italic">אבנים עם משמעות</span>
          </h2>
          <div className="space-y-6 text-muted-foreground font-body text-sm leading-[1.9]">
            <p>
              סילבנו תכשיטים נולד מתוך אהבה עמוקה לאומנות ולעיצוב. כל תכשיט
              שלנו נוצר בעבודת יד קפדנית עם אבנים טבעיות — כל אבן נבחרה
              בקפידה לפי המשמעות והאנרגיה שלה.
            </p>
            <p>
              מאמתיסט לרוגע, טורקיז להגנה, אקוומרין לאומץ — אצלנו כל תכשיט
              מגיע עם כרטיס משמעות אישי. לא סתם תכשיטים, אלא אנרגיה שאת
              לובשת.
            </p>
            <p>
              בואי לגלות את הקולקציה שלנו בדוכן בקניון עזריאלי תל אביב,
              ולמצוא את האבן שמדברת אלייך.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="relative grid grid-cols-2 gap-3"
        >
          <img
            src={crystals}
            alt="שרשראות קריסטלים - כל אבן עם משמעות"
            loading="lazy"
            className="w-full object-cover rounded-lg aspect-[3/4]"
          />
          <img
            src={lifestyleWoman}
            alt="דוגמנית עם תכשיטי סילבנו"
            loading="lazy"
            className="w-full object-cover rounded-lg aspect-[3/4] mt-8"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default BrandStorySection;
