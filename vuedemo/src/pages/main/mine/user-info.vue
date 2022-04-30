<template>
    <div class="user-info">
    <van-cell-group title="基本信息">
        <van-cell title="ID" :value="data.id" />
        <van-cell title="姓名" :value="data.name" />
        <van-cell title="邮箱地址" :value="data.email" />
        <van-cell title="电话" :value="data.phone" />
        <van-cell title="城市" :value="data.weixin_city" />
        <van-cell title="性别" :value="gender" />
        <van-cell title="微信昵称" :value="data.weixin_nickName" />
        <van-cell title="积分余额" :value="data.integral" />
        <van-cell title="openId" :value="data.weixin_openid" />
        <van-cell title="创建时间" :value="data.created_at" />
    </van-cell-group>
    </div>
</template>
<script>
    import {  Cell, CellGroup } from 'vant';
    import { URL } from '@/web-config/apiUrl';
    import conf from '@/web-config/index';
    export default {
        name: 'userInfo',
        mixins : [ require ( "@/mixins" ).default],
        components: {

        },
        data () {
           return {
                data: {},
           }

        },
        computed: {
            gender ()
            {
                if (this.data.weixin_gender == "1")
                {
                    return "男";
                }
                if (this.data.weixin_gender == "2")
                {
                    return "女";
                }
                return "未知"
            }

        },
        watch: {
            // 在watch中使用this要注意，不能用箭头函数，否则会出错，例如：
        },

        created() {},

        mounted() {
            /**
             * this.$router 是Router 的实例，this.$route 是当前路由属性，
             * this.$router.currentRoute 属性就时 this.$route
             */
            //console.log(this.$router, this.$route);
            const self = this;
            let id = self.$route.params.id;
            this.getData(id);
        },

        unmounted()
        {

        },
        destroyed()
        {

        },
        methods: {
            async getData (id)
            {
                const self = this;
                let data = await self.get(URL.api_userGetUserInfo);
                console.log(data);
                self.data = data.data;

            },

        },
    }
</script>
<style scoped>
    .user-info {
        background-color: var(--van-white);
        padding: var(--van-padding-sm);
    }
</style>