const mongoose = require('mongoose')
const db = "mongodb://localhost/smile-db"
// const glob = require('glob')
// const {resolve} = require('path')

//glob：node的glob模块允许你使用 * 等符号，来写一个glob规则，像在shell里一样，获取匹配对应规则文件。
//resolve: 将一系列路径或路径段解析为绝对路径。
// exports.initSchemas = () =>{
//   glob.sync(resolve(__dirname,'./schema/','**/*.js')).forEach(require)
// }

//mongoose自己的promise有点问题，替换成全局的promise
mongoose.Promise = global.Promise

!function(){
    //连接数据库
    mongoose.connect(db)

    let maxConnectTimes = 0
    //数据库正常连接才往下执行，没有正常连接 不往下执行
    return  new Promise((resolve,reject)=>{
    //把所有连接放到这里

        //增加数据库监听事件
        mongoose.connection.on('disconnected',()=>{
            console.log('***********数据库断开***********')
            if(maxConnectTimes<3){
                maxConnectTimes++
                mongoose.connect(db)
            }else{
                reject()
                throw new Error('数据库出现问题，程序无法搞定，请人为修理......')
            }

        })

        mongoose.connection.on('error',err=>{
            console.log('***********数据库错误***********')
            if(maxConnectTimes<3){
                maxConnectTimes++
                mongoose.connect(db)
            }else{
                reject(err)
                throw new Error('数据库出现问题，程序无法搞定，请人为修理......')
            }

        })
        //链接打开的时
        mongoose.connection.once('open',()=>{
            console.log('MongoDB connected successfully')
            resolve()
        })

    })

}().catch(e=>{
  console.log(e)
})

module.exports = mongoose
