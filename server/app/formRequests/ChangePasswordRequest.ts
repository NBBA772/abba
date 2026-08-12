import { z, parseBodyAs, } from "@sidebase/nuxt-parse"
import { H3Event } from "h3"

const bodySchema = z.object({
  currentPassword: z.string({
    required_error: 'current password required',
  })
    .min(1, { message: 'current password required' }),
  newPassword: z.string({
    required_error: 'new password required',
  })
    .min(8, { message: 'new password must be at least 8 characters' })
})

export default async function changePasswordRequest(event: H3Event) {
  return await parseBodyAs(event, bodySchema)
}
