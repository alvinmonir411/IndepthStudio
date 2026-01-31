import Banner from "./Components/HomePages/Banner";
import AboutSection from "./Components/HomePages/AboutSection";
import ScrollStackImages from "./Components/HomePages/ScrollStackImages";
import WhyElegance from "./Components/HomePages/WhyElegance";
import WhyChooseUs from "./Components/HomePages/WhyChooseUs";
import FeaturedProjects from "./Components/HomePages/FeaturedProjects";
import LatestJournal from "./Components/HomePages/LatestJournal";
import BeforeAfterSlider from "./Components/HomePages/BeforeAfterSlider";
import AchievementsSection from "./Components/HomePages/AchievementsSection";
import ClientTestimonials from "./Components/HomePages/ClientTestimonials";
import { getProjects } from "./actions/projects";
import { getBlogs } from "./actions/blog";

export const revalidate = 3600;

export default async function Home() {
  const allProjects = await getProjects();
  const featuredProjects = allProjects.filter((p: any) => p.isFeatured);
  const scrollProjects = featuredProjects.slice(0, 3);
  const gridProjects = featuredProjects.slice(0, 4);
  const allBlogs = await getBlogs();
  const latestBlogs = allBlogs.slice(0, 2);

  return (
    <main className="w-full min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <Banner />
      <AboutSection />
      <ScrollStackImages projects={scrollProjects} />
      <WhyElegance />
      <WhyChooseUs />
      <FeaturedProjects projects={gridProjects} />
      <LatestJournal posts={latestBlogs} />

      {/* Transformation Showcase Section */}
      <section className="relative w-full py-20 px-6 overflow-hidden bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500 rounded-full blur-[120px] animate-pulse delay-1000" />
        </div>

        {/* Diagonal lines pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 50px,
              rgba(255,255,255,0.1) 50px,
              rgba(255,255,255,0.1) 51px
            )`
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto">
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

      {/* Achievements & Numbers Section */}
      <AchievementsSection />
      <ClientTestimonials />

    </main>
  );
}
