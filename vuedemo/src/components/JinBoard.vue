<template>
    <div class="jin-board-content">
        <div class="left">
            <div class="item" v-for="(item,key) in datas" :key="key">{{item}}</div>
        </div>
        <div class="right">
            <div class="btn">{{btn}}</div><i class="van-icon van-icon-arrow"></i>
        </div>

    </div>
</template>
<script>
    export default {
        name: 'JinBoard',
        props: {
            datas: {
                type: Array,
                default: [],
            },
            btn: {
                type: String,
                default: '详情',
            }
        }

    }
</script>

<style scoped>
    .jin-board-content {
        display: flex;
        flex-wrap: nowrap;
        padding: 10px;
        position: relative;
        background-color: #6aa3c1;
        background-image: linear-gradient(90deg, #a5aaad, #6aa3c1);
        border-radius: 10px;
        margin: 20px;
        justify-content: space-between;
    }
    .jin-board-content .left {
        text-align: left;

    }
    .jin-board-content .left .item {
        padding: 2px 0;
        color: #ffffff;
        font-weight: 600;

    }
    .jin-board-content .right {
        display: flex;
        align-items: center;
        font-weight: 600;
        color: #ffffff;

    }
    .jin-board-content .right .btn {
        background-color: #ffcd34;
        width: 80px;
        height: 30px;
        border-radius: 20px 2px 20px 2px;
        line-height: 30px;
        background-image: linear-gradient(90deg, #a2a2a2, #ffcd34);

    }
    .jin-board-content .right i {
        font-size: 15px;

    }
</style>