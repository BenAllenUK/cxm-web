import 'styles/globals.scss'
import appWithTranslation from 'utils/translations/appWithTranslation'

function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default appWithTranslation(App)

// export function reportWebVitals(metric) {
//   console.log(metric)
// }
