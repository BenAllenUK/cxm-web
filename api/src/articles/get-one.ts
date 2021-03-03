// import type { NextApiRequest, NextApiResponse } from 'next'
import { APIGatewayProxyHandler } from 'aws-lambda'

/**
 * @openapi
 *
 * /login:
 *   post:
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         in: formData
 *         required: true
 *         type: string
 */
const main: APIGatewayProxyHandler = async (event) => {
  // export async function main(event: any, context: any, callback: any) {

  // const {
  //   query: { id },
  // } = req

  // res.statusCode = 200
  // res.json({ name: id })
  return {
    statusCode: 200,
    body: JSON.stringify({
      event: event,
    }),
  }
}

module.exports = { main }
