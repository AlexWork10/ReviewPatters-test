import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { Plus, X, Target, Database, Zap } from 'lucide-react';

interface SetupPanelProps {
  onStartAnalysis: (competitors: string[], sources: string[]) => void;
}

const availableSources = [
  { id: 'g2', name: 'G2', description: 'B2B software reviews', icon: '📊' },
  { id: 'trustpilot', name: 'Trustpilot', description: 'Consumer reviews', icon: '⭐' },
  { id: 'producthunt', name: 'Product Hunt', description: 'Product launches & feedback', icon: '🚀' },
  { id: 'capterra', name: 'Capterra', description: 'Software discovery', icon: '💼' },
  { id: 'appstore', name: 'App Store', description: 'Mobile app reviews', icon: '📱' }
];

export function SetupPanel({ onStartAnalysis }: SetupPanelProps) {
  const [competitors, setCompetitors] = useState<string[]>(['']);
  const [selectedSources, setSelectedSources] = useState<string[]>(['g2', 'trustpilot']);

  const addCompetitor = () => {
    if (competitors.length < 5) {
      setCompetitors([...competitors, '']);
    }
  };

  const removeCompetitor = (index: number) => {
    if (competitors.length > 1) {
      setCompetitors(competitors.filter((_, i) => i !== index));
    }
  };

  const updateCompetitor = (index: number, value: string) => {
    const updated = [...competitors];
    updated[index] = value;
    setCompetitors(updated);
  };

  const toggleSource = (sourceId: string) => {
    setSelectedSources(prev => 
      prev.includes(sourceId)
        ? prev.filter(id => id !== sourceId)
        : [...prev, sourceId]
    );
  };

  const handleSubmit = () => {
    const validCompetitors = competitors.filter(c => c.trim().length > 0);
    if (validCompetitors.length >= 2 && selectedSources.length > 0) {
      onStartAnalysis(validCompetitors, selectedSources);
    }
  };

  const isValid = competitors.filter(c => c.trim().length > 0).length >= 2 && selectedSources.length > 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-light text-primary rounded-full text-sm font-medium">
          <Zap className="w-4 h-4" />
          AI-Powered Competitor Analysis
        </div>
        <h1 className="text-4xl font-bold tracking-tight">
          Analyze Competitor Reviews
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover insights from competitor reviews across multiple platforms. 
          Identify pain points, opportunities, and strategic advantages.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Competitors Section */}
        <Card className="analytics-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Competitors</h3>
              <p className="text-sm text-muted-foreground">Add 2-5 competitors to analyze</p>
            </div>
          </div>

          <div className="space-y-4">
            {competitors.map((competitor, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder={`Competitor ${index + 1} (e.g., Slack, Notion)`}
                  value={competitor}
                  onChange={(e) => updateCompetitor(index, e.target.value)}
                  className="flex-1"
                />
                {competitors.length > 1 && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeCompetitor(index)}
                    className="shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
            
            {competitors.length < 5 && (
              <Button
                variant="outline"
                onClick={addCompetitor}
                className="w-full border-dashed"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Competitor
              </Button>
            )}
          </div>
        </Card>

        {/* Sources Section */}
        <Card className="analytics-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-success-light rounded-lg flex items-center justify-center">
              <Database className="w-5 h-5 text-success" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Review Sources</h3>
              <p className="text-sm text-muted-foreground">Select platforms to analyze</p>
            </div>
          </div>

          <div className="space-y-3">
            {availableSources.map((source) => (
              <div
                key={source.id}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
              >
                <Checkbox
                  id={source.id}
                  checked={selectedSources.includes(source.id)}
                  onCheckedChange={() => toggleSource(source.id)}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{source.icon}</span>
                    <label
                      htmlFor={source.id}
                      className="font-medium cursor-pointer"
                    >
                      {source.name}
                    </label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {source.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Analysis Summary */}
      <Card className="analytics-card">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold mb-2">Analysis Summary</h3>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span>{competitors.filter(c => c.trim()).length} competitors selected</span>
              <span>{selectedSources.length} sources selected</span>
              <span>~{competitors.filter(c => c.trim()).length * selectedSources.length * 150} reviews to analyze</span>
            </div>
          </div>
          <Button
            size="lg"
            disabled={!isValid}
            onClick={handleSubmit}
            className="gradient-primary px-8"
          >
            <Zap className="w-4 h-4 mr-2" />
            Start Analysis
          </Button>
        </div>
      </Card>
    </div>
  );
}