'use strict';
import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLInputObjectType,
  GraphQLBoolean
} from 'graphql';

export const goodsType = new GraphQLObjectType({
  name: 'goodsType',
  fields: {
    _id: {
      type: GraphQLID
    },
    ID: {
      type: GraphQLString
    },
    GOODS_SERIAL_NUMBER: {
      type: GraphQLString
    },
    SHOP_ID: {
      type: GraphQLString
    },
    SUB_ID: {
      type: GraphQLString
    },
    GOOD_TYPE: {
      type: GraphQLInt
    },
    STATE: {
      type: GraphQLInt
    },
    NAME: {
      type: GraphQLString
    },
    ORI_PRICE: {
      type: GraphQLInt
    },
    PRESENT_PRICE: {
      type: GraphQLInt
    },
    AMOUNT: {
      type: GraphQLInt
    },
    DETAIL: {
      type: GraphQLString
    },
    BRIEF: {
      type: GraphQLString
    },
    SALES_COUNT: {
      type: GraphQLInt
    },
    IMAGE1: {
      type: GraphQLString
    },
    IMAGE2: {
      type: GraphQLString
    },
    IMAGE3: {
      type: GraphQLString
    },
    IMAGE4: {
      type: GraphQLString
    },
    IMAGE5: {
      type: GraphQLString
    },
    ORIGIN_PLACE: {
      type: GraphQLString
    },
    GOOD_SCENT: {
      type: GraphQLString
    },
    CREATE_TIME: {
      type: GraphQLString
    },
    UPDATE_TIME: {
      type: GraphQLString
    },
    IS_RECOMMEND: {
      type: GraphQLInt
    },
    PICTURE_COMPERSS_PATH: {
      type: GraphQLString
    }
  }
})

export const goodsInput = new GraphQLInputObjectType({
  name: 'goodsInput',
  fields: {
    ID: {
      type: GraphQLString
    },
  }
})

export const goodsInputResult = new GraphQLObjectType({
  name: 'goodsInputResult',
  fields: {
    code: {
      type: GraphQLInt
    },
    message: {
      type: goodsType
    }
  }
})

