import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { Key, ExternalLink, Check, X } from 'lucide-react';
import { Badge } from './ui/badge';

interface ApiKeyManagerProps {
  onApiKeyChange?: (key: string) => void;
}

export default function ApiKeyManager({ onApiKeyChange }: ApiKeyManagerProps) {
  const [apiKey, setApiKey] = useState('');
  const [isStored, setIsStored] = useState(false);
  const [isTestingKey, setIsTestingKey] = useState(false);
  const [keyStatus, setKeyStatus] = useState<'none' | 'valid' | 'invalid'>('none');

  useEffect(() => {
    // Check if API key is already stored
    const storedKey = localStorage.getItem('tiktok_rapidapi_key');
    if (storedKey) {
      setApiKey(storedKey);
      setIsStored(true);
      setKeyStatus('valid');
      onApiKeyChange?.(storedKey);
    }
  }, [onApiKeyChange]);

  const handleSaveKey = async () => {
    if (!apiKey.trim()) return;

    setIsTestingKey(true);
    
    try {
      // Test the API key with a simple request
      const testResponse = await fetch('https://tiktok-video-no-watermark2.p.rapidapi.com/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': apiKey.trim(),
          'X-RapidAPI-Host': 'tiktok-video-no-watermark2.p.rapidapi.com'
        },
        body: JSON.stringify({
          url: 'https://www.tiktok.com/@test/video/1234567890',
          hd: 1
        })
      });

      // Even if the test video fails, check if we got a proper API response structure
      const isValidKey = testResponse.status !== 401 && testResponse.status !== 403;
      
      if (isValidKey) {
        localStorage.setItem('tiktok_rapidapi_key', apiKey.trim());
        setIsStored(true);
        setKeyStatus('valid');
        onApiKeyChange?.(apiKey.trim());
      } else {
        setKeyStatus('invalid');
      }
    } catch (error) {
      console.error('API key test failed:', error);
      setKeyStatus('invalid');
    } finally {
      setIsTestingKey(false);
    }
  };

  const handleRemoveKey = () => {
    localStorage.removeItem('tiktok_rapidapi_key');
    setApiKey('');
    setIsStored(false);
    setKeyStatus('none');
    onApiKeyChange?.('');
  };

  const getStepNumber = (step: number, completed: boolean, current: boolean) => {
    if (completed) return <Check className="w-4 h-4 text-white" />;
    return <span className={`text-sm font-medium ${current ? 'text-white' : 'text-muted-foreground'}`}>{step}</span>;
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Key className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-medium">API Configuration</h3>
        <Badge variant={keyStatus === 'valid' ? 'default' : keyStatus === 'invalid' ? 'destructive' : 'secondary'}>
          {keyStatus === 'valid' ? 'Connected' : keyStatus === 'invalid' ? 'Invalid' : 'Not Connected'}
        </Badge>
      </div>

      <Alert className="mb-6">
        <AlertDescription>
          To download real TikTok videos, you need a free RapidAPI key. This takes 2 minutes to set up and enables unlimited downloads.
        </AlertDescription>
      </Alert>

      <div className="space-y-6">
        {/* Step 1: Get API Key */}
        <div className="flex gap-4">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
            isStored ? 'bg-green-500' : 'bg-primary'
          }`}>
            {getStepNumber(1, isStored, !isStored)}
          </div>
          <div className="flex-1">
            <h4 className="font-medium mb-2">Get your free RapidAPI key</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Sign up for free on RapidAPI and get your API key for the TikTok downloader service.
            </p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.open('https://rapidapi.com/yi005/api/tiktok-video-no-watermark2', '_blank')}
              className="gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Get Free API Key
            </Button>
          </div>
        </div>

        {/* Step 2: Enter API Key */}
        <div className="flex gap-4">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
            isStored ? 'bg-green-500' : keyStatus === 'none' ? 'bg-muted' : 'bg-primary'
          }`}>
            {getStepNumber(2, isStored, !isStored && keyStatus === 'none')}
          </div>
          <div className="flex-1">
            <h4 className="font-medium mb-2">Enter your API key</h4>
            <div className="space-y-3">
              <div>
                <Label htmlFor="apiKey">RapidAPI Key</Label>
                <Input
                  id="apiKey"
                  type="password"
                  placeholder="Enter your RapidAPI key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  disabled={isStored}
                />
              </div>
              
              <div className="flex gap-2">
                {!isStored ? (
                  <Button 
                    onClick={handleSaveKey}
                    disabled={!apiKey.trim() || isTestingKey}
                    size="sm"
                  >
                    {isTestingKey ? 'Testing...' : 'Test & Save Key'}
                  </Button>
                ) : (
                  <Button 
                    onClick={handleRemoveKey}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    <X className="w-4 h-4" />
                    Remove Key
                  </Button>
                )}
              </div>

              {keyStatus === 'invalid' && (
                <Alert className="border-destructive">
                  <AlertDescription className="text-destructive">
                    Invalid API key. Please check your key and try again.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </div>
        </div>

        {/* Step 3: Start Downloading */}
        <div className="flex gap-4">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
            isStored ? 'bg-primary' : 'bg-muted'
          }`}>
            {getStepNumber(3, false, isStored)}
          </div>
          <div className="flex-1">
            <h4 className="font-medium mb-2">Start downloading TikTok videos</h4>
            <p className="text-sm text-muted-foreground">
              {isStored 
                ? "You're all set! You can now download TikTok videos in HD quality without watermarks."
                : "Complete the setup above to start downloading real TikTok videos."
              }
            </p>
          </div>
        </div>
      </div>

      {isStored && (
        <Alert className="mt-6 border-green-200 bg-green-50 dark:bg-green-950/20">
          <Check className="w-4 h-4 text-green-600" />
          <AlertDescription className="text-green-700 dark:text-green-400">
            ✅ API configured successfully! You can now download real TikTok videos.
          </AlertDescription>
        </Alert>
      )}
    </Card>
  );
}