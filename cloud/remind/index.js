// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const result = await cloud.openapi.subscribeMessage.send({
      "touser": event.openid,           //要发送用户的openid
      "page": 'index',
      "lang": 'zh_CN',      
      "data": {          
        "thing1": {
          "value": 'event.things'
        },
        "time2": {
          "value": 'event.time'
        }
      },
      "miniprogramState": 'developer',
      "templateId": 'l7G27DHV1NKP1ZBHY1zauIFjGXSu8YP04rrp-dM8Jbs',   //订阅消息模板ID
    })
    return result.errCode
  } catch (err) {
    console.log(err)
    return err
  }
}