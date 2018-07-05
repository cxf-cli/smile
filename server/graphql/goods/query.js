'use strict';
import {
  GraphQLList,
  GraphQLNonNull
} from 'graphql';
import {goodsType,goodsInput,goodsInputResult} from "./model";
import goodsModel from './../../database/schema/Goods';

const goods = {
  type: goodsInputResult,
  args: {
    data: {
      name: 'goods',
      type: new GraphQLNonNull(goodsInput)
    }
  },
  async resolve(root, params, options) {
    try{
      let result = await goodsModel.findOne({ID: params.data.ID}).exec()
      return {code: 200,message: result}
    }catch(e){
      return {code: 500,message: e}
    }

  }
}

export default {
  goods:goods
}
