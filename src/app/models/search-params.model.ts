import { User } from './user.model';

export interface SearchParams {
  data: User[];
  filter: string;
}
