import type { NextApiRequest, NextApiResponse } from "next"
import { getAllUsers } from "../../backend/user/service"

interface NextApiResponseWithCookie extends NextApiResponse {
  cookie: any
}

const handler = async (req: NextApiRequest, res: NextApiResponseWithCookie) => {
    if (req.method === "GET") {
        try {
            const { limit, skip, sortBy, sort,search } = req.query
            const users:any = await getAllUsers(limit, skip, sortBy, sort,search)
            res.status(200).json({ records: users.finalResp, totalRecords: users.totalRecords, page: users.page })
            // users !== false ? res.status(200).json({ data: users, totalRecords: 4 }) : res.status(401).json({ message: 'Users not found' })
        } catch (error) {
            res.status(400).json({ error })
        }
    }
}

export default handler
