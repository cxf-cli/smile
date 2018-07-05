const Koa = require('koa')
const app = new Koa()
// const mongoose = require('mongoose')
// const {connect , initSchemas} = require('./database/init.js')

const cors = require('koa2-cors')
//post请求接受request的body
const bodyParser = require('koa-bodyParser')

const Router = require('koa-router')
//路由模块化 把业务分成若干个子路由
let user = require('./appApi/user')
let graphql = require('./appApi/graphql')
let goods = require('./appApi/goods')

//装载所有子路由
let router = new Router()
//访问所有user下的路由必须前面加user
router.use('/user',user.routes())
router.use('/graphql',graphql.routes())
router.use('/goods',goods.routes())


app.use(bodyParser())
//koa支持跨域请求
app.use(cors())

//加载所有中间件
//加载所有路由
app.use(router.routes())
//加载所有路由方法
app.use(router.allowedMethods())



//立即执行函数
// ;(async () =>{
//   try{
//     //await只能获得promise中的resolve值 对于reject不能获得 并且无法执行下面 只有try catch才能捕获 并执行catch下的代码
//     let e = await connect()
//   }catch(e){
//     console.log('err1111111111111111111',e)
//   }
  // let e = await connect()
  // // await connect()
  // console.log(e+'222')
  // initSchemas()
  // const User = mongoose.model('User')
  // let oneUser = new User({userName:'cxf',password:'123456'})
  // oneUser.save().then(()=>{
  //     console.log('插入成功')
  // })

// })()

app.use(async(ctx)=>{
    ctx.body = '<h1>hello Koa2</h1>'
})

app.listen(3000,()=>{
    console.log('[Server] starting at port 3000')
})
