import type { NextApiRequest, NextApiResponse } from "next"
import {  userblock} from "../../backend/user/service"

interface NextApiResponseWithCookie extends NextApiResponse {
  cookie: any
}

const handler = async (req: NextApiRequest, res: NextApiResponseWithCookie) => {
    if (req.method === "POST") {
        try {
            
            const { email,status } = req.body
            const user = await userblock(email,status)
            user !== false ? res.status(200).json({ user: user }) : res.status(401).json({ message: "User not found" })
        } catch (error) {
            
            res.status(400).json({ error })
        }
    }
}

export default handler
