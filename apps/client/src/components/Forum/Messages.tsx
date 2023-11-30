'use client';

import useConnection from '@client/libs/socket/messages/useConnection';
import { Forum } from '@prisma/client';
import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { MessageWithAll } from 'types/message';
import MessageCard from './MessageCard';
import MessageForm from './MessageForm';

type PropsType = {
  forum: Forum & { messages: MessageWithAll[] };
};

export default function Messages({ forum }: PropsType) {
  const textInputRef = useRef<HTMLInputElement>(null);
  const messageListRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, status } = useConnection<MessageWithAll>({
    messages: forum.messages,
    roomId: forum.id,
  });
  useLayoutEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (textInputRef.current) {
      sendMessage(textInputRef.current.value);
      textInputRef.current.value = '';
    }
  }
  return (
    <>
      <div className=" w-full">
        {status.connected ? (
          <div className="w-full flex  py-2 px-4 bg-success-500 mb-2">
            <div className="w-full max-w-7xl mx-auto">{forum.title}</div>
          </div>
        ) : status.connecting ? (
          <div className="w-full flex py-2 px-4 bg-warning-500 mb-2">
            <div className="w-full max-w-7xl mx-auto">connecting ...</div>
          </div>
        ) : (
          <div className="w-full flex py-2 px-4 bg-error-500 mb-2">
            <div className="w-full max-w-7xl mx-auto">disconnected</div>
          </div>
        )}
      </div>
      <div className="w-full max-w-7xl mx-auto h-[calc(100vh_-_120px)] overflow-y-auto px-4">
        <div ref={messageListRef} className="flex flex-col gap-8 py-16">
          {messages.map((message) => (
            <MessageCard key={message.id} message={message} />
          ))}
        </div>
        <div className="sticky bottom-4 w-auto">
          <MessageForm inputRef={textInputRef} onSubmit={handleSubmit} />
        </div>
      </div>
    </>
  );
}
