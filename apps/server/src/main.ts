import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import formidableMiddleware from 'express-formidable';
import { corsOptions } from './config/corsOptions';
import authRouter from './router/authRouter';
import eventsRouter from './router/eventsRouter';
import filesRouter from './router/filesRouter';
import rolesRouter from './router/rolesRouter';
import spacesRouter from './router/spacesRouter';
import usersRouter from './router/usersRouter';

dotenv.config();

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.use('/auth', authRouter);
app.use('/files', formidableMiddleware(), filesRouter);
app.use('/users', usersRouter);
app.use('/roles', rolesRouter);
app.use('/spaces', spacesRouter);
app.use('/events', eventsRouter);

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);
