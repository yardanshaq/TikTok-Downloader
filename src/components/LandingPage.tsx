import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Download, Loader2, CheckCircle } from 'lucide-react';
import HowItWorks from './HowItWorks';
import { TikTokService } from './TikTokService';

interface LandingPageProps {
  onDownload: (url: string, options: any) => void;
}

export default function LandingPage({ onDownload }: LandingPageProps) {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [urlValidation, setUrlValidation] = useState<'idle' | 'valid' | 'invalid'>('idle');


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim() || urlValidation !== 'valid') return;

    setIsLoading(true);
    
    try {
      await onDownload(url, {});
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUrlChange = (value: string) => {
    setUrl(value);
    
    if (!value.trim()) {
      setUrlValidation('idle');
      return;
    }
    
    // Real-time validation
    const isValid = TikTokService.validateUrl(value);
    setUrlValidation(isValid ? 'valid' : 'invalid');
  };

  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-medium text-foreground mb-6">
            Download TikTok Videos
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-teal-500">
              No Watermark • MP3 Audio
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Download TikTok videos <strong>without watermarks</strong>, in HD quality, or extract <strong>high-quality audio</strong> as MP3. 
            No registration required.
          </p>
          
          {/* Feature Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              No Watermark Downloads
            </div>
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              MP3 Audio Extraction
            </div>
            <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
              HD Quality Videos
            </div>
            <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
              100% Free
            </div>
          </div>

          <Card className="p-8 max-w-2xl mx-auto shadow-lg">
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2 relative">
                <div className="relative">
                  <Input
                    type="url"
                    placeholder="Paste TikTok video link here..."
                    value={url}
                    onChange={(e) => handleUrlChange(e.target.value)}
                    className={`h-14 text-lg px-4 pr-12 border-2 transition-colors ${
                      urlValidation === 'valid' 
                        ? 'border-green-500 focus:border-green-500' 
                        : urlValidation === 'invalid'
                        ? 'border-red-500 focus:border-red-500'
                        : 'focus:border-purple-500'
                    }`}
                    disabled={isLoading}
                    autoComplete="off"
                    spellCheck={false}
                  />
                  {urlValidation === 'valid' && (
                    <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-green-500" />
                  )}
                </div>
                {urlValidation === 'invalid' && (
                  <p className="text-destructive text-sm text-left">
                    Please enter a valid TikTok URL (e.g., https://www.tiktok.com/@user/video/123...)
                  </p>
                )}
                {urlValidation === 'valid' && (
                  <p className="text-green-600 text-sm text-left">
                    Valid TikTok URL detected - Enhanced processing with multiple APIs!
                  </p>
                )}
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full h-14 text-lg bg-gradient-to-r from-purple-500 to-teal-500 hover:from-purple-600 hover:to-teal-600 transition-all"
                disabled={!url.trim() || urlValidation !== 'valid' || isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processing Video...
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5 mr-2" />
                    Get Download Options
                  </>
                )}
              </Button>
            </form>
          </Card>
        </div>
      </section>

      <HowItWorks />
    </div>
  );
}