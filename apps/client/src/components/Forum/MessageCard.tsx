import formatDateTime from '@client/utils/formatDateTime';
import { Message } from '@prisma/client';
import { MessageWithAll } from 'types/message';
import React from 'react';
import { FaUserAlt } from 'react-icons/fa';
import Image from 'next/image';
import getFileUrl from '@client/helpers/getFileUrl';
import Link from 'next/link';

export default function MessageCard({ message }: { message: MessageWithAll }) {
  return (
    <div className="flex gap-4">
      <div className="mt-6">
        {!!message.user?.profile?.image ? (
          <Image
            src={getFileUrl(message.user?.profile?.image)}
            alt={message.user.username}
            width={100}
            height={100}
            className="h-8 w-8 aspect-square rounded-full"
          />
        ) : (
          <FaUserAlt size={20} />
        )}
      </div>
      <div className="w-full ">
        {!!message.createdAt && (
          <small>{formatDateTime(message.createdAt)}</small>
        )}
        <div className="px-2 py-1 rounded-lg bg-secondary-100 dark:bg-secondary-900  after:bg-primary-500 shadow-lg">
          <Link href={`/users/${message.user.id}`} className="link-text">
            {message.user.username}
          </Link>
          <div className="py-2">{message.text}</div>
        </div>
      </div>
    </div>
  );
}
