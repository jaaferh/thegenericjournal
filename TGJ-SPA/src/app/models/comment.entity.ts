export interface Comment {
  _id: string;
  parent_comment?: Comment;
  author_nickname: string;
  text: string;
  date_posted: Date;
  last_edited?: Date;
  likes?: number;
  dislikes?: number;
}

export interface CommentTree {
  parent: Comment;
  children: CommentTree[];
}
