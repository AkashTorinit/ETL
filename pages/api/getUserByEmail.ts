import type { NextApiRequest, NextApiResponse } from "next"
import { string } from "pg-format"
import { getUserByEmail } from "../../backend/user/service"

interface NextApiResponseWithCookie extends NextApiResponse {
  cookie: any
}

const handler = async (req: NextApiRequest, res: NextApiResponseWithCookie) => {
    if (req.method === "GET") {
        try {
            const { email} = req.query
            let string:any =  email?.toString()
            const users:any = await getUserByEmail(string)
            res.status(200).json({ userbyemail: users})
            
            // users !== false ? res.status(200).json({ data: users, totalRecords: 4 }) : res.status(401).json({ message: 'Users not found' })
        } catch (error) {
            
            res.status(400).json({ error })
        }
    }
}

export default handler
