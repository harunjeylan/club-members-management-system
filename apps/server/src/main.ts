import { corsOptions } from './config/corsOptions';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import authRouter from './router/authRouter';
import eventsRouter from './router/eventsRouter';
import filesRouter from './router/filesRouter';
import rolesRouter from './router/rolesRouter';
import spacesRouter from './router/spacesRouter';
import usersRouter from './router/usersRouter';
import categoriesRouter from './router/categoriesRouter';
import dashboardRouter from './router/dashboardRouter';
import blogsRouter from './router/blogsRouter';
import contactsRouter from './router/contactsRouter';
import forumsRouter from './router/forumsRouter';

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
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);
