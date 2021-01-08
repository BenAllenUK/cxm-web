import type { NextApiRequest, NextApiResponse } from 'next'

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
export default (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
  } = req

  res.statusCode = 200
  res.json({ name: id })
}

/**
 * @swagger
 * /:
 *   get:
 *     description: Returns the homepage
 *     responses:
 *       200:
 *         description: hello world
 */
