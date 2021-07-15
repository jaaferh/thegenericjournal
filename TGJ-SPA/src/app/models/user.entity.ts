export interface User {
  email: string;
  author: string;
}

export interface UserToken {
  user: User;
  token: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface Register extends Login {
  confirm_pass: string;
  first_name: string;
  family_name: string;
  date_of_birth?: Date;
}