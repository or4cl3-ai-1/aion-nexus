import { useState, useEffect } from 'react';
import { Menu, X, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  scrollY: number;
}

const navItems = [
  { label: 'Hexa-Mind', href: '#hexa-mind' },
  { label: 'Pipeline', href: '#pipeline' },
  { label: 'Consciousness', href: '#consciousness' },
  { label: 'Theorems', href: '#theorems' },
  { label: 'Research', href: '#research' },
];

export function Navigation({ scrollY }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const isScrolled = scrollY > 100;

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.slice(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.slice(1));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-background/90 backdrop-blur-xl border-b border-border/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a 
            href="#" 
            className="flex items-center gap-2 group"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="relative w-8 h-8">
              <Brain className="w-8 h-8 text-primary transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
            </div>
            <span className="font-bold text-lg tracking-tight">
              AION<span className="text-primary">-NEXUS</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  activeSection === item.href.slice(1)
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden tap-target"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border/50 transition-all duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollToSection(item.href)}
              className={`w-full px-4 py-3 text-left text-sm font-medium rounded-lg transition-all duration-300 tap-target ${
                activeSection === item.href.slice(1)
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
