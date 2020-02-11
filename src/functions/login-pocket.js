// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const pocket = require('./pocket-client')
const getList = require('./utils/get-list')

exports.handler = async event => {
  const code = event.queryStringParameters.name
  try {
    const res = await pocket({
      url: 'oauth/authorize',
      data: {
        consumer_key: process.env.CONSUMER_KEY,
        code,
      },
    })

    console.log(res.data)

    const res2 = await getList()

    console.log(res2.data)

    return {
      statusCode: 200,
      body: JSON.stringify({
        ACCESS_TOKEN: res.data.access_token,
        username: res.data.username,
        list: res2.data.list,
      }),
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
