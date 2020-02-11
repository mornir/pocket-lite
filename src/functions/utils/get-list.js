import pocket from './pocket-client'

export async function getList(token) {
  const res = await pocket({
    url: 'get',
    data: {
      consumer_key: process.env.CONSUMER_KEY,
      access_token: token,
      detailType: 'simple',
    },
  })

  console.log(res.data.list[0])

  return res.data.list
}
