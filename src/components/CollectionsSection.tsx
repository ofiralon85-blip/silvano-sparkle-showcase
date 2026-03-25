import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import productNecklace from "@/assets/product-necklace-display.jpg";
import rings from "@/assets/rings.jpg";
import bracelet from "@/assets/bracelet.jpg";
import earringsDisplay from "@/assets/earrings-display.jpg";

const collections = [
  { name: "שרשראות", image: productNecklace },
  { name: "טבעות", image: rings },
  { name: "צמידים", image: bracelet },
  { name: "עגילים", image: earringsDisplay },
];

const CollectionCard = ({ col, index }: { col: typeof collections[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: index * 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-lg mb-5 aspect-[3/4] bg-secondary">
        <motion.img
          src={col.image}
          alt={col.name}
          loading="lazy"
          style={{ y }}
          className="w-full h-[115%] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-500" />
      </div>
      <h3 className="font-display text-lg md:text-xl text-center text-foreground group-hover:text-silver-dark transition-colors duration-300 tracking-wide">
        {col.name}
      </h3>
    </motion.div>
  );
};

const CollectionsSection = () => {
  return (
    <section className="py-28 px-6 bg-secondary/50">
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-silver-dark text-center tracking-[0.4em] text-xs font-body uppercase mb-5"
        >
          Collections
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-4xl md:text-5xl text-center font-light text-foreground mb-20"
        >
          מצאי את <span className="text-silver-dark italic">הסגנון שלך</span>
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
          {collections.map((col, i) => (
            <CollectionCard key={col.name} col={col} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionsSection;
