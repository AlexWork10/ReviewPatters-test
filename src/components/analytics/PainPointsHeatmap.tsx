import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, DollarSign, HeadphonesIcon, BookOpen, Smartphone } from 'lucide-react';

export function PainPointsHeatmap() {
  const painPoints = [
    {
      theme: 'Pricing',
      sentiment: -0.6,
      coverage: 85,
      severity: 'high',
      icon: DollarSign,
      quote: "The pricing structure is confusing and hidden fees make it expensive",
      mentions: 234
    },
    {
      theme: 'Customer Support',
      sentiment: -0.4,
      coverage: 72,
      severity: 'high',
      icon: HeadphonesIcon,
      quote: "Support response times are too slow, sometimes taking days",
      mentions: 189
    },
    {
      theme: 'Documentation',
      sentiment: -0.3,
      coverage: 58,
      severity: 'medium',
      icon: BookOpen,
      quote: "Documentation is outdated and examples don't work",
      mentions: 145
    },
    {
      theme: 'Mobile Experience',
      sentiment: -0.5,
      coverage: 45,
      severity: 'medium',
      icon: Smartphone,
      quote: "Mobile app is buggy and missing key features",
      mentions: 112
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'hsl(var(--destructive))';
      case 'medium': return 'hsl(var(--warning))';
      default: return 'hsl(var(--muted-foreground))';
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high': return { variant: 'destructive' as const, label: 'High Impact' };
      case 'medium': return { variant: 'secondary' as const, label: 'Medium Impact' };
      default: return { variant: 'outline' as const, label: 'Low Impact' };
    }
  };

  return (
    <Card className="analytics-card">
      <div className="flex items-center gap-3 mb-6">
        <AlertTriangle className="w-6 h-6 text-destructive" />
        <h2 className="text-2xl font-bold">Common Pain Points</h2>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {painPoints.map((point, index) => {
          const Icon = point.icon;
          const badge = getSeverityBadge(point.severity);
          
          return (
            <Card key={point.theme} className="p-6 border-l-4" 
                  style={{ borderLeftColor: getSeverityColor(point.severity) }}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                       style={{ backgroundColor: getSeverityColor(point.severity) + '20' }}>
                    <Icon className="w-5 h-5" style={{ color: getSeverityColor(point.severity) }} />
                  </div>
                  <div>
                    <h3 className="font-semibold">{point.theme}</h3>
                    <p className="text-sm text-muted-foreground">{point.mentions} mentions</p>
                  </div>
                </div>
                <Badge variant={badge.variant}>{badge.label}</Badge>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Coverage</span>
                    <span className="font-medium">{point.coverage}%</span>
                  </div>
                  <Progress value={point.coverage} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Sentiment</span>
                    <span className="font-mono font-medium text-destructive">
                      {point.sentiment.toFixed(2)}
                    </span>
                  </div>
                  <Progress 
                    value={Math.abs(point.sentiment) * 100} 
                    className="h-2 bg-destructive-light"
                  />
                </div>

                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm italic">"{point.quote}"</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Heatmap Visualization */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Pain Points Severity Matrix</h3>
        <div className="grid grid-cols-4 gap-2">
          {painPoints.map((point, index) => {
            const intensity = Math.abs(point.sentiment) * point.coverage / 100;
            const opacity = Math.min(intensity * 2, 1);
            
            return (
              <div
                key={point.theme}
                className="p-4 rounded-lg text-center relative"
                style={{ 
                  backgroundColor: getSeverityColor(point.severity),
                  opacity: opacity
                }}
              >
                <div className="text-white">
                  <p className="text-xs font-medium">{point.theme}</p>
                  <p className="text-lg font-bold">{(intensity * 100).toFixed(0)}</p>
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Heat intensity represents severity × coverage impact
        </p>
      </div>
    </Card>
  );
}