import { useState } from 'react';
import { Check, Facebook, Link2, Linkedin, MessageCircle, Twitter } from 'lucide-react';

type SocialShareButtonsProps = {
  url: string;
  title: string;
};

export function SocialShareButtons({ url, title }: SocialShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedMessage = encodeURIComponent(`${title}\n${url}`);
  const links = [
    {
      label: 'WhatsApp',
      href: `https://wa.me/?text=${encodedMessage}`,
      icon: MessageCircle,
      className: 'hover:bg-[#25D366] hover:border-[#25D366] hover:text-white',
    },
    {
      label: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: Facebook,
      className: 'hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white',
    },
    {
      label: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: Linkedin,
      className: 'hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:text-white',
    },
    {
      label: 'X',
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      icon: Twitter,
      className: 'hover:bg-black hover:border-black hover:text-white',
    },
  ];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt('Copy this link', url);
    }
  };

  return (
    <aside
      aria-label="Share this story"
      className="fixed bottom-3 left-1/2 z-[70] flex max-w-[calc(100vw-1rem)] -translate-x-1/2 items-center gap-1 rounded-full border border-gray-200 bg-white/95 p-1.5 shadow-xl backdrop-blur md:bottom-6"
    >
      <span className="hidden pl-3 pr-2 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-500 sm:block">
        Share
      </span>
      {links.map(({ label, href, icon: Icon, className }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${label}`}
          title={`Share on ${label}`}
          className={`flex h-10 items-center gap-1.5 rounded-full border border-gray-200 px-3 text-xs font-semibold text-gray-700 transition-colors ${className}`}
        >
          <Icon className="h-4 w-4" />
          <span className="hidden lg:inline">{label}</span>
        </a>
      ))}
      <button
        type="button"
        onClick={copyLink}
        aria-label="Copy story link"
        title="Copy story link"
        className="flex h-10 items-center gap-1.5 rounded-full border border-gray-200 px-3 text-xs font-semibold text-gray-700 transition-colors hover:border-editorial hover:bg-editorial hover:text-white"
      >
        {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
        <span className="hidden lg:inline">{copied ? 'Copied' : 'Copy'}</span>
      </button>
    </aside>
  );
}
