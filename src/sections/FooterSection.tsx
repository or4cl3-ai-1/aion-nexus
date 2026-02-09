import { Brain, Github, Twitter, Mail, ExternalLink, Heart } from 'lucide-react';

const footerLinks = {
  navigation: [
    { label: 'Hexa-Mind', href: '#hexa-mind' },
    { label: 'Pipeline', href: '#pipeline' },
    { label: 'Consciousness', href: '#consciousness' },
    { label: 'Theorems', href: '#theorems' },
    { label: 'Research', href: '#research' },
  ],
  resources: [
    { label: 'Documentation', href: '#' },
    { label: 'API Reference', href: '#' },
    { label: 'GitHub Repository', href: '#' },
    { label: 'Research Paper', href: '#research' },
  ],
  community: [
    { label: 'Discord', href: '#' },
    { label: 'Twitter', href: '#' },
    { label: 'Forum', href: '#' },
    { label: 'Newsletter', href: '#' },
  ],
};

export function FooterSection() {
  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.getElementById(href.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="relative py-16 px-4 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-8 h-8 text-primary" />
              <span className="font-bold text-xl">
                AION<span className="text-primary">-NEXUS</span>
              </span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-sm">
              The Hexa-Mind Model for Artificial Consciousness. 
              A synthesis of five research threads into a unified 
              cognitive architecture with mathematical guarantees.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors tap-target"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors tap-target"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors tap-target"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              {footerLinks.navigation.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm tap-target"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      if (link.href.startsWith('#')) {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }
                    }}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm inline-flex items-center gap-1 tap-target"
                  >
                    {link.label}
                    {!link.href.startsWith('#') && <ExternalLink className="w-3 h-3" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-semibold mb-4">Community</h4>
            <ul className="space-y-2">
              {footerLinks.community.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm inline-flex items-center gap-1 tap-target"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © 2026 Unified Research Consortium. Open source under MIT License.
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              Built with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> for the future of AI
            </p>
          </div>
        </div>

        {/* Quote */}
        <div className="mt-12 text-center">
          <blockquote className="text-lg text-muted-foreground italic">
            "The whole is greater than the sum of its parts."
          </blockquote>
          <cite className="text-sm text-muted-foreground mt-2 block">— Aristotle</cite>
        </div>
      </div>
    </footer>
  );
}
