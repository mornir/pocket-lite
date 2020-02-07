// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const axios = require('axios')

/* exports.handler = (event, context) => {
  return axios
    .post('https://getpocket.com/v3/oauth/request', {
      consumer_key: process.env.CONSUMER_KEY,
      redirect_uri: process.env.REDIRECT_URI,
    })
    .then(response => {
      return {
        statusCode: 200,
        body: JSON.stringify({
          REQUEST_TOKEN: response.code,
          REDIRECT_URI: process.env.REDIRECT_URI,
        }),
        // // more keys you can return:
        // headers: { "headerName": "headerValue", ... },
        // isBase64Encoded: true,
      }
    })
    .catch(error => {
      return { statusCode: 500, body: error.toString() }
    })
}
 */
exports.handler = async (event, context) => {
  try {
    const res = await axios({
      method: 'post',
      url: 'https://getpocket.com/v3/oauth/request',
      data: {
        consumer_key: process.env.CONSUMER_KEY,
        redirect_uri: process.env.REDIRECT_URI,
      },
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'X-Accept': 'application/json',
      },
    })

    console.log(res.data)

    return {
      statusCode: 200,
      body: JSON.stringify({
        REQUEST_TOKEN: res.data.code,
        REDIRECT_URI: process.env.REDIRECT_URI,
      }),
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
