import { Forum, Message, User } from '@prisma/client';
import { UserWithProfile } from './user';

export type MessageWithAll = Message & {
  forum: Forum;
  reply: Message & {
    user: User;
  };
  user: UserWithProfile;
};
