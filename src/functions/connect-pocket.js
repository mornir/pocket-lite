// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method

import pocket from './utils/pocket-client'

export async function handler() {
  try {
    const res = await pocket({
      url: 'oauth/request',
      data: {
        consumer_key: process.env.CONSUMER_KEY,
        redirect_uri: process.env.REDIRECT_URI,
      },
    })

    console.log(res.data)

    return {
      statusCode: 200,
      body: JSON.stringify({
        REQUEST_TOKEN: res.data.code,
        REDIRECT_URI: process.env.REDIRECT_URI,
        CONSUMER_KEY: process.env.CONSUMER_KEY,
      }),
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
