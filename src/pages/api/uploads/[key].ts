import type { NextApiRequest, NextApiResponse } from 'next'

const AWS = require('aws-sdk')

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
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      query: { key },
    } = req

    const bucket = process.env.AWS_UPLOAD_BUCKET_ID
    const defaultFallbackImage = await s3.getObject({ Bucket: bucket, Key: key }).promise()

    res.setHeader('Content-Type', defaultFallbackImage.ContentType)
    res.setHeader('Last-Modified', defaultFallbackImage.LastModified)
    res.setHeader('Cache-Control', 'max-age=31536000,public')
    res.status(200)
    res.send(defaultFallbackImage.Body)
  } catch (e) {
    res.statusCode = 500
    res.json({ error: e })
  }
}
