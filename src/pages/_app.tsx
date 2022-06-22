import '~/styles/globals.css'
import LayoutDefault from '~/layouts/default'
import type { AppProps } from 'next/app'
import type { NextPage } from 'next'
import type { ReactElement, ReactNode } from 'react'

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // 如果 page 级别的组件定义了 getLayout 则表示该页面有自定义 layout
  // 否则，使用默认 layout

  const getLayout =
    Component.getLayout || ((page) => <LayoutDefault>{page}</LayoutDefault>)

  return getLayout(<Component {...pageProps} />)
}

export default MyApp
