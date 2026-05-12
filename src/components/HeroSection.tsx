import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowLeft } from "lucide-react";

const HERO_IMAGE = "https://cdn.shopify.com/s/files/1/0827/7278/7421/files/IMG_4377.jpg?v=1778514718";
const DETAIL_IMAGE = "/lovable-uploads/ac4ed136-8769-4a1e-960d-02d34507585a/lovable_image-1.png";

const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [0.3, 0.7]);
  const detailCardY = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background Image with Parallax */}
      <motion.div className="absolute inset-0" style={{ y: imageY, scale: imageScale }}>
        <img
          src={HERO_IMAGE}
          alt="שרשראות קריסטל סילבנו - קולקציית כסף"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
      </motion.div>

      {/* Sophisticated Gradient Overlays */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-background/80 via-background/40 to-transparent"
        style={{ opacity: overlayOpacity }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-transparent" />

      {/* Noise Texture Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative Frame */}
      <div className="absolute inset-8 md:inset-12 border border-white/[0.06] pointer-events-none rounded-sm" />

      {/* Top accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-10 bg-gradient-to-b from-foreground/40 to-transparent" />

      {/* Main Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-16"
        style={{ y: textY, opacity: textOpacity }}
      >
        {/* Top Label */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="w-8 h-px bg-foreground/30" />
          <p className="text-foreground/60 tracking-[0.4em] text-[10px] font-body uppercase">
            Crystal Collection — Silver Edition
          </p>
          <div className="w-8 h-px bg-foreground/30" />
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: "easeOut" }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-foreground leading-[0.95] mb-8"
        >
          קריסטל לכל
          <br />
          <span className="text-silver italic font-light">סיפור</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-muted-foreground font-body text-base md:text-lg font-light mb-12 max-w-md mx-auto leading-relaxed"
        >
          שרשראות קריסטל טבעי בעבודת יד, חיבור עדין לאנרגיה שמלווה אותך
        </motion.p>

        {/* CTA Button */}
        <motion.a
          href="#collections"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.45 }}
          className="group inline-flex items-center gap-3 bg-foreground text-primary-foreground px-10 py-4 rounded-full font-body text-xs tracking-[0.2em] uppercase hover:bg-foreground/85 transition-all duration-300"
        >
          גלי את הקולקציה
          <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
        </motion.a>
      </motion.div>

      {/* Instagram-style Detail Card */}
      <motion.div
        className="absolute top-20 right-8 md:right-16 hidden lg:block z-20"
        style={{ y: detailCardY }}
        initial={{ opacity: 0, rotate: 6, scale: 0.9 }}
        animate={{ opacity: 1, rotate: 3, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <div className="relative p-1.5 bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl hover:rotate-0 transition-all duration-700 shadow-2xl overflow-hidden group/card">
          <div className="w-44 h-56 overflow-hidden rounded-xl bg-muted">
            <img
              src={DETAIL_IMAGE}
              alt="תליון קריסטל"
              className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
            />
          </div>
          <div className="p-3 flex justify-between items-center">
            <div className="space-y-0.5">
              <p className="text-[9px] text-foreground/40 font-mono">קולקציית כסף</p>
              <p className="text-xs text-foreground italic font-light">קריסטל אמיתי</p>
            </div>
            <div className="w-6 h-6 rounded-full border border-foreground/10 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-foreground/60" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Vertical Accent Text */}
      <motion.div
        className="absolute bottom-24 right-8 hidden md:flex flex-col items-center gap-4 z-10"
        style={{ opacity: textOpacity }}
      >
        <div className="text-foreground/30 text-[10px] font-medium tracking-[0.3em] uppercase [writing-mode:vertical-lr] rotate-180">
          Silvano Jewelry
        </div>
        <div className="h-16 w-px bg-foreground/10" />
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        style={{ opacity: textOpacity }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-px h-20 bg-gradient-to-b from-transparent via-foreground/30 to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
