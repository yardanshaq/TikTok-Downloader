import { Link, Download, Play, Music, VideoIcon, Image } from 'lucide-react';
import { Card } from './ui/card';

export default function HowItWorks() {
  const steps = [
    {
      icon: Link,
      title: "Paste Link",
      description: "Copy and paste your TikTok video or photo carousel URL into the input field above"
    },
    {
      icon: Play,
      title: "Process",
      description: "Our system analyzes the content and prepares multiple download formats for videos, photos, and audio"
    },
    {
      icon: Download,
      title: "Download",
      description: "Choose from no watermark videos, individual photos, MP3 audio, or HD quality - then download instantly"
    }
  ];

  const features = [
    {
      icon: VideoIcon,
      title: "No Watermark Videos",
      description: "Download TikTok videos without the TikTok watermark in crystal-clear HD quality",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Image,
      title: "Photo Carousel Downloads",
      description: "Save TikTok photo carousels - download individual images or entire collections in HD",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: Music,
      title: "MP3 Audio Extraction",
      description: "Extract high-quality audio tracks from any TikTok video or photo carousel background music",
      color: "from-blue-500 to-cyan-500"
    }
  ];

  return (
    <>
      {/* How It Works Section */}
      <section className="py-16 bg-muted/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-medium text-foreground mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Download TikTok videos, photo carousels, or extract MP3 audio in just three simple steps. Support for all TikTok content types - fast, free, and easy to use.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="bg-gradient-to-r from-purple-500 to-teal-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-sm font-medium w-8 h-8 rounded-full flex items-center justify-center">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-medium text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-medium text-foreground mb-4">Why Choose Our Downloader?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get the most comprehensive TikTok downloading experience with support for videos, photos, and audio - features that other tools don't offer.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className={`bg-gradient-to-r ${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-medium text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}