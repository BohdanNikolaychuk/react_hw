export enum Status {
  LOADING = 'loading',
  SUCCESS = 'completed',
  ERROR = 'error',
}

export type SuccsesUser = {
  user: { name: string; email: string; role: string };
};

export type State = {
  isAuth: boolean;
  userName: null | string;
  userEmail: null | string;
  userToken?: string | null;
  status: string;
  role: null | string;
  error: string;
};
