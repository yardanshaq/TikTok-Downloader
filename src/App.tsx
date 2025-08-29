import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import ResultsPage from './components/ResultsPage';
import ErrorPage from './components/ErrorPage';
import FAQPage from './components/FAQPage';
import ProgressIndicator from './components/ProgressIndicator';
import FaviconManager from './components/FaviconManager';
import { ThemeProvider } from './components/ThemeProvider';
import { TooltipProvider } from './components/ui/tooltip';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner@2.0.3';
import { TikTokService, TikTokVideoInfo } from './components/TikTokService';

type Page = 'home' | 'results' | 'error' | 'faq' | 'about';

interface VideoData {
  url: string;
  options: any;
  videoInfo?: TikTokVideoInfo;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState({
    isVisible: false,
    filename: '',
    format: '',
    progress: 0,
    stage: 'preparing' as 'preparing' | 'downloading' | 'complete' | 'error',
    speed: ''
  });

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    if (page === 'home') {
      setVideoData(null);
      setError(null);
    }
  };

  const handleDownload = async (url: string, options: any) => {
    try {
      // Validate URL first
      if (!TikTokService.validateUrl(url)) {
        setError('Invalid TikTok URL. Please enter a valid TikTok video link.');
        setCurrentPage('error');
        return;
      }

      // Fetch video information
      const videoInfo = await TikTokService.fetchVideoInfo(url);
      
      setVideoData({ 
        url, 
        options,
        videoInfo 
      });
      setCurrentPage('results');
      
    } catch (error) {
      let errorMessage = error instanceof Error ? error.message : 'Failed to process video. Please try again.';
      
      // Handle API key related errors
      if (errorMessage.includes('API key')) {
        errorMessage = 'API configuration required. Please set up your RapidAPI key to download videos.';
      }
      
      setError(errorMessage);
      setCurrentPage('error');
    }
  };

  const handleDownloadFile = async (format: string) => {
    if (!videoData?.videoInfo) {
      console.error('❌ No video data available for download');
      return;
    }

    console.group(`🎬 DOWNLOAD REQUEST: ${format}`);
    console.log('📋 Video Info:', videoData.videoInfo);

    try {
      const filename = TikTokService.generateFilename(videoData.videoInfo, format);
      const downloadUrl = videoData.videoInfo.downloadUrls[format as keyof typeof videoData.videoInfo.downloadUrls];
      
      console.log(`📁 Generated filename: ${filename}`);
      console.log(`🔗 Download URL: ${downloadUrl}`);
      
      if (!downloadUrl || downloadUrl === 'unavailable') {
        console.error(`❌ ${format} URL is unavailable`);
        throw new Error(`${format} format is not available for this video. This may be because:\n\n• The video source doesn't provide this format\n• The API service is temporarily unavailable\n• The video has restricted download permissions\n\nTry refreshing the page or selecting a different format.`);
      }
      
      // Initialize progress indicator
      setDownloadProgress({
        isVisible: true,
        filename,
        format,
        progress: 0,
        stage: 'preparing',
        speed: ''
      });
      
      // Create progress callback
      const onProgress = (progress: number, stage: string, speed?: string) => {
        setDownloadProgress(prev => ({
          ...prev,
          progress,
          stage: stage as any,
          speed: speed || ''
        }));
      };
      
      console.log('🚀 Calling TikTokService.downloadFile...');
      await TikTokService.downloadFile(downloadUrl, filename, format, onProgress, videoData.videoInfo);
      
      // Mark as complete first, then hide after brief delay
      setDownloadProgress(prev => ({ 
        ...prev, 
        progress: 100, 
        stage: 'complete' 
      }));
      
      setTimeout(() => {
        setDownloadProgress(prev => ({ ...prev, isVisible: false }));
        toast.success('Download Complete!', {
          description: `${filename} has been saved to your downloads folder.`,
          duration: 5000,
        });
      }, 800);
      
      console.log('✅ Download process completed successfully');
      console.groupEnd();
      
    } catch (error) {
      console.error('❌ Download failed:', error);
      console.groupEnd();
      
      // Update progress to show error
      setDownloadProgress(prev => ({ 
        ...prev, 
        stage: 'error',
        progress: 0
      }));
      
      const errorMessage = error instanceof Error ? error.message : 'Download failed. Please try again.';
      
      // Handle specific error types with appropriate messages
      if (errorMessage.includes('403') || errorMessage.includes('Forbidden')) {
        toast.error('Download Restricted', {
          description: 'TikTok blocked this download. Try a different format or use TikTok\'s built-in download feature.',
          duration: 8000,
        });
      } else if (errorMessage.includes('404') || errorMessage.includes('not found')) {
        toast.error('File Not Found', {
          description: 'This video file may have expired or been removed. Try refreshing the video info.',
          duration: 6000,
        });
      } else if (errorMessage.includes('Failed to fetch') || errorMessage.includes('Network error')) {
        toast.error('Network Error', {
          description: 'Unable to download the file. This could be due to network issues or TikTok restrictions. Please try again or use a different format.',
          duration: 8000,
        });
      } else if (errorMessage.includes('Invalid download URL')) {
        toast.error('Invalid Download Link', {
          description: 'The download link is not valid or has expired. Try refreshing the video information.',
          duration: 7000,
        });
      } else if (errorMessage.includes('not available') || errorMessage.includes('format')) {
        toast.error('Format Unavailable', {
          description: 'This format is not available. Try refreshing the page or selecting a different format.',
          duration: 6000,
        });
      } else if (errorMessage.includes('API service is temporarily unavailable')) {
        toast.error('Service Unavailable', {
          description: 'The download service is temporarily unavailable. Please try again in a few minutes.',
          duration: 8000,
        });
      } else {
        toast.error('Download Failed', {
          description: errorMessage.length > 100 ? 'Download failed. Please try again or use a different format.' : errorMessage,
          duration: 7000,
        });
      }
      
      // Hide progress indicator after showing error briefly
      setTimeout(() => {
        setDownloadProgress(prev => ({ ...prev, isVisible: false }));
      }, 2000);
      
      // Only navigate to error page for critical errors, not format-specific ones
      if (errorMessage.includes('not available') || 
          errorMessage.includes('format') || 
          errorMessage.includes('403') || 
          errorMessage.includes('404')) {
        return; // Stay on results page
      }
      
      setError(errorMessage);
      setCurrentPage('error');
    }
  };

  const handleBack = () => {
    setCurrentPage('home');
    setVideoData(null);
    setError(null);
    setDownloadProgress(prev => ({ ...prev, isVisible: false }));
  };

  const handleProgressComplete = () => {
    setDownloadProgress(prev => ({ ...prev, isVisible: false }));
  };

  const handleProgressCancel = () => {
    setDownloadProgress(prev => ({ ...prev, isVisible: false }));
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <LandingPage onDownload={handleDownload} />;
      case 'results':
        return (
          <ResultsPage
            videoData={videoData}
            onBack={handleBack}
            onDownload={handleDownloadFile}
          />
        );
      case 'error':
        return <ErrorPage onBack={handleBack} error={error || undefined} />;
      case 'faq':
        return <FAQPage />;
      case 'about':
        return (
          <div className="flex-1 flex items-center justify-center py-20">
            <div className="max-w-2xl mx-auto px-4 text-center">
              <h1 className="text-3xl font-medium text-foreground mb-6">About TikTok Downloader</h1>
              <p className="text-muted-foreground leading-relaxed">
                We're a simple, fast, and free tool for downloading TikTok videos. 
                Our mission is to help users save their favorite content for offline viewing 
                while respecting creators' rights and platform guidelines.
              </p>
            </div>
          </div>
        );
      default:
        return <LandingPage onDownload={handleDownload} />;
    }
  };

  return (
    <ThemeProvider>
      <TooltipProvider>
        <FaviconManager />
        <div className="min-h-screen bg-background flex flex-col">
          <Header currentPage={currentPage} onNavigate={handleNavigate} />
          <main className="flex-1 flex flex-col">
            {renderPage()}
          </main>
          <Footer />
        </div>
        <ProgressIndicator
          isVisible={downloadProgress.isVisible}
          onComplete={handleProgressComplete}
          onCancel={handleProgressCancel}
          filename={downloadProgress.filename}
          format={downloadProgress.format}
          progress={downloadProgress.progress}
          stage={downloadProgress.stage}
          speed={downloadProgress.speed}
        />
        <Toaster richColors position="top-right" />
      </TooltipProvider>
    </ThemeProvider>
  );
}