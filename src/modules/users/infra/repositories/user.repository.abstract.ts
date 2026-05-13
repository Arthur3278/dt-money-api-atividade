export type UserRecord = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type CreateUserRepositoryData = {
  name: string;
  email: string;
  password: string;
};

export type UpdateUserRepositoryData = {
  name?: string;
  email?: string;
  password?: string;
};

export abstract class IUserRepository {
  abstract create(data: CreateUserRepositoryData): Promise<UserRecord>;
  abstract update(
    id: string,
    data: UpdateUserRepositoryData,
  ): Promise<UserRecord>;
  abstract findById(id: string): Promise<UserRecord>;
  abstract findByEmail(email: string): Promise<UserRecord>;
  abstract delete(id: string): Promise<void>;
}
