/**
 * @swagger
 * /api/is-app-admin/{id}:
 *   get:
 *     summary: Check if a User is an AppAdmin
 *     tags:
 *       - AppAdmin
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       200:
 *         description: Whether the user is an AppAdmin
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isAdmin:
 *                   type: boolean
 *                   example: true
 */

import { PrismaClient } from '@prisma/client'
import { defineEventHandler, getRouterParam } from 'h3'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  if (isNaN(id)) return { isAdmin: false }

  // Look up the user and check if linked to AppAdmin
  const user = await prisma.user.findUnique({
    where: { id },
    select: { appAdminId: true },
  })

  return { isAdmin: !!user?.appAdminId }
})
