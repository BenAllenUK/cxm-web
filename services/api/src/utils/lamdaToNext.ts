import compat from '@sls-next/next-aws-lambda'
import { APIGatewayProxyEvent, Context } from 'aws-lambda'
import { NextApiRequest, NextApiResponse } from 'next'

const extend = (item: (...args: any) => any, args: any) => (req: NextApiRequest, res: NextApiResponse) => {
  const json = (contents: any) => {
    const value = JSON.stringify(contents)
    res.write(value)
    res.end()
  }
  return item(
    { ...req, query: req.query ?? {} },
    {
      ...res,
      json,
      status: (code: number) => {
        res.writeHead(code)
        return { json }
      },
    },
    ...args
  )
}

const lambdaToNext = (item: any, ...args: any) => (event: APIGatewayProxyEvent, context: Context) => {
  return compat({ default: extend(item, args) })(event, context)
}
export default lambdaToNext
