import type { NextApiRequest, NextApiResponse } from "next"
import { updateUserProfile } from "../../backend/user/service"

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    if (req.method === "POST") {
        const { firstName,lastName,email, phoneNo} = req.body
        try {
            const data = await updateUserProfile(firstName,lastName,email, phoneNo)
            data !== false ? res.status(200).json({message: "Profile Updated successfully!" }) : res.status(401).json({ message: "Error while updating user account" })
        } catch (error) {
          
        }
    }
}

export default handler
