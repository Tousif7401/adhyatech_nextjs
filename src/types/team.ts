export interface Team {
  id: number;

  name: string;
  designation: string;
  bio: string;

  photo?: string;

  linkedin?: string;
  twitter?: string;
  github?: string;

  position: number;
  status: boolean;
  trash: boolean;

  created_at: string;
  updated_at: string;
}