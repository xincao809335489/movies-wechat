// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

//引入axios
const axios = require('axios')

// 云函数入口函数
exports.main = async (event, context) => {
    const {data} = await axios.post("http://0.0.0.0:8090/getMovieComments",{
        index:event.index
    })
    return data
}