import { ReactElement, ReactNode } from "react"
import { GetServerSidePropsContext, NextPage } from "next"
import UserLayout from "../../layout/userLayout"
import { authorize } from "../../utils/authorize"
import ChangePasswordComponent from "../../components/account/changePassword"
import PermanentDrawerLeft from "../../components/drawerBar/drawerBar"
import DrawerBar from "../uploadFile/DrawerBar"

export type NextPageWithLayout<T> = NextPage<T> & {
  getLayout?: (page: ReactElement) => ReactNode
}

interface ChangePasswordPageProps {
  user?: any
}

const ChangePasswordPage : NextPageWithLayout<ChangePasswordPageProps> = (props: ChangePasswordPageProps) => {
    return (
        <ChangePasswordComponent user= {props.user}/>
    )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const pageTitle = "Change Password"
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

    // if (user.role !== 'ADMIN') {
    //   return {
    //     redirect: {
    //       permanent: false,
    //       destination: '/login'
    //     }
    //   }
    // }

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

ChangePasswordPage.getLayout = (page: ReactElement) => {
    const dashboardAppBar =(page.props.user.role==='ADMIN')?<PermanentDrawerLeft title={page.props.pageTitle}/>:<DrawerBar/>

    return (
        <UserLayout user={page.props.user} appbar={dashboardAppBar}>
            {page}
        </UserLayout>
    )
}

export default ChangePasswordPage
