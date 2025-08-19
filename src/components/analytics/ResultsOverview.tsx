import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, MessageSquare, Star, Target } from 'lucide-react';

interface ResultsOverviewProps {
  competitors: string[];
  sources: string[];
}

export function ResultsOverview({ competitors, sources }: ResultsOverviewProps) {
  // Mock data for visualization
  const sourceCoverageData = sources.map((source, index) => ({
    source: source.charAt(0).toUpperCase() + source.slice(1),
    reviews: Math.floor(Math.random() * 500) + 200,
    competitors: Math.min(competitors.length, Math.floor(Math.random() * competitors.length) + 1)
  }));

  const competitorData = competitors.map((competitor, index) => ({
    name: competitor,
    reviews: Math.floor(Math.random() * 400) + 150,
    avgRating: (Math.random() * 2 + 3).toFixed(1),
    sentiment: (Math.random() * 0.6 - 0.3).toFixed(2)
  }));

  const sentimentDistribution = [
    { name: 'Positive', value: 45, color: 'hsl(var(--sentiment-positive))' },
    { name: 'Neutral', value: 35, color: 'hsl(var(--sentiment-neutral))' },
    { name: 'Negative', value: 20, color: 'hsl(var(--sentiment-negative))' }
  ];

  const totalReviews = sourceCoverageData.reduce((sum, item) => sum + item.reviews, 0);
  const avgSentiment = competitorData.reduce((sum, item) => sum + parseFloat(item.sentiment), 0) / competitorData.length;

  const keyInsights = [
    "Mobile experience consistently mentioned as pain point across all competitors",
    "Pricing transparency is a major concern in 68% of negative reviews",
    "Documentation quality varies significantly between platforms",
    "Customer support responsiveness is a key differentiator",
    "Integration capabilities are increasingly important for user satisfaction"
  ];

  return (
    <div className="space-y-8">
      {/* Header with Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="analytics-card p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{totalReviews.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Total Reviews</p>
            </div>
          </div>
        </Card>

        <Card className="analytics-card p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-success-light rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold">{competitors.length}</p>
              <p className="text-sm text-muted-foreground">Competitors</p>
            </div>
          </div>
        </Card>

        <Card className="analytics-card p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-warning-light rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold">{avgSentiment.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">Avg Sentiment</p>
            </div>
          </div>
        </Card>

        <Card className="analytics-card p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-chart-2/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-chart-2" />
            </div>
            <div>
              <p className="text-2xl font-bold">{sources.length}</p>
              <p className="text-sm text-muted-foreground">Sources</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Source Coverage Chart */}
        <Card className="analytics-card">
          <h3 className="text-lg font-semibold mb-6">Review Coverage by Source</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sourceCoverageData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="source" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="reviews" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Sentiment Distribution */}
        <Card className="analytics-card">
          <h3 className="text-lg font-semibold mb-6">Overall Sentiment Distribution</h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sentimentDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {sentimentDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            {sentimentDistribution.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm">{item.name} ({item.value}%)</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Competitor Overview */}
        <Card className="analytics-card">
          <h3 className="text-lg font-semibold mb-6">Competitor Performance</h3>
          <div className="space-y-4">
            {competitorData.map((competitor, index) => (
              <div key={competitor.name} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold" 
                       style={{ backgroundColor: `hsl(var(--chart-${(index % 5) + 1}))`, color: 'white' }}>
                    {competitor.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{competitor.name}</p>
                    <p className="text-sm text-muted-foreground">{competitor.reviews} reviews</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={parseFloat(competitor.sentiment) > 0 ? "default" : "destructive"}>
                    {competitor.sentiment}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-warning fill-current" />
                    <span className="text-sm font-medium">{competitor.avgRating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Key Insights */}
        <Card className="analytics-card">
          <h3 className="text-lg font-semibold mb-6">Key Insights</h3>
          <div className="space-y-4">
            {keyInsights.map((insight, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary-light rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-primary text-xs font-bold">{index + 1}</span>
                </div>
                <p className="text-sm leading-relaxed">{insight}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}