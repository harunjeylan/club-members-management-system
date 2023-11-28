import getFieldsData from '@libs/utils/getFieldsData';
import { Contact } from '@prisma/client';
import prisma from 'apps/server/src/prisma/PrismaClient';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

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
      return res.status(409).json({ errors: fromZodError(error).details });
    }
    const contact = await prisma.contact.create({
      data: fieldsData as Contact,
    });
    return res.status(200).json({
      contact: contact,
    });
  } catch (error) {
    ;
    return res
      .status(500)
      .json({ errors: [{ message: error.message }] })
  }
}
