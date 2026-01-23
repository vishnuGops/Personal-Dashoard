import LandingHero from "@/components/LandingHero";
import LandingInfo from "@/components/LandingInfo";
import LandingPhotoWall from "@/components/LandingPhotoWall";
import CareerTimeline from "@/components/CareerTimeline";

export default function Home() {
  return (
    <div>
      <LandingHero />
      <LandingInfo />
      <LandingPhotoWall />
      <CareerTimeline />
    </div>
  );
}
