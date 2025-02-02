import React from 'react';
import { toast } from 'react-toastify';

interface AvatarProps {
  src: string;
  alt: string;
  className?: string;
}

const placeholderImage = '/assets/logo.svg';

export const Avatar: React.FC<AvatarProps> = ({ src, alt, className }) => {
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.src = placeholderImage;
    const message = `Image load failed for: ${alt}`;
    toast.error(message);
    console.error(message);
  };

  return (
    <img src={src} alt={alt} className={className} onError={handleImageError} />
  );
};
