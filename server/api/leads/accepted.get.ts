// /server/api/companies/assigned.ts
import prisma from '~/server/database/client'
import { getUserByAuthToken } from '~/server/database/repositories/sessionRepository'

export default defineEventHandler(async (event) => {
  try {
    const authToken = getCookie(event, 'auth_token')
    if (!authToken) throw createError({ statusCode: 401, statusMessage: 'Missing auth token' })

    const user = await getUserByAuthToken(authToken)
    if (!user) throw createError({ statusCode: 401, statusMessage: 'Invalid or expired session' })

    const agent = await prisma.insuranceAgent.findUnique({
      where: { userId: user.id },
    })
    if (!agent) throw createError({ statusCode: 400, statusMessage: 'User is not an agent' })

    const assignedRaw = await prisma.company.findMany({
      where: { agentId: agent.id },
      include: {
        agent: { select: { id: true, firstName: true, lastName: true, email: true } },
        administrators: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phoneNumber: true,
            username: true,
            companyId: true,
          },
        },
        employees: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            username: true,
            userId: true,
            companyId: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

const assigned = assignedRaw.map((company) => {
  // Get the company admin
  const companyAdmin = company.administrators?.[0]
    ? {
        id: company.administrators[0].id,
        firstName: company.administrators[0].firstName,
        lastName: company.administrators[0].lastName,
        email: company.administrators[0].email,
        phone: company.administrators[0].phoneNumber,
        username: company.administrators[0].username,
        userId: null, // Add userId if available
        companyId: company.id,
      }
    : null

  // Merge employees and admins
  const employees = [
    ...(company.employees || []),
    ...(company.administrators?.map((admin) => ({
      id: admin.id,
      firstName: admin.firstName,
      lastName: admin.lastName,
      email: admin.email,
      phone: admin.phoneNumber,
      username: admin.username,
   
      userId: 4, // Add userId if available
      companyId: company.id,
    })) || []),
  ]

  return {
    ...company,
    companyAdmin,
    employees,
  }
})


    return { assigned }
  } catch (err: any) {
    console.error('Error fetching assigned companies:', err)
    throw createError({
      statusCode: 500,
      statusMessage: err.message || 'Internal Server Error',
    })
  }
})
