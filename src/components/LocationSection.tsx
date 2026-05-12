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
      </div>
    </section>
  );
};

export default LocationSection;
