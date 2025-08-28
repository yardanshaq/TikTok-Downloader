import { Button } from './ui/button';
import { Card } from './ui/card';
import { AlertTriangle, ArrowLeft, RefreshCw } from 'lucide-react';

interface ErrorPageProps {
  onBack: () => void;
  error?: string;
}

export default function ErrorPage({ onBack, error }: ErrorPageProps) {
  const defaultError = "Invalid TikTok link. Please check the URL and try again.";
  
  return (
    <div className="flex-1 flex items-center justify-center py-20">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="p-8 text-center">
          <div className="mb-6">
            <div className="bg-destructive/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-10 h-10 text-destructive" />
            </div>
            <h2 className="text-2xl font-medium text-foreground mb-2">Oops! Something went wrong</h2>
            <p className="text-muted-foreground">
              {error || defaultError}
            </p>
          </div>

          <div className="space-y-3">
            <Button
              onClick={onBack}
              className="w-full"
              size="lg"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go back to Homepage
            </Button>
            
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              className="w-full"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </div>

          <div className="mt-8 p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium text-foreground mb-2">Common issues:</h4>
            <ul className="text-sm text-muted-foreground text-left space-y-1">
              <li>• Make sure the URL is from TikTok</li>
              <li>• Check if the video is public</li>
              <li>• Try copying the link again</li>
              <li>• The video might be removed or private</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}