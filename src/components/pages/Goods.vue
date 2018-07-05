<template>
    <div>
        商品详情页面
    </div>
</template>

<script>
import axios from 'axios';
import url from '@/serviceAPI.config.js';
export default {
	data() {
		return {
			goodsId: '775e575ce28a4f89b1dfe2c99eb08ae7',
		};
	},
	created() {
    this.goodsId= this.$route.query.goodsId
    console.log(this.goodsId)
		this.getInfo();
	},
	methods: {
		getInfo() {
			// axios({
			// 	url: url.getDetailGoodsInfo,
			// 	method: 'post',
			// 	data: {
			// 		goodsId: this.goodsId,
			// 	},
			// })
      // .then(response => {
      //   console.log(response);
      // })
      // .catch(error => {
      //   console.log(error);
      // });
      this.$graphql.request(`
        query{
          goods(data:{
            ID: "${this.goodsId}"
          }){
            code
            message{
              _id
              id: ID
              goodsSearchNumber: GOODS_SERIAL_NUMBER
              shopId: SHOP_ID
              subId: SUB_ID
            }
          }
        }
      `).then(res=>{
        console.log(res)
      }).catch(e=>{
        console.log(e)
      })
		},
	},
};
</script>

<style scoped>
</style>
