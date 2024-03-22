import config from '@/configs/env';
import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketIo = io(config.queueServer.origin, {
      reconnection: true,
      upgrade: true,
      transports: ['websocket', 'polling'],
    });

    setSocket(socketIo);

    // eslint-disable-next-line no-console
    socketIo.on('connect', () => console.log('SocketIO connected'));

    return () => {
      socketIo.disconnect();
    };
  }, []);

  return socket;
};
