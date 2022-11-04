import { useContext } from "react"
import { UserContext } from "../../../layout/userLayout"

const useUser = () => {
    return useContext(UserContext)
}

export default useUser
