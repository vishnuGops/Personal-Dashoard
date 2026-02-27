import AboutHero from '@/components/AboutHero';
import AboutExperience from '@/components/AboutExperience';
import AboutEducation from '@/components/AboutEducation';
import Beams from "@/components/ui/Beams";

export default function AboutPage() {
  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      >
        <Beams
          beamWidth={3}
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
        <AboutHero />
        <AboutExperience />
        <AboutEducation />
      </div>
    </div>
  );
}
