import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import InspirationSection from "@/components/InspirationSection";
import ProductsSection from "@/components/ProductsSection";
import BrandStorySection from "@/components/BrandStorySection";
import LocationSection from "@/components/LocationSection";
import ClubSection from "@/components/ClubSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <InspirationSection />
      <ProductsSection />
      <div id="story">
        <BrandStorySection />
      </div>
      <div id="location">
        <LocationSection />
      </div>
      <ClubSection />
      <Footer />
    </div>
  );
};

export default Index;
