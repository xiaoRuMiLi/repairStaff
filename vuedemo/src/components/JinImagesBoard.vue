<template>
	<div class="images-board">
		<div class="content">
			<div class="img-container" v-for="(item,key) in images">
				<van-image
				  :src="item"
				/>
			</div>	
		</div>
		<div class="hidden-btn" @click="onOff.isHide = !onOff.isHide"><i class="van-icon" :class="direction"></i></div>
	</div>
</template>
<script >
    import {Image as VanImage } from 'vant';
	export default {
		name: 'JinImagesBoard',
		components: {
			'van-image': VanImage,
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
				onOff: {
					/* true 向下 false 向上 */ 
					arrow: this.arrowDirection,
				}
			}
		},
		computed: {
			direction () {
				var self = this;
				if ( self.onOff.arrow ) {
					return 'van-icon-arrow-down';
				} else {
					return 'van-icon-arrow-up';
				}
			}
		},
		watch {
			
		}

	}
</script>
<style scoped>
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
</style>