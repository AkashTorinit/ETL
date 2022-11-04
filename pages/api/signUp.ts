import type { NextApiRequest, NextApiResponse } from "next"
import { signUp } from "../../backend/auth/service"
import { getUserByEmail } from "../../backend/user/service"
const handler = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    if (req.method === "POST") {

        const { email, password, firstname, lastname, phonenumber } = JSON.parse(Object.keys(req.body)[0])
        try {

            let string: any = email?.toString()
            const user: any = await getUserByEmail(string)
            if (user) {
                res.status(401).json({ message: "Error while creating new user account,email already exsists" })
            }
            else {
                const data = await signUp(email, password, firstname, lastname, phonenumber)
                console.log(data)
                data !== false ? res.status(200).json({ message: "Account created successfully!" }) : res.status(401).json({ message: "Error while creating new user account,email already exsists" })
            }
        } catch (error) {

        }
    }
}

export default handler