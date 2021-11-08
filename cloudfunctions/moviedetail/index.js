// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const axios = require('axios')

// 云函数入口函数
exports.main = async (event, context) => {
    const {data} = await axios.post('http://0.0.0.0:8090/getMoviesDetail',{
        name:event.name
    })
    return data
}