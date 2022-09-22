import { SessionProvider } from 'next-auth/react'
import '../styles/globals.css'
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'


TimeAgo.addDefaultLocale(en)


function MyApp({ Component, pageProps:{session, ...pageProps} }) {
  return (
    <SessionProvider session={session}>
  <Component {...pageProps} />
  </SessionProvider>
  )
}

export default MyApp
