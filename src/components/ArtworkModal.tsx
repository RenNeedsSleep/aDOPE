import React from 'react';
import { Artwork } from '../types';
import { X, Tag, Calendar, User } from 'lucide-react';

interface ArtworkModalProps {
  artwork: Artwork | null;
  onClose: () => void;
}

export const ArtworkModal: React.FC<ArtworkModalProps> = ({ artwork, onClose }) => {
  if (!artwork) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-6 bg-black/90 backdrop-blur-xl animate-fade-in-up overflow-hidden">
      <div className="bg-black border border-white/20 max-w-4xl w-full relative max-h-[calc(100dvh-1rem)] sm:max-h-[calc(100dvh-3rem)] flex flex-col overflow-hidden shadow-2xl">
        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white z-20" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white z-20" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white z-20" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white z-20" />

        {/* Header Bar */}
        <div className="sticky top-0 z-30 flex items-center justify-between gap-3 p-3 sm:p-6 border-b border-white/10 bg-black shrink-0">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 bg-white/5 px-2.5 py-1 border border-white/10">
              {artwork.category}
            </span>
            <span className="font-mono text-xs text-neutral-500 hidden sm:inline-block">
              ID: {artwork.id.toUpperCase()}
            </span>
          </div>

          <button
            onClick={onClose}
            className="min-h-11 min-w-11 font-mono text-xs uppercase tracking-widest text-white border border-white/40 hover:border-white px-3.5 py-2 transition-colors flex items-center justify-center gap-1.5 shrink-0"
          >
            <X className="w-4 h-4" /> Close
          </button>
        </div>

        {/* Content Layout */}
        <div className="p-3 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 overflow-y-auto overscroll-contain min-h-0">
          {/* Main Image View */}
          <div className="lg:col-span-7 bg-[#0A0A0A] border border-white/10 overflow-hidden relative flex items-center justify-center">
            <img
              src={artwork.imageUrl}
              alt={artwork.title}
              decoding="async"
              className="w-full h-auto max-h-[500px] object-contain"
            />
          </div>

          {/* Details Sidebar */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-white tracking-[-0.06em] mb-2">
                {artwork.title}
              </h2>

              <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400 mb-6 font-mono pb-4 border-b border-white/10">
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-neutral-500" />
                  {artwork.artistName}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                  {artwork.year}
                </span>
              </div>

              <p className="text-sm text-neutral-300 leading-relaxed font-sans mb-6">
                {artwork.description}
              </p>

              {/* Technical Specifications */}
              {artwork.specs && artwork.specs.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-2 font-semibold">
                    Technical Specifications
                  </h4>
                  <ul className="space-y-1.5">
                    {artwork.specs.map((spec, idx) => (
                      <li key={idx} className="font-mono text-xs text-neutral-300 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-white shrink-0" />
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tags */}
              <div className="mb-6">
                <h4 className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-2 font-semibold">
                  Metadata Tags
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {artwork.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="font-mono text-[10px] uppercase bg-white/5 text-neutral-300 px-2.5 py-1 border border-white/10 flex items-center gap-1"
                    >
                      <Tag className="w-2.5 h-2.5 text-neutral-500" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
