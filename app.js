var express = require('express'); // 引入express模块
var request = require('request');
var app = express(); // 创建服务器实例
var http = require('http'); // 引入http模块
var router = express.Router();


var cors = require('cors'); // 解决跨域
app.use(cors()); 

app.use (express.json()); // 创建处理表单数据的中间件
app.use(express.urlencoded({extended:false}))

app.use('/image',express.static('./image')); // 开放根目录下image文件夹，使得外网可以访问

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // 设置允许跨域的域名，*代表允许任意域名跨域， 例如 允许百度跨域， 把上面这行的*替换为 https://baidu.com
    // res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers","content-type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS"); // 跨域允许的请求方式 
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


// get: 定义方法: demo1
app.get('/',function(req,res){
    res.send('HellowWorld')
});

// get: 响应接口: http://127.0.0.1:3002/list/product  demo2
app.get('/list/product',function(req,res){
    //数据
    let result={
        msg:'success',
        data:{
            "name":"huawei",
            "price":"1999",
            "title":"huawei huawei huawei",
            "id":"1"
        }
    }
    res.send(result)
})

// get: 响应接口: http://127.0.0.1:3002/info/zhang/25  demo2-2 带参数
app.get('/info/:name/:age',function(req,res){
    res.send(req.params);
})

// get: 响应接口: http://127.0.0.1:3002/image  获取图片 demo3
app.get('/image',function(req,res){
    let data=[
         {'img1': 'http://127.0.0.1:3002/image/fj.jpg'},
         {'img2': 'http://127.0.0.1:3002/image/xr.jpg'}
    ]
    res.send(data)
});




// post: 响应接口: http://127.0.0.1:3002/class demo1
app.post('/class',function(req,res){
    res.send(req.params);
})

// 获取列表
router.post('/lists', function(req, res, next) {
    request({
        url: url,
        method: "POST",
        json: true,
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({a: '1'})
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body)
        }
    }); 
 });

 



// 端口监听
var server = app.listen(3002,function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log('listen info:',host,port)
    console.log('服务启动成功...');
})