import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { kamenRiderImageValidationSchema } from 'validationSchema/kamen-rider-images';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.kamen_rider_image
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getKamenRiderImageById();
    case 'PUT':
      return updateKamenRiderImageById();
    case 'DELETE':
      return deleteKamenRiderImageById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getKamenRiderImageById() {
    const data = await prisma.kamen_rider_image.findFirst(convertQueryToPrismaUtil(req.query, 'kamen_rider_image'));
    return res.status(200).json(data);
  }

  async function updateKamenRiderImageById() {
    await kamenRiderImageValidationSchema.validate(req.body);
    const data = await prisma.kamen_rider_image.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteKamenRiderImageById() {
    const data = await prisma.kamen_rider_image.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
