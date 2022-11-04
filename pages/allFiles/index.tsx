import { ReactElement, ReactNode } from "react";
import { GetServerSidePropsContext, NextPage } from "next";
import UserLayout from "../../layout/userLayout";
import { authorize } from "../../utils/authorize";
import ApplicationAppBar from "../../components/application/applicationAppbar";
import DisplayFileComponent from "../../components/displayFile/displayfile";
import DrawerBar from "../uploadFile/DrawerBar";

export type NextPageWithLayout<T> = NextPage<T> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface UploadedFilesPageProps {
  user?: any;
}

const UploadedFilesPage: NextPageWithLayout<UploadedFilesPageProps> = (
  props: UploadedFilesPageProps
) => {
  return <DisplayFileComponent user={props} />;
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const pageTitle = "Uploaded Files";
  const tokenCookie = context.req.cookies.tok;

  if (!tokenCookie) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }

  const user: any = await authorize(tokenCookie);

  if (user?.role !== "USER") {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }

  if (user) {
    return {
      props: {
        pageTitle,
        user,
      },
    };
  }

  return {
    redirect: {
      permanent: false,
      destination: "/",
    },
  };
};

UploadedFilesPage.getLayout = (page: ReactElement) => {
  const UploadedFilesAppBar = <DrawerBar />;
  return (
    <UserLayout user={page.props.user} appbar={UploadedFilesAppBar}>
      {page}
    </UserLayout>
  );
};

export default UploadedFilesPage;
