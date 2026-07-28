import { useState } from 'react';
import { Check, Share2 } from 'lucide-react';

type SocialShareButtonsProps = {
  url: string;
  title: string;
};

export function SocialShareButtons({ url, title }: SocialShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareStory = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt('Copy this link', url);
    }
  };

  return (
    <button
      type="button"
      onClick={shareStory}
      aria-label="Share this story"
      title="Share this story"
      className="inline-flex h-10 items-center gap-2 border border-gray-300 bg-white px-4 text-xs font-semibold text-gray-700 transition-colors hover:border-black hover:text-black"
    >
      {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
      <span>{copied ? 'Link copied' : 'Share story'}</span>
    </button>
  );
}
