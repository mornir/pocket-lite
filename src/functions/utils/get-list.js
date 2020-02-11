const pocket = require('../pocket-client')

exports.getList = async token => {
  try {
    const res = await pocket({
      url: 'get',
      data: {
        consumer_key: process.env.CONSUMER_KEY,
        access_token: token,
        detailType: 'simple',
      },
    })

    console.log(res.data)

    return {
      statusCode: 200,
      body: JSON.stringify({
        list: res.data.list,
      }),
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
