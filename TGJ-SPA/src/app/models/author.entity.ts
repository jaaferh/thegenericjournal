import { Post } from './post.entity';

export interface Author {
  _id: string;
  first_name: string;
  family_name: string;
  date_of_birth?: Date;
  bio: string;
  date_joined?: Date;
  pic_url?: string;
  name: string;
}

export interface AuthorDetails {
  author: Author;
  author_posts: Post[];
}
