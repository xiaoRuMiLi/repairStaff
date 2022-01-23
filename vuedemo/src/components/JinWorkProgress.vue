<template>
    <div>
        <div class="jin-work-progress" v-for="(item,key) in datas" :key="key">
            <div class="left">
                <div class="head">
                    <div class="img-div">
                        <van-image
                            fill="true"
                            :src="item.imgSrc"
                        />
                    </div>
                    <div class="worker-info">
                        <div class="name"><span>{{item.name}}</span><span class="worker-type">{{item.repair_type}}</span></div>
                        <div class="date"><span>时间</span><span>{{item.real_complete_at}}</span></div>
                    </div>
                </div>
                <div class="progress">
                    <div class="prog1" :style="{width: getProgress1Width( key )}"> </div>
                    <div class="prog2" :style="{width: getProgress2Width( key )}"> </div>
                    <div class="prog3" :style="{width: getProgress3Width( key )}"> </div>
                    <div class="begin"> </div>
                    <div class="over"> </div>
                </div>

            </div>
            <div class="right">
                <i class="van-icon van-icon-arrow"></i>
            </div>
        </div>
    </div>
</template>
<script>
    import { Image as VanImage } from 'vant';
    import TimeUtils  from '@/utils/TimeUtils';
    export default {
        name: 'JinWorkProgress',
        components: {
            'van-image': VanImage,
        },
        props: {
            datas: {
                type: Array,
                default() {
                    return [
                        {
                            name: '邓银剑',
                            imgSrc: "http://www.weixiubang.club/avatarImg/c74c7d9b1fe652744f18994debc95fb0.jpg",
                        receive_at: "2021-07-22 11:33:43",
                        complete_at: "2021-07-23 18:00:00",
                        real_complete_at: "2021-07-22 11:33:44",
                        remarks: "",
                        complete_type: 1,
                        repair_type: "钣金",
                        creat_at: "2021-07-22 11:05:08",
                        },
                   ]
                }


            }

        },
        data () {
            return {
                lis: this.datas,

            }
        },
        computed: {
            getProgress1Width( ){
                var self = this;
                return function( index ) {
                    console.log( TimeUtils.Jh_convertTimeStamp(this.datas[index].real_complete_at));
                    const realCompleteTimeStamp = TimeUtils.Jh_convertTimeStamp(this.datas[index].real_complete_at);
                    const completeTimeStamp = TimeUtils.Jh_convertTimeStamp(this.datas[index].complete_at);
                    const receiveTimeStamp = TimeUtils.Jh_convertTimeStamp(this.datas[index].receive_at);

                    return '20px';
                }




            },
            getProgress2Width( ){
                var self = this;
                return function( index ) {
                    console.log( TimeUtils.Jh_convertTimeStamp(this.datas[index].real_complete_at));
                    return '20px';
                }
            },
            getProgress3Width( ){
                var self = this;
                return function( index ) {
                    console.log( TimeUtils.Jh_convertTimeStamp(this.datas[index].real_complete_at));
                    return '20px';
                }

            }
        }

    }
</script>
<style scoped>
   .jin-work-progress {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    font-weight: 550;
    font-size: 14px;
    text-align: left;
    position: relative;
   }
   .left {

   }
   .img-div {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    overflow: hidden;
   }
   .jin-work-progress .head {
    display: flex;
    padding: 5px 0;
   }
   .worker-type {
    color: #ffcd34;
    font-size: 4px;
   }
   .jin-work-progress span {
    padding: 10px;
   }
   .worker-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
   }
   .worker-info .name {
    font-size: 16px;
   }
   .score > div {
    display: inline-block;
   }
   .worker-info .date {
    color: #D3D3D3;
   }
   .progress {
    height: 10px;
    background-color: #999999;

   }
   .jin-work-progress .right {
    height: 100%;
    display: inline-block;
    flex-grow: 1;
    text-align: end;
  }
  .jin-work-progress .right> i {
    position: absolute;
    /* top: 50%; */
    bottom: 50%;
    transform: translate(-15px,7px);
    font-size: 15px;
    font-weight: 600;
  }
</style>