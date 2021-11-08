const express = require('express');
const bodyParser = require('body-parser');
const Mock = require('mockjs')
let detailData = require('./data/detail.json') //引入详情页的数据
let app = express()
//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

let lists = Mock.mock({
    'data|30': [{
        "name|+1": ['阳关普照', '一秒钟', '气球', '八佰','热带雨'],
        "id|+1": 0,
        "desc|+1": ['台湾平凡的一家人的生活','大陆文艺片','灵魂与现实的紧张','1937年淞沪会战一役','马来西亚移居新加坡的生活'],
        "score|+1": ['3','5','4','6','7'],
        "src|+1": ['https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg', 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg', 'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg', 'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg']
    }]
})
//处理跨域
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
//解析post请求参数
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json()); //data参数以字典格式传输

//获取列表数据
app.post('/getListsData', function (req, res) {
    const {
        index,
        size
    } = req.body
    console.log(index, size)
    let startRow = index * size; //开始显示的行  
    let endRow = (index + 1) * size; //结束显示的行  
    const data = lists.data.slice(startRow, endRow)
    res.json(Mock.mock({
        'status': 200,
        'data': data,
        'total': lists.data.length
    }))
})
//获取详情页的数据
app.post('/getMoviesDetail',function(req,res){
    const {name} = req.body
    const obj = detailData.data.find(item=>{
        return item.name === name
    })
    res.json(Mock.mock({
        'status':200,
        obj
    }))
    
})
function updateList(score,name,content){
    lists.data.map(item=>{
        if(item.name === name){
            item['content'] = content
            item.score = score
        }
        return item
    })
}
//更新列表数据
app.post('/updateList',async function(req,res){
    const {score,name,content} = req.body
    detailData.data.map(item=>{
        if(item.name === name){
            item['content'] = content
            item.score = score
        }
        return item
    })
    await updateList(score,name,content);
    console.log(detailData.data)
    console.log(lists.data)
    res.json(Mock.mock({
        'status':200,
        'data':detailData.data
    }))
})

//服务监听
const server = app.listen('8090', '0.0.0.0', (req, res) => {
    const host = server.address().address
    const port = server.address().port
    //反问的地址为：http://127.0.0.1:8090（0.0.0.0是没法访问的）
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})