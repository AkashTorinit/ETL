import type { NextApiRequest, NextApiResponse } from "next"
import { updatePassword } from "../../backend/user/service"
import {isSamePass} from "../../backend/user/passwordHash"

interface NextApiResponseWithCookie extends NextApiResponse {
  cookie: any
}

const handler = async (req: NextApiRequest, res: NextApiResponseWithCookie) => {
    if (req.method === "POST") {
        try {
            const { email, newPassword,currentPassword,hashPassword } = req.body
          let currentpasswordCheck = await isSamePass(currentPassword,hashPassword)
            console.log('checkkkk',currentpasswordCheck)
            if(currentpasswordCheck)
            {
                const user = await updatePassword(email, newPassword)
            user !== false ? res.status(200).json({ user: user }) : res.status(401).json({ message: "User not found" })
            }
            else{

                
                res.status(200).json({ message: "Current Password is not correct" })
            }
            
        } catch (error) {
           
            res.status(400).json({ error })
        }
    }
}

export default handler
