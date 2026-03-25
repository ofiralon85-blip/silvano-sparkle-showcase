import { motion } from "framer-motion";
import necklace from "@/assets/necklace.jpg";
import rings from "@/assets/rings.jpg";
import bracelet from "@/assets/bracelet.jpg";
import earrings from "@/assets/earrings.jpg";

const collections = [
  { name: "שרשראות", image: necklace },
  { name: "טבעות", image: rings },
  { name: "צמידים", image: bracelet },
  { name: "עגילים", image: earrings },
];

const CollectionsSection = () => {
  return (
    <section className="py-24 px-6 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-gold text-center tracking-[0.3em] text-sm font-body uppercase mb-4"
        >
          הקולקציות שלנו
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl md:text-5xl text-center font-light text-foreground mb-16"
        >
          מצאי את <span className="text-gold italic">הסגנון שלך</span>
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {collections.map((col, i) => (
            <motion.div
              key={col.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden mb-4 aspect-[3/4]">
                <img
                  src={col.image}
                  alt={col.name}
                  loading="lazy"
                  width={640}
                  height={800}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-500" />
              </div>
              <h3 className="font-display text-xl md:text-2xl text-center text-foreground group-hover:text-gold transition-colors duration-300">
                {col.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionsSection;
