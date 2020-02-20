import { getList } from './utils/get-list'

export async function handler(event) {
  console.log(event.body)
  try {
    const token = JSON.parse(event.body).token
    if (!token) {
      throw new Error('No token was provided')
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
