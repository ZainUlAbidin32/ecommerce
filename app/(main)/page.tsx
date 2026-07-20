import Featured from "@/components/Featured";
import Hero from "@/components/Hero";
import Newsletter from "@/components/NewsLetter";
import PromoBanner from "@/components/PromoBanner";
import ShopByCategory from "@/components/ShopByCategory";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function Home() {
  return (
    <main>
      <Hero/>
      <Featured/>
      <ShopByCategory/>
      <PromoBanner/>
      <WhyChooseUs/>
      <Newsletter/>
    </main>
  );
}
