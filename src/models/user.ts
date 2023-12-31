export interface User {
  id: number;
  username: string;
  avatarUrl: string;
  coverImgUrl: string;
  displayName: string;
  country: string;
  created: string;
  about: string;
  isPrivate: boolean;
}

export interface Avatar {
  url: string;
  type: string;
}
