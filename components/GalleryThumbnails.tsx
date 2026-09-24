'use client';

import { useState } from 'react';

interface GalleryThumbnailsProps {
  images: string[];
  title: string;
}

export default function GalleryThumbnails({ images, title }: GalleryThumbnailsProps) {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  if (!images || images.length === 0) return null;

  return (
    <div className="detail-gallery-showcase">
      <div className="detail-main-img">
        <img src={images[activeIdx]} alt={`${title} - Foto ${activeIdx + 1}`} />
      </div>
      {images.length > 1 && (
        <div className="detail-thumbnails">
          {images.map((img, idx) => (
            <div
              key={idx}
              className={`detail-thumb ${activeIdx === idx ? 'active' : ''}`}
              onClick={() => setActiveIdx(idx)}
            >
              <img src={img} alt={`Thumbnail ${idx + 1}`} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
