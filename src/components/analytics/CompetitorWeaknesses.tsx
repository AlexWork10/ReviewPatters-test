import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingDown, AlertCircle, Quote } from 'lucide-react';

interface CompetitorWeaknessesProps {
  competitors: string[];
}

export function CompetitorWeaknesses({ competitors }: CompetitorWeaknessesProps) {
  const competitorWeaknesses = competitors.map((competitor, index) => ({
    name: competitor,
    weaknesses: [
      {
        category: 'Performance Issues',
        sentiment: -(Math.random() * 0.4 + 0.3),
        mentions: Math.floor(Math.random() * 50) + 20,
        example: `"${competitor} becomes very slow with large datasets and often crashes"`
      },
      {
        category: 'Poor UX Design',
        sentiment: -(Math.random() * 0.5 + 0.2),
        mentions: Math.floor(Math.random() * 40) + 15,
        example: `"The interface is confusing and not intuitive to use"`
      },
      {
        category: 'Limited Features',
        sentiment: -(Math.random() * 0.3 + 0.2),
        mentions: Math.floor(Math.random() * 35) + 10,
        example: `"Missing basic features that competitors have"`
      }
    ],
    overallSentiment: -(Math.random() * 0.4 + 0.1),
    color: `hsl(var(--chart-${(index % 5) + 1}))`
  }));

  const getSentimentColor = (sentiment: number) => {
    const intensity = Math.abs(sentiment);
    if (intensity > 0.4) return 'hsl(var(--destructive))';
    if (intensity > 0.2) return 'hsl(var(--warning))';
    return 'hsl(var(--muted-foreground))';
  };

  const getSentimentLabel = (sentiment: number) => {
    const intensity = Math.abs(sentiment);
    if (intensity > 0.4) return 'Critical';
    if (intensity > 0.2) return 'Moderate';
    return 'Minor';
  };

  return (
    <Card className="analytics-card">
      <div className="flex items-center gap-3 mb-6">
        <TrendingDown className="w-6 h-6 text-destructive" />
        <h2 className="text-2xl font-bold">Competitor Weaknesses</h2>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {competitorWeaknesses.map((competitor, index) => (
          <Card key={competitor.name} className="p-6 border-t-4" 
                style={{ borderTopColor: competitor.color }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                     style={{ backgroundColor: competitor.color }}>
                  {competitor.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold">{competitor.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {competitor.weaknesses.reduce((sum, w) => sum + w.mentions, 0)} mentions
                  </p>
                </div>
              </div>
              <Badge 
                variant="destructive"
                className="metric-negative"
              >
                {getSentimentLabel(competitor.overallSentiment)}
              </Badge>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span>Overall Sentiment</span>
                <span className="font-mono font-medium" 
                      style={{ color: getSentimentColor(competitor.overallSentiment) }}>
                  {competitor.overallSentiment.toFixed(2)}
                </span>
              </div>

              <div className="space-y-3">
                {competitor.weaknesses.map((weakness, wIndex) => (
                  <div key={wIndex} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{weakness.category}</span>
                      <span className="text-xs text-muted-foreground">
                        {weakness.mentions} mentions
                      </span>
                    </div>
                    
                    <Progress 
                      value={Math.abs(weakness.sentiment) * 100}
                      className="h-2"
                    />
                    
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Quote className="w-3 h-3 text-muted-foreground mt-0.5 shrink-0" />
                        <p className="text-xs italic">{weakness.example}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Comparative Analysis */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Weakness Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3">Competitor</th>
                <th className="text-left p-3">Primary Weakness</th>
                <th className="text-left p-3">Severity</th>
                <th className="text-left p-3">Mentions</th>
                <th className="text-left p-3">Opportunity</th>
              </tr>
            </thead>
            <tbody>
              {competitorWeaknesses.map((competitor, index) => {
                const primaryWeakness = competitor.weaknesses.reduce((worst, current) => 
                  Math.abs(current.sentiment) > Math.abs(worst.sentiment) ? current : worst
                );
                
                return (
                  <tr key={competitor.name} className="border-b data-table-row">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full text-white text-xs flex items-center justify-center"
                             style={{ backgroundColor: competitor.color }}>
                          {competitor.name.charAt(0)}
                        </div>
                        <span className="font-medium">{competitor.name}</span>
                      </div>
                    </td>
                    <td className="p-3 text-sm">{primaryWeakness.category}</td>
                    <td className="p-3">
                      <Badge variant="destructive" className="metric-negative">
                        {getSentimentLabel(primaryWeakness.sentiment)}
                      </Badge>
                    </td>
                    <td className="p-3 text-sm">{primaryWeakness.mentions}</td>
                    <td className="p-3 text-sm text-muted-foreground">
                      Address {primaryWeakness.category.toLowerCase()} concerns
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
}