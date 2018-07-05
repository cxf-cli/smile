const Router = require('koa-router')
const userModel = require('../database/schema/User')
let router = new Router()

router.get('/',async(ctx)=>{
  ctx.body='这是用户界面'
})

router.post('/register',async(ctx)=>{
  console.log(ctx.request.body)
  //把从前端接收的POST数据封装成一个新的user对象
  let newUser = new userModel(ctx.request.body)
  //用mongoose的save方法直接存储，然后判断是否成功，返回相应的结果
  await newUser.save().then(()=>{
      //成功返回code=200，并返回成功信息
      ctx.body={
          code:200,
          message:'注册成功'
      }
  }).catch(error=>{
       //失败返回code=500，并返回错误信息
      ctx.body={
          code:500,
          message:error
      }
  })
})

/*登录的实践 */
router.post('/login',async(ctx)=>{
  //得到前端传递过来的数据
  let loginUser = ctx.request.body
  let userName = loginUser.userName
  let password = loginUser.password
  //查找用户名是否存在，如果存在开始比对密码
 await userModel.findOne({userName:userName}).exec().then(async(result)=>{
      console.log(result)
      if(result){
         //console.log(User)
          //当用户名存在时，开始比对密码
          // let newUser = new userModel()  //因为是实例方法，所以要new出对象，才能调用
          await newUser.comparePassword(password,result.password)
          .then( (isMatch)=>{
              //返回比对结果
              ctx.body={ code:200, message:isMatch}
          })
          .catch(error=>{
              //出现异常，返回异常
              console.log(error)
              ctx.body={ code:500, message:error}
          })
      }else{
          ctx.body={ code:200, message:'用户名不存在'}
      }

  }).catch(error=>{
      console.log(error)
      ctx.body={ code:500, message:error  }
  })
})


module.exports = router
