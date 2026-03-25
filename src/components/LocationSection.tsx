import { motion } from "framer-motion";
import { MapPin, Clock, Phone } from "lucide-react";
import booth from "@/assets/booth.jpg";

const LocationSection = () => {
  return (
    <section className="py-28 px-6 bg-secondary/50">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-silver-dark text-center tracking-[0.4em] text-xs font-body uppercase mb-5"
        >
          Visit Us
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl md:text-5xl text-center font-light text-foreground mb-20"
        >
          בואי <span className="text-silver-dark italic">לבקר</span>
        </motion.h2>

        {/* Booth image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 overflow-hidden rounded-lg max-h-[400px]"
        >
          <img
            src={booth}
            alt="הדוכן של סילבנו תכשיטים בקניון עזריאלי"
            loading="lazy"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>

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
              קניון עזריאלי, תל אביב
              <br />
              קומה 2, ליד הכניסה המרכזית
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
            <h3 className="font-display text-xl text-foreground mb-2">שעות פעילות</h3>
            <p className="text-muted-foreground font-body text-sm leading-relaxed">
              ראשון – חמישי: 10:00–22:00
              <br />
              שישי: 09:00–15:00
              <br />
              שבת: שעה אחרי צאת שבת עד 23:00
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
            <h3 className="font-display text-xl text-foreground mb-2">צרי קשר</h3>
            <p className="text-muted-foreground font-body text-sm" dir="ltr">
              054-123-4567
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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3381.2!2d34.7912!3d32.0741!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d4b9b0c5a0b0b%3A0x1234567890abcdef!2z16fXoNeZ15XXnyDXotep16jXmdeQ15zXmQ!5e0!3m2!1siw!2sil!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="מפה - סילבנו תכשיטים בקניון עזריאלי"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default LocationSection;
