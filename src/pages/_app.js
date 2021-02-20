import '../styles/globals.scss'
import { appWithTranslation } from '../config/translation'

function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default appWithTranslation(App)

// export function reportWebVitals(metric) {
//   console.log(metric)
// }
