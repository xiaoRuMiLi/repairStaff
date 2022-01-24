<template>
	<div class="images-board">
		<div class="content" :class="{'short': arrow,'high': !arrow}">
			<div class="img-container" @click="tapImg(key)" v-for="(item,key) in images">
				<van-image
				  :src="item"
				  fit="cover"
				  radius = "5"
				  lazy-load
				/>
			</div>
		</div>
		<div class="hidden-btn" @click="arrow = !arrow"><i class="van-icon van-icon-arrow-down" :class="{'rotate': arrow,'turn-rotate': !arrow}"></i></div>
	</div>
</template>
<script >
    import Vue from 'vue';
    import { Image as VanImage, ImagePreview, Lazyload } from 'vant';
    Vue.use(Lazyload);
	export default {
		name: 'JinImagesBoard',
		components: {
			'van-image': VanImage,
			[ImagePreview.Component.name]: ImagePreview.Component,
		},
		props: {
			images: {
				type: Array,
				default: [],
			},
			arrowDirection: {
				type: Boolean,
				default: !0,
			}
		},
		data () {
			return {
				/* true 向下 false 向上 */
				arrow: this.arrowDirection,
			}
		},
		computed: {

		},
		methods: {
			tapImg(index){
				let self = this;
				console.log(index);
				ImagePreview({
				  images: this.images,
				  closeable: true,
				  startPosition: index,
				});

			},

		},
		watch: {
			arrow( newVal ) {

			}

		}

	}
</script>
<style scoped >
.images-board {
	padding: 20px;
	overflow: hidden;
}
.images-board .content {
	display: flex;
	width: 100%;
    overflow: hidden;
    flex-wrap: wrap;
    padding: 0 0 5px 5px;
}
.img-container {
	padding: 5px 5px 0 0;
	padding: 5px 5px 0 0;
    width: 33%;
    box-sizing: border-box;
    /* flex-grow: 1;*/
}
.hidden-btn {

}

.short {
	/*transition: all 5;
	height: 22vw;*/
	animation: animal-hidden 1s;
	animation-fill-mode: forwards;
	animation-iteration: 1;

}
.high {
	/*transition: all 5;
	height: auto;*/
	animation: animal-show 1s;
    animation-fill-mode: forwards;
    animation-iteration: 1;
}

/* 动画 控制旋转 */
.rotate {
    animation: animal-rotate 0.5s;
    animation-fill-mode:forwards;
    animation-iteration-count:1;
}
.turn-rotate {
    animation: turn-animal-rotate 0.5s;
    animation-fill-mode:forwards;
    animation-iteration-count:1;
}

@keyframes animal-rotate {
	from {transform: rotate(0deg);}
	to {transform: rotate(180deg);}
}
@keyframes turn-animal-rotate {
	from {transform: rotate(180deg);}
	to {transform: rotate(0deg);}
}
@keyframes animal-hidden {
	from { height: auto; }
	to { height: 22vw; }
		
}
@keyframes animal-show {
    from {height: 22vw;}
    to {height: auto}
}
</style>