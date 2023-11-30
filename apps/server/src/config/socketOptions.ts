import { corsOptions } from './corsOptions';

export const socketOptions = {
  
  cors: {
    origin: corsOptions.origin,
    allowedHeaders: [],
    credentials: true,
  },
};
