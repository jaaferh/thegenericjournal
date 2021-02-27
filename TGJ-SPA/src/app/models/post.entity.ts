import { Author } from './author.entity';
import { Content } from './content.entity';
import { Topic } from './topic.entity';
import { Comment } from './comment.entity';


export interface Post {
  _id: string;
  title: string;
  thumbnail: string;
  author: Author;
  content: Content;
  date_created?: Date;
  topics?: Topic[];
  comments?: Comment[];
}
