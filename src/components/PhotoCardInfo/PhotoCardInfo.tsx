import React from 'react';
import { Photo } from 'types';

interface PhotoCardInfoProps {
  photo: Photo;
  isOpen: boolean;
  toggleModal: () => void;
}

const InfoRow: React.FC<{ label: string; children: React.ReactNode }> = ({
  label,
  children
}) => (
  <p>
    <span className="font-medium">{label}:</span> {children}
  </p>
);

export const PhotoCardInfo: React.FC<PhotoCardInfoProps> = ({
  photo,
  isOpen,
  toggleModal
}) => {
  const { album } = photo;
  const { user } = album ?? { user: null };

  if (!isOpen) {
    return null;
  }

  return (
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
          <InfoRow label="Photo ID">{photo.id}</InfoRow>
          <InfoRow label="Title">{photo.title}</InfoRow>
          <InfoRow label="URL">{photo.url}</InfoRow>
          <InfoRow label="Thumbnail URL">{photo.thumbnailUrl}</InfoRow>
          <InfoRow label="Album ID">{album?.id}</InfoRow>
          <InfoRow label="Album Title">{album?.title}</InfoRow>
          <InfoRow label="User ID">{user?.id}</InfoRow>
          <InfoRow label="User Name">{user?.name}</InfoRow>
          <InfoRow label="Username">{user?.username}</InfoRow>
          <InfoRow label="User Email">{user?.email}</InfoRow>
          <InfoRow label="Address">
            <ul className="ml-6 list-disc">
              <li>
                <span className="font-medium">Street:</span>{' '}
                {user?.address.street}
              </li>
              <li>
                <span className="font-medium">Suite:</span>{' '}
                {user?.address.suite}
              </li>
              <li>
                <span className="font-medium">City:</span> {user?.address.city}
              </li>
              <li>
                <span className="font-medium">Zipcode:</span>{' '}
                {user?.address.zipcode}
              </li>
              <li>
                <span className="font-medium">Geo:</span> lat:{' '}
                {user?.address.geo.lat}, lng: {user?.address.geo.lng}
              </li>
            </ul>
          </InfoRow>
          <InfoRow label="Phone">{user?.phone}</InfoRow>
          <InfoRow label="Website">{user?.website}</InfoRow>
          <InfoRow label="Company">
            <ul className="ml-6 list-disc">
              <li>
                <span className="font-medium">Name:</span> {user?.company.name}
              </li>
              <li>
                <span className="font-medium">Catch Phrase:</span>{' '}
                {user?.company.catchPhrase}
              </li>
              <li>
                <span className="font-medium">BS:</span> {user?.company.bs}
              </li>
            </ul>
          </InfoRow>
        </div>
      </div>
    </div>
  );
};
