import { Share2, Mail, Rss } from 'lucide-react';

export function SiteFooter() {
  return (
    <footer className="bg-white border-t-4 border-black pt-16 pb-8">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">

          {/* Brand Col */}
          <div className="md:col-span-4">
            <a href="/" className="font-serif font-bold text-3xl tracking-tight block mb-4 hover:text-editorial transition-colors">
              ProfileBizz India
            </a>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-xs">
              The authoritative voice covering Bharat's new economy. Curated narratives for the ambitious.
            </p>
            <div className="flex gap-4">
              <button aria-label="Share" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-black hover:text-editorial transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
              <button aria-label="Email" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-black hover:text-editorial transition-colors">
                <Mail className="w-4 h-4" />
              </button>
              <button aria-label="RSS" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-black hover:text-editorial transition-colors">
                <Rss className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Company */}
          <div className="md:col-span-2">
            <h5 className="text-xs font-bold tracking-widest uppercase mb-4 text-black">Company</h5>
            <ul className="flex flex-col gap-3">
              <li><a href="/" className="text-sm text-muted-foreground hover:text-editorial transition-colors">About Us</a></li>
              <li><a href="mailto:editorial@profilebizz.com" className="text-sm text-muted-foreground hover:text-editorial transition-colors">Contact Editorial</a></li>
              <li><a href="mailto:careers@profilebizz.com" className="text-sm text-muted-foreground hover:text-editorial transition-colors">Careers</a></li>
              <li><a href="mailto:advertise@profilebizz.com" className="text-sm text-muted-foreground hover:text-editorial transition-colors">Advertise</a></li>
            </ul>
          </div>

          {/* Explore */}
          <div className="md:col-span-3">
            <h5 className="text-xs font-bold tracking-widest uppercase mb-4 text-black">Explore</h5>
            <div className="grid grid-cols-2 gap-3">
              <ul className="flex flex-col gap-3">
                <li><a href="/" className="text-sm text-muted-foreground hover:text-editorial transition-colors">Founder Story</a></li>
                <li><a href="/social-hero" className="text-sm text-muted-foreground hover:text-editorial transition-colors">Social Hero</a></li>
                <li><a href="/women-story" className="text-sm text-muted-foreground hover:text-editorial transition-colors">Women Founder</a></li>
              </ul>
              <ul className="flex flex-col gap-3">
                <li><a href="/#categories" className="text-sm text-muted-foreground hover:text-editorial transition-colors">Bengaluru</a></li>
                <li><a href="/#categories" className="text-sm text-muted-foreground hover:text-editorial transition-colors">Mumbai</a></li>
                <li><a href="/#categories" className="text-sm text-muted-foreground hover:text-editorial transition-colors">Delhi NCR</a></li>
              </ul>
            </div>
          </div>

          {/* Categories */}
          <div className="md:col-span-3">
            <h5 className="text-xs font-bold tracking-widest uppercase mb-4 text-black">Categories</h5>
            <div className="grid grid-cols-2 gap-3">
              <ul className="flex flex-col gap-3">
                <li><a href="/" className="text-sm text-muted-foreground hover:text-editorial transition-colors">Bharat Tech</a></li>
                <li><a href="/" className="text-sm text-muted-foreground hover:text-editorial transition-colors">FinTech Pulse</a></li>
                <li><a href="/" className="text-sm text-muted-foreground hover:text-editorial transition-colors">D2C Markets</a></li>
                <li><a href="/social-hero" className="text-sm text-muted-foreground hover:text-editorial transition-colors">Rural Heroes</a></li>
              </ul>
              <ul className="flex flex-col gap-3">
                <li><a href="/" className="text-sm text-muted-foreground hover:text-editorial transition-colors">Founders</a></li>
                <li><a href="/" className="text-sm text-muted-foreground hover:text-editorial transition-colors">WealthTech</a></li>
                <li><a href="/" className="text-sm text-muted-foreground hover:text-editorial transition-colors">Agritech</a></li>
                <li><a href="/social-hero" className="text-sm text-muted-foreground hover:text-editorial transition-colors">Social Impact</a></li>
              </ul>
            </div>
          </div>

          {/* Legal */}
          <div className="md:col-span-12 border-t border-border pt-8 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <ul className="flex gap-6">
              <li><a href="mailto:legal@profilebizz.com" className="text-xs text-muted-foreground hover:text-editorial transition-colors">Privacy Policy</a></li>
              <li><a href="mailto:legal@profilebizz.com" className="text-xs text-muted-foreground hover:text-editorial transition-colors">Terms of Service</a></li>
              <li><a href="mailto:legal@profilebizz.com" className="text-xs text-muted-foreground hover:text-editorial transition-colors">Cookie Policy</a></li>
            </ul>
            <p className="text-xs text-muted-foreground text-center">© {new Date().getFullYear()} ProfileBizz India. All rights reserved.</p>
            <p className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground text-right">MUMBAI · BENGALURU · DELHI NCR</p>
          </div>

        </div>
      </div>
    </footer>
  );
}
