export const samplePhoto = {
  id: 1,
  title: 'Sample Photo',
  url: 'http://example.com/photo.jpg',
  thumbnailUrl: 'http://example.com/thumb.jpg',
  albumId: 1,
  album: {
    id: 1,
    title: 'Sample Album',
    userId: 1,
    user: {
      id: 1,
      name: 'John Doe',
      username: 'johndoe',
      email: 'john@example.com',
      address: {
        street: 'Main St',
        suite: 'Apt. 1',
        city: 'Anytown',
        zipcode: '12345',
        geo: { lat: '0.0', lng: '0.0' }
      },
      phone: '123-456-7890',
      website: 'example.com',
      company: {
        name: 'Example Inc.',
        catchPhrase: 'We deliver',
        bs: 'business stuff'
      }
    }
  }
};

export const mockPhotos = [
  {
    id: 1,
    title: 'Test Photo 1',
    url: 'http://example.com/photo1.jpg',
    thumbnailUrl: 'http://example.com/thumb1.jpg',
    album: {
      id: 10,
      title: 'Test Album 1',
      user: {
        id: 100,
        name: 'User One',
        email: 'user1@example.com'
      }
    }
  },
  {
    id: 2,
    title: 'Test Photo 2',
    url: 'http://example.com/photo2.jpg',
    thumbnailUrl: 'http://example.com/thumb2.jpg',
    album: {
      id: 20,
      title: 'Test Album 2',
      user: {
        id: 200,
        name: 'User Two',
        email: 'user2@example.com'
      }
    }
  }
];
