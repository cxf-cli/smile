<template>
  <div>
    <div class="swiper-area">
      <van-swipe :autoplay="2000">
        <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
          <img v-lazy="banner.image" alt="" width="100%">
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
export default {
	props: ['bannerPicArray'],
};
</script>

<style scoped>
.swiper-area {
	max-height: 15rem;
	overflow: hidden;
}
</style>
