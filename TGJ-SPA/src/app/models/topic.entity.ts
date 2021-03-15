import { Post } from './post.entity';

export interface Topic {
  _id: string;
  name: string;
}

export interface TopicDetails {
  topic: Topic;
  topic_posts: Post[];
}
