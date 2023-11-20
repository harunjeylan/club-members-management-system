import { z } from 'zod';
import prisma from '../../prisma/PrismaClient';
import getFieldsData from '../../utils/getFieldsData';

export default async function updateCurrentUserApi(req, res) {
  const fields = ['username', 'first_name', 'last_name', 'email'];
  const fieldsData = getFieldsData(req.body, fields);
  try {
    const zodSchema = z.object({
      username: z.string().min(3).nullable(),
      first_name: z.string().min(3).nullable(),
      last_name: z.string().nullable(),
      email: z.string().email().nullable(),
    });

    //@ts-ignore: Unreachable code error
    const { success, error } = zodSchema.safeParse(fieldsData);

    if (!success) {
      return res.status(409).json({
        message: 'Invalid Data',
        details: error.issues,
        code: 'register-user',
      });
    }
    const user = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: fieldsData ,
    });

    return res.status(200).json({
      user: prisma.$exclude(user, ['password']),
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: error.message, code: 'update-user' });
  } 
}
