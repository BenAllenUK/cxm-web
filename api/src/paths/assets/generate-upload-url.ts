import AWS from 'aws-sdk'
import { APIGatewayProxyHandler } from 'aws-lambda'
import error from 'utils/error'

AWS.config.update({ region: process.env.AWS_REGION })
const s3 = new AWS.S3()

const URL_EXPIRATION_SECONDS = 300

/**
 * @openapi
 *
 * /assets/hooks/generate-read-url:
 *   post:
 *     summary: Generate signed url to upload file
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
 *                 key:
 *                   type: string
 */
const main: APIGatewayProxyHandler = async (event) => {
  try {
    const body = event.body ? JSON.parse(event.body) : {}
    const type = body.input?.contentType

    if (!type) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Invalid format',
        }),
      }
    }

    const randomId = Number(Math.random() * 10000000)

    const [fileType, fileExtension] = type.split('/')
    const key = `${randomId}.${fileExtension}`

    const s3Params = {
      Bucket: process.env.AWS_UPLOAD_BUCKET_ID,
      Key: key,
      Expires: URL_EXPIRATION_SECONDS,
      ContentType: type,
      ACL: 'public-read',
    }

    const uploadURL = await s3.getSignedUrlPromise('putObject', s3Params)

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
