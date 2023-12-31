import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { fusedImageValidationSchema } from 'validationSchema/fused-images';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.fused_image
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getFusedImageById();
    case 'PUT':
      return updateFusedImageById();
    case 'DELETE':
      return deleteFusedImageById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getFusedImageById() {
    const data = await prisma.fused_image.findFirst(convertQueryToPrismaUtil(req.query, 'fused_image'));
    return res.status(200).json(data);
  }

  async function updateFusedImageById() {
    await fusedImageValidationSchema.validate(req.body);
    const data = await prisma.fused_image.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteFusedImageById() {
    const data = await prisma.fused_image.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
