const mongoose = require('../init')    //引入Mongoose
const Schema = mongoose.Schema          //声明Schema
let ObjectId = Schema.Types.ObjectId    //声明Object类型
const bcrypt = require('bcrypt')        //导入bcrypt
const SALT_WORK_FACTOR = 10             //加盐位数，1-99

//创建我们的用户Schema
const userSchema = new Schema({
    //unique唯一
    userName:{unique:true,type:String},
    password:String,
    createAt:{type:Date,default:Date.now()},
    lastLoginAt:{type:Date,default:Date.now()}

},
// {
//    collection:'user' 控制collection的名字
// }
)
//每次操作userSchema都会去执行这个函数，钩子。next是执行成功调用next 类似于generator的next next的参数即为上一个yield的值
userSchema.pre('save',function(next){
  //加盐
  bcrypt.genSalt(SALT_WORK_FACTOR,(err,salt)=>{
    if(err) return next(err)
    //hash256加密  这里的this指代userSchema 把盐加进去在加密 得到的就是加密后的hash
    bcrypt.hash(this.password,salt,(err,hash)=>{
      if(err) return next(err)
      this.password = hash
      next()
    })
  })
})

userSchema.methods = {
  //密码比对的方法
  comparePassword:(_password,password)=>{
      return new Promise((resolve,reject)=>{
          bcrypt.compare(_password,password,(err,isMatch)=>{
              if(!err) resolve(isMatch)
              else reject(err)
          })
      })
  }
}

//发布模型
module.exports = mongoose.model('User',userSchema)
