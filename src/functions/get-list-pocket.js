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
    const token = event.queryStringParameters.token

    if (!token) {
      return {
        statusCode: 400,
        body: 'Acess token is missing',
      }
    }

    const list = await getList(token)

    return {
      statusCode: 200,
      body: JSON.stringify({
        list,
      }),
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
