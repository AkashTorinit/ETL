import { ReactElement, ReactNode } from "react"
import { GetServerSidePropsContext, NextPage } from "next"
import UserLayout from "../../layout/userLayout"
import { authorize } from "../../utils/authorize"
import { SignUp } from "../../components/signUp/signUp"
import PermanentDrawerLeft from "../../components/drawerBar/drawerBar"

export type NextPageWithLayout<T> = NextPage<T> & {
  getLayout?: (page: ReactElement) => ReactNode
}

interface AddUserPageProps {
  user?: any
}

const AddUserPage : NextPageWithLayout<AddUserPageProps> = (props: AddUserPageProps) => {
    return (
        <SignUp/>
    )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const pageTitle = "Add User"
    const tokenCookie = context.req.cookies.tok

    if (!tokenCookie) {
        return {
            redirect: {
                permanent: false,
                destination: "/login"
            }
        }
    }

    const user:any = await authorize(tokenCookie)

    if (user.role !== "ADMIN") {
        return {
            redirect: {
                permanent: false,
                destination: "/login"
            }
        }
    }

    if (user) {
        return {
            props: {
                pageTitle,
                user
            }
        }
    }

    return {
        redirect: {
            permanent: false,
            destination: "/login"
        }
    }
}

AddUserPage.getLayout = (page: ReactElement) => {
    const dashboardAppBar = <PermanentDrawerLeft title={page.props.pageTitle}/> 
    return (
        <UserLayout user={page.props.user} appbar={dashboardAppBar} >
            {page}
        </UserLayout>
    )
}

export default AddUserPage
