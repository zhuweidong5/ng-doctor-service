const express = require('express'); // 引入express模块
const request = require('request'); // 引入request模块
const http = require('http');       // 引入http模块
const app = express(); // 创建express服务器实例
const router = express.Router(); // 引入路由

// 解决跨域
const cors = require('cors'); 
app.use(cors()); 

// 创建处理表单数据的中间件
app.use (express.json()); 
app.use(express.urlencoded({extended:false}))

// 注册路由模块
const orderRouter = require('./router/order.router');
const patientRouter = require('./router/patient.router');
app.use('/order', orderRouter)  // http://127.0.0.1:3002/order/list
app.use('/patient', patientRouter) // http://127.0.0.1:3002/patient/list

// 开放根目录下image文件夹，使得外网可以访问  http://127.0.0.1:3002/image/fj.jpg
app.use('/image',express.static('../image')); 

//设置跨域访问
app.all('*', (req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*"); // 设置允许跨域的域名，*代表允许任意域名跨域， 例如 允许百度跨域， 把上面这行的*替换为 https://baidu.com
    res.header("Access-Control-Allow-Headers","content-type");  // content-type  或者  X-Requested-With
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS"); // 跨域允许的请求方式 
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});





// ------------------------------------------------------------GET 请求
// req.params,req.query是用在get请求当中
// 而req.body是用在post请求中的

// get: 响应接口: http://127.0.0.1:3002/list/product  demo1
app.get('/list/product', (req,res) =>{
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

// get: 响应接口: http://127.0.0.1:3002/info/zhang/25  demo2-1 带参数
//      通过请求方式
// 通过req.params.name，我们会得到 zhang
// 通过req.params.age，我们会得到 25
app.get('/info/:name/:age', (req,res) =>{
    let {name} = req.params; // 自动接参
    let {age} = req.params; 
    res.send({
        name,
        age
    })
})

// get: 响应接口: http://127.0.0.1:3002/info/byname?name=张三  demo2-2 带参数
//      通过url路径
// 通过req.query，我们会得到 张三
// ?后面跟的参数, 就用 query 接收
app.get('/info/byname/', (req,res) =>{
    let {name} = req.query; 
    let {id} = req.query
    res.send({
        name,
        id
    })
})

// get: 响应接口: http://127.0.0.1:3002/image  获取图片 demo3
app.get('/image', (req,res) =>{
    let data=[
         {'img1': 'http://127.0.0.1:3002/image/fj.jpg'},
         {'img2': 'http://127.0.0.1:3002/image/xr.jpg'}
    ]
    res.send(data)
});




// ------------------------------------------------------------POST 请求
// post: 响应接口: http://127.0.0.1:3002/class demo1
app.post('/class', (req,res) =>{
    res.send(req.params);
})




// ------------------------------------------------------------all 请求
// all 和 use(注册中间件的) 效果一样
app.all('/demo', (req,res) => {
    res.json({
        message: '什么请求方式我都能成功',
        method: req.method,
        url: req.path
    })
})

// 通配请求
// app.all('*', (req,res) => {
//     res.json({
//         message: '什么请求地址我都能成功',
//         method: req.method,
//         url: req.path
//     })
// })




// ------------------------------------------------------------中间件结构：err,req,res,next
// 1.处理异常
// 2.业务功能(转交控制权,next), 
// 3.响应请求, 结束请求, 当作路由的处理函数

// 检查是否传了参数id
function checkId_midd( req, res ,next) {
    console.log(req.query)
    let {id} = req.query; // 通过query 接收的则是请求地址 ？ 后面的参数
    if (!id) {
        res.json({
            message: '缺少id参数'
        })
    } else {
        next()
    }
}
// app.all('*', checkId_midd) // 先检查是否有id
// app.get('/checkId', (req, res) => {
//     res.json({
//         message: '你的id传了，没问题老铁'
//     })
// })

// app.use('*', checkId_midd) // 全局使用-中间件



app.get('/errMidd', ()=> {
    throw new Error('我是全局异常处理')
})

// ------------------------------------------------------------ 异常处理：使用中间件
function err_midd(err, req, res, next) {
    let message = err
    if(err) {
        res.status(500)
        .json({
            message: `${message || '服务器异常'}`,
            message2: '服务器异常'
        })
    }
}
// 例如访问： http://127.0.0.1:3002/errMidd    查看异常

function not_found_midd(res) {
    res.json({
        message: '404 路径错误'
    })
}

app.use(not_found_midd); // 异常处理放在所有路由最后面
app.use(err_midd); // 异常处理放在所有路由最后面









// 获取列表
// router.post('/lists', function(req, res, next) {
//     request({
//         url: url,
//         method: "POST",
//         json: true,
//         headers: {
//             "content-type": "application/json",
//         },
//         body: JSON.stringify({a: '1'})
//     }, function(error, response, body) {
//         if (!error && response.statusCode == 200) {
//             res.send(body)
//         }
//     }); 
//  });







 



// 端口监听
const server = app.listen(3002,function(){
    let host = server.address().address;
    let port = server.address().port;
    console.log('listen info:',host,port)
    console.log('服务启动成功...');
})