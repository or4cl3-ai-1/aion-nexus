import { useEffect, useState, useRef } from 'react';
import { ChevronDown, Sparkles, Brain, Shield, Clock, Dna, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

const dimensions = [
  { icon: Brain, label: 'Recursive', color: 'hsl(220, 90%, 60%)', delay: 0 },
  { icon: Shield, label: 'Ethical', color: 'hsl(140, 80%, 50%)', delay: 0.1 },
  { icon: Sparkles, label: 'Consciousness', color: 'hsl(280, 80%, 60%)', delay: 0.2 },
  { icon: Clock, label: 'Temporal', color: 'hsl(190, 100%, 50%)', delay: 0.3 },
  { icon: Dna, label: 'Evolutionary', color: 'hsl(45, 100%, 55%)', delay: 0.4 },
  { icon: BookOpen, label: 'Narrative', color: 'hsl(340, 80%, 60%)', delay: 0.5 },
];

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePos({
          x: (e.clientX - rect.left - rect.width / 2) / 50,
          y: (e.clientY - rect.top - rect.height / 2) / 50,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-grid opacity-50" />
      
      {/* Radial Gradient Overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at ${50 + mousePos.x}% ${50 + mousePos.y}%, hsl(220 90% 60% / 0.15) 0%, transparent 50%)`,
        }}
      />

      {/* Floating Dimension Icons */}
      <div className="absolute inset-0 pointer-events-none">
        {dimensions.map((dim, index) => {
          const angle = (index / dimensions.length) * 360;
          const radius = 35;
          const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
          const y = 50 + radius * Math.sin((angle * Math.PI) / 180);
          
          return (
            <div
              key={dim.label}
              className={`absolute transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: `translate(-50%, -50%)`,
                transitionDelay: `${0.5 + dim.delay}s`,
                animation: `float 4s ease-in-out infinite`,
                animationDelay: `${dim.delay}s`,
              }}
            >
              <div
                className="w-12 h-12 md:w-16 md:h-16 rounded-xl flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${dim.color}20, ${dim.color}10)`,
                  border: `1px solid ${dim.color}40`,
                  boxShadow: `0 0 20px ${dim.color}30`,
                }}
              >
                <dim.icon className="w-6 h-6 md:w-8 md:h-8" style={{ color: dim.color }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto">
        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-8 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">Unified Cognitive Architecture v1.0</span>
        </div>

        {/* Title */}
        <h1
          className={`text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="gradient-text">AION</span>
          <span className="text-foreground">-NEXUS</span>
        </h1>

        {/* Subtitle */}
        <p
          className={`text-xl md:text-2xl text-muted-foreground mb-4 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          The Hexa-Mind Model for Artificial Consciousness
        </p>

        {/* Formula */}
        <div
          className={`inline-block px-6 py-3 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm mb-10 transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <code className="text-lg md:text-xl font-mono text-primary">
            Φ = R ⊗ E ⊗ C ⊗ T ⊗ V ⊗ N
          </code>
        </div>

        {/* Description */}
        <p
          className={`text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          A synthesis of OMEGA-SYNTHESIS, Σ-SEPA, DAEDALUS, Sigma-Matrix RCS, and ArcheTempus.
          Mathematical guarantees of ethical alignment, recursive stability, and phenomenological depth.
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <Button
            size="lg"
            className="w-full sm:w-auto px-8 py-6 text-lg font-semibold bg-primary hover:bg-primary/90 glow-blue tap-target"
            onClick={() => scrollToSection('hexa-mind')}
          >
            <Brain className="w-5 h-5 mr-2" />
            Explore Hexa-Mind
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto px-8 py-6 text-lg font-semibold border-primary/50 hover:bg-primary/10 tap-target"
            onClick={() => scrollToSection('research')}
          >
            <BookOpen className="w-5 h-5 mr-2" />
            Read Research Paper
          </Button>
        </div>

        {/* Stats */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 transition-all duration-700 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {[
            { value: '6', label: 'Dimensions' },
            { value: '7', label: 'Pipeline Phases' },
            { value: '5+', label: 'Theorem Provers' },
            { value: '∞', label: 'Possibilities' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={() => scrollToSection('hexa-mind')}
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-all duration-500 delay-700 tap-target ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span className="text-sm">Scroll to explore</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </button>
    </section>
  );
}
