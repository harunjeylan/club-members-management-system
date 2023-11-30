import { getUserFromToken } from '@server/helpers/getUserFromToken';
import prisma from '@server/prisma/PrismaClient';

export default function messagesSocket(socket) {
  socket.on('join', async (roomId: string) => {
    socket.join(roomId);
    socket.nsp.to(socket.id).emit('joined', roomId);
  });
  socket.on('message', async (data: { text: string; roomId: string }) => {
    const user = getUserFromToken(socket.handshake.auth.token ?? '');
    if (!user) {
      return null;
    }
    if (!socket.rooms.has(data.roomId)) {
      return null;
    }
    const message = await prisma.message.create({
      data: {
        text: data.text,
        forumId: data.roomId,
        userId: user.id,
      },
      include: {
        user: {
          include: {
            profile: {
              include: {
                image: true,
              },
            },
          },
        },
        reply: {
          include: {
            user: true,
          },
        },
      },
    });
    socket.nsp.to(data.roomId).emit('message', message);
    // socket.to(clientId).emit('message', message);
  });
  socket.on('error', (err) => {
    if (err && err.message === 'unauthorized event') {
      socket.disconnect();
    }
  });
  socket.on('disconnecting', (reason) => {
    for (const room of socket.rooms) {
      if (room !== socket.id) {
        socket.to(room).emit('user has left', socket.id);
      }
    }
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
}
