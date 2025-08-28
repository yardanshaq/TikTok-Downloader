import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { MessageCircle, X, Send, Minimize2, Maximize2 } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'support';
  timestamp: Date;
}

interface LiveChatWidgetProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function LiveChatWidget({ isOpen, onToggle }: LiveChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! Welcome to TikTok Downloader support. How can I help you today?',
      sender: 'support',
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate support response
    setTimeout(() => {
      const supportResponse = generateSupportResponse(userMessage.text);
      const supportMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: supportResponse,
        sender: 'support',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, supportMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const generateSupportResponse = (userText: string): string => {
    const lowerText = userText.toLowerCase();
    
    if (lowerText.includes('download') && lowerText.includes('not working')) {
      return "I understand you're having trouble downloading videos. This could be due to several reasons:\n\n1. The video might be from a private account\n2. The video URL might be incorrect\n3. Our servers might be experiencing high traffic\n\nTry refreshing the page and make sure you're using a public TikTok video URL. If the issue persists, please share the specific error message you're seeing.";
    }
    
    if (lowerText.includes('quality') || lowerText.includes('1080p') || lowerText.includes('720p')) {
      return "Great question about video quality! We offer:\n\n• 1080p Full HD - Best quality, larger file size\n• 720p HD - Good quality, optimized file size\n• MP3 Audio - Audio only extraction\n\nThe available quality depends on the original video upload quality. Is there a specific quality issue you're experiencing?";
    }
    
    if (lowerText.includes('error') || lowerText.includes('problem') || lowerText.includes('issue')) {
      return "I'm sorry you're experiencing an issue. To help you better, could you please provide:\n\n1. The exact error message you're seeing\n2. The TikTok URL you're trying to download\n3. Which browser you're using\n\nThis information will help me troubleshoot the problem more effectively.";
    }
    
    if (lowerText.includes('private') || lowerText.includes('account')) {
      return "Videos from private TikTok accounts cannot be downloaded due to privacy restrictions. Only public videos that are accessible to everyone can be processed through our service.\n\nMake sure the video you're trying to download is from a public account and the URL is correct.";
    }
    
    if (lowerText.includes('legal') || lowerText.includes('copyright')) {
      return "Good question about legality! Here's what you should know:\n\n• Downloading for personal use is generally acceptable\n• Respect content creators' rights\n• Don't redistribute content without permission\n• Follow TikTok's terms of service\n• Avoid commercial use without proper licensing\n\nAlways use downloaded content responsibly and ethically.";
    }
    
    if (lowerText.includes('mobile') || lowerText.includes('phone') || lowerText.includes('tablet')) {
      return "Yes! Our downloader is fully responsive and works great on mobile devices:\n\n• Smartphones (iOS & Android)\n• Tablets\n• All screen sizes\n\nThe mobile experience is optimized for touch interactions. Are you experiencing any specific issues on your mobile device?";
    }
    
    if (lowerText.includes('slow') || lowerText.includes('speed')) {
      return "If downloads are slow, this could be due to:\n\n• High server traffic (try again later)\n• Large file sizes (1080p videos are bigger)\n• Your internet connection speed\n• TikTok's server response time\n\nTry downloading a 720p version if 1080p is slow, or wait a few minutes and try again.";
    }
    
    if (lowerText.includes('thank') || lowerText.includes('thanks')) {
      return "You're very welcome! I'm glad I could help. Is there anything else you'd like to know about our TikTok downloader? I'm here to assist you! 😊";
    }
    
    // Default response
    return "Thank you for your message! I'm here to help with any questions about our TikTok downloader. Common topics I can assist with:\n\n• Download issues and troubleshooting\n• Video quality and formats\n• Privacy and legal questions\n• Mobile device support\n• Technical problems\n\nWhat specific question can I help you with?";
  };

  if (!isOpen) {
    return (
      <Button
        onClick={onToggle}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 z-50"
        size="sm"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className={`fixed bottom-6 right-6 w-80 bg-card border shadow-xl z-50 transition-all duration-300 ${
      isMinimized ? 'h-14' : 'h-96'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-primary text-primary-foreground rounded-t-lg">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-4 h-4" />
          <span className="font-medium">Live Support</span>
          <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
            Online
          </Badge>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMinimized(!isMinimized)}
            className="h-6 w-6 p-0 hover:bg-white/20"
          >
            {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="h-6 w-6 p-0 hover:bg-white/20"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 p-4 space-y-3 overflow-y-auto h-60">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-2 rounded-lg text-sm whitespace-pre-line ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted text-foreground p-2 rounded-lg text-sm">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
                maxLength={500}
              />
              <Button type="submit" size="sm" disabled={!newMessage.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </>
      )}
    </Card>
  );
}