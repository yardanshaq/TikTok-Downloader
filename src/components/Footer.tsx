export default function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">
            © 2025 TikTok Downloader. All rights reserved.
          </p>
          <div className="max-w-2xl mx-auto text-sm text-muted-foreground">
            <p className="mb-2">
              <strong>Disclaimer:</strong> This tool is for personal use only. Please respect content creators' rights and TikTok's terms of service.
            </p>
            <p>
              We do not store or host any downloaded content. All downloads are processed directly between you and TikTok's servers.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}