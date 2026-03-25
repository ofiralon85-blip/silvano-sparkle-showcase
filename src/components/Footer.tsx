const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground/40 py-14 px-6 border-t border-primary-foreground/5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="font-display text-lg text-primary-foreground/70 tracking-[0.15em]">
          Silvano Jewelry
        </p>
        <p className="font-body text-xs">
          © {new Date().getFullYear()} Silvano Jewelry. כל הזכויות שמורות.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
