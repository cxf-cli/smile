const mongoose = require('../init')    //引入Mongoose
const Schema = mongoose.Schema

const categorySchema = new Schema({
  ID:{unique:true,type:String},
  MALL_CATEGORY_NAME:{type:String},
  IMAGE:{type:String},
  TYPE:{type:Number},
  SORT:{type:Number},
  COMMENTS:{type:String}
},{
  collections:'Categorys'
})

module.exports = mongoose.model('Category',categorySchema)
