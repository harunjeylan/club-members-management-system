import { server_host } from '@client/config/host.config';
import { getCookie } from 'cookies-next';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';
type PropsType<T> = {
  roomId: string;
  messages: (T & { id: string | number })[];
};

export default function useConnection<T>(props: PropsType<T>) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [connecting, setConnecting] = useState(true);
  const [connected, setConnected] = useState(false);
  const [counter, setCounter] = useState(0);
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
  }, [pathname, searchParams, counter]);
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    console.log({ connecting, connected });
    if (connecting || !connected) {
      interval = setInterval(() => {
        console.log('reconnecting...');
        setConnected(false);
        setConnecting(true);
        socket.connect();
        setCounter(prev=>prev+1)
      }, 1000 * counter);
      return () => {
        if (interval) {
          clearTimeout(interval);
        }
      };
    }
  }, [connected, connecting, counter]);
  useEffect(() => {
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
    let interval: NodeJS.Timeout | undefined;
    socket.on('connect_error', () => {
      if (connecting || !connected) {
        interval = setInterval(() => {
          console.log('reconnecting...');
          setConnected(false);
          setConnecting(true);
          socket.connect();
          setCounter(prev=>prev+1)
        }, 1000 * counter);
      }
    });
    return () => {
      if (interval) {
        clearTimeout(interval);
      }
    };
  }, [socket, connected, connecting, counter]);
  function sendMessage(text: string) {
    socket.emit('message', {
      roomId: props.roomId,
      text: text,
    });
  }
  return { messages, sendMessage, status: { connecting, connected } };
}
