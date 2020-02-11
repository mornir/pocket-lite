// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
import pocket from './utils/pocket-client'
import { getList } from './utils/get-list'

export async function handler(event) {
  const code = event.queryStringParameters.code

  try {
    const res = await pocket({
      url: 'oauth/authorize',
      data: {
        consumer_key: process.env.CONSUMER_KEY,
        code,
      },
    })

    console.log(res.data)

    const list = await getList(res.data.access_token)

    console.log(list)

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
