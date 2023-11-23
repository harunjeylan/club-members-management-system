import { z } from 'zod';
import prisma from '../../prisma/PrismaClient';
import getFieldsData from '../../../../../libs/utils/getFieldsData';

export default async function updateCurrentUserApi(req, res) {
  const fields = ['username', 'first_name', 'last_name', 'email'];
  const fieldsData = getFieldsData(req.body, fields);
  const { profile } = req.body;
  try {
    const zodSchema = z.object({
      username: z.string().min(3).or(z.undefined()),
      first_name: z.string().min(3).or(z.undefined()),
      last_name: z.string().or(z.undefined()),
      email: z.string().email().or(z.undefined()),
      profile: z
        .object({
          bio: z.string().or(z.undefined()),
          image: z.string().or(z.undefined()),
        })
        .or(z.undefined()),
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
    const populate = {};
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
      populate['profile'] = true;
    }

    const user = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: fieldsData,
      include: populate,
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
