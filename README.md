## *****创建expressy应用***** ##

# 1. 创建项目文件夹  
# 2. git init -y
#    npm init
# 3. 手动建立一个叫 .gitignore  (用于git忽略)
# 4. 安装espress  npm install express -save  （百度espress.js  官网）
# 5. 创建一个： src文件 > app.js
#    配置启动命令: 在package.json中   "start": "nodemon ./src/app.js"
#    安装nodemon   npm i nodemon -D    此时在src下启动 npm start  自动监听编辑
# 6. 编写代码


# 7. 中间件
#     (1). 全局的》app 级别使用：详情见app.js 
#     (2). router 级别: 详情见order.router.js 


# 8. 异常处理


# 9. mysql 安装  详情见个人有道笔记记录



# 10. sequlize 集成和使用 数据库
#       (1). 安装       npm install --save sequelize      （百度sequlize官网）
#       (2). 安装cli    npm install --save sequelize-cli     
#       (3). 初始化     npx sequelize-cli init     
#            生成几个文件： 
#                        config: 配置
#                        migrations: 数据库迁移
#                        models: 对应表关联的（重点）
#                        seeders: 初始化脚本

#       
#       (4).创建一个User表：      npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
#               如果要增删改字段直接在models和migrations里增删改，然后删除数据库对应的表，在执行一下迁移命令
#       (5).在appjs中将创建的模型，依赖注入，见appjs

#       (6).将创建的数据迁移到 数据库： npx sequelize-cli db:migrate （后面跟 --env=development） 此时会报错，得装驱动：   npm install mysql2 -S    
#       上面这些命令在：sequelize官网 > Migrations > Running Migrations
## -----以上基本跑通数据库接口



# 11. 实例接口：
#       (1). 安装 debug: 
#       (2). 安装中间件，处理body参数的：npm i body-parser -S     在app.js 引入
#
#
#
#
#
#
#
#
#



