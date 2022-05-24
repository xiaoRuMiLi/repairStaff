<template>
    <div class="container">
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
                        <div class="name"><span>{{item.name}}</span><span class="worker-type">{{item.repair_type}}{{
                        item.real_complete_at?'已完成': item.receive_at?'施工中': '待接单'
                        }}</span></div>
                        <div class="date"><span>达成时间</span><span>{{item.real_complete_at}}</span></div>
                    </div>
                </div>
                <div class="progress">
                    <div class="prog1" v-if="item.creat_at != '' & item.creat_at != null & item.creat_at != 'null'" :style="getProgress1Width( key )"> </div>
                    <div class="prog2" v-if="item.receive_at !='' & item.receive_at !=null & item.receive_at !='null'" :style="getProgress2Width( key )"> </div>
                    <div class="prog3" v-if="item.real_complete_at !='' & item.real_complete_at !='null' & item.real_complete_at !=null" :style="getProgress3Width( key )"> </div>
                    <div class="begin"> </div>
                    <div class="over"> </div>
                </div>

            </div>
            <div v-if="arrow" class="right" @click="click">
                <i class="van-icon van-icon-arrow"></i>
            </div>
        </div>
        <div class="illustrate">
            <div><span>总时长</span><div class="illustrate-color" style="background-color: #dcdee0;"></div></div>
            <div><span>派工时长</span><div class="illustrate-color" style="background-color: #1989fa;"></div></div>
            <div><span>操作时长</span><div class="illustrate-color" style="background-color: #ffd01e;"></div></div>
            <div><span>超时时长</span><div class="illustrate-color" style="background-color: #ee0a24;"></div></div>

        </div>
    </div>
</template>
<script>
    import { Image as VanImage } from 'vant';
    import TimeUtils  from '@/utils/TimeUtils';
    import './BaseComponent/index.js';
    export default {
        name: 'JinWorkProgress',
        components: {
            'van-image': VanImage,
        },
        props: {
            startDt: {
                type: String,
                default: '2021-07-20 10:30:00',
            },
            endDt: {
                type: String,
                default: '2021-07-24 10:30:00',
            },
            datas: {
                type: Array,
                default() {
                    return [
                        {
                            name: '邓银剑',
                            imgSrc: "http://www.weixiubang.club/avatarImg/c74c7d9b1fe652744f18994debc95fb0.jpg",
                            receive_at: "2021-07-22 10:30:08",
                            complete_at: "2021-07-23 10:30:00",
                            real_complete_at: "2021-07-22 20:30:08",
                            repair_type: "钣金",
                            creat_at: "2021-07-21 10:30:08",
                        },
                   ]
                }


            },
            arrow: {
              type: Boolean,
              default: false,
            }

        },
        data () {
            return {
                lis: this.datas,
                startDate: this.startDt,
                endDate: this.endDt,
                startDtTimeStamp: 0,
                endDtTimeStamp: 0,
                wholeTimeStamp: 0

            }
        },
        watch: {
            startDt: function( newVal ) {
                this.startDtTimeStamp = TimeUtils.Jh_convertTimeStamp( newVal );
                this.wholeTimeStamp = this.endDtTimeStamp - this.startDtTimeStamp;
            },
            endDt: function( newVal ) {
                this.endDtTimeStamp =  TimeUtils.Jh_convertTimeStamp( newVal );
                this.wholeTimeStamp = this.endDtTimeStamp - this.startDtTimeStamp;
            }
        },
        computed: {


            /**
             * [getProgress1Width 返回表示给定完成时间长度和起始点的长度条样式 蓝色条。 灰色表示各工种合计维修时长]
             * @param  {[type]}  [description]
             * @return {[type]}  [description]
             */
            getProgress1Width( ){
                var self = this;
                return function( index ) {
                    if ( !this.datas[index].complete_at || !this.datas[index].creat_at ) return;
                    const completeTimeStamp = TimeUtils.Jh_convertTimeStamp(this.datas[index].complete_at);
                    const creatTimeStamp = TimeUtils.Jh_convertTimeStamp(this.datas[index].creat_at);
                    const width = Math.round( (completeTimeStamp - creatTimeStamp)/this.wholeTimeStamp * 100 ) + '%';
                    const startPoint =  Math.round( ( 1-(this.endDtTimeStamp - creatTimeStamp)/this.wholeTimeStamp ) * 100 ) + '%';
                    return {
                        width: width,
                        left: startPoint,
                    }

                }




            },
            /**
             * [getProgress2Width 返回接单到给定完成时间的进度条样式  黄色条]
             * @param  {[type]}  [description]
             * @return {[type]}  [description]
             */
            getProgress2Width( ){
                var self = this;
                return function( index ) {

                    if ( !this.datas[index].receive_at ) return;
                    let now = new Date();
                    let nowTimeStampt = now.getTime();
                    let completeTimeStamp = this.datas[index].real_complete_at? TimeUtils.Jh_convertTimeStamp(this.datas[index].real_complete_at):nowTimeStampt;
                    const receiveTimeStamp = TimeUtils.Jh_convertTimeStamp(this.datas[index].receive_at);
                    let  width = Math.round( (completeTimeStamp - receiveTimeStamp)/this.wholeTimeStamp * 100);
                    width = width < 2?(2 + '%'): (width + '%');
                    const startPoint =  Math.round( ( 1-(this.endDtTimeStamp - receiveTimeStamp)/this.wholeTimeStamp ) * 100 ) + '%';
                    return {
                        width: width,
                        left: startPoint,
                    }

                }
            },
            getProgress3Width( ){
                var self = this;
                /**
                 * [超时时间进度条 红色条]
                 * @param  {[type]} index [description]
                 * @return {[type]}       [description]
                 */
                return function( index ) {
                    if ( !this.datas[index].complete_at || !this.datas[index].real_complete_at ) return;
                    const realCompleteTimeStamp = TimeUtils.Jh_convertTimeStamp(this.datas[index].real_complete_at);
                    const completeTimeStamp = TimeUtils.Jh_convertTimeStamp(this.datas[index].complete_at);
                    const width = Math.round( (realCompleteTimeStamp - completeTimeStamp)/this.wholeTimeStamp * 100 ) + '%';
                    const startPoint =  Math.round( ( 1-( this.endDtTimeStamp- completeTimeStamp)/this.wholeTimeStamp ) * 100 ) + '%';
                    return {
                        width: width,
                        left: startPoint,
                    }

                }

            }
        },
        methods: {
          click ()
          {
            this.$emit("click-right");
          }
        }

    }
</script>
<style scoped>
   .container {
     padding: 20px 20px 20px 20px;

   }
   .jin-work-progress {
    display: flex;
    justify-content: space-between;
    font-weight: 550;
    font-size: 14px;
    text-align: left;
    position: relative;
    overflow: hidden;
    width: 100%;
    box-sizing: border-box;
   }
   .left {
    position: relative;
    width: 80%;
    padding: 10px 0;

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
    font-size: var(--com-font-size-sm);
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
    font-size: 14px;
   }
   .score > div {
    display: inline-block;
   }
   .worker-info .date {
    color: #D3D3D3;
    font-size: 10px;
    font-weight: 500;
   }
   .progress {
    height: 10px;
    background-color: #dcdee0;
    border-radius: var(--com-font-size-sm);

   }
   .progress > div {
    height: 10px;
    background-color: red;
    position: absolute;
    opacity: 0.8;

   }
   .progress > .prog1 {
    background-color: #1989fa;
   }
   .progress > .prog2 {
    background-color: #ffd01e;
   }
   .progress > .prog3 {
    background-color: #ee0a24;
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
  .illustrate {
    display: flex;
    justify-content: space-around;
    padding: 40px 0px;
    color: #999999;

  }
  .illustrate span {
    height: 15px;
    line-height: 15px;
    font-size: var(--com-font-size-sm);

  }
  .illustrate .illustrate-color {
    width: 20px;
    border-radius: 5px;
    height: 13px;

  }
  .illustrate > div {
    display: flex;
    align-items: center;
  }
</style>