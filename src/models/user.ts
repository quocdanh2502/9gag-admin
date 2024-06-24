
export interface User {
  id: number;
  username: string;
  avatarUrl: string;
  coverImgUrl: string;
  displayName: string;
  country: string;
  blocked: boolean;
  created: string;
  about: string;
  isPrivate: boolean;
}

export interface Avatar {
  url: string;
  type: string;
}

export interface AllUsers {
  size: number;
  number: number;
  content: User[];
  totalPages: number;
}
