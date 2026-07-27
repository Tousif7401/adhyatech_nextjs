import ParticleSlider from '@/components/ParticleSlider';

/**
 * Particle Slider Demo Page
 *
 * This demonstrates the ParticleSlider component with various configurations.
 * The particle slider was inspired and implemented based on the implementation at https://crazygl.com/hero/particle-slider
 * Original implementation by @ybouane https://x.com/ybouane
 */

export default function ParticleSliderDemo() {
  return (
    <main style={{ margin: 0, padding: 0 }}>
      <ParticleSlider
        // Slider Settings
        slideCount={3}
        autoplaySeconds={5}
        dotStyle="bars"

        // Slide 1 - Sphere Formation
        slide1Heading="Drop-in heroes that feel impossible."
        slide1Subheading="CrazyGL gives developers ready-to-use interactive WebGL hero components."
        slide1Cta="Explore heroes"
        slide1CtaHref="#explore"
        slide1Viz="sphere"
        slide1Transition="zoom"
        slide1Layout="text-left"
        slide1Accent="#7cc7ff"

        // Slide 2 - Galaxy Formation
        slide2Heading="Bring your brand into the visual."
        slide2Subheading="Turn logos and images into living particle formations."
        slide2Viz="galaxy"
        slide2Transition="blur"
        slide2Layout="text-right"
        slide2Accent="#b08cff"

        // Slide 3 - Wave Formation
        slide3Heading="Motion that reacts to touch."
        slide3Subheading="Every hero can respond to pointer movement."
        slide3Viz="wave"
        slide3Transition="slide-down"
        slide3Layout="text-left"
        slide3Accent="#5fe0d0"

        // Particle Settings
        particleCount={6000}
        particleSize={1.45}
        baseColor="#bcd3ff"

        // Pointer Settings
        pointerMode="repel"
        pointerStrength={1}
        pointerRadius={0.6}
        rotationSpeed={0}

        // Backdrop Colors
        bgTop="#0a0e1a"
        bgBottom="#05060c"
      />
    </main>
  );
}
