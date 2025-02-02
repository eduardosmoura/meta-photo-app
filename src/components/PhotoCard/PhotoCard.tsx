import React, { useState } from 'react';
import { Avatar } from '../Avatar/Avatar';
import { Photo } from 'types';

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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative w-full max-w-md rounded bg-white p-6 shadow-lg">
            <button
              onClick={toggleModal}
              className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>
            <h3 className="mb-4 text-xl font-bold">Photo Metadata</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <strong>Photo ID:</strong> {photo.id}
              </p>
              <p>
                <strong>Title:</strong> {photo.title}
              </p>
              <p>
                <strong>URL:</strong> {photo.url}
              </p>
              <p>
                <strong>Thumbnail URL:</strong> {photo.thumbnailUrl}
              </p>
              <p>
                <strong>Album ID:</strong> {album?.id}
              </p>
              <p>
                <strong>Album Title:</strong> {album?.title}
              </p>
              <p>
                <strong>User ID:</strong> {user?.id}
              </p>
              <p>
                <strong>User Name:</strong> {user?.name}
              </p>
              <p>
                <strong>Username:</strong> {user?.username}
              </p>
              <p>
                <strong>User Email:</strong> {user?.email}
              </p>
              <p>
                <strong>Address:</strong>
              </p>
              <ul className="ml-6 list-disc">
                <li>
                  <strong>Street:</strong> {user?.address.street}
                </li>
                <li>
                  <strong>Suite:</strong> {user?.address.suite}
                </li>
                <li>
                  <strong>City:</strong> {user?.address.city}
                </li>
                <li>
                  <strong>Zipcode:</strong> {user?.address.zipcode}
                </li>
                <li>
                  <strong>Geo:</strong> lat: {user?.address.geo.lat}, lng:{' '}
                  {user?.address.geo.lng}
                </li>
              </ul>
              <p>
                <strong>Phone:</strong> {user?.phone}
              </p>
              <p>
                <strong>Website:</strong> {user?.website}
              </p>
              <p>
                <strong>Company:</strong>
              </p>
              <ul className="ml-6 list-disc">
                <li>
                  <strong>Name:</strong> {user?.company.name}
                </li>
                <li>
                  <strong>Catch Phrase:</strong> {user?.company.catchPhrase}
                </li>
                <li>
                  <strong>BS:</strong> {user?.company.bs}
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
