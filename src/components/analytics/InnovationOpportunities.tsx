import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, TrendingUp, Users, Zap, Shield, Globe } from 'lucide-react';

export function InnovationOpportunities() {
  const opportunities = [
    {
      title: 'AI-Powered Personalization',
      importance: 'high',
      icon: Zap,
      description: 'Implement intelligent content recommendations and automated workflows',
      userFeedback: [
        'Users want more personalized experiences',
        'Automation could save hours of manual work',
        'Smart recommendations would improve efficiency'
      ],
      ideas: [
        'Machine learning-based user behavior analysis',
        'Automated task prioritization and scheduling',
        'Contextual content suggestions',
        'Predictive analytics for user needs'
      ],
      impact: 95,
      effort: 'High'
    },
    {
      title: 'Enhanced Mobile Experience',
      importance: 'high',
      icon: Globe,
      description: 'Create a seamless mobile-first experience with offline capabilities',
      userFeedback: [
        'Mobile app lacks key desktop features',
        'Offline mode is essential for field work',
        'Touch interface needs improvement'
      ],
      ideas: [
        'Progressive Web App (PWA) implementation',
        'Offline data synchronization',
        'Touch-optimized interface redesign',
        'Mobile-specific feature shortcuts'
      ],
      impact: 88,
      effort: 'Medium'
    },
    {
      title: 'Advanced Security Features',
      importance: 'medium',
      icon: Shield,
      description: 'Implement enterprise-grade security with zero-trust architecture',
      userFeedback: [
        'Security concerns for sensitive data',
        'Need for better access controls',
        'Compliance requirements are complex'
      ],
      ideas: [
        'Multi-factor authentication enhancement',
        'Role-based permission granularity',
        'Data encryption at rest and in transit',
        'Audit trails and compliance reporting'
      ],
      impact: 82,
      effort: 'High'
    },
    {
      title: 'Collaborative Workspaces',
      importance: 'medium',
      icon: Users,
      description: 'Build real-time collaboration tools with shared workspaces',
      userFeedback: [
        'Team coordination is challenging',
        'Real-time editing would be valuable',
        'Need better communication tools'
      ],
      ideas: [
        'Real-time collaborative editing',
        'Integrated video conferencing',
        'Shared workspace templates',
        'Activity feeds and notifications'
      ],
      impact: 76,
      effort: 'Medium'
    }
  ];

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'high': return 'hsl(var(--destructive))';
      case 'medium': return 'hsl(var(--warning))';
      default: return 'hsl(var(--muted-foreground))';
    }
  };

  const getImportanceBadge = (importance: string) => {
    switch (importance) {
      case 'high': return { variant: 'destructive' as const, label: 'High Priority' };
      case 'medium': return { variant: 'secondary' as const, label: 'Medium Priority' };
      default: return { variant: 'outline' as const, label: 'Low Priority' };
    }
  };

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'High': return 'hsl(var(--destructive))';
      case 'Medium': return 'hsl(var(--warning))';
      default: return 'hsl(var(--success))';
    }
  };

  return (
    <Card className="analytics-card">
      <div className="flex items-center gap-3 mb-6">
        <Lightbulb className="w-6 h-6 text-warning" />
        <h2 className="text-2xl font-bold">Innovation Opportunities</h2>
      </div>

      <div className="space-y-8">
        {opportunities.map((opportunity, index) => {
          const Icon = opportunity.icon;
          const badge = getImportanceBadge(opportunity.importance);
          
          return (
            <Card key={opportunity.title} className="p-6 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center"
                       style={{ backgroundColor: getImportanceColor(opportunity.importance) + '20' }}>
                    <Icon className="w-6 h-6" style={{ color: getImportanceColor(opportunity.importance) }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{opportunity.title}</h3>
                    <p className="text-muted-foreground">{opportunity.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={badge.variant}>{badge.label}</Badge>
                  <Badge variant="outline" style={{ color: getEffortColor(opportunity.effort) }}>
                    {opportunity.effort} Effort
                  </Badge>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* User Feedback */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    What Users Say
                  </h4>
                  <div className="space-y-2">
                    {opportunity.userFeedback.map((feedback, fIndex) => (
                      <div key={fIndex} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 shrink-0" />
                        <p className="text-sm text-muted-foreground italic">"{feedback}"</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Innovation Ideas */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4" />
                    Innovation Ideas
                  </h4>
                  <div className="space-y-2">
                    {opportunity.ideas.map((idea, iIndex) => (
                      <div key={iIndex} className="flex items-start gap-2">
                        <span className="text-warning text-sm">💡</span>
                        <p className="text-sm">{idea}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Impact Metrics */}
              <div className="mt-6 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-success" />
                      <span className="text-sm">Potential Impact</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-success transition-all duration-700"
                          style={{ width: `${opportunity.impact}%` }}
                        />
                      </div>
                      <span className="ml-2 text-sm font-medium">{opportunity.impact}%</span>
                    </div>
                  </div>
                  
                  <Badge variant="outline" className="bg-primary-light">
                    ROI Potential: High
                  </Badge>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Strategic Summary */}
      <Card className="p-6 bg-primary-light mt-8">
        <h3 className="text-lg font-semibold mb-4">Strategic Recommendations</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-2">Quick Wins (3-6 months)</h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Enhanced mobile responsiveness</li>
              <li>• Basic AI recommendations</li>
              <li>• Improved security protocols</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Long-term Goals (6-18 months)</h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Full AI-powered personalization</li>
              <li>• Real-time collaboration suite</li>
              <li>• Enterprise security framework</li>
            </ul>
          </div>
        </div>
      </Card>
    </Card>
  );
}