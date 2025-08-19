import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download, Search, Filter, ExternalLink, Star } from 'lucide-react';

export function WorstReviewsTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('all');
  const [selectedCompetitor, setSelectedCompetitor] = useState('all');

  const worstReviews = [
    {
      id: 1,
      competitor: 'Competitor A',
      theme: 'Pricing',
      summary: 'Hidden fees and unclear pricing structure make this tool very expensive',
      rating: 1,
      source: 'G2',
      sentiment: -0.8,
      date: '2024-01-15',
      url: 'https://g2.com/review-123'
    },
    {
      id: 2,
      competitor: 'Competitor B',
      theme: 'Customer Support',
      summary: 'Support team takes weeks to respond and never resolves issues properly',
      rating: 2,
      source: 'Trustpilot',
      sentiment: -0.9,
      date: '2024-01-12',
      url: 'https://trustpilot.com/review-456'
    },
    {
      id: 3,
      competitor: 'Competitor A',
      theme: 'Performance',
      summary: 'App crashes constantly and loses all work. Completely unreliable',
      rating: 1,
      source: 'App Store',
      sentiment: -0.95,
      date: '2024-01-10',
      url: 'https://appstore.com/review-789'
    },
    {
      id: 4,
      competitor: 'Competitor C',
      theme: 'Documentation',
      summary: 'Documentation is outdated and examples don\'t work. Waste of time',
      rating: 2,
      source: 'G2',
      sentiment: -0.7,
      date: '2024-01-08',
      url: 'https://g2.com/review-101'
    },
    {
      id: 5,
      competitor: 'Competitor B',
      theme: 'Mobile Experience',
      summary: 'Mobile app is basically unusable. Missing half the features',
      rating: 1,
      source: 'Product Hunt',
      sentiment: -0.85,
      date: '2024-01-05',
      url: 'https://producthunt.com/review-202'
    },
    {
      id: 6,
      competitor: 'Competitor A',
      theme: 'UX Design',
      summary: 'Interface is confusing and counterintuitive. Poor user experience',
      rating: 2,
      source: 'Capterra',
      sentiment: -0.6,
      date: '2024-01-03',
      url: 'https://capterra.com/review-303'
    }
  ];

  const themes = ['all', 'Pricing', 'Customer Support', 'Performance', 'Documentation', 'Mobile Experience', 'UX Design'];
  const competitors = ['all', 'Competitor A', 'Competitor B', 'Competitor C'];

  const filteredReviews = worstReviews.filter(review => {
    const matchesSearch = review.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.theme.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTheme = selectedTheme === 'all' || review.theme === selectedTheme;
    const matchesCompetitor = selectedCompetitor === 'all' || review.competitor === selectedCompetitor;
    
    return matchesSearch && matchesTheme && matchesCompetitor;
  });

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-3 h-3 ${i < rating ? 'text-warning fill-current' : 'text-muted'}`} 
      />
    ));
  };

  const getSentimentColor = (sentiment: number) => {
    const intensity = Math.abs(sentiment);
    if (intensity > 0.8) return 'hsl(var(--destructive))';
    if (intensity > 0.6) return 'hsl(var(--warning))';
    return 'hsl(var(--muted-foreground))';
  };

  const getSourceIcon = (source: string) => {
    const icons: Record<string, string> = {
      'G2': '📊',
      'Trustpilot': '⭐',
      'Product Hunt': '🚀',
      'Capterra': '💼',
      'App Store': '📱'
    };
    return icons[source] || '📋';
  };

  const exportToJSON = () => {
    const dataStr = JSON.stringify(filteredReviews, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'worst-reviews.json';
    link.click();
  };

  const exportToCSV = () => {
    const headers = ['Competitor', 'Theme', 'Summary', 'Rating', 'Source', 'Sentiment', 'Date'];
    const csvContent = [
      headers.join(','),
      ...filteredReviews.map(review => [
        review.competitor,
        review.theme,
        `"${review.summary.replace(/"/g, '""')}"`,
        review.rating,
        review.source,
        review.sentiment,
        review.date
      ].join(','))
    ].join('\n');
    
    const dataBlob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'worst-reviews.csv';
    link.click();
  };

  return (
    <Card className="analytics-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Worst Reviews Analysis</h2>
          <p className="text-muted-foreground">Critical feedback requiring immediate attention</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={exportToJSON}>
            <Download className="w-4 h-4 mr-2" />
            JSON
          </Button>
          <Button variant="outline" size="sm" onClick={exportToCSV}>
            <Download className="w-4 h-4 mr-2" />
            CSV
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1 min-w-64">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search reviews..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <Select value={selectedTheme} onValueChange={setSelectedTheme}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by theme" />
          </SelectTrigger>
          <SelectContent>
            {themes.map(theme => (
              <SelectItem key={theme} value={theme}>
                {theme === 'all' ? 'All Themes' : theme}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedCompetitor} onValueChange={setSelectedCompetitor}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by competitor" />
          </SelectTrigger>
          <SelectContent>
            {competitors.map(competitor => (
              <SelectItem key={competitor} value={competitor}>
                {competitor === 'all' ? 'All Competitors' : competitor}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">
          Showing {filteredReviews.length} of {worstReviews.length} reviews
        </p>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive" />
            <span>Critical ({filteredReviews.filter(r => Math.abs(r.sentiment) > 0.8).length})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-warning" />
            <span>Severe ({filteredReviews.filter(r => Math.abs(r.sentiment) > 0.6 && Math.abs(r.sentiment) <= 0.8).length})</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Competitor</TableHead>
              <TableHead>Theme</TableHead>
              <TableHead className="max-w-md">Summary</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Sentiment</TableHead>
              <TableHead>Date</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReviews.map((review) => (
              <TableRow key={review.id} className="data-table-row">
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-bold">
                      {review.competitor.slice(-1)}
                    </div>
                    <span className="font-medium">{review.competitor}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{review.theme}</Badge>
                </TableCell>
                <TableCell className="max-w-md">
                  <p className="text-sm line-clamp-2">{review.summary}</p>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {getRatingStars(review.rating)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{getSourceIcon(review.source)}</span>
                    <span className="text-sm">{review.source}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    style={{ 
                      borderColor: getSentimentColor(review.sentiment),
                      color: getSentimentColor(review.sentiment)
                    }}
                  >
                    {review.sentiment.toFixed(2)}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {new Date(review.date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" asChild>
                    <a href={review.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredReviews.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No reviews match your current filters.</p>
        </div>
      )}
    </Card>
  );
}