'use strict';
import {
  GraphQLObjectType,
  GraphQLSchema
} from 'graphql';


// 引入user
import UserQueries from './user/query';
import UserMutations from './user/mutation';
//引入Goods
import GoodsQueries from './goods/query'


export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Queries',
    fields: Object.assign(
      UserQueries,
      GoodsQueries
    )
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutations',
    fields: Object.assign(
      UserMutations
    )
  })
})

