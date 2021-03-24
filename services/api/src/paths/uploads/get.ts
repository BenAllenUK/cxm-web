import { APIGatewayProxyHandler } from 'aws-lambda'
import error from 'utils/error'
import * as AWS from 'aws-sdk'
import invalid from 'utils/invalid'
import notfound from 'utils/notfound'

const s3 = new AWS.S3()

/**
 * @openapi
 *
 * /uploads/[key]:
 *   post:
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: key
 *         in: query
 *         required: true
 *         type: string

 */
export const main: APIGatewayProxyHandler = async (event) => {
  try {
    const key = event.pathParameters?.key

    const bucket = process.env.AWS_UPLOAD_BUCKET_ID
    if (!key) {
      return invalid('Missing key')
    }

    if (!bucket) {
      return error('Missing bucket')
    }

    const defaultFallbackImage = await s3.getObject({ Bucket: bucket, Key: key }).promise()

    if (!defaultFallbackImage?.Body || !defaultFallbackImage?.ContentType || !defaultFallbackImage?.LastModified) {
      return notfound()
    }

    return {
      headers: {
        'Content-Type': defaultFallbackImage.ContentType,
        'Last-Modified': defaultFallbackImage.LastModified.toISOString(),
        'Cache-Control': 'max-age=31536000,public',
      },
      isBase64Encoded: true,
      statusCode: 200,
      body: defaultFallbackImage.Body.toString('base64'),
      // body: JSON.stringify({ success: true }),
    }
  } catch (e) {
    return error(e)
  }
}
