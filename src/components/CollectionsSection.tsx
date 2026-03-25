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
    <section className="py-28 px-6 bg-secondary/50">
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-silver-dark text-center tracking-[0.4em] text-xs font-body uppercase mb-5"
        >
          Collections
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl md:text-5xl text-center font-light text-foreground mb-20"
        >
          מצאי את <span className="text-silver-dark italic">הסגנון שלך</span>
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
          {collections.map((col, i) => (
            <motion.div
              key={col.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.8, ease: "easeOut" }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-lg mb-5 aspect-[3/4] bg-secondary">
                <img
                  src={col.image}
                  alt={col.name}
                  loading="lazy"
                  width={640}
                  height={800}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <h3 className="font-display text-lg md:text-xl text-center text-foreground group-hover:text-silver-dark transition-colors duration-300 tracking-wide">
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
