import { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Download, Loader2, CheckCircle, Clipboard } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import HowItWorks from './HowItWorks';
import { TikTokService } from './TikTokService';

interface LandingPageProps {
  onDownload: (url: string, options: any) => void;
}

export default function LandingPage({ onDownload }: LandingPageProps) {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [urlValidation, setUrlValidation] = useState<'idle' | 'valid' | 'invalid'>('idle');

  const inputRef = useRef<HTMLInputElement>(null);


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

  const handleClipboardPaste = async () => {
    try {
      // Check basic clipboard API availability first
      if (!navigator.clipboard) {
        toast.info('Clipboard not supported', {
          description: 'Your browser doesn\'t support automatic clipboard access.',
          duration: 4000,
        });
        return;
      }

      // Always attempt to read from clipboard directly
      const clipboardText = await navigator.clipboard.readText();
      
      if (!clipboardText || !clipboardText.trim()) {
        toast.error('Clipboard is empty', {
          description: 'No content found in clipboard. Copy a TikTok link first.',
          duration: 3000,
        });
        return;
      }

      const trimmedText = clipboardText.trim();

      // Always paste the content first
      handleUrlChange(trimmedText);

      // Then validate and provide feedback
      const isValidTikTok = TikTokService.validateUrl(trimmedText);
      
      if (!isValidTikTok) {
        toast.error('Not a TikTok link', {
          description: 'Content found in clipboard is not a valid TikTok URL.',
          duration: 4000,
        });
        return;
      }

      // Successfully pasted valid TikTok URL
      toast.success('✨ Pasted successfully!', {
        description: 'TikTok link auto-filled from clipboard.',
        duration: 3000,
      });

    } catch (error) {
      console.error('Clipboard paste failed:', error);
      
      // Handle specific error types
      if (error instanceof Error) {
        // Handle permissions policy errors specifically
        if (error.message.includes('permissions policy') || error.message.includes('Clipboard API has been blocked')) {
          toast.info('Clipboard access blocked', {
            description: 'Browser settings have disabled automatic clipboard access.',
            duration: 5000,
          });
          return;
        }
        
        // Handle user permission denial
        if (error.name === 'NotAllowedError') {
          toast.info('Permission required', {
            description: 'Allow clipboard access to use this feature.',
            duration: 4000,
          });
          return;
        }
        
        // Handle empty clipboard
        if (error.name === 'NotFoundError') {
          toast.error('Clipboard is empty', {
            description: 'No content found in clipboard.',
            duration: 3000,
          });
          return;
        }
        
        // Generic error fallback  
        toast.error('Clipboard access failed', {
          description: 'Unable to read from clipboard.',
          duration: 4000,
        });
      }
    }
  };







  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-medium text-foreground mb-6">
            Download TikTok Content
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-teal-500">
              Videos • Photos • MP3 Audio
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Download TikTok <strong>videos without watermarks</strong>, save <strong>photo carousels</strong> in HD quality, 
            or extract <strong>high-quality audio</strong> as MP3. All formats supported, no registration required.
          </p>
          
          {/* Feature Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              No Watermark Videos
            </div>
            <div className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-medium">
              Photo Carousel Downloads
            </div>
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              MP3 Audio Extraction
            </div>
            <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
              HD Quality Support
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
                    ref={inputRef}
                    type="url"
                    placeholder="Paste TikTok video or photo link here..."
                    value={url}
                    onChange={(e) => handleUrlChange(e.target.value)}
                    className={`h-14 text-lg px-4 pr-20 border-2 transition-colors ${
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
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                    {/* Clipboard Auto-Fill Button */}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleClipboardPaste}
                      disabled={isLoading}
                      className="h-8 w-8 p-0 hover:bg-purple-100 hover:scale-105 transition-all duration-200 rounded-md"
                      title="Auto-paste from clipboard"
                      aria-label="Auto-paste TikTok link from clipboard"
                    >
                      <Clipboard className="w-4 h-4 text-purple-600 hover:text-purple-700" />
                    </Button>
                    {urlValidation === 'valid' && (
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    )}
                  </div>
                </div>
                {urlValidation === 'invalid' && (
                  <p className="text-destructive text-sm text-left">
                    Please enter a valid TikTok URL (videos, photos, or carousels supported)
                  </p>
                )}
                {urlValidation === 'valid' && (
                  <p className="text-green-600 text-sm text-left">
                    ✓ Valid TikTok URL detected - Ready to download videos, photos, or audio!
                  </p>
                )}
                {urlValidation === 'idle' && (
                  <p className="text-muted-foreground text-sm text-left">
                    💡 Tip: Click the 📋 button to automatically paste from clipboard
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
                    Download
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