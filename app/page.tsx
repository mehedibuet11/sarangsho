import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { BlogSection } from "@/components/blog-section";
import { Footer } from "@/components/footer";
import Screenshots from "@/components/Screenshots";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <Screenshots />
      {/* <ScreenshotsGallery /> */}
      <BlogSection />
      <Footer />
    </div>
  );
}
