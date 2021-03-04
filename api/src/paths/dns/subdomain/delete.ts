import AWS from 'aws-sdk'
import { APIGatewayProxyHandler } from 'aws-lambda'
import error from '../../../utils/error'
import invalid from '../../../utils/invalid'

AWS.config.update({ region: process.env.AWS_REGION })
var route53 = new AWS.Route53()

/**
 * @openapi
 *
 * /dns/subdomain/new:
 *   post:
 *     summary: Create a new subdomain
 *     produces:
 *       - application/json
 */
const main: APIGatewayProxyHandler = async (event) => {
  try {
    const body = event.body ? JSON.parse(event.body) : {}

    const newSlug = body?.event?.data?.old?.slug

    if (!newSlug) {
      return invalid()
    }

    const response = await route53
      .changeResourceRecordSets({
        ChangeBatch: {
          Changes: [
            {
              Action: 'DELETE',
              ResourceRecordSet: {
                Name: `${newSlug}.hosted.omnea.co`,
                AliasTarget: {
                  DNSName: 'd2iocvfboqan2m.cloudfront.net',
                  EvaluateTargetHealth: false,
                  // DO NOT CHANGE - This is AWS Specific
                  HostedZoneId: 'Z2FDTNDATAQYW2',
                },
                Type: 'A',
              },
            },
          ],
        },
        HostedZoneId: 'Z1009887TDI7WN2LFGHJ',
      })
      .promise()
    const response2 = await route53
      .changeResourceRecordSets({
        ChangeBatch: {
          Changes: [
            {
              Action: 'DELETE',
              ResourceRecordSet: {
                Name: `${newSlug}.admin.omnea.co`,
                AliasTarget: {
                  DNSName: 'd4zblzgko8srq.cloudfront.net',
                  EvaluateTargetHealth: false,
                  // DO NOT CHANGE - This is AWS Specific
                  HostedZoneId: 'Z2FDTNDATAQYW2',
                },
                Type: 'A',
              },
            },
          ],
        },
        HostedZoneId: 'Z065625021HFJ6669HH5Q',
      })
      .promise()

    console.log(response)
    console.log(response2)

    return {
      statusCode: 204,
      body: '',
    }
  } catch (e) {
    return error(e)
  }
}

module.exports = { main }
