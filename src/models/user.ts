export interface User {
  id: number;
  username: string;
  avatarUrl: string;
  displayName: string;
  country: string;
  created: string;
  about: string;
}

export interface Avatar {
  url: string;
  type: string;
}
