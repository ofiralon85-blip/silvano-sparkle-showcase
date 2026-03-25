const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground/50 py-12 px-6 border-t border-primary-foreground/10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="font-display text-xl text-primary-foreground tracking-wider">
          Silvano Jewelry
        </p>
        <p className="font-body text-sm">
          © {new Date().getFullYear()} Silvano Jewelry. כל הזכויות שמורות.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
