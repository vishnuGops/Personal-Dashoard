import ContactHero from '@/components/ContactHero';
import ContactInfo from '@/components/ContactInfo';
import LightRays from '@/components/ui/LightRays';

export default function ContactPage() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#0c0c0c' }}>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }}>
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={1}
          lightSpread={2}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0}
          distortion={0}
          className="custom-rays"
          pulsating={false}
          fadeDistance={1}
          saturation={2}
        />
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <ContactHero />
        <ContactInfo />
      </div>
    </div>
  );
}
