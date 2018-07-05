'use strict';
import {
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLList,
  GraphQLObjectType,
  GraphQLObjectTypeConfig
} from 'graphql';
import {
  InputResult,
  userInput
} from "./model";

// 导入数据模型
import userModel from './../../database/schema/User';


//注册
const UserCreate = {
  type: InputResult, // 定义一个返回数组对象的类型
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(userInput) // 传递参数的类型
    }
  },
  async resolve(root, params, options) {
    // console.log(root, params.data, options)
    try {
      // 存储到数据库
      let result = await userModel.create(params.data)
      // return true
      return {
        code: 200,
        message: true
      };
    } catch (e) {
      // return false
      return {
        code: 500,
        message: false
      };
    }


  }
}

//登录
const UserLogin = {
  type: InputResult,
  args: {
    data: {
      name: 'user',
      type: new GraphQLNonNull(userInput)
    }
  },
  async resolve(root, params, options) {
    console.log(params)
    let userName = params.data.userName
    let password = params.data.password
    //查找用户名是否存在，如果存在开始比对密码
    return await userModel.findOne({
      userName: userName
    }).exec().then(async (result) => {
      console.log(result)
      if (result) {
        //console.log(User)
        //当用户名存在时，开始比对密码
        let newUser = new userModel() //因为是实例方法，所以要new出对象，才能调用
        try{
          let isMatch = await newUser.comparePassword(password, result.password)
          return {code: 200,message: isMatch}
        }catch(e){
          return {code: 500,message: e}
        }
      } else {
        return {
          code: 200,
          message: '用户名不存在'
        }
      }

    }).catch(error => {
      console.log(error)
      return {
        code: 500,
        message: error
      }
    })
  }
}

export default {
  UserCreate: UserCreate,
  UserLogin: UserLogin
}
