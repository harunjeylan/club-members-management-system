import { FileModel, Profile, Role, Space, User } from '@prisma/client';

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

export type UserWithAll = User & {
  profile: Profile & {
    image: FileModel;
  };
  roles: Role[];
  spaces: Space[];
};
