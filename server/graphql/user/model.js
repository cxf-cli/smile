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
import GraphQLDate from 'graphql-date';

export const userType = new GraphQLObjectType({
  name: 'userType',
  fields: {
    _id: {
      type: GraphQLID
    },
    password: {
      type: GraphQLString
    },
    userName: {
      type: GraphQLString
    },
    createAt: {
      type: GraphQLDate
    },
    lastLoginAt: {
      type: GraphQLDate
    }
  }
})

export const userInput = new GraphQLInputObjectType({
  name: 'userInput',
  fields: {
    userName: {
      type: GraphQLString
    },
    password: {
      type: GraphQLString
    }
  }
})

export const InputResult = new GraphQLObjectType({
  name: 'InputResult',
  fields: {
    code: {
      type: GraphQLInt
    },
    message: {
      type: GraphQLBoolean
    }
  }
})
