import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Script from 'next/script'

export default function App({ Component, pageProps }: AppProps) {
  return (
      <>
          <Head>
              <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          </Head>
          <Script src="/theme.js" strategy="beforeInteractive" />
        <Component {...pageProps} />
        </>
  )
}
