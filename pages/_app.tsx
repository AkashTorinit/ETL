import "../styles/globals.css"
import type { AppProps } from "next/app"
import { NextPage } from "next"
import { ReactElement, ReactNode } from "react"
import Head from "next/head"
import { CookiesProvider } from "react-cookie"

export type NextPageWithLayout<T> = NextPage<T> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout<unknown>
}

function MyApp ({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page)

    const pagePropsTitle =  "Home"
    const title = `${pagePropsTitle} | ETLS Pipeline`

    return (
        <>
            <CookiesProvider>
                <Head>
                    <title>{title}</title>
                </Head>
                {
                    getLayout(<Component {...pageProps} />)
                }
            </CookiesProvider>
        </>
    )
}

export default MyApp
