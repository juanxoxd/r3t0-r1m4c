import { UserInfo } from "./user.interface";

export interface CustomRequest extends Request {
  user: UserInfo;
}
