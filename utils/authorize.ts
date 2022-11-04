import { getUserByEmail } from '../backend/user/service'
import { User } from '../backend/user/user'
import { verifyAccessToken } from '../backend/user/verify'
import jwt from 'jsonwebtoken'

export const authorize = async (token: string, role?: string | string[]) : Promise<User | false> => {
  const verified = verifyAccessToken(token)

  if (!verified) {
    return false
  }

  const user = await getUserByEmail(verified.email)

  if (!user) {
    return false
  }

  if (Array.isArray(role)) {
    if (!role.includes(user.role)) {
      return false
    }
  } else {
    if (role !== undefined && user.role !== role) {
      return false
    }
  }

  return user
}

// export const authorizeTemporaryToken = async (token: string) : Promise<User | false> => {
//   const adminSecret = process.env.ADMIN_SECRET
//   if (adminSecret) {
//     const decoded = jwt.verify(token, adminSecret)
//     if (typeof decoded !== 'string' && decoded.user !== undefined) {
//       const user = await getUserByEmail(decoded.user)
//       if (!user) {
//         return false
//       }
//       return user
//     }
//   }

//   return false
// }
