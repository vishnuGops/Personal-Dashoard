import ProjectsHero from '@/components/ProjectsHero';
import ProjectsInfo from '@/components/ProjectsInfo';
import Beams from "@/components/ui/Beams";

export default function ProjectsPage() {
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
        <ProjectsHero />
        <ProjectsInfo />
      </div>
    </div>
  );
}
