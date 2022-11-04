import type { NextApiRequest, NextApiResponse } from "next"
import { getImagesById } from "../../backend/user/service"

interface NextApiResponseWithCookie extends NextApiResponse {
  cookie: any
}

const handler = async (req: NextApiRequest, res: NextApiResponseWithCookie) => {
    if (req.method === "GET") {
        try {
            const { userId } = req.query


            const users:any = await getImagesById(userId)
            res.status(200).json({ records: users })
   
        } catch (error) {
            res.status(400).json({ error })
        }
    }
}

export default handler
