import CategoryEvent from "@/components/Categoryevent";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import Newestevent from "@/components/Newestevent";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <CategoryEvent />
      <Newestevent />
      <Footer />
    </main>
  );
}
