import { Category, Blog, FileModel, Space } from '@prisma/client';
import { UserWithProfile } from './user';

export type BlogWithAll = Blog & {
  category: Category;
  space: Space;
  image: FileModel;
  author: UserWithProfile;
};
