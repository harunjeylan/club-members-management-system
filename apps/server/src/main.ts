import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import { corsOptions } from './config/corsOptions';
import prisma from './prisma/PrismaClient';
import authRouter from './router/authRouter';
import blogsRouter from './router/blogsRouter';
import categoriesRouter from './router/categoriesRouter';
import contactsRouter from './router/contactsRouter';
import dashboardRouter from './router/dashboardRouter';
import eventsRouter from './router/eventsRouter';
import filesRouter from './router/filesRouter';
import forumsRouter from './router/forumsRouter';
import rolesRouter from './router/rolesRouter';
import spacesRouter from './router/spacesRouter';
import usersRouter from './router/usersRouter';
import messagesSocket from './socket/messages/messagesSocket';
import { socketOptions } from './config/socketOptions';
dotenv.config();
const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static('uploads'));

app.use('/auth', authRouter);
app.use('/files', filesRouter);
app.use('/users', usersRouter);
app.use('/roles', rolesRouter);
app.use('/spaces', spacesRouter);
app.use('/events', eventsRouter);
app.use('/forums', forumsRouter);
app.use('/blogs', blogsRouter);
app.use('/categories', categoriesRouter);
app.use('/dashboard', dashboardRouter);
app.use('/contacts', contactsRouter);

const port = process.env.PORT || 8080;
const httpServer = http.createServer(app);

const io = new Server(httpServer, socketOptions);
io.of('/messages/').on('connection', messagesSocket);

httpServer.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
httpServer.on('error', (error) => {
  console.error(error);
  prisma.$disconnect();
});
httpServer.on('close', () => {
  prisma.$disconnect();
});
