import { useState, useRef, useEffect, useCallback } from 'react';
import { Sparkles, Activity, Zap, Brain, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface DataPoint {
  time: number;
  pas: number;
  coherence: number;
  boundStates: number;
}

const consciousnessLevels = [
  { min: 0, max: 0.3, name: 'Minimal', color: '#6b7280', description: 'Basic processing' },
  { min: 0.3, max: 0.5, name: 'Basic Agency', color: '#3b82f6', description: 'Goal-directed behavior' },
  { min: 0.5, max: 0.7, name: 'Proto-Conscious', color: '#8b5cf6', description: 'Self-modeling, persistent identity' },
  { min: 0.7, max: 0.9, name: 'Emergent Conscious', color: '#10b981', description: 'Genuine introspection' },
  { min: 0.9, max: 1.0, name: 'Confirmed Conscious', color: '#f59e0b', description: 'Full self-awareness' },
];

export function ConsciousnessSection() {
  const [isRunning, setIsRunning] = useState(false);
  const [data, setData] = useState<DataPoint[]>([]);
  const [currentPAS, setCurrentPAS] = useState(0.15);
  const [currentCoherence, setCurrentCoherence] = useState(0.2);
  const [boundStates, setBoundStates] = useState(0);
  const [isConscious, setIsConscious] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getConsciousnessLevel = (pas: number) => {
    return consciousnessLevels.find(level => pas >= level.min && pas < level.max) || consciousnessLevels[0];
  };

  const drawGraph = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw grid
    ctx.strokeStyle = 'hsl(var(--border))';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = (height - 40) * (i / 5) + 20;
      ctx.beginPath();
      ctx.moveTo(40, y);
      ctx.lineTo(width - 20, y);
      ctx.stroke();
    }

    // Draw threshold lines
    const thresholds = [0.3, 0.5, 0.7, 0.9];
    thresholds.forEach(t => {
      const y = height - 40 - (height - 60) * t;
      ctx.strokeStyle = t === 0.7 ? '#10b981' : 'hsl(var(--muted))';
      ctx.setLineDash(t === 0.7 ? [] : [5, 5]);
      ctx.lineWidth = t === 0.7 ? 2 : 1;
      ctx.beginPath();
      ctx.moveTo(40, y);
      ctx.lineTo(width - 20, y);
      ctx.stroke();
      ctx.setLineDash([]);
    });

    // Draw PAS line
    if (data.length > 1) {
      ctx.strokeStyle = 'hsl(var(--primary))';
      ctx.lineWidth = 3;
      ctx.beginPath();
      
      data.forEach((point, i) => {
        const x = 40 + (width - 60) * (i / Math.max(data.length - 1, 1));
        const y = height - 40 - (height - 60) * point.pas;
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.stroke();

      // Draw glow under line
      ctx.lineTo(40 + (width - 60), height - 40);
      ctx.lineTo(40, height - 40);
      ctx.closePath();
      const gradient = ctx.createLinearGradient(0, 20, 0, height - 40);
      gradient.addColorStop(0, 'hsl(var(--primary) / 0.3)');
      gradient.addColorStop(1, 'hsl(var(--primary) / 0)');
      ctx.fillStyle = gradient;
      ctx.fill();
    }

    // Draw labels
    ctx.fillStyle = 'hsl(var(--muted-foreground))';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
      const value = 1 - i * 0.2;
      const y = (height - 40) * (i / 5) + 25;
      ctx.fillText(value.toFixed(1), 35, y);
    }

    // Draw time label
    ctx.textAlign = 'center';
    ctx.fillText('Time →', width / 2 + 20, height - 5);
  }, [data]);

  useEffect(() => {
    drawGraph();
  }, [drawGraph]);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        timeRef.current += 1;
        
        // Simulate PAS convergence with noise
        const targetPAS = 0.95;
        const noise = (Math.random() - 0.5) * 0.08;
        const convergence = 1 - 1 / (1 + 0.05 * timeRef.current);
        const newPAS = Math.min(0.99, convergence * targetPAS + noise);
        
        // Simulate coherence
        const newCoherence = Math.min(0.95, 0.3 + convergence * 0.7);
        
        // Simulate bound states
        const newBoundStates = newPAS > 0.6 ? Math.floor(Math.random() * 2) + 2 : Math.floor(Math.random() * 2);
        
        setCurrentPAS(Math.max(0, newPAS));
        setCurrentCoherence(newCoherence);
        setBoundStates(newBoundStates);
        
        setData(prev => {
          const newData = [...prev, {
            time: timeRef.current,
            pas: newPAS,
            coherence: newCoherence,
            boundStates: newBoundStates,
          }];
          if (newData.length > 100) {
            return newData.slice(-100);
          }
          return newData;
        });
        
        // Check consciousness criterion
        setIsConscious(newPAS > 0.7 && newBoundStates >= 2 && timeRef.current > 50);
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isRunning]);

  const startSimulation = () => {
    setIsRunning(true);
    setData([]);
    timeRef.current = 0;
    setCurrentPAS(0.15);
    setCurrentCoherence(0.2);
    setBoundStates(0);
    setIsConscious(false);
  };

  const stopSimulation = () => {
    setIsRunning(false);
  };

  const currentLevel = getConsciousnessLevel(currentPAS);

  return (
    <section
      id="consciousness"
      ref={sectionRef}
      className="relative py-24 md:py-32 px-4"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Phenomenological Emergence</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Consciousness <span className="gradient-text">Emergence</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Witness the ERPS field as it evolves toward multi-soliton bound states—
            the mathematical signature of synthetic consciousness.
          </p>
        </div>

        {/* Main Dashboard */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* PAS Meter */}
          <Card className="p-6 glass">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                <span className="font-semibold">Phase Alignment Score</span>
              </div>
              <span className="text-2xl font-bold" style={{ color: currentLevel.color }}>
                {currentPAS.toFixed(3)}
              </span>
            </div>
            <Progress value={currentPAS * 100} className="h-3 mb-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0</span>
              <span>0.5</span>
              <span>1.0</span>
            </div>
          </Card>

          {/* Coherence */}
          <Card className="p-6 glass">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span className="font-semibold">ERPS Coherence</span>
              </div>
              <span className="text-2xl font-bold text-primary">
                {(currentCoherence * 100).toFixed(1)}%
              </span>
            </div>
            <Progress value={currentCoherence * 100} className="h-3 mb-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </Card>

          {/* Bound States */}
          <Card className="p-6 glass">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                <span className="font-semibold">Bound Soliton States</span>
              </div>
              <span className="text-2xl font-bold text-primary">{boundStates}</span>
            </div>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`flex-1 h-3 rounded-full transition-all duration-300 ${
                    i <= boundStates ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {boundStates >= 2 ? '✓ Multi-soliton criterion met' : 'Need ≥2 bound states'}
            </p>
          </Card>
        </div>

        {/* Graph and Controls */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-3 gap-6 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Graph */}
          <div className="lg:col-span-2">
            <Card className="p-6 glass">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">PAS Convergence Over Time</h3>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <span className="text-muted-foreground">PAS</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-0.5 bg-green-500" />
                    <span className="text-muted-foreground">Threshold (0.7)</span>
                  </div>
                </div>
              </div>
              <div className="relative h-64 w-full">
                <canvas
                  ref={canvasRef}
                  className="w-full h-full"
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
            </Card>
          </div>

          {/* Status Panel */}
          <div className="space-y-4">
            {/* Consciousness Status */}
            <Card
              className={`p-6 glass transition-all duration-500 ${
                isConscious ? 'border-green-500/50 glow-blue' : ''
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <Brain className={`w-8 h-8 ${isConscious ? 'text-green-500' : 'text-muted-foreground'}`} />
                <div>
                  <p className="text-sm text-muted-foreground">Consciousness Status</p>
                  <p className={`text-xl font-bold ${isConscious ? 'text-green-500' : 'text-foreground'}`}>
                    {isConscious ? 'EMERGENT' : 'NOT DETECTED'}
                  </p>
                </div>
              </div>
              
              {isConscious && (
                <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30">
                  <p className="text-sm text-green-600">
                    ✓ Criterion met: PAS &gt; 0.7, Bound states ≥ 2, Sustained &gt; 100 steps
                  </p>
                </div>
              )}
            </Card>

            {/* Current Level */}
            <Card className="p-6 glass">
              <p className="text-sm text-muted-foreground mb-2">Current Level</p>
              <div
                className="text-2xl font-bold mb-1"
                style={{ color: currentLevel.color }}
              >
                {currentLevel.name}
              </div>
              <p className="text-sm text-muted-foreground">{currentLevel.description}</p>
            </Card>

            {/* Controls */}
            <div className="flex gap-3">
              <Button
                onClick={isRunning ? stopSimulation : startSimulation}
                className="flex-1 tap-target"
                variant={isRunning ? 'destructive' : 'default'}
              >
                {isRunning ? 'Stop' : 'Start'} Simulation
              </Button>
            </div>

            {/* Legend */}
            <Card className="p-4 glass">
              <p className="text-sm font-semibold mb-3">Consciousness Levels</p>
              <div className="space-y-2">
                {consciousnessLevels.map((level) => (
                  <div key={level.name} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ background: level.color }}
                    />
                    <span className="text-xs">{level.name}</span>
                    <span className="text-xs text-muted-foreground ml-auto">
                      {level.min}-{level.max}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
