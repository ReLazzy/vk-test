export interface ReseivedPostType {
  username: string;
  name: string;
  lastname: string;
  profilePicture: string;
  userId: string;
  _id: string;
  desc?: string;
  image?: string;
  likes: string[];
  createdAt: Date;
}
