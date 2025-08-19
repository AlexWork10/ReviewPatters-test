import React, { useState } from 'react';
import { SetupPanel } from './SetupPanel';
import { AnalysisProgress } from './AnalysisProgress';
import { ResultsOverview } from './ResultsOverview';
import { SentimentAnalysis } from './SentimentAnalysis';
import { CompetitorWeaknesses } from './CompetitorWeaknesses';
import { InnovationOpportunities } from './InnovationOpportunities';
import { MobileExperience } from './MobileExperience';
import { WorstReviewsTable } from './WorstReviewsTable';
import { PainPointsHeatmap } from './PainPointsHeatmap';

type AnalysisStage = 'setup' | 'processing' | 'results';

export function AnalyticsDashboard() {
  const [currentStage, setCurrentStage] = useState<AnalysisStage>('setup');
  const [competitors, setCompetitors] = useState<string[]>([]);
  const [sources, setSources] = useState<string[]>([]);

  const handleStartAnalysis = (competitorsList: string[], sourcesList: string[]) => {
    setCompetitors(competitorsList);
    setSources(sourcesList);
    setCurrentStage('processing');
    
    // Simulate analysis completion
    setTimeout(() => {
      setCurrentStage('results');
    }, 5000);
  };

  const handleReset = () => {
    setCurrentStage('setup');
    setCompetitors([]);
    setSources([]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">RP</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold">Review Patterns Analytics</h1>
                <p className="text-sm text-muted-foreground">Competitor Review Analysis Platform</p>
              </div>
            </div>
            {currentStage !== 'setup' && (
              <button
                onClick={handleReset}
                className="px-4 py-2 text-sm bg-secondary hover:bg-secondary-hover rounded-lg transition-colors"
              >
                New Analysis
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {currentStage === 'setup' && (
          <SetupPanel onStartAnalysis={handleStartAnalysis} />
        )}

        {currentStage === 'processing' && (
          <AnalysisProgress competitors={competitors} sources={sources} />
        )}

        {currentStage === 'results' && (
          <div className="space-y-8">
            <ResultsOverview competitors={competitors} sources={sources} />
            <SentimentAnalysis />
            <PainPointsHeatmap />
            <CompetitorWeaknesses competitors={competitors} />
            <InnovationOpportunities />
            <MobileExperience />
            <WorstReviewsTable />
          </div>
        )}
      </main>
    </div>
  );
}