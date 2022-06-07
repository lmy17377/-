// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env:"cloud1-8gjzcsni9c004532"
})

// 云函数入口函数
exports.main = async (event, context) => {
    try{
        const result = await cloud.openapi.subscribeMessage.send({
          touser:event.openid,
          page:'/pages/remind/remind',
          data:{
            thing2:{
                value: event.name
            },
            amount3:{
                value: event.money
                },
            date4:{
                value: event.date
            },
                },
                templateId:'AHSiO2vdAdpgJA-JmvOpe1zlO2DSjYv1T8RAmJIs2hY'
        })
        console.log(result)
        return result
    } catch(err){
        console.log(err)
        return err
    }
}