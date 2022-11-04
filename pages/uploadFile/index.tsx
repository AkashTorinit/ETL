import { ReactElement, ReactNode } from "react"
import dynamic from "next/dynamic";
import { GetServerSidePropsContext, NextPage } from "next"
import UserLayout from "../../layout/userLayout"
import { authorize } from "../../utils/authorize"
import ApplicationAppBar from "../../components/application/applicationAppbar"
import  UploadFileComponent  from "./UploadFile"
import DrawerBar from "./DrawerBar"
// const UserLayout = dynamic(() => import("../../layout/userLayout"));
// const UploadFileComponent = dynamic(() => import("./UploadFile"));
// const DrawerBar = dynamic(() => import("./DrawerBar"));
export type NextPageWithLayout<T> = NextPage<T> & {
  getLayout?: (page: ReactElement) => ReactNode
}

interface UploadFilePageProps {
  user?: any
}

const UploadFilePage : NextPageWithLayout<UploadFilePageProps> = (props: UploadFilePageProps) => {
    return (
        <UploadFileComponent/>
    )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const pageTitle = "Upload File"
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
            destination: "/"
        }
    }
}

UploadFilePage.getLayout = (page: ReactElement) => {
    const UploadedFilesAppBar = <DrawerBar />;

    return (
        <UserLayout user={page.props.user} appbar={UploadedFilesAppBar}>
            {page}
        </UserLayout>
    )
}

export default UploadFilePage
