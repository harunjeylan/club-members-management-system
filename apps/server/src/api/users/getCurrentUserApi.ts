import prisma from '../../prisma/PrismaClient';
import getArrayValues from '@libs/utils/getArrayValues';

export default async function getCurrentUserApi(req, res) {
  const { populate } = req.query;
  try {
    let populations = {};
    getArrayValues(populate).forEach((item: string) => {
      if (item === 'roles') {
        populations['roles'] = true;
      }

      if (item === 'profile') {
        populations['profile'] = {
          include: {
            image: true,
          },
        };
      }
      if (item === 'spaces') {
        populations['spaces'] = true;
      }
    });
    const user = await prisma.user.findFirst({
      where: {
        id: req.user.id,
      },
      include: populations,
    });

    if (!user) {
      return res
        .status(404)
        .json({ message: 'User Not Exist', code: 'get-user' });
    }

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
