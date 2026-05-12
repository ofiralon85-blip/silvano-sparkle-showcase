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
    <section id="club" className="py-28 px-6 bg-foreground">
      <div className="max-w-lg mx-auto text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-gold tracking-[0.4em] text-xs font-body uppercase mb-5"
        >
          Silvano Circle
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl md:text-5xl font-light text-primary-foreground mb-6"
        >
          הצטרפי ל<span className="text-gold italic">סילבנו</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-primary-foreground/50 font-body text-sm mb-12 leading-relaxed"
        >
          קריסטלים חדשים, ידע על משמעות האבנים והטבות בלעדיות —
          ישר אלייך לתיבת הדואר
        </motion.p>

        {!submitted ? (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="השם שלך"
              required
              className="w-full bg-transparent border-b border-primary-foreground/20 px-1 py-3.5 font-body text-sm text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:border-gold transition-colors duration-300"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="כתובת אימייל"
              required
              className="w-full bg-transparent border-b border-primary-foreground/20 px-1 py-3.5 font-body text-sm text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:border-gold transition-colors duration-300"
            />
            <button
              type="submit"
              className="mt-8 w-full bg-primary-foreground text-foreground py-4 rounded-lg font-body text-xs tracking-[0.25em] uppercase hover:bg-primary-foreground/90 transition-all duration-300"
            >
              הצטרפי עכשיו
            </button>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-10"
          >
            <p className="font-display text-2xl text-gold mb-3">תודה שהצטרפת ✦</p>
            <p className="text-primary-foreground/50 font-body text-sm">נשמח לראות אותך בדוכן שלנו בעזריאלי</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ClubSection;
