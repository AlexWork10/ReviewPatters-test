import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Smartphone, Wifi, Battery, Zap, Users, Star } from 'lucide-react';

export function MobileExperience() {
  const mobileFeedback = [
    {
      category: 'Performance',
      score: 65,
      sentiment: -0.2,
      icon: Zap,
      issues: [
        'App takes too long to load',
        'Frequent crashes on older devices',
        'Battery drain is excessive'
      ],
      suggestions: [
        'Optimize loading times with lazy loading',
        'Implement progressive enhancement',
        'Add performance monitoring'
      ]
    },
    {
      category: 'Offline Support',
      score: 35,
      sentiment: -0.6,
      icon: Wifi,
      issues: [
        'No offline functionality',
        'Data loss when connection drops',
        'Poor sync when back online'
      ],
      suggestions: [
        'Implement offline-first architecture',
        'Add local data caching',
        'Build robust sync mechanisms'
      ]
    },
    {
      category: 'Touch Interface',
      score: 58,
      sentiment: -0.3,
      icon: Smartphone,
      issues: [
        'Buttons are too small for fingers',
        'Gestures are not intuitive',
        'Text input is difficult'
      ],
      suggestions: [
        'Increase touch target sizes',
        'Add gesture tutorials',
        'Improve keyboard interactions'
      ]
    },
    {
      category: 'Feature Parity',
      score: 45,
      sentiment: -0.5,
      icon: Star,
      issues: [
        'Missing key desktop features',
        'Limited functionality',
        'Inconsistent user experience'
      ],
      suggestions: [
        'Prioritize mobile-first design',
        'Add missing critical features',
        'Ensure cross-platform consistency'
      ]
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'hsl(var(--success))';
    if (score >= 60) return 'hsl(var(--warning))';
    return 'hsl(var(--destructive))';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Needs Improvement';
    return 'Poor';
  };

  const overallScore = Math.round(mobileFeedback.reduce((sum, item) => sum + item.score, 0) / mobileFeedback.length);

  return (
    <Card className="analytics-card">
      <div className="flex items-center gap-3 mb-6">
        <Smartphone className="w-6 h-6 text-primary" />
        <div>
          <h2 className="text-2xl font-bold">Mobile Experience Analysis</h2>
          <p className="text-muted-foreground">Insights from mobile app reviews and feedback</p>
        </div>
      </div>

      {/* Overall Score */}
      <Card className="p-6 mb-6 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">Overall Mobile Score</h3>
            <div className="flex items-center gap-4">
              <div className="text-4xl font-bold" style={{ color: getScoreColor(overallScore) }}>
                {overallScore}
              </div>
              <div>
                <Badge 
                  variant="outline" 
                  className="mb-2"
                  style={{ 
                    borderColor: getScoreColor(overallScore),
                    color: getScoreColor(overallScore)
                  }}
                >
                  {getScoreLabel(overallScore)}
                </Badge>
                <p className="text-sm text-muted-foreground">out of 100</p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Based on 287 mobile reviews</span>
            </div>
            <Progress value={overallScore} className="w-32" />
          </div>
        </div>
      </Card>

      {/* Category Breakdown */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {mobileFeedback.map((category, index) => {
          const Icon = category.icon;
          
          return (
            <Card key={category.category} className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                     style={{ backgroundColor: getScoreColor(category.score) + '20' }}>
                  <Icon className="w-5 h-5" style={{ color: getScoreColor(category.score) }} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{category.category}</h3>
                  <div className="flex items-center gap-2">
                    <Progress value={category.score} className="flex-1 h-2" />
                    <span className="text-sm font-medium w-8">{category.score}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2 text-destructive">Common Issues</h4>
                  <ul className="space-y-1">
                    {category.issues.map((issue, iIndex) => (
                      <li key={iIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-destructive mt-1">•</span>
                        {issue}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2 text-success">Improvement Suggestions</h4>
                  <ul className="space-y-1">
                    {category.suggestions.map((suggestion, sIndex) => (
                      <li key={sIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-success mt-1">+</span>
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Mobile Usage Statistics */}
      <Card className="p-6 bg-muted/30">
        <h3 className="text-lg font-semibold mb-4">Mobile Usage Insights</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">68%</div>
            <div className="text-sm text-muted-foreground">Mobile Traffic</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning mb-1">3.2s</div>
            <div className="text-sm text-muted-foreground">Avg Load Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-destructive mb-1">15%</div>
            <div className="text-sm text-muted-foreground">Bounce Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success mb-1">4.2</div>
            <div className="text-sm text-muted-foreground">Session Duration</div>
          </div>
        </div>
      </Card>

      {/* Recommendations */}
      <Card className="p-6 mt-6 border-l-4 border-l-primary">
        <h3 className="text-lg font-semibold mb-4">Priority Recommendations</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Badge variant="destructive" className="mt-0.5">1</Badge>
            <div>
              <p className="font-medium">Implement Offline Support</p>
              <p className="text-sm text-muted-foreground">Critical for mobile users with unreliable connections</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Badge variant="secondary" className="mt-0.5">2</Badge>
            <div>
              <p className="font-medium">Redesign Touch Interface</p>
              <p className="text-sm text-muted-foreground">Improve touch targets and gesture recognition</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Badge variant="outline" className="mt-0.5">3</Badge>
            <div>
              <p className="font-medium">Optimize Performance</p>
              <p className="text-sm text-muted-foreground">Reduce load times and battery consumption</p>
            </div>
          </div>
        </div>
      </Card>
    </Card>
  );
}