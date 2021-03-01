import type { NextApiRequest, NextApiResponse } from 'next'

import AWS from 'aws-sdk'

// TODO: Specify upload only credentials

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
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const randomId = Number(Math.random() * 10000000)
  const type = req.body.input.contentType

  if (!type) {
    res.statusCode = 400
    res.json({
      message: 'Invalid format',
    })
  }

  const [fileType, fileExtension] = type.split('/')
  const key = `${randomId}.${fileExtension}`

  const s3Params = {
    Bucket: process.env.AWS_UPLOAD_BUCKET_ID,
    Key: key,
    Expires: URL_EXPIRATION_SECONDS,
    ContentType: type,
  }

  const uploadURL = await s3.getSignedUrlPromise('putObject', s3Params)

  res.statusCode = 200
  res.json({
    url: uploadURL,
    key: key,
  })
}
