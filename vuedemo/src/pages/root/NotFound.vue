<template>
	<div class="wrapper">
	没有你要找的页面！！
	</div>
</template>
<script >
	import { Icon } from 'vant';
    export default {
        name: 'notFound',
        mixins: [require( '@/mixins').default],
        components: {
        },
        
        data() {
            return {
                email: null
                
            }
        },

        computed: {

        },
        watch: {
            // 在watch中使用this要注意，不能用箭头函数，否则会出错，例如：

        },
        created() {},

        mounted() {      

        },

        unmounted() {},

        beforeDestroy () {
    
        },

        methods: {
           
        },
    }
</script>