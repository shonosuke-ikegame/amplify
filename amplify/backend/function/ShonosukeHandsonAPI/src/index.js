/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
//lambdaがimport使えない(？)ようなので、requireを使用して実装。
const axios = require('axios')

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`)
  const body = await axios.get(
    'https://ja.wikipedia.org/w/api.php?action=query&generator=random&grnnamespace=0&grnlimit=10&format=json&exsectionformat=plain&explaintext=true&exintro=true&prop=extracts'
  )
  return {
    statusCode: 200, //ローカルからのリクエストも受けられるようにあえてCORSをゆるくしています
    //本番運用する場合は環境変数からオリジンのドメインを取得するようにしてください
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
    body: JSON.stringify(body.data),
  }
}
