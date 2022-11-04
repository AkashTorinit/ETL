import type { NextApiRequest, NextApiResponse } from "next"
import { getallImages } from "../../backend/user/service"

interface NextApiResponseWithCookie extends NextApiResponse {
  cookie: any
}

const handler = async (req: NextApiRequest, res: NextApiResponseWithCookie) => {
    if (req.method === "GET") {
        try {
      


            const users:any = await getallImages()
            res.status(200).json({ records: users })
   
        } catch (error) {
            
            res.status(400).json({ error })
        }
    }
}

export default handler
