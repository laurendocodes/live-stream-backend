export interface ExpressRequest extends Request {
  user: JWTUser;
}


export type JWTUser = {
  id: string;
  email: string;
  isActive: boolean;
}