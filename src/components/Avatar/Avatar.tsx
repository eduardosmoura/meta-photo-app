import React from 'react';

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
    console.error(`Image load failed for: ${alt}`);
  };

  return (
    <img src={src} alt={alt} className={className} onError={handleImageError} />
  );
};
