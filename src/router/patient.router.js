const express = require('express');
const router = express.Router();

router.get('/list', (req,res) => {
    res.json({
        message: '我是就诊人模块的路由',
        list: [
            {
                name: '张三',
                id: 10
            },
            {
                name: '马六',
                id: 11
            },
        ]        
    })
})


module.exports = router;