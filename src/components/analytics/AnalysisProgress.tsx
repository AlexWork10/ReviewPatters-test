import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, AlertTriangle, Search, FileText, Filter, BarChart3, Heart, Lightbulb } from 'lucide-react';

interface AnalysisProgressProps {
  competitors: string[];
  sources: string[];
}

const analysisSteps = [
  { id: 'search', name: 'Searching', icon: Search, description: 'Finding competitor reviews' },
  { id: 'reading', name: 'Reading', icon: FileText, description: 'Extracting review content' },
  { id: 'cleaning', name: 'Cleaning', icon: Filter, description: 'Processing and filtering data' },
  { id: 'grouping', name: 'Grouping', icon: BarChart3, description: 'Categorizing by themes' },
  { id: 'sentiment', name: 'Sentiment', icon: Heart, description: 'Analyzing sentiment scores' },
  { id: 'insights', name: 'Insights', icon: Lightbulb, description: 'Generating strategic insights' }
];

export function AnalysisProgress({ competitors, sources }: AnalysisProgressProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [competitorData, setCompetitorData] = useState<Record<string, Record<string, number>>>({});

  useEffect(() => {
    // Initialize competitor data
    const initialData: Record<string, Record<string, number>> = {};
    competitors.forEach(comp => {
      initialData[comp] = {};
      sources.forEach(source => {
        initialData[comp][source] = 0;
      });
    });
    setCompetitorData(initialData);

    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = Math.min(prev + Math.random() * 15, 100);
        
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        
        // Update current step based on progress
        const stepIndex = Math.floor((newProgress / 100) * analysisSteps.length);
        setCurrentStep(stepIndex);
        
        // Simulate review collection
        if (newProgress > 20) {
          setCompetitorData(prevData => {
            const newData = { ...prevData };
            competitors.forEach(comp => {
              sources.forEach(source => {
                if (Math.random() > 0.7) {
                  newData[comp][source] = Math.min(
                    newData[comp][source] + Math.floor(Math.random() * 50) + 10,
                    Math.floor(Math.random() * 200) + 100
                  );
                }
              });
            });
            return newData;
          });
        }
        
        return newProgress;
      });
    }, 800);

    return () => clearInterval(interval);
  }, [competitors, sources]);

  const getStepStatus = (index: number) => {
    if (index < currentStep) return 'completed';
    if (index === currentStep) return 'processing';
    return 'pending';
  };

  const getSourceIcon = (source: string) => {
    const icons: Record<string, string> = {
      g2: '📊',
      trustpilot: '⭐',
      producthunt: '🚀',
      capterra: '💼',
      appstore: '📱'
    };
    return icons[source] || '📋';
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Analyzing Competitor Reviews</h1>
        <p className="text-muted-foreground">
          Processing {competitors.length} competitors across {sources.length} review platforms
        </p>
        <div className="flex justify-center">
          <Progress value={progress} className="w-80 h-3" />
        </div>
        <p className="text-sm font-medium">{Math.round(progress)}% Complete</p>
      </div>

      {/* Analysis Steps */}
      <Card className="analytics-card">
        <h3 className="text-lg font-semibold mb-6">Analysis Progress</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {analysisSteps.map((step, index) => {
            const status = getStepStatus(index);
            const Icon = step.icon;
            
            return (
              <div
                key={step.id}
                className={`p-4 rounded-lg border-2 transition-all ${
                  status === 'completed'
                    ? 'border-success bg-success-light'
                    : status === 'processing'
                    ? 'border-primary bg-primary-light animate-pulse'
                    : 'border-border bg-muted/30'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  {status === 'completed' ? (
                    <CheckCircle className="w-5 h-5 text-success" />
                  ) : status === 'processing' ? (
                    <Clock className="w-5 h-5 text-primary animate-spin" />
                  ) : (
                    <Icon className="w-5 h-5 text-muted-foreground" />
                  )}
                  <span className="font-medium">{step.name}</span>
                  {status === 'processing' && (
                    <Badge variant="outline" className="ml-auto">
                      Processing
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Competitor Progress */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {competitors.map((competitor, index) => {
          const totalReviews = Object.values(competitorData[competitor] || {}).reduce((sum, count) => sum + count, 0);
          const hasWarning = totalReviews < 50;
          
          return (
            <Card key={competitor} className="analytics-card">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold">{competitor}</h4>
                {hasWarning && totalReviews > 0 && (
                  <AlertTriangle className="w-5 h-5 text-warning" />
                )}
              </div>
              
              <div className="space-y-3">
                {sources.map(source => {
                  const count = competitorData[competitor]?.[source] || 0;
                  return (
                    <div key={source} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{getSourceIcon(source)}</span>
                        <span className="capitalize text-sm">{source}</span>
                      </div>
                      <Badge variant={count > 0 ? "default" : "secondary"}>
                        {count} reviews
                      </Badge>
                    </div>
                  );
                })}
                
                <div className="pt-2 border-t">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total</span>
                    <span className="font-bold text-primary">{totalReviews} reviews</span>
                  </div>
                </div>
                
                {hasWarning && totalReviews > 0 && (
                  <div className="flex items-center gap-2 p-2 bg-warning-light rounded-lg">
                    <AlertTriangle className="w-4 h-4 text-warning" />
                    <span className="text-sm text-warning-foreground">Limited data</span>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}