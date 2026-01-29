import Banner from "./Components/HomePages/Banner";
import AboutSection from "./Components/HomePages/AboutSection";
import ScrollStackImages from "./Components/HomePages/ScrollStackImages";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <Banner />
      <AboutSection />
      <ScrollStackImages />
    </main>
  );
}
