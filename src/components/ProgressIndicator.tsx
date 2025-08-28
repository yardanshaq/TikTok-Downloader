import { useState, useEffect } from 'react';
import { Progress } from './ui/progress';
import { Card } from './ui/card';
import { Download, CheckCircle, X } from 'lucide-react';

interface ProgressIndicatorProps {
  isVisible: boolean;
  onComplete: () => void;
  onCancel: () => void;
  filename: string;
  format: string;
  progress?: number;
  stage?: 'preparing' | 'downloading' | 'complete' | 'error';
  speed?: string;
}

export default function ProgressIndicator({ 
  isVisible, 
  onComplete, 
  onCancel, 
  filename,
  format,
  progress: externalProgress = 0,
  stage: externalStage = 'preparing',
  speed: externalSpeed = ''
}: ProgressIndicatorProps) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<'preparing' | 'downloading' | 'complete' | 'error'>('preparing');
  const [speed, setSpeed] = useState('');

  useEffect(() => {
    if (!isVisible) {
      setProgress(0);
      setStage('preparing');
      setSpeed('');
      return;
    }

    // Use external progress data when provided
    setProgress(externalProgress);
    setStage(externalStage);
    setSpeed(externalSpeed);

    // Auto-complete when progress reaches 100%
    if (externalProgress >= 100 && externalStage === 'complete') {
      const timer = setTimeout(() => {
        onComplete();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, externalProgress, externalStage, externalSpeed, onComplete]);

  if (!isVisible) return null;

  const getStageText = () => {
    switch (stage) {
      case 'preparing':
        return 'Preparing download...';
      case 'downloading':
        return speed ? `Downloading ${format.toUpperCase()} • ${speed}` : `Downloading ${format.toUpperCase()}...`;
      case 'complete':
        return 'Download complete!';
      case 'error':
        return 'Download failed';
      default:
        return '';
    }
  };

  const getStageIcon = () => {
    switch (stage) {
      case 'preparing':
      case 'downloading':
        return <Download className="w-5 h-5 text-blue-500" />;
      case 'complete':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <X className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getStageIcon()}
            <div>
              <h3 className="font-medium text-foreground">Download Progress</h3>
              <p className="text-sm text-muted-foreground">{getStageText()}</p>
            </div>
          </div>
          {stage !== 'complete' && (
            <button
              onClick={onCancel}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{Math.round(progress)}%</span>
            <span>{filename}</span>
          </div>
        </div>

        {stage === 'complete' && (
          <div className="text-center">
            <p className="text-sm text-green-600 dark:text-green-400">
              ✓ File saved to your downloads folder
            </p>
          </div>
        )}

        {stage === 'error' && (
          <div className="text-center space-y-2">
            <p className="text-sm text-red-600 dark:text-red-400">
              Failed to download file. Please try again.
            </p>
            <button
              onClick={onCancel}
              className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </Card>
    </div>
  );
}