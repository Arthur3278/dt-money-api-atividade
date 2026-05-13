export type UserWithPassword = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type PublicUser = Omit<UserWithPassword, "password">;

export function toPublicUser(user: UserWithPassword): PublicUser {
  const { password: _password, ...publicUser } = user;
  return publicUser;
}
