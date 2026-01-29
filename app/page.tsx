import Banner from "./Components/HomePages/Banner";
import AboutSection from "./Components/HomePages/AboutSection";
import ScrollStackImages from "./Components/HomePages/ScrollStackImages";
import WhyElegance from "./Components/HomePages/WhyElegance";
import WhyChooseUs from "./Components/HomePages/WhyChooseUs";
import FeaturedProjects from "./Components/HomePages/FeaturedProjects";
import BeforeAfterSlider from "./Components/HomePages/BeforeAfterSlider";


export default function Home() {
  return (
    <main className="w-full min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <Banner />
      <AboutSection />
      <ScrollStackImages />
      <WhyElegance />
      <WhyChooseUs />
      <FeaturedProjects />

      {/* Transformation Showcase Section */}
      <section className="w-full py-20 px-6 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 dark:from-black dark:via-zinc-950 dark:to-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              See The Transformation
            </h2>
            <p className="text-zinc-300 text-lg max-w-2xl mx-auto">
              Drag the slider to reveal the stunning before and after results of our interior design projects
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <BeforeAfterSlider
              beforeImage="/ResidentialInteriorDesign.jpg"
              afterImage="/CommercialinteriorDesign.jpg"
              beforeAlt="Before interior transformation"
              afterAlt="After interior transformation"
              height="600px"
            />
          </div>

          <p className="text-center text-zinc-400 text-sm mt-6">
            * Replace with actual before/after transformation photos
          </p>
        </div>
      </section>

    </main>
  );
}
