const express = require('express');
const router = express.Router();


// router.get
// router.post
// router.all
// router.use

// 普通的get请求
router.get('/list', (req,res) => {
    res.json({
        message: '我是订单模块的路由',
        list: [
            {
                name: '商品订单',
                id: 10
            },
            {
                name: '商品订单',
                id: 11
            },
        ]        
    })
})



// 1.子路由级别的中间件 全局使用
router.use(function(req, res ,next) {
    console.log('我是子路由级别的中间件');
    res.send({
        message: '我是子路由级别的中间件'
    })
    next();
})

// 2.子路由级别的中间件 某个接口内部使用
// router.get('/login', [/**这个参数其实就是中间件 */] , (req, res ,next)=> {})
router.get('/login', [checkLogin] , (req, res ,next)=> {})
function checkLogin(req, res, next) {
    let {name, password} = req.query; // 真实项目中要用 body
    if (!name && !password) {
        res.send({
            message: '登录姓名或密码有误!'
        })
    } else {
        next()
    }
}



module.exports = router;