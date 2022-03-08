<template>
	<div class="wrapper">
		<!-- 背景图区域 -->
		<div class="back-ground">
			<div class="go-back">
				<i class="van-icon van-arrow-left"></i>
			</div>
			<div class="text-group">
				<div class="title">
					<span>
					
					</span>
				</div>
				<div class="content">
					<span></span><strong></strong>
				</div>
				
			</div>
			<!-- 右上角圆圈装饰 -->
			<div class="circle"></div>		
		</div>
		<!-- 输入框容器 -->
		<div class="input-container">
			<jin-style1
			title="用户名"
			:value.sync="name"
			placeholder="请输入用户名"
			/>
			
		</div>
		
	</div>
</template>
<script >
	import { Icon, Button, Popup, Toast } from 'vant';
    // import '@/config/css/global.css';
    import JinInputStyle1 from '@/components/JinInputStyle1';

    export default {
        name: 'login',
        mixins: [require( '@/mixins').default],
        components: {
            Icon,
            Button,
            'van-popup': Popup,
            'jin-style1': JinInputStyle1,
        },
        data() {
            return {
            	name: 'name',
               
            }
        },

        computed: {
           
        },

        watch: {
            // 在watch中使用this要注意，不能用箭头函数，否则会出错，例如：
           
        },

        created() {},

        mounted() {},

        unmounted() {},

        methods: {
          

        },
    }
</script>

<style scoped> 
.wrapper {
	background-color: var(--van-white);
}

</style>
