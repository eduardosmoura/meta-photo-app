import React, { useState } from 'react';
import { Avatar } from '../Avatar/Avatar';
import { Photo } from 'types';
import { PhotoCardInfo } from 'components/PhotoCardInfo/PhotoCardInfo';

interface PhotoCardProps {
  photo: Photo;
}

export const PhotoCard: React.FC<PhotoCardProps> = ({ photo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const { album } = photo;
  const { user } = album ?? { user: null };

  return (
    <div className="rounded border p-4 shadow-sm">
      <Avatar
        src={photo.thumbnailUrl}
        alt={photo.title}
        className="h-48 w-full object-cover"
      />
      <div className="mt-2">
        <h2 className="text-lg font-bold">{photo.title}</h2>
        <p className="text-sm text-gray-600">Album: {album?.title}</p>
        <p className="text-sm text-gray-600">
          By: {user?.name} ({user?.email})
        </p>
        <button
          onClick={toggleModal}
          className="mt-2 rounded bg-[#FFA500] px-4 py-2 text-white hover:bg-[#FFA800]"
        >
          View Details
        </button>
      </div>
      <PhotoCardInfo
        photo={photo}
        isOpen={isModalOpen}
        toggleModal={toggleModal}
      />
    </div>
  );
};
