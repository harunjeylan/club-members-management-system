import { PrismaClient } from '@prisma/client';
import exclude from '../utils/exclude';
const prisma = new PrismaClient().$extends({
  client: {
    $exclude: exclude,
  },
});

export default prisma