export interface IUserState {
  loginForm: {
    email: string;
    password: string;
  },
  registerForm: {
    email: string;
    password: string;
    name: string;
  },
  user: {
    _id: string;
    name: string;
    token: string;
  },
  loggedIn: boolean;
  isLoading: boolean;
  responseMessage: string | null;
  hasError: boolean;
}
