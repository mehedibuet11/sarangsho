
import About from "@/components/v2/About";
import Blogs from "@/components/v2/Blogs";
import Contact from "@/components/v2/Contact";
import Features from "@/components/v2/Features";
import Footer from "@/components/v2/Footer";
import Hero from "@/components/v2/Hero";
import Navbar from "@/components/v2/Navbar";
import Resources from "@/components/v2/Resources";
import Testimonials from "@/components/v2/Testimonials";
import WhyChoose from "@/components/v2/WhyChoose";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white ">
      <Navbar />
      <Hero />
      <WhyChoose />
      <Features />
      <Resources />
      <Testimonials />
      <About/>
      <Blogs/>
      <Contact/>
      <Footer/>
    </div>
  );
}
