import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Download, ArrowLeft, User, Clock, Eye, Heart, Share, MessageCircle, Music, Info, Image, Video, Headphones } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { TikTokVideoInfo, TikTokService } from './TikTokService';


interface ResultsPageProps {
  videoData: {
    url: string;
    options: any;
    videoInfo?: TikTokVideoInfo;
  } | null;
  onBack: () => void;
  onDownload: (format: string) => void;
}

export default function ResultsPage({ videoData, onBack, onDownload }: ResultsPageProps) {
  const [downloadingFormat, setDownloadingFormat] = useState<string | null>(null);

  if (!videoData?.videoInfo) {
    return (
      <div className="flex-1 flex items-center justify-center py-20">
        <div className="text-center">
          <p className="text-muted-foreground">No video data available</p>
          <Button onClick={onBack} className="mt-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const handleDownload = async (format: string) => {
    if (!videoData?.videoInfo) return;
    
    setDownloadingFormat(format);
    
    try {
      await onDownload(format);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setDownloadingFormat(null);
    }
  };

  const { videoInfo } = videoData;

  // Generate download options based on content type
  const downloadOptions = videoInfo.contentType === 'photo' 
    ? generatePhotoDownloadOptions(videoInfo)
    : generateVideoDownloadOptions(videoInfo);

  function generateVideoDownloadOptions(videoInfo: TikTokVideoInfo) {
    return [
      {
        format: '1080p HD',
        label: '1080p Full HD',
        description: 'Full high definition video - Premium quality with larger file size for best viewing experience',
        icon: Video,
        available: videoInfo.downloadUrls['1080p HD' as keyof typeof videoInfo.downloadUrls] !== 'unavailable' && 
                  videoInfo.downloadUrls['1080p HD' as keyof typeof videoInfo.downloadUrls] !== '',
        featured: true,
        quality: 'FHD',
        category: 'video'
      },
      {
        format: '720p HD',
        label: '720p HD',
        description: 'High definition video - Enhanced quality with optimized file size for great viewing',
        icon: Video,
        available: videoInfo.downloadUrls['720p HD' as keyof typeof videoInfo.downloadUrls] !== 'unavailable' && 
                  videoInfo.downloadUrls['720p HD' as keyof typeof videoInfo.downloadUrls] !== '',
        featured: true,
        quality: 'HD',
        category: 'video'
      },
      {
        format: 'MP3 Audio',
        label: 'MP3 Audio Only',
        description: 'Extract audio track from video in high quality MP3 format - Perfect for music',
        icon: Headphones,
        available: videoInfo.downloadUrls['MP3 Audio' as keyof typeof videoInfo.downloadUrls] !== 'unavailable' && 
                  videoInfo.downloadUrls['MP3 Audio' as keyof typeof videoInfo.downloadUrls] !== '',
        featured: true,
        quality: 'Audio',
        category: 'audio'
      }
    ];
  }

  function generatePhotoDownloadOptions(videoInfo: TikTokVideoInfo) {
    const options: any[] = [];
    
    // Generate options for each photo
    Object.keys(videoInfo.downloadUrls).forEach(key => {
      if (key.startsWith('Photo ')) {
        const photoNum = key.replace('Photo ', '');
        const url = videoInfo.downloadUrls[key as keyof typeof videoInfo.downloadUrls] as string;
        
        options.push({
          format: key,
          label: `Photo ${photoNum}`,
          description: `Download high quality photo ${photoNum} in JPG format`,
          icon: Image,
          available: url !== 'unavailable' && url !== '',
          featured: parseInt(photoNum) === 1, // Feature the first photo
          quality: 'HD',
          category: 'photo'
        });
      }
    });
    
    return options.sort((a, b) => {
      // Sort by photo number
      const aNum = parseInt(a.format.replace('Photo ', ''));
      const bNum = parseInt(b.format.replace('Photo ', ''));
      return aNum - bNum;
    });
  }

  const availableOptions = downloadOptions.filter(option => option.available);
  const hasAnyAvailableDownloads = availableOptions.length > 0;

  return (
    <div className="flex-1 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 hover:bg-muted"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Video Preview */}
          <Card className="p-6">
            <div className="aspect-[9/16] bg-muted rounded-xl overflow-hidden mb-4 relative max-w-sm mx-auto">
              <ImageWithFallback
                src={videoInfo.thumbnail}
                alt="Video thumbnail"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
                  <div className="w-0 h-0 border-l-[12px] border-l-black border-y-[8px] border-y-transparent ml-1"></div>
                </div>
              </div>
              <Badge className="absolute top-3 right-3 bg-black/50 text-white">
                <Clock className="w-3 h-3 mr-1" />
                {videoInfo.duration}
              </Badge>
            </div>

            {/* Video Info */}
            <div className="space-y-3">
              <h2 className="font-medium text-foreground overflow-hidden" style={{
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical'
              }}>
                {videoInfo.title}
              </h2>
              
              <div className="flex items-center gap-2 text-muted-foreground">
                <User className="w-4 h-4" />
                <span>{videoInfo.username}</span>
                <span className="text-xs">•</span>
                <span className="text-sm">{videoInfo.displayName}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{videoInfo.views}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  <span>{videoInfo.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Share className="w-4 h-4" />
                  <span>{videoInfo.shares}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>{videoInfo.comments}</span>
                </div>
              </div>

              {videoInfo.musicTitle && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg p-2">
                  <Music className="w-4 h-4" />
                  <span>{videoInfo.musicTitle}</span>
                </div>
              )}

              <div className="text-xs text-muted-foreground">
                Uploaded: {videoInfo.uploadDate}
              </div>
            </div>
          </Card>

          {/* Download Options */}
          <div className="space-y-4">
            <div className="mb-6">
              <h3 className="text-xl font-medium text-foreground mb-2">Download Options</h3>
              
              {!hasAnyAvailableDownloads && (
                /* No Downloads Available Notice */
                <Alert className="mb-4 border-orange-200 bg-orange-50">
                  <Info className="h-4 w-4 text-orange-600" />
                  <AlertDescription className="text-orange-800">
                    <span className="font-medium">⚠️ No Downloads Available:</span> The download services are temporarily unavailable 
                    or this video has restricted download permissions. Try refreshing the page or using TikTok's built-in download feature.
                  </AlertDescription>
                </Alert>
              )}
            </div>
            
            {/* Video Downloads */}
            {videoInfo.contentType === 'video' && (
              <div className="space-y-3">
                <h4 className="font-medium text-foreground flex items-center gap-2">
                  <Video className="w-4 h-4" />
                  Video Downloads
                </h4>
                {downloadOptions.filter(option => option.category === 'video').map((option) => (
                <Card 
                  key={option.format} 
                  className={`p-4 hover:shadow-md transition-shadow ${
                    option.featured ? 'ring-2 ring-primary/20 bg-primary/5' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <option.icon className="w-4 h-4 text-muted-foreground" />
                        <h4 className="font-medium text-foreground">{option.label}</h4>
                        {option.featured && (
                          <Badge variant="secondary" className="text-xs">Recommended</Badge>
                        )}
                        <Badge variant="outline" className="text-xs">
                          {option.quality}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                    </div>
                    
                    <Button
                      onClick={() => handleDownload(option.format)}
                      disabled={downloadingFormat !== null || !option.available}
                      className="ml-4"
                      variant={!option.available ? "secondary" : option.featured ? "default" : "outline"}
                    >
                      {downloadingFormat === option.format ? (
                        <>
                          <div className="w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                          Downloading...
                        </>
                      ) : !option.available ? (
                        <>
                          <span className="w-4 h-4 mr-2">❌</span>
                          Unavailable
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </>
                      )}
                    </Button>
                  </div>
                </Card>
                ))}
              </div>
            )}

            {/* Audio Downloads */}
            {videoInfo.contentType === 'video' && (
              <div className="space-y-3">
                <h4 className="font-medium text-foreground flex items-center gap-2">
                  <Headphones className="w-4 h-4" />
                  Audio Download
                </h4>
                {downloadOptions.filter(option => option.category === 'audio').map((option) => (
                <Card 
                  key={option.format} 
                  className={`p-4 hover:shadow-md transition-shadow ${
                    option.featured ? 'ring-2 ring-primary/20 bg-primary/5' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <option.icon className="w-4 h-4 text-muted-foreground" />
                        <h4 className="font-medium text-foreground">{option.label}</h4>
                        {option.featured && (
                          <Badge variant="secondary" className="text-xs">Popular</Badge>
                        )}
                        <Badge variant="outline" className="text-xs">
                          {option.quality}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                    </div>
                    
                    <Button
                      onClick={() => handleDownload(option.format)}
                      disabled={downloadingFormat !== null || !option.available}
                      className="ml-4"
                      variant={option.featured ? "default" : "outline"}
                    >
                      {downloadingFormat === option.format ? (
                        <>
                          <div className="w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                          Downloading...
                        </>
                      ) : !option.available ? (
                        <>
                          <span className="w-4 h-4 mr-2">❌</span>
                          Unavailable
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </>
                      )}
                    </Button>
                  </div>
                </Card>
                ))}
              </div>
            )}

            {/* Photo Downloads */}
            {videoInfo.contentType === 'photo' && (
              <div className="space-y-3">
                <h4 className="font-medium text-foreground flex items-center gap-2">
                  <Image className="w-4 h-4" />
                  Photo Downloads {videoInfo.photoCount && `(${videoInfo.photoCount} photos)`}
                </h4>
                {downloadOptions.filter(option => option.category === 'photo').map((option) => (
                <Card 
                  key={option.format} 
                  className="p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <option.icon className="w-4 h-4 text-muted-foreground" />
                        <h4 className="font-medium text-foreground">{option.label}</h4>
                        <Badge variant="outline" className="text-xs">
                          {option.quality}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                    </div>
                    
                    <Button
                      onClick={() => handleDownload(option.format)}
                      disabled={downloadingFormat !== null || !option.available}
                      className="ml-4"
                      variant="outline"
                    >
                      {downloadingFormat === option.format ? (
                        <>
                          <div className="w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                          Downloading...
                        </>
                      ) : !option.available ? (
                        <>
                          <span className="w-4 h-4 mr-2">❌</span>
                          Unavailable
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </>
                      )}
                    </Button>
                  </div>
                </Card>
                ))}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}