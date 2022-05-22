export interface User {
  id: number;
  login: string;
  githubId: number;
  avatarUrl?: string;
  githubHtmlUrl?: string;
  email?: string;
  name?: string;
  bio?: string;
  createdAt: Date;
}
