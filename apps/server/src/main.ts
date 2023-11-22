import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import formidableMiddleware from 'express-formidable';

import { corsOptions } from './config/corsOptions';
import authRouter from './router/authRouter';
import usersRouter from './router/usersRouter';
import spacesRouter from './router/spacesRouter';
import filesRouter from './router/filesRouter';
import rolesRouter from './router/rolesRouter';

dotenv.config();

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.get('/', async (req, res) => {
  try {
    const filePath = path.join(__dirname, 'assets', 'index.html');
    res.status(200).sendFile(filePath);
  } catch (error) {
    console.log(error);
    res.status(400).send({ details: error, code: 'get_files_details' });
  }
});
app.use('/auth', authRouter);
app.use('/files', formidableMiddleware(), filesRouter);
app.use('/users', usersRouter);
app.use('/roles', rolesRouter);
app.use('/spaces', spacesRouter);

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);
