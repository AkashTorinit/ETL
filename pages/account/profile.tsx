import { ReactElement, ReactNode } from "react"
import { GetServerSidePropsContext, NextPage } from "next"
import UserLayout from "../../layout/userLayout"
import { authorize } from "../../utils/authorize"
import ProfileComponent from "../../components/account/Profile"
import PermanentDrawerLeft from "../../components/drawerBar/drawerBar"
import DrawerBar from "../uploadFile/DrawerBar"
export type NextPageWithLayout<T> = NextPage<T> & {
  getLayout?: (page: ReactElement) => ReactNode
}
interface ProfilePageProps {
  user?: any
}
const ProfilePage : NextPageWithLayout<ProfilePageProps> = (props: ProfilePageProps) => {
    return (
        <ProfileComponent user={props.user}/>
    )
}
export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const pageTitle = "Profile"
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
ProfilePage.getLayout = (page: ReactElement) => {
    console.log(page.props)
    const dashboardAppBar = (page.props.user.role==='ADMIN')?<PermanentDrawerLeft title={page.props.pageTitle}/>:<DrawerBar/>
    return (
        <UserLayout user={page.props.user} appbar={dashboardAppBar}>
            {page}
        </UserLayout>
    )
}
export default ProfilePage