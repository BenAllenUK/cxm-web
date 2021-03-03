import { APIGatewayProxyHandler } from 'aws-lambda'
const AWS = require('aws-sdk')
AWS.config.update({ region: process.env.AWS_REGION })
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
const main: APIGatewayProxyHandler = async (event) => {
  try {
    const key = event.pathParameters?.key

    const bucket = process.env.AWS_UPLOAD_BUCKET_ID

    const defaultFallbackImage = await s3.getObject({ Bucket: bucket, Key: key }).promise()

    return {
      headers: {
        'Content-Type': defaultFallbackImage.ContentType,
        'Last-Modified': defaultFallbackImage.LastModified,
        'Cache-Control': 'max-age=31536000,public',
      },
      isBase64Encoded: true,
      statusCode: 200,
      body: defaultFallbackImage.Body.toString('base64'),
      // body: JSON.stringify({ success: true }),
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: e,
      }),
    }
  }
}

module.exports = { main }
