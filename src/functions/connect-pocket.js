import pocket from './utils/pocket-client'

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

    if (!event.body) {
      return {
        statusCode: 400,
        body: 'Body is missing',
      }
    }

    const redirect_uri = event.queryStringParameters.redirect_uri

    if (!redirect_uri) {
      return {
        statusCode: 400,
        body: 'REDIRECT_URI param is missing',
      }
    }

    const res = await pocket({
      url: 'oauth/request',
      data: {
        consumer_key: process.env.CONSUMER_KEY,
        redirect_uri,
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
