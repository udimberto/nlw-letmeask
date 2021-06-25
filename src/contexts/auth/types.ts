export type UserType = {
  id?: string;
  name?: string;
  avatar?: string;
}

export type AuthContextType = {
  user: UserType | undefined;
  afterLogin: (callback: Function) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
}
