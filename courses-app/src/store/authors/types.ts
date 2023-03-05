import { IAuthors } from '../../@types/IAuthors';

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'completed',
  ERROR = 'error',
}

export type State = {
  authorsList: IAuthors[];
  status: string;
  error: string;
};
