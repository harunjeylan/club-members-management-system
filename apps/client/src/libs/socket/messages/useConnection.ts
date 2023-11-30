import { server_host } from '@client/config/host.config';
import { getCookie } from 'cookies-next';
import { useLayoutEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';
type PropsType<T> = {
  roomId: string;
  messages: (T & { id: string | number })[];
};

export default function useConnection<T>(props: PropsType<T>) {
  const [connecting, setConnecting] = useState(true);
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState<(T & { id: string | number })[]>(
    props.messages
  );
  const token = getCookie('token');
  const socket = useMemo(() => {
    return io(`${server_host}/messages/`, {
      auth: {
        token: token,
      },
    });
  }, []);
  useLayoutEffect(() => {
    socket.on('connect', () => {
      setConnecting(true);
      socket.emit('join', props.roomId);
      socket.on('joined', (forumId) => {
        setConnected(true);
        setConnecting(false);
      });
      socket.on('message', (data: T & { id: string | number }) => {
        setMessages((preMessages: (T & { id: string | number })[]) => {
          return [
            ...preMessages.filter((message) => message.id !== data.id),
            data,
          ];
        });
      });
      socket.on('error', () => {
        socket.disconnect();
      });
      socket.on('disconnect', () => {
        setConnected(false);
        setConnecting(false);
      });
    });
    socket.on('connect_error', () => {
      setTimeout(() => {
        setConnected(false);
        setConnecting(true);
        socket.connect();
      }, 1000);
    });
  }, [socket]);
  function sendMessage(text: string) {
    socket.emit('message', {
      roomId: props.roomId,
      text: text,
    });
  }
  return { messages, sendMessage, status: { connecting, connected } };
}
