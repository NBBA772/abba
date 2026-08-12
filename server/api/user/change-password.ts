import bcrypt from 'bcryptjs'
import { H3Event, getHeader, createError, sendError } from 'h3'
import { ZodError } from 'zod'
import prisma from '~/server/database/client'
import { getUserByAuthToken } from '~/server/database/repositories/sessionRepository'
import changePasswordRequest from '~~/server/app/formRequests/ChangePasswordRequest'
import sendZodErrorResponse from '~~/server/app/errors/responses/ZodErrorsResponse'
import sendDefaultErrorResponse from '~~/server/app/errors/responses/DefaultErrorsResponse'
import { getMappedError } from '~~/server/app/errors/errorMapper'

export default defineEventHandler(async (event: H3Event) => {
  try {
    const authToken = getHeader(event, 'authorization')?.replace('Bearer ', '')
    if (!authToken) {
      return sendError(event, createError({ statusCode: 401, data: getMappedError('Authentication', 'Unauthorized') }))
    }

    const user = await getUserByAuthToken(authToken)
    if (!user) {
      return sendError(event, createError({ statusCode: 401, data: getMappedError('Authentication', 'Unauthorized') }))
    }

    const data = await changePasswordRequest(event)

    if (!user.password) {
      return sendError(event, createError({ statusCode: 400, data: getMappedError('Authentication', 'Password cannot be changed for this account') }))
    }

    const isCurrentPasswordCorrect = await bcrypt.compare(data.currentPassword, user.password)
    if (!isCurrentPasswordCorrect) {
      return sendError(event, createError({ statusCode: 401, data: getMappedError('Authentication', 'Current password is incorrect') }))
    }

    const hashedPassword = await bcrypt.hash(data.newPassword, 10)
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    })

    return { success: true }
  } catch (error: any) {
    if (error.data instanceof ZodError) {
      return await sendZodErrorResponse(event, error.data)
    }

    return await sendDefaultErrorResponse(event, 'Unauthenticated', 401, error)
  }
})
