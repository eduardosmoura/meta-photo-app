import React from 'react';
import { Avatar } from '../Avatar/Avatar';

interface PhotoCardProps {
  photo: {
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
    album: {
      id: number;
      title: string;
      user: {
        id: number;
        name: string;
        email: string;
      };
    };
  };
}

export const PhotoCard: React.FC<PhotoCardProps> = ({ photo }) => {
  return (
    <div className="border rounded p-4 shadow-sm">
      <Avatar
        src={photo.thumbnailUrl}
        alt={photo.title}
        className="w-full h-48 object-cover"
      />
      <div className="mt-2">
        <h2 className="font-bold text-lg">{photo.title}</h2>
        <p className="text-sm text-gray-600">Album: {photo.album.title}</p>
        <p className="text-sm text-gray-600">
          By: {photo.album.user.name} ({photo.album.user.email})
        </p>
      </div>
    </div>
  );
};
