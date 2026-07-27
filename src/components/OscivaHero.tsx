'use client';

import SphereParticles from './SphereParticles';
import { useRef } from 'react';

export default function OscivaHero() {
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={heroRef} className="product-hero__visual" style={{ position: 'relative', width: '100%', height: '100%', maxWidth: '500px', maxHeight: '500px' }}>
      <SphereParticles rootRef={heroRef} />
    </div>
  );
}
