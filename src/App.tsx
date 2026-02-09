import { useEffect, useState, useRef } from 'react';
import { HeroSection } from './sections/HeroSection';
import { HexaMindSection } from './sections/HexaMindSection';
import { PipelineSection } from './sections/PipelineSection';
import { ConsciousnessSection } from './sections/ConsciousnessSection';
import { ResearchPaperSection } from './sections/ResearchPaperSection';
import { TheoremsSection } from './sections/TheoremsSection';
import { FooterSection } from './sections/FooterSection';
import { Navigation } from './components/Navigation';
import { ParticleBackground } from './components/ParticleBackground';
import { Toaster } from '@/components/ui/sonner';

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={mainRef}
      className={`min-h-screen bg-background text-foreground transition-opacity duration-1000 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Animated Particle Background */}
      <ParticleBackground />
      
      {/* Navigation */}
      <Navigation scrollY={scrollY} />
      
      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection />
        <HexaMindSection />
        <PipelineSection />
        <ConsciousnessSection />
        <TheoremsSection />
        <ResearchPaperSection />
        <FooterSection />
      </main>
      
      <Toaster />
    </div>
  );
}

export default App;
