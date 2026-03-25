import { motion } from "framer-motion";
import craftsmanship from "@/assets/craftsmanship.jpg";

const BrandStorySection = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-gold tracking-[0.3em] text-sm font-body uppercase mb-4">
            הסיפור שלנו
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-foreground mb-8 leading-tight">
            עבודת יד עדינה,
            <br />
            <span className="text-gold italic">אבנים עם משמעות</span>
          </h2>
          <div className="space-y-5 text-muted-foreground font-body text-base leading-relaxed">
            <p>
              סילבנו תכשיטים נולד מתוך אהבה עמוקה לאומנות ולעיצוב. כל תכשיט
              שלנו נוצר בעבודת יד קפדנית, עם תשומת לב לכל פרט ופרט.
            </p>
            <p>
              אנחנו מאמינים שתכשיט הוא לא רק אקססורי — הוא סיפור אישי, סמל
              של רגע, זיכרון או משמעות. כל אבן נבחרת בקפידה, כל עיצוב נולד
              מתוך השראה אמיתית.
            </p>
            <p>
              בואי לגלות את הקולקציה שלנו בדוכן בקניון עזריאלי תל אביב,
              ולמצוא את התכשיט שמדבר אלייך.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <img
            src={craftsmanship}
            alt="עבודת יד - יצירת תכשיטים סילבנו"
            loading="lazy"
            width={800}
            height={600}
            className="w-full object-cover"
          />
          <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-gold opacity-30" />
          <div className="absolute -top-6 -left-6 w-32 h-32 border border-gold opacity-30" />
        </motion.div>
      </div>
    </section>
  );
};

export default BrandStorySection;
