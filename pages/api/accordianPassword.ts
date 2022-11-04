import type { NextApiRequest, NextApiResponse } from "next"
import { updatePassword } from "../../backend/user/service"

interface NextApiResponseWithCookie extends NextApiResponse {
  cookie: any
}

const handler = async (req: NextApiRequest, res: NextApiResponseWithCookie) => {
    if (req.method === "POST") {
        try {
          
            const { email, newPassword } = req.body
            const user = await updatePassword(email, newPassword)
            user !== false ? res.status(200).json({ user: user }) : res.status(401).json({ message: "User not found" })
        } catch (error) {
           
            res.status(400).json({ error })
        }
    }
}

export default handler
