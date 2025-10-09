import prisma from "~/server/database/client";
import { getCookie } from 'h3'

export default defineEventHandler(async (event) => {
  const authToken = getCookie(event, 'auth_token')
  if (!authToken) throw createError({ statusCode: 401, message: 'Unauthorized' })

  // get user from session
const session = await prisma.session.findUnique({
  where: { authToken },
  include: { user: { include: { paymentAuthorizations: true } } }
})
console.log('User:', session?.user)
console.log('Applications:', session?.user?.paymentAuthorizations)

  if (!session?.user) throw createError({ statusCode: 401, message: 'Unauthorized' })

  const paymentAuthorizations = await prisma.paymentAuthorization.findMany({
    where: { userId: session.user.id },
  })

  return paymentAuthorizations
})
