import getArrayValues from '@libs/utils/getArrayValues';
import prisma from 'apps/server/src/prisma/PrismaClient';

export default async function getOnePublishedEventApi(req, res) {
  const { eventId } = req.params;
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
    });
    const event = await prisma.event.findFirst({
      where: { id: eventId, published: true },
      include: populations,
    });
    if (!event) {
      return res.sendStatus(404)
    }
    return res.status(200).json({
      event: event,
    });
  } catch (error) {
    ;
    return res
      .status(500)
      .json({ errors: [{ message: error.message }] })
  }
}
