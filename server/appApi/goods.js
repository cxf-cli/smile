const Router = require('koa-router')
const goodsModel = require('../database/schema/Goods')
const categoryModel = require('../database/schema/Category')
const categorySubModel = require('../database/schema/CategorySub')
let router = new Router()
const fs = require('fs')

router.get('/insertAllGoodsInfo',async(ctx)=>{
  fs.readFile('./newGoods.json','utf8',(err,data)=>{
     data=JSON.parse(data)
     let saveCount=0
     data.map((value,index)=>{
         console.log(value)
         let newGoods = new goodsModel(value)
         newGoods.save().then(()=>{
             saveCount++
             console.log('成功'+saveCount)
         }).catch(error=>{
              console.log('失败：'+error)
         })
     })
 })
 ctx.body="开始导入数据"
})

router.get('/insertAllCategory',async(ctx)=>{
  fs.readFile('./category.json','utf8',(err,data)=>{
      data=JSON.parse(data)
      let saveCount=0
      data.RECORDS.map((value,index)=>{
          console.log(value)
          let newCategory = new categoryModel(value)
          newCategory.save().then(()=>{
              saveCount++
              console.log('成功'+saveCount)
          }).catch(error=>{
               console.log('失败：'+error)
          })
      })


  })
  ctx.body="开始导入数据"

})

router.get('/insertAllCategorySub',async(ctx)=>{
  fs.readFile('./category_sub.json','utf8',(err,data)=>{
      data = JSON.parse(data)
      let saveCount = 0
      data.RECORDS.map((value,index)=>{
          console.log(value)
          let newCategorySub = new categorySubModel(value)
          newCategorySub.save().then(()=>{
              saveCount++
              console.log('成功插入'+saveCount)
          }).catch(error=>{
              console.log('插入失败:'+error)
          })
      })
  })
  ctx.body="开始导入数据"
})

//***获取商品详细信息的接口
router.post('/getDetailGoodsInfo',async(ctx)=>{
  let goodsId = ctx.request.body.goodsId
  await goodsModel.findOne({ID:goodsId}).exec()
  .then(async(result)=>{
      ctx.body={code:200,message:result}
  })
  .catch(error=>{
      console.log(error)
      ctx.body={code:500,message:error}
  })
})

module.exports = router
