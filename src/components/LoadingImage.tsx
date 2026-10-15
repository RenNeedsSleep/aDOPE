import React, { useEffect, useRef, useState } from 'react';
import { motion, type MotionStyle } from 'motion/react';

type ImageLoadingState = 'loading' | 'loaded' | 'error';

interface ImageSkeletonProps {
  className?: string;
}

export const ImageSkeleton: React.FC<ImageSkeletonProps> = ({ className = '' }) => (
  <span
    aria-hidden="true"
    className={`image-skeleton-shimmer pointer-events-none absolute inset-0 block bg-[linear-gradient(110deg,#101010_8%,#262626_18%,#101010_33%)] bg-[length:220%_100%] ${className}`}
  />
);

interface LoadingImageProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  loading?: 'eager' | 'lazy';
  fetchPriority?: 'high' | 'low' | 'auto';
  style?: MotionStyle;
}

export const LoadingImage: React.FC<LoadingImageProps> = ({
  src,
  alt,
  className = '',
  imageClassName = '',
  loading = 'lazy',
  fetchPriority = 'low',
  style,
}) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [state, setState] = useState<ImageLoadingState>('loading');

  useEffect(() => {
    setState('loading');
  }, [src]);

  useEffect(() => {
    const image = imageRef.current;
    if (!image?.complete) return;
    setState(image.naturalWidth > 0 ? 'loaded' : 'error');
  }, [src]);

  return (
    <span className={`relative isolate block overflow-hidden bg-neutral-950 ${className}`}>
      <ImageSkeleton className={`z-0 transition-opacity duration-300 ${state === 'loaded' ? 'opacity-0' : 'opacity-100'}`} />
      <motion.img
        ref={imageRef}
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
        aria-hidden={state === 'error' ? true : undefined}
        onLoad={() => setState('loaded')}
        onError={() => setState('error')}
        className={`relative z-10 block ${imageClassName}`}
        style={{ ...style, opacity: state === 'loaded' ? style?.opacity ?? 1 : 0 }}
      />
    </span>
  );
};
