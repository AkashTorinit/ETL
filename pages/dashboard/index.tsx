import { ReactElement, ReactNode } from "react";
import { GetServerSidePropsContext, NextPage } from "next";
import UserLayout from "../../layout/userLayout";
import { authorize } from "../../utils/authorize";
import DashboardComponent from "../../components/dashboard";
import PermanentDrawerLeft from "../../components/drawerBar/drawerBar";
export type NextPageWithLayout<T> = NextPage<T> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
interface DashboardPageProps {
  user?: any;
}
const DashboardPage: NextPageWithLayout<DashboardPageProps> = (
  props: DashboardPageProps
) => {
  return <DashboardComponent />;
};
export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const pageTitle = "Dashboard";
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
  if (user?.role !== "ADMIN") {
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
DashboardPage.getLayout = (page: ReactElement) => {
  const dashboardAppBar = <PermanentDrawerLeft title={"Dashboard"} />;
  return (
    <UserLayout user={page.props.user} appbar={dashboardAppBar}>
      {page}
    </UserLayout>
  );
};
export default DashboardPage;
