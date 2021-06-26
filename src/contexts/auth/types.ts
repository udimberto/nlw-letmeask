import { UserType } from 'types'

export type AuthContextType = {
  user: UserType | undefined;
  loading: boolean;
  afterLogin: (callback: Function) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
}
