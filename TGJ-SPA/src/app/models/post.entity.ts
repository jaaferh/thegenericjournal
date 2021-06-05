import { Author } from './author.entity';
import { Topic } from './topic.entity';
import { Comment } from './comment.entity';
import { Container } from './container.entity';


export interface Post {
  _id: string;
  title: string;
  thumbnail: string;
  author: Author;
  summary: string;
  content: {
    containers: Container[];
    last_edited: Date;
  };
  date_created?: Date;
  topics?: Topic[];
  comments?: Comment[];
}

export interface PostFilter {
  topics?: Topic[];
  authorName?: string;
  dateFrom?: Date;
  dateTo?: Date;
}