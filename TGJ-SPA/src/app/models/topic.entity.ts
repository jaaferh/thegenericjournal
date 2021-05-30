import { Post } from './post.entity';

export interface Topic {
  _id: string;
  name: string;
}

export interface TopicsPosts {
  topics: Topic[];
  posts: Post[];
}

export interface TopicDetails {
  topic: Topic;
  topic_posts: Post[];
}
