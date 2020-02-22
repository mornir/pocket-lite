import pocket from './utils/pocket-client'

export async function handler(event) {
  try {
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        body: 'METHOD NOT ALLOWED',
        headers: {
          Allow: 'POST',
        },
      }
    }

    if (!event.body) {
      return {
        statusCode: 400,
        body: 'Body is missing',
      }
    }

    const REDIRECT_URI = JSON.parse(event.body).redirect_uri

    if (!REDIRECT_URI) {
      return {
        statusCode: 400,
        body: 'REDIRECT_URI param is missing',
      }
    }

    const res = await pocket({
      url: 'oauth/request',
      data: {
        consumer_key: process.env.CONSUMER_KEY,
        redirect_uri: REDIRECT_URI,
      },
    })

    return {
      statusCode: 200,
      body: JSON.stringify({
        REQUEST_TOKEN: res.data.code,
      }),
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
