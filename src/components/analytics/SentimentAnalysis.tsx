import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Heart, Users, Zap, BookOpen, Shield } from 'lucide-react';

export function SentimentAnalysis() {
  const sentimentByTheme = [
    { theme: 'UX', sentiment: 0.3, icon: Heart, reviews: 245 },
    { theme: 'Performance', sentiment: -0.1, icon: Zap, reviews: 189 },
    { theme: 'Integrations', sentiment: 0.2, icon: Users, reviews: 156 },
    { theme: 'Documentation', sentiment: -0.4, icon: BookOpen, reviews: 134 },
    { theme: 'Reliability', sentiment: 0.1, icon: Shield, reviews: 203 }
  ];

  const radarData = sentimentByTheme.map(item => ({
    theme: item.theme,
    sentiment: Math.max(0, (item.sentiment + 1) * 50), // Normalize to 0-100 for radar
    reviews: item.reviews
  }));

  const getSentimentColor = (sentiment: number) => {
    if (sentiment > 0.1) return 'hsl(var(--sentiment-positive))';
    if (sentiment < -0.1) return 'hsl(var(--sentiment-negative))';
    return 'hsl(var(--sentiment-neutral))';
  };

  const getSentimentBadge = (sentiment: number) => {
    if (sentiment > 0.1) return { variant: 'default' as const, label: 'Positive', class: 'metric-positive' };
    if (sentiment < -0.1) return { variant: 'destructive' as const, label: 'Negative', class: 'metric-negative' };
    return { variant: 'secondary' as const, label: 'Neutral', class: 'metric-neutral' };
  };

  return (
    <Card className="analytics-card">
      <h2 className="text-2xl font-bold mb-6">Sentiment Analysis by Theme</h2>
      
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Radar Chart */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Sentiment Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid gridType="polygon" />
              <PolarAngleAxis dataKey="theme" tick={{ fontSize: 12 }} />
              <PolarRadiusAxis 
                angle={0} 
                domain={[0, 100]} 
                tick={{ fontSize: 10 }}
                tickCount={4}
              />
              <Radar
                dataKey="sentiment"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Theme Breakdown */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Theme Details</h3>
          <div className="space-y-4">
            {sentimentByTheme.map((item, index) => {
              const Icon = item.icon;
              const badge = getSentimentBadge(item.sentiment);
              
              return (
                <div 
                  key={item.theme}
                  className="flex items-center justify-between p-4 rounded-lg border hover:bg-secondary/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                         style={{ backgroundColor: getSentimentColor(item.sentiment) + '20' }}>
                      <Icon className="w-5 h-5" style={{ color: getSentimentColor(item.sentiment) }} />
                    </div>
                    <div>
                      <p className="font-medium">{item.theme}</p>
                      <p className="text-sm text-muted-foreground">{item.reviews} reviews</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-mono font-medium">
                      {item.sentiment > 0 ? '+' : ''}{item.sentiment.toFixed(2)}
                    </span>
                    <Badge className={badge.class} variant={badge.variant}>
                      {badge.label}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detailed Bar Chart */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Sentiment Distribution by Theme</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={sentimentByTheme}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="theme" />
            <YAxis domain={[-0.5, 0.5]} tickFormatter={(value) => value.toFixed(1)} />
            <Tooltip 
              formatter={(value: number) => [value.toFixed(2), 'Sentiment Score']}
            />
            <Bar 
              dataKey="sentiment" 
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}