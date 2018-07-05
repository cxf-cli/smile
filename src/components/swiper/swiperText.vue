<template>
  <div>
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide class="text">
        <div>原因是，Vue是异步执行dom更新的，一旦观察到数据变化，Vue就会开启一个队列，然后把在同一个事件循环 (event loop) 当中观察到数据变化的 watcher 推送进这个队列。如果这个watcher被触发多次，只会被推送到队列一次。这种缓冲行为可以有效的去掉重复数据造成的不必要的计算和DOm操作。而在下一个事件循环时，Vue会清空队列，并进行必要的DOM更新。
当你设置 vm.someData = 'new value'，DOM 并不会马上更新，而是在异步队列被清除，也就是下一个事件循环开始时执行更新时才会进行必要的DOM更新。如果此时你想要根据更新的 DOM 状态去做某些事情，就会出现问题。。为了在数据变化之后等待 Vue 完成更新 DOM ，可以在数据变化之后立即使用 Vue.nextTick(callback) 。这样回调函数在 DOM 更新完成后就会调用。
</div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
export default {
	data() {
		return {
			swiperOption: {
				direction: 'vertical',
				slidesPerView: 'auto',
				//是否为自动贴合模式
				freedom: true,
				//鼠标滚轮可以实现效果
				mousewheel: true,
			},
		};
	},
  components:{swiper,swiperSlide}
};
</script>

<style scoped>
.swiper {
	height: 300px;
	overflow: hidden;
}
.text {
	font-size: 18px;
  box-sizing: border-box;
  text-align: left;
  padding: 30px;
  height: auto;
}
</style>
