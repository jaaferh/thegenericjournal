import { Post } from './post.entity';

export interface Container {
  _id: string;
  post: Post;
  type: string;
  title?: string;
  text?: string;
  image_url?: string;
  caption?: string;
}
