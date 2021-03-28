import { Post } from './post.entity';

export interface Comment {
  _id: string;
  post: Post;
  parent_comment?: Comment;
  author_nickname: string;
  text: string;
  date_posted: Date;
  last_edited?: Date;
  likes?: number;
  dislikes?: number;
}

export interface CommentTree {
  thisComment: Comment;
  children: CommentTree[];
}
