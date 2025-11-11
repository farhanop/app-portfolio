import HeroSection from "../../components/home/HeroSection";
import WelcomeMessage from "../../components/home/WelcomeMessage";
import QuickLinks from "../../components/home/QuickLinks";
import LatestNews from "../../components/home/LatestNews";

export default function Home() {
  return (
    <>
      <HeroSection />
      <QuickLinks />
      <WelcomeMessage />
      <LatestNews />
    </>
  );
}
