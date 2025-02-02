import React from 'react';
import { Avatar } from '../Avatar/Avatar';
import { Photo } from 'types';

interface PhotoCardProps {
  photo: Photo;
}

export const PhotoCard: React.FC<PhotoCardProps> = ({ photo }) => {
  return (
    <div className="rounded border p-4 shadow-sm">
      <Avatar
        src={photo.thumbnailUrl}
        alt={photo.title}
        className="h-48 w-full object-cover"
      />
      <div className="mt-2">
        <h2 className="text-lg font-bold">{photo.title}</h2>
        <p className="text-sm text-gray-600">Album: {photo.album?.title}</p>
        <p className="text-sm text-gray-600">
          By: {photo.album?.user?.name} ({photo.album?.user?.email})
        </p>
      </div>
    </div>
  );
};
