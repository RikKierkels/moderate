export interface User {
  readonly id: string;
}

export interface UserWithProfile extends User {
  readonly name: string;
  readonly picture: string;
}
