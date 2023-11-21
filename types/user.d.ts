import { FileModel, Profile, Role, User } from '@prisma/client';

export type UserWithRoles = User & {
  roles: Role[];
};
export type UserWithProfile = User & {
  profile: & {
    image: FileModel;
  };
};
export type UserWithProfileAndRoles = User & {
  profile: Profile & {
    image: FileModel;
  };
  roles: Role[];
};
