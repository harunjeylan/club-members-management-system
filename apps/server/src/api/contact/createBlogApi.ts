import getFieldsData from '@libs/utils/getFieldsData';
import { Contact } from '@prisma/client';
import prisma from 'apps/server/src/prisma/PrismaClient';
import { z } from 'zod';

export default async function createContactApi(req, res) {
  const fields = ['name', 'email', 'phone', 'subject', 'message'];
  const fieldsData = getFieldsData(req.body, fields);

  try {
    const zodSchema = z.object({
      name: z.string(),
      email: z.string().email(),
      subject: z.string(),
      phone: z.string(),
      message: z.string(),
    });

    //@ts-ignore: Unreachable code error
    const { success, error } = zodSchema.safeParse(fieldsData);

    if (!success) {
      return res.status(409).json({
        message: 'Invalid Data',
        details: error.issues,
        code: 'create-event',
      });
    }
    const contact = await prisma.contact.create({
      data: fieldsData as Contact,
    });
    return res.status(200).json({
      contact: contact,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: error.message, code: 'create-user' });
  }
}
