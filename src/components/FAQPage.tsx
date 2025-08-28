import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Card } from './ui/card';
import LiveChatWidget from './LiveChatWidget';

export default function FAQPage() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const faqs = [
    {
      question: "Is this service free to use?",
      answer: "Yes! Our TikTok video downloader is completely free. You can download videos in different qualities and extract MP3 audio without any cost. No registration or subscription required."
    },
    {
      question: "What video qualities are available?",
      answer: "We offer premium video quality options including 1080p Full HD and 720p HD. Both provide excellent quality with enhanced file sizes for the best viewing experience. You can also download MP3 audio and JPG images."
    },
    {
      question: "Do you store my downloaded videos?",
      answer: "No, we don't store any videos on our servers. All downloads are processed in real-time and transferred directly to your device. We respect your privacy and don't keep any copies of downloaded content."
    },
    {
      question: "What video formats are supported?",
      answer: "We support multiple formats including MP4 in 1080p HD, MP4 in 720p HD, MP3 audio extraction, and JPG image downloads. You can choose the format that best suits your needs before downloading."
    },
    {
      question: "Why can't I download some videos?",
      answer: "Some videos may not be downloadable due to: privacy settings (private accounts), regional restrictions, copyright protection, or if the video has been deleted. Only public videos can be downloaded."
    },
    {
      question: "Is there a download limit?",
      answer: "There's no strict download limit for regular use. However, we may implement fair usage policies to prevent abuse. For personal use, you should have no issues downloading videos."
    },
    {
      question: "Can I download videos from private accounts?",
      answer: "No, videos from private TikTok accounts cannot be downloaded. Only public videos that are accessible to everyone can be processed and downloaded through our service."
    },
    {
      question: "What's the maximum video quality available?",
      answer: "We provide the highest quality available from TikTok, typically up to 1080p HD. The quality depends on the original video upload quality and TikTok's processing."
    },
    {
      question: "Is it legal to download TikTok videos?",
      answer: "Downloading videos for personal use is generally acceptable, but you should respect content creators' rights and TikTok's terms of service. Don't redistribute or use downloaded content commercially without permission."
    },
    {
      question: "Does this work on mobile devices?",
      answer: "Yes! Our downloader is fully responsive and works on all devices including smartphones, tablets, and computers. The mobile experience is optimized for touch interactions."
    },
    {
      question: "How do I download a video?",
      answer: "Simply paste the TikTok video URL into the input field on our homepage, select your preferred quality (1080p HD or 720p HD), audio format (MP3), or image (JPG), and click download. The file will be saved directly to your device."
    },
    {
      question: "What if the download doesn't start automatically?",
      answer: "If the automatic download doesn't work, our system will provide alternative download methods including direct download links and proxy options. You can also right-click any download link and select 'Save as...' to manually save the file."
    }
  ];

  return (
    <div className="flex-1 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-medium text-foreground mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our TikTok video downloader. 
            Can't find what you're looking for? Contact us for help.
          </p>
        </div>

        <Card className="p-6">
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4">
                <AccordionTrigger className="text-left hover:no-underline py-4">
                  <span className="font-medium text-foreground">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>

        <div className="mt-12 text-center">
          <Card className="p-8 bg-gradient-to-r from-purple-500/10 to-teal-500/10 border-purple-200">
            <h3 className="text-xl font-medium text-foreground mb-3">
              Still have questions?
            </h3>
            <p className="text-muted-foreground mb-6">
              We're here to help! Reach out to our support team for personalized assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a 
                href="mailto:support@tikdownload.live"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Email Support
              </a>
              <button 
                onClick={() => setIsChatOpen(true)}
                className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors"
              >
                Live Chat
              </button>
            </div>
          </Card>
        </div>
      </div>
      
      <LiveChatWidget 
        isOpen={isChatOpen} 
        onToggle={() => setIsChatOpen(!isChatOpen)} 
      />
    </div>
  );
}