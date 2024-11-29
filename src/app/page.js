import FaqClient from "@/components/Faq/FaqClient";
import HeroClient from "@/components/Hero/HeroClient";
import HomePageProducts from "@/components/HomePageProducts/HomePageProducts";

export default function Home() {
  return (
    <div>
      <main>
        <HeroClient />
        <HomePageProducts />
        <FaqClient />
      </main>
    </div>
  );
}
