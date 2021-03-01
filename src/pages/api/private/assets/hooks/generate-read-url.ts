import type { NextApiRequest, NextApiResponse } from 'next'

import AWS from 'aws-sdk'
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
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    body: {
      input: { key },
    },
  } = req

  const s3Params = {
    Bucket: process.env.AWS_UPLOAD_BUCKET_ID,
    Key: key,
    Expires: URL_EXPIRATION_SECONDS,
  }

  console.log('Params: ', s3Params)
  const uploadURL = await s3.getSignedUrlPromise('getObject', s3Params)

  res.statusCode = 200
  res.json({
    url: uploadURL,
    key: key,
  })
}
