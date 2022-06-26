import '~/styles/globals.scss'
import LayoutDefault from '~/layouts/default'
import type { AppProps } from 'next/app'
import type { NextPage } from 'next'
import type { ReactElement, ReactNode } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import theme from '~/theme'
import { Provider as StoreProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from '~/store'

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

  return (
    <StoreProvider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={theme}>
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </PersistGate>
    </StoreProvider>
  )
}

export default MyApp
