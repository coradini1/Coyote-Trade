import { Request } from 'express';

export interface RegisterBody {
  name: string;
  surname: string;
  birthdate: string;
  address: string;
  password: string;
  email: string;
}

export interface LoginBody {
  email: string;
  password: string;
  persist: boolean;
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      email: string;
    };
  }
}