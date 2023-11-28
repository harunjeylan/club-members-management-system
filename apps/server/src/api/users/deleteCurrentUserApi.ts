import prisma from '../../prisma/PrismaClient';

export default async function deleteCurrentUserApi(req, res) {
  try {
    await prisma.user.delete({
      where: {
        id: req.user.id,
      },
    });

    return res.status(200).json({
      message: 'User deleted successfully',
    });
  } catch (error) {
    ;
    return res
      .status(500)
      .json({ message: error.message, code: 'delete-current-user' });
  } 
}
