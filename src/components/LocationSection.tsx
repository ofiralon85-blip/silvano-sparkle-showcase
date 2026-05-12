import { motion } from "framer-motion";
import { MapPin, Clock, Phone } from "lucide-react";

const LocationSection = () => {
  return (
    <section className="py-28 px-6 bg-secondary/50">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-gold-dark text-center tracking-[0.4em] text-xs font-body uppercase mb-20"
        >
          Visit Us
        </motion.p>

        <div className="grid md:grid-cols-3 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-5 h-5 text-foreground" />
            </div>
            <h3 className="font-display text-xl text-foreground mb-2">הכתובת שלנו</h3>
            <p className="text-muted-foreground font-body text-sm leading-relaxed">
              קניון עזריאלי תל אביב
              <br />
              מנחם בגין 132, תל אביב
              <br />
              קומה 1
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
              <Clock className="w-5 h-5 text-foreground" />
            </div>
            <h3 className="font-display text-xl text-foreground mb-2">ימים ושעות פעילות</h3>
            <p className="text-muted-foreground font-body text-sm leading-relaxed">
              רביעי, חמישי: 9:30–21:30
              <br />
              שישי: 9:30–14:30
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
              <Phone className="w-5 h-5 text-foreground" />
            </div>
            <h3 className="font-display text-xl text-foreground mb-2">ליצירת קשר</h3>
            <p className="text-muted-foreground font-body text-sm">
              נשמח לעמוד לרשותך
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 w-full h-72 md:h-80 overflow-hidden rounded-lg"
        >
          <iframe
            src="https://www.google.com/maps?q=%D7%A7%D7%A0%D7%99%D7%95%D7%9F+%D7%A2%D7%96%D7%A8%D7%99%D7%90%D7%9C%D7%99+%D7%AA%D7%9C+%D7%90%D7%91%D7%99%D7%91&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="מפה - סילבנו בקניון עזריאלי תל אביב"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default LocationSection;
