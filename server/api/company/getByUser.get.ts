// server/api/company/getByUser.get.ts
import prisma from "~/server/database/client";

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const userId = parseInt(query.userId as string, 10)

    if (isNaN(userId)) {
    throw createError({ statusCode: 400, message: "userId must be a number" })
    }


  if (!userId) {
    throw createError({ statusCode: 400, message: "userId is required" })
  }

  const company = await prisma.company.findFirst({
    where: { users: { some: { id: userId } } }, // assumes a User has a relation to Company
  })

  return company
})
