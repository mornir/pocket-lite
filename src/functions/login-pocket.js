// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
import pocket from './utils/pocket-client'
import { getList } from './utils/get-list'

export async function handler(event) {
  try {
    if (event.httpMethod !== 'GET') {
      return {
        statusCode: 405,
        body: 'METHOD NOT ALLOWED',
        headers: {
          Allow: 'GET',
        },
      }
    }

    const code = event.queryStringParameters.code

    if (!code) {
      return {
        statusCode: 400,
        body: 'Request token is missing',
      }
    }

    const res = await pocket({
      url: 'oauth/authorize',
      data: {
        consumer_key: process.env.CONSUMER_KEY,
        code,
      },
    })

    const list = await getList(res.data.access_token)

    return {
      statusCode: 200,
      body: JSON.stringify({
        ACCESS_TOKEN: res.data.access_token,
        username: res.data.username,
        list,
      }),
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
