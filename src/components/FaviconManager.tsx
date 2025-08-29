import { useEffect } from 'react';

const FaviconManager = () => {
  useEffect(() => {
    // Set the document title
    document.title = 'TikTok Downloader - Download Videos & Audio | No Watermark';

    // Create and set favicon
    const favicon = document.querySelector<HTMLLinkElement>("link[rel*='icon']") || 
                   document.createElement('link');
    
    favicon.type = 'image/svg+xml';
    favicon.rel = 'shortcut icon';
    favicon.href = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8IS0tIEJhY2tncm91bmQgQ2lyY2xlIC0tPgogIDxjaXJjbGUgY3g9IjE2IiBjeT0iMTYiIHI9IjE2IiBmaWxsPSJ1cmwoI2dyYWRpZW50MSkiLz4KICA8IS0tIFZpZGVvIFBsYXkgU3ltYm9sIC0tPgogIDxyZWN0IHg9IjYiIHk9IjkiIHdpZHRoPSIxNCIgaGVpZ2h0PSIxMCIgcng9IjIiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuOSIvPgogIDx0cmlhbmdsZSBjeD0iMTMiIGN5PSIxNCIgcj0iMyIgZmlsbD0iIzhCNUNGNiIvPgogIDxwYXRoIGQ9Im0xMSAxMiA0IDIuNS00IDIuNXoiIGZpbGw9IiM4QjVDRjYiLz4KICA8IS0tIERvd25sb2FkIEFycm93IC0tPgogIDxjaXJjbGUgY3g9IjIzIiBjeT0iMjIiIHI9IjQiIGZpbGw9IndoaXRlIi8+CiAgPHBhdGggZD0ibTIxIDIxIDIgMiAyLTIiIHN0cm9rZT0iIzhCNUNGNiIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgZmlsbD0ibm9uZSIvPgogIDxwYXRoIGQ9Im0yMyAxOXY0IiBzdHJva2U9IiM4QjVDRjYiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIGZpbGw9Im5vbmUiLz4KICA8IS0tIE11c2ljIE5vdGVzIC0tPgogIDxjaXJjbGUgY3g9IjkiIGN5PSIyNCIgcj0iMiIgZmlsbD0id2hpdGUiLz4KICA8cGF0aCBkPSJtOSAyMlY2aDJsMS0xaDJ2MyIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIwLjgiIGZpbGw9Im5vbmUiLz4KICA8IS0tIEdyYWRpZW50IGRlZmluaXRpb24gLS0+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImdyYWRpZW50MSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM4QjVDRjYiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMTRCOEE2Ii8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KPC9zdmc+Cg==';
    
    document.getElementsByTagName('head')[0].appendChild(favicon);

    // Set meta tags for better SEO and social sharing
    const metaTags = [
      { name: 'description', content: 'Download TikTok videos without watermarks in HD quality. Extract MP3 audio from TikTok videos. Fast, free, and no registration required.' },
      { name: 'keywords', content: 'TikTok downloader, TikTok video download, no watermark, MP3 audio, HD quality, free downloader' },
      { name: 'author', content: 'TikTok Downloader' },
      { property: 'og:title', content: 'TikTok Downloader - Download Videos & Audio | No Watermark' },
      { property: 'og:description', content: 'Download TikTok videos without watermarks in HD quality. Extract MP3 audio from TikTok videos. Fast, free, and no registration required.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'TikTok Downloader - Download Videos & Audio | No Watermark' },
      { name: 'twitter:description', content: 'Download TikTok videos without watermarks in HD quality. Extract MP3 audio from TikTok videos. Fast, free, and no registration required.' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { name: 'theme-color', content: '#8B5CF6' },
    ];

    metaTags.forEach(({ name, property, content }) => {
      const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
      let meta = document.querySelector<HTMLMetaElement>(selector);
      
      if (!meta) {
        meta = document.createElement('meta');
        if (name) meta.name = name;
        if (property) meta.setAttribute('property', property);
        document.getElementsByTagName('head')[0].appendChild(meta);
      }
      
      meta.content = content;
    });

    // Add structured data for better SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "TikTok Downloader",
      "description": "Download TikTok videos without watermarks in HD quality. Extract MP3 audio from TikTok videos.",
      "url": window.location.origin,
      "applicationCategory": "MultimediaApplication",
      "operatingSystem": "Any",
      "browserRequirements": "Requires JavaScript",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    };

    let scriptTag = document.querySelector('script[type="application/ld+json"]');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.type = 'application/ld+json';
      document.getElementsByTagName('head')[0].appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);

  }, []);

  return null; // This component doesn't render anything
};

export default FaviconManager;