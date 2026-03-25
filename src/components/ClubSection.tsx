import { motion } from "framer-motion";
import { useState } from "react";

const ClubSection = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="club" className="py-24 px-6 bg-foreground text-primary-foreground">
      <div className="max-w-xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-gold-light tracking-[0.3em] text-sm font-body uppercase mb-4"
        >
          מועדון לקוחות
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl md:text-5xl font-light mb-6"
        >
          הצטרפי ל<span className="text-gold-light italic">משפחה</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-primary-foreground/70 font-body mb-10"
        >
          קבלי גישה ראשונה לקולקציות חדשות, מבצעים בלעדיים והפתעות מיוחדות
        </motion.p>

        {!submitted ? (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="השם שלך"
              required
              className="w-full bg-transparent border-b border-primary-foreground/30 px-2 py-3 font-body text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-gold transition-colors"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="כתובת אימייל"
              required
              className="w-full bg-transparent border-b border-primary-foreground/30 px-2 py-3 font-body text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-gold transition-colors"
            />
            <button
              type="submit"
              className="mt-6 w-full bg-gold-gradient text-primary-foreground py-4 font-body text-sm tracking-[0.2em] uppercase hover:shadow-gold transition-shadow duration-300"
            >
              הצטרפי עכשיו
            </button>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-8"
          >
            <p className="font-display text-2xl text-gold-light mb-2">תודה שהצטרפת! ✨</p>
            <p className="text-primary-foreground/70 font-body">נשמח לראות אותך בדוכן שלנו בעזריאלי</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ClubSection;
