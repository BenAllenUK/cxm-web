import AWS from 'aws-sdk'
import { APIGatewayProxyHandler } from 'aws-lambda'
import error from 'utils/error'

AWS.config.update({ region: process.env.AWS_REGION })
const s3 = new AWS.S3()

const URL_EXPIRATION_SECONDS = 86400

/**
 * @openapi
 *
 * /assets/hooks/generate-read-url:
 *   post:
 *     summary: Generate signed url to read file
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: Object with signed url and key
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 */
const main: APIGatewayProxyHandler = async (event) => {
  try {
    const body = event.body ? JSON.parse(event.body) : {}
    const key = body.input?.key

    if (!key) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Invalid format',
        }),
      }
    }

    const s3Params = {
      Bucket: process.env.AWS_UPLOAD_BUCKET_ID,
      Key: key,
      Expires: URL_EXPIRATION_SECONDS,
    }

    console.log('Params: ', s3Params)
    const uploadURL = await s3.getSignedUrlPromise('getObject', s3Params)

    return {
      statusCode: 200,
      body: JSON.stringify({
        url: uploadURL,
        key: key,
      }),
    }
  } catch (e) {
    return error(e)
  }
}

module.exports = { main }
