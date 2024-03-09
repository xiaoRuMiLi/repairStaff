<!--
 * @Description: 
 * @User: King <303219462@qq.com>
 * @Date: 2024-03-08 20:15:42
-->
<template>
    <div class="wrapper">
        <div class="user-info-panel">
            <div class="left">
                <div class="image">
                    <van-image  width="100" height="100" fit="cover" :src="userInfo.avatarUrl"/>
                </div>
            </div>
            <div class="info">
                <div class="name">
                    姓名：{{name}}
                </div>
                <div class="vacation-days">
                    休假天数：{{vacationDays}}
                </div>
                <div class="complete-amount">
                    完成金额：{{completeAmount}}
                </div>
                <div class="repairing-amount">
                    施工金额：{{repairingAmount}}
                </div>
            </div>

        </div>
        <div class="date-change-panel">
            <van-cell-group>
                <van-cell title="开始时间" is-link :value="startDateStr" @click="startDatePickerShow = !startDatePickerShow"/>
                <van-cell title="结束时间" is-link :value="endDateStr" @click="endDatePickerShow = !endDatePickerShow"/>
            </van-cell-group>
        </div>
        <div class="status-panel">
            <div v-for="(item,key) in statusDatas" :key="key" class="item" :class="color[5]">
                <div class="status-str" :class="color[item.status]">
                    {{receiveStatus[item.status]}}
                </div>
                <div class="date">
                    2024-03-06
                </div>
                <div class="week">
                    星期三
                </div>
                <div class="status-info">
                    <div class="repairing-count">
                        施工数量{{item.constructions.length}}台
                    </div>
                    <div class="repairing-count">
                        完成数量{{completeCount(item.constructions)}}台
                    </div>
                    <div class="repairing-count">
                        预约数量{{appointmentCount(item.constructions)}}台
                    </div>
                </div>
            </div>
        </div>
        <van-popup v-model="startDatePickerShow" position="bottom" :style="{height: '30%'}">
            <van-datetime-picker
            v-model="startDate"
            type="date"
            title="选择开始时间"
            :min-date="minDate"
            :max-date="maxDate"
            @confirm="startDatePickerShow = false"
            @cancle="startDatePickerShow = false"
            />
        </van-popup>
        <van-popup v-model="endDatePickerShow" position="bottom" :style="{height: '30%'}">
            <van-datetime-picker
            v-show="endDatePickerShow"
            v-model="endDate"
            type="date"
            title="选择结束时间"
            :min-date="minDate"
            :max-date="maxDate"
            @confirm="handleEndDatePickerSubmit"
            @cancel="endDatePickerShow = false"
            />
        </van-popup>
    </div>
</template>
<style acoped>
    .wrapper {
        background: var(--van-background-color-light);
        padding: var(--van-padding-sm);

    }

    .user-info-panel {
        display: flex;
        justify-content: flex-start;
        padding: var(--van-padding-md);
        align-items: center;

    }
    .user-info-panel .image {
        padding: var(--van-padding-sm);
    }
    .user-info-panel .info {
        padding: var(--van-padding-sm);
    }
    .status-panel {
        padding: var(--van-padding-sm);
        display: flex;
        box-sizing: border-box;
        flex-wrap: wrap;
    }
    .status-panel .item {
        width: 30%;
    }
    .red {
        color: var(--van-red);
    }
    .orange {
        color: var(--van-orange);
    }
    .grey {
        color: var(--van-gray-5);
    }
    .green {
        color: var(--van-green);
    }
    .blue {
        color: var(--van-blue);
    }
    .purple {
        color: rgba(225, 0, 255, 0.5);
    }
</style>

<script>
import { Image as VanImage, Cell, CellGroup, DatetimePicker, Popup, Toast } from "vant";
import { URL } from '@/web-config/apiUrl';
import conf from '@/web-config/index';
const startDate = new Date();
const endDate = new Date();
endDate.setDate(endDate.getDate() + 10);
const color = [ "grey", "green", "blue", "orange", "red", "purple"];
export default {
    components: {
        "van-image": VanImage,
        Cell,
        CellGroup,
        "van-datetime-picker": DatetimePicker,
        "van-popup": Popup,
    },
    mixins: [require( '@/mixins').default],
    data() {
        return {
            minDate: new Date("2000-01-01"),
            maxDate: new Date("2050-01-01"),
            color: color,
            startDate: startDate,
            endDate: endDate,
            startDatePickerShow: false,
            endDatePickerShow: false,
            name: " ",
            statusDatas: [],
            receiveStatus: conf.receiveStatus

        }
    },
    methods: {
        completeCount(cons) {
            // 有时候传过来的只包含一个元素的数组前端拿到的却是对象所以转换一下
            const constructions = Object.entries(cons).map(([key, value]) => value);
            if (constructions.hasOwnProperty("length")) {
                const finallyConstructions = constructions.filter(item => !!item.real_complete_at)
                return finallyConstructions.length;
            }
            return 0;
        },
        appointmentCount(cons) {
            const constructions = Object.entries(cons).map(([key, value]) => value);
            if (constructions.hasOwnProperty("length")) {
                const finallyConstructions = constructions.filter(item => {
                    return item.appointment;
                })
                return finallyConstructions.length;
            }
            return 0;
        },
        async handleEndDatePickerSubmit(value) {
            this.statusDatas.length = 0;
            Toast.loading({
                message: '加载中...',
                forbidClick: true,
            });
            const data = await this.getReceiveStatus();
            data.forEach(item => {
                console.log(data)
                this.statusDatas.push(item);
            })
        },
        async getReceiveStatus() {
        
            const data = await this.get(`${URL.api_construction_receive_status}/${this.startDateStr}/${this.endDateStr}`);
            if (data.data) {
                return data.data;
            }
           
        },
      
    },
    computed: {
        startDateStr() {
            let formattedDate = this.startDate.getFullYear() + '-' +
            ('0' + (this.startDate.getMonth() + 1)).slice(-2) + '-' +
            ('0' + this.startDate.getDate()).slice(-2);
            return formattedDate;
        },
        endDateStr() {
            let formattedDate = this.endDate.getFullYear() + '-' +
            ('0' + (this.endDate.getMonth() + 1)).slice(-2) + '-' +
            ('0' + this.endDate.getDate()).slice(-2);
            return formattedDate;
        },
        vacationDays() {
            this.statusDatas.reduce((total, item) => {
                if (item.status == 5) {
                    return total += 1
                };
                return total;
            }, 0);
        },
        completeAmount() {
            if (this.finallyConstructions.length > 0) {
                console.log(this.finallyConstructions);
                const amountTotal = this.finallyConstructions.reduce((total, item) => {
                    // 筛选出不是预约单，有金额， 完成的施工单
                    if (item.amount && item.real_complete_at && item.appointment == 0) {
                        return total += item.amount;
                    };
                    return total;
                }, 0);
                return amountTotal;
            }
           
            return 0;
        },
        finallyConstructions() {
            let constructions = this.statusDatas.flatMap(i => {
                if (i.constructions.length > 0)
                {
                    return i.constructions;
                } else {
                    return [];
                }   
            });
            if (constructions.length) {
                const finallyConstructions =  constructions.filter((item, index) => {
                    return constructions.findIndex(t => {return t.id == item.id}) === index;
                })
                return finallyConstructions;
            }
            return [];

        },
        repairingAmount() {
            if (this.finallyConstructions.length > 0) {
                const amountTotal = this.finallyConstructions.reduce((total, item) => {
                    // 筛选出不是预约单，有金额， 没有完成的施工单
                    if (item.amount && !item.real_complete_at && item.appointment == 0) {
                        return total += item.amount;
                    };
                    return total
                }, 0);
                return amountTotal;
            }
           
            return 0;
           
        }
        
    },
    created() {
        //console.log(userInfo);
    },
    async mounted() {
        try{
            Toast.loading({
                message: '加载中...',
                forbidClick: true,
            });
            const data = await this.getReceiveStatus();
            data.forEach(item => {
                this.statusDatas.push(item);
            })
        } catch (err) {
            Toast.fail(err.message);
        } finally {
            
        }
    }



}
</script>

<style>

</style>