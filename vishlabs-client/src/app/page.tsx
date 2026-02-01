import LandingHero from "@/components/LandingHero";
import LandingInfo from "@/components/LandingInfo";
import LandingPhotoWall from "@/components/LandingPhotoWall";
import CareerTimeline from "@/components/CareerTimeline";
import Beams from "@/components/Beams";

export default function Home() {
  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          zIndex: -1,
        }}
      >
        <Beams
          beamWidth={2}
          beamHeight={30}
          beamNumber={20}
          lightColor="#ffffff"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={30}
        />
      </div>
      <div style={{ position: "relative", zIndex: 1 }}>
        <LandingHero />
        <LandingInfo />
        <LandingPhotoWall />
        <CareerTimeline />
      </div>
    </div>
  );
}
