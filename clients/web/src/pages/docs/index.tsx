import { RedocStandalone } from 'redoc'

export default function Home() {
  return <RedocStandalone specUrl="/docs/api.json" />
}
// http://petstore.swagger.io/v2/swagger.json
