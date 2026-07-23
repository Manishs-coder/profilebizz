import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ChevronRight, Loader2 } from 'lucide-react';

interface FounderResult {
  slug: string;
  name: string;
  designation: string;
  photoUrl: string | null;
  profileTag: string | null;
  profileType: string | null;
}

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<FounderResult[]>([]);
  const [allFounders, setAllFounders] = useState<FounderResult[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch all founders once on open
  useEffect(() => {
    if (!open) return;
    setLoading(true);
    fetch('/api/public/founders')
      .then(r => r.ok ? r.json() : [])
      .then((data: FounderResult[]) => {
        setAllFounders(data);
        setResults(data.slice(0, 6));
      })
      .catch(() => setResults([]))
      .finally(() => setLoading(false));
    setTimeout(() => inputRef.current?.focus(), 80);
  }, [open]);

  // Filter locally as user types
  useEffect(() => {
    if (!query.trim()) {
      setResults(allFounders.slice(0, 6));
      return;
    }
    const q = query.toLowerCase();
    setResults(
      allFounders.filter(f =>
        f.name.toLowerCase().includes(q) ||
        (f.designation && f.designation.toLowerCase().includes(q)) ||
        (f.profileType && f.profileType.toLowerCase().includes(q)) ||
        (f.profileTag && f.profileTag.toLowerCase().includes(q))
      ).slice(0, 8)
    );
  }, [query, allFounders]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative w-full max-w-2xl mx-auto mt-16 md:mt-24 px-4">
        <div className="bg-white shadow-2xl">
          {/* Search Input */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-200">
            {loading
              ? <Loader2 className="w-5 h-5 text-gray-400 flex-shrink-0 animate-spin" />
              : <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />}
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search founders, brands, industries…"
              className="flex-1 text-base text-black placeholder:text-gray-400 outline-none bg-transparent"
            />
            <button onClick={onClose} className="text-gray-400 hover:text-black transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto divide-y divide-gray-100">
            {results.length === 0 && !loading && (
              <div className="px-5 py-10 text-center text-sm text-gray-400">
                {query ? `No results for "${query}"` : 'Start typing to search founders…'}
              </div>
            )}
            {results.map(f => (
              <a
                key={f.slug}
                href={`/founder/${f.slug}`}
                onClick={onClose}
                className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50 transition-colors group"
              >
                {f.photoUrl ? (
                  <img src={f.photoUrl} alt={f.name}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0 border border-gray-100" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex-shrink-0 flex items-center justify-center">
                    <span className="text-sm font-bold text-gray-400">{f.name[0]}</span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-black group-hover:text-[#e50b16] transition-colors truncate">{f.name}</p>
                  <p className="text-xs text-gray-500 truncate">{f.designation}</p>
                </div>
                {f.profileTag && (
                  <span className="hidden sm:inline text-[10px] font-bold tracking-widest uppercase bg-[#e50b16] text-white px-2 py-0.5 flex-shrink-0">
                    {f.profileTag}
                  </span>
                )}
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#e50b16] flex-shrink-0 transition-colors" />
              </a>
            ))}
          </div>

          {/* Footer hint */}
          <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between">
            <span className="text-[11px] text-gray-400">{allFounders.length} profiles indexed</span>
            <span className="text-[11px] text-gray-400">Press <kbd className="bg-gray-100 px-1.5 py-0.5 rounded text-[10px] font-mono">Esc</kbd> to close</span>
          </div>
        </div>
      </div>
    </div>
  );
}
