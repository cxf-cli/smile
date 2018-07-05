const BASEURL = "https://www.easy-mock.com/mock/5ae2eeb23fbbf24d8cd7f0b6/SmileVue/"
const LOCALURL = "http://localhost:3000/"
const URL = {
    getShoppingMallInfo:BASEURL+'index',
    getGoodsInfo:BASEURL+'getGoodsInfo',
    //注册接口
    registerUser:LOCALURL+'user/register',
    //登录接口
    loginUser:LOCALURL+'user/login',
    //获取商品详情
    getDetailGoodsInfo:LOCALURL+'goods/getDetailGoodsInfo'
}

module.exports = URL
