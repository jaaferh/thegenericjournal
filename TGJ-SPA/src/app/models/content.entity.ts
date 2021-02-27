import { Container } from './container.entity';

export interface Content {
  _id: string;
  container: Container[];
  last_edited: Date;
}
