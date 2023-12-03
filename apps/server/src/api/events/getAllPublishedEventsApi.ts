import getArrayValues from '@libs/utils/getArrayValues';
import prisma from 'apps/server/src/prisma/PrismaClient';

export default async function getAllPublishedEventsApi(req, res) {
  const { populate } = req.query;
  try {
    let populations = {};
    getArrayValues(populate).forEach((item: string) => {
      if (item === 'space') {
        populations['space'] = true;
      }
      if (item === 'category') {
        populations['category'] = true;
      }
      if (item === 'author') {
        populations['author'] = {
          include: {
            profile: {
              include: {
                image: true,
              },
            },
          },
        };
      }
    });
    const events = await prisma.event.findMany({
      where: { published: true },
      include: populations,
      orderBy: {
        startAt: 'desc',
      },
    });
    return res.status(200).json({
      events: events,
    });
  } catch (error) {
    ;
    return res
      .status(500)
      .json({ errors: [{ message: error.message }] })
  }
}
