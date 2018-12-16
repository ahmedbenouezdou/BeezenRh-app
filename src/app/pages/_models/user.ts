import { Address } from "./address";

export class User {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: String;
  numtel: number;
  codereset: number;
  datereset: Date;
  company: String;
  address?: Address;
  about: String;
  post: String;
  facebookLink: String;
  likendinLink: String;
  googleplusLink: String;
}
