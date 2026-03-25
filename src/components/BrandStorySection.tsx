import { motion } from "framer-motion";
import craftsmanship from "@/assets/craftsmanship.jpg";

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
            <span className="text-silver-dark italic">כסף אמיתי</span>
          </h2>
          <div className="space-y-6 text-muted-foreground font-body text-sm leading-[1.9]">
            <p>
              סילבנו תכשיטים נולד מתוך אהבה עמוקה לאומנות ולעיצוב. כל תכשיט
              שלנו נוצר בעבודת יד קפדנית מכסף 925, עם תשומת לב לכל פרט ופרט.
            </p>
            <p>
              אנחנו מאמינים שתכשיט הוא לא רק אקססורי — הוא חלק מהזהות שלך.
              כל עיצוב נולד מתוך השראה עירונית, מודרנית ועכשווית.
            </p>
            <p>
              בואי לגלות את הקולקציה שלנו בדוכן בקניון עזריאלי תל אביב,
              ולמצוא את הפריט שמדבר אלייך.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="relative"
        >
          <img
            src={craftsmanship}
            alt="עבודת יד - יצירת תכשיטי כסף סילבנו"
            loading="lazy"
            width={800}
            height={600}
            className="w-full object-cover rounded-lg"
          />
          <div className="absolute -bottom-4 -right-4 w-full h-full border border-silver-light rounded-lg -z-10" />
        </motion.div>
      </div>
    </section>
  );
};

export default BrandStorySection;
