import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Code, 
  Database, 
  Cloud, 
  Shield, 
  Zap, 
  ExternalLink,
  CheckCircle,
  XCircle 
} from 'lucide-react';

export default function ApiIntegrationInfo() {
  const features = [
    { name: 'Real Video Downloads', available: true, description: 'Actual MP4/MP3 file downloads via multiple APIs' },
    { name: 'Multiple Quality Options', available: true, description: 'HD, standard, and audio-only formats' },
    { name: 'Watermark Removal', available: true, description: 'Clean videos without TikTok watermarks when available' },
    { name: 'Batch Downloads', available: false, description: 'Download multiple videos at once (future enhancement)' },
    { name: 'URL Validation', available: true, description: 'Validates TikTok URLs correctly' },
    { name: 'Progress Tracking', available: true, description: 'Real-time download progress' },
    { name: 'Responsive Design', available: true, description: 'Works on all device sizes' },
    { name: 'Dark/Light Mode', available: true, description: 'Theme switching support' }
  ];

  const apiOptions = [
    {
      name: 'TikTok API (Official)',
      description: 'Official TikTok API with proper authentication',
      difficulty: 'High',
      cost: 'Paid',
      pros: ['Official support', 'Reliable', 'No rate limits'],
      cons: ['Expensive', 'Complex setup', 'Limited access']
    },
    {
      name: 'yt-dlp Backend',
      description: 'Open-source tool for downloading videos from various platforms',
      difficulty: 'Medium',
      cost: 'Free',
      pros: ['Free', 'Supports many sites', 'Active development'],
      cons: ['May break with site changes', 'Requires server', 'Legal considerations']
    },
    {
      name: 'Third-party APIs',
      description: 'Services like RapidAPI, TikTok scrapers',
      difficulty: 'Low',
      cost: 'Freemium',
      pros: ['Easy to implement', 'Quick setup', 'Often have free tiers'],
      cons: ['Rate limited', 'May be unreliable', 'Terms of service risks']
    }
  ];

  return (
    <div className="space-y-6">
      {/* Current Status */}
      <Card className="p-6">
        <h3 className="text-xl font-medium text-foreground mb-4 flex items-center gap-2">
          <Code className="w-5 h-5" />
          Current Implementation Status
        </h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          {features.map((feature) => (
            <div key={feature.name} className="flex items-center gap-3">
              {feature.available ? (
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              )}
              <div className="flex-1">
                <span className="text-sm font-medium text-foreground">{feature.name}</span>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* API Options */}
      <div className="space-y-4">
        <h3 className="text-xl font-medium text-foreground flex items-center gap-2">
          <Database className="w-5 h-5" />
          Backend API Integration Options
        </h3>
        
        {apiOptions.map((option) => (
          <Card key={option.name} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-medium text-foreground">{option.name}</h4>
                <p className="text-sm text-muted-foreground">{option.description}</p>
              </div>
              <div className="flex gap-2">
                <Badge variant={option.difficulty === 'Low' ? 'default' : option.difficulty === 'Medium' ? 'secondary' : 'destructive'}>
                  {option.difficulty}
                </Badge>
                <Badge variant={option.cost === 'Free' ? 'default' : 'secondary'}>
                  {option.cost}
                </Badge>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-medium text-green-700 dark:text-green-400 mb-1">Pros:</h5>
                <ul className="space-y-1">
                  {option.pros.map((pro, idx) => (
                    <li key={idx} className="text-muted-foreground">• {pro}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h5 className="font-medium text-red-700 dark:text-red-400 mb-1">Cons:</h5>
                <ul className="space-y-1">
                  {option.cons.map((con, idx) => (
                    <li key={idx} className="text-muted-foreground">• {con}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Supabase Integration */}
      <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 border-green-200 dark:border-green-800">
        <div className="flex items-start gap-4">
          <div className="bg-green-100 dark:bg-green-900 p-2 rounded-lg">
            <Cloud className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-foreground mb-2">
              Recommended: Supabase Integration
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Add backend functionality with Supabase Edge Functions to handle real TikTok downloads securely.
            </p>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span>Secure API key management</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Zap className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span>Serverless edge functions</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Database className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span>User management & download history</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Implementation Example */}
      <Card className="p-6">
        <h3 className="text-xl font-medium text-foreground mb-4 flex items-center gap-2">
          <Code className="w-5 h-5" />
          Sample Implementation Code
        </h3>
        
        <div className="bg-muted rounded-lg p-4 text-sm font-mono">
          <div className="text-green-600 dark:text-green-400 mb-2">// Supabase Edge Function Example</div>
          <div className="text-muted-foreground">
            <div>export const downloadTikTok = async (url: string) =&gt; &#123;</div>
            <div className="ml-4">const response = await supabase.functions.invoke('tiktok-download', &#123;</div>
            <div className="ml-8">body: &#123; url, format: 'mp4' &#125;</div>
            <div className="ml-4">&#125;);</div>
            <div className="ml-4">return response.data;</div>
            <div>&#125;;</div>
          </div>
        </div>
      </Card>
    </div>
  );
}