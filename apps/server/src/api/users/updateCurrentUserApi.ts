import { z } from 'zod';
import prisma from '../../prisma/PrismaClient';
import getFieldsData from '../../../../../libs/utils/getFieldsData';
import { fromZodError } from 'zod-validation-error';

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
          fileModelId: z.string().optional(),
        })
        .optional(),
    });

    //@ts-ignore: Unreachable code error
    const { success, error } = zodSchema.safeParse({...fieldsData, profile});

    if (!success) {
      return res.status(409).json({ errors: fromZodError(error).details });
    }
    const populations = {};
    if (profile) {
      const userProfile = profile;
      
      await prisma.profile.update({
        where: {
          userId: req.user.id,
        },
        data: userProfile,
      });
      populations['profile'] = {
        include: {
          image: true,
        },
      };
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
      .json({ errors: [{ message: error.message }] })
  }
}
