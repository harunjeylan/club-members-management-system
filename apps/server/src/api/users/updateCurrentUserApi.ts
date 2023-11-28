import { z } from 'zod';
import prisma from '../../prisma/PrismaClient';
import getFieldsData from '../../../../../libs/utils/getFieldsData';

export default async function updateCurrentUserApi(req, res) {
  const fields = ['username', 'first_name', 'last_name', 'email'];
  const fieldsData = getFieldsData(req.body, fields);
  const { profile } = req.body;
  try {
    const zodSchema = z.object({
      username: z.string().optional(),
      first_name: z.string().optional(),
      last_name: z.string().optional(),
      email: z.string().email().optional(),
      profile: z
        .object({
          bio: z.string().optional(),
          image: z.string().optional(),
        })
        .optional(),
    });

    //@ts-ignore: Unreachable code error
    const { success, error } = zodSchema.safeParse({...fieldsData, profile});

    if (!success) {
      return res.status(409).json({
        message: 'Invalid Data',
        details: error.issues,
        code: 'register-user',
      });
    }
    const populations = {};
    if (profile) {
      const userProfile = profile;
      if (profile['image']) {
        profile['image'] = {
          connect: { id: profile['image'] },
        };
      }
      await prisma.profile.update({
        where: {
          userId: req.user.id,
        },
        data: userProfile,
      });
      populations['profile'] = true;
    }

    const user = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: fieldsData,
      include: populations,
    });

    return res.status(200).json({
      user: prisma.$exclude(user, ['password']),
    });
  } catch (error) {
    ;
    return res
      .status(500)
      .json({ message: error.message, code: 'update-user' });
  }
}
