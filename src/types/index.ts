export interface Geo {
  lat: string;
  lng: string;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface Album {
  id: number;
  title: string;
  userId: number;
  user?: User;
}

export interface Photo {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  albumId: number;
  album?: Album;
}
