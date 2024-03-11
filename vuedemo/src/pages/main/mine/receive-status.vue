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
                    <van-image  round width="80" height="80" fit="cover" :src="userInfo.avatarUrl"/>
                </div>
            </div>
            <div class="info">
                <div class="name">
                    姓名：{{userInfo.userName}} 
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
            <div v-for="(item,key) in statusDatas" :key="key" class="item" :class="color[item.status]" @click="handleDetail(key)">
                <div class="status-str" :class="color[item.status]">
                    {{receiveStatus[item.status]}}
                </div>
                <div class="date">
                    {{item.date}}
                </div>
                <div class="week">
                    {{daysFromDate(item.date)}}
                </div>
                <div class="status-info">
                    <div class="repairing-count">
                        维修中 <span class="count">{{repairingCount(item.constructions)}}</span>
                    </div>
                    <div class="complete-count">
                        当日完成 <span class="count">{{completeCount(item.constructions)}}</span>
                    </div>
                    <div class="appointment-count">
                        预约中 <span class="count">{{appointmentCount(item.constructions)}}</span>
                    </div>
                </div>
            </div>
        </div>
        <van-popup v-model="dateDetailShow" position="bottom" :style="{height: '50%'}" closeable>
            <div class="date-detail-panel">
                <div class="construction">
                    <div class="title"> 当日排班计划</div>
                    <div v-if="currentStatusConstructions.length <= 0" class="remind">当日暂时没有工作安排</div>
                    <div v-for="(item, key) in currentStatusConstructions" :key="key" class="item" @click="handleToConstruction(item.id)">
                        <div class="left">
                            <div class="car-number">
                                <div v-if="item.appointment" class="tag"> 预约 </div>
                                {{item.car_number}}
                            </div>
                            <div class="car-mode">
                                {{item.car_mode}}
                            </div> 
                        </div>
                        <div class="right">
                            <div class="amount">
                                金额 {{item.amount}}
                            </div>
                            <div class="repair-count">
                                维修项目{{item.hasOwnProperty("repair_content") ? item.repair_content.length : 0}}项
                            </div>
                        </div>

                    </div>
                    <div class="button-container">
                        <div class="white-space"> </div>
                        <div v-if="currentStatus.status != 5" class="button"><van-button type="primary" size="large" @click="handleHoliday">设置为休假日</van-button></div>
                        <div v-else class="button"><van-button type="primary" size="large" @click="handleDestoryHoliday">取消休假</van-button></div>
                    </div>

                </div>
            </div>
        </van-popup>
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
    .date-detail-panel {
        padding: var(--van-padding-xl) var(--van-padding-md);
    }
    .remind {
        padding: var(--van-padding-sm) 0;
        color: var(--van-text-color-1);
        font-size: var(--van-font-size-md);
    }
    .date-detail-panel .construction .item{
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid var(--van-text-color-3);
        padding: var(--van-padding-sm) 0;
    }
    .construction .item .car-number {
        font-size: var(--van-font-size-md);
        font-weight: var(--van-font-weight-bold-2);
        color: var(--van-text-color);
        display: flex;
        align-items: flex-end;
    }
    .construction .item .tag {
        background-color: rgba(225, 0, 255, 0.5);
        padding: var(--van-padding-base);
        color: var(--van-gray-1);
        border-radius: 5px;
        margin-right: var(--van-padding-sm);
        font-size: var(--van-font-size-sm);
    }
    .button-container {
        padding: var(--van-padding-md);
        bottom: 0;
        box-sizing: border-box;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .button-container .white-space {
        background-color: var(--van-background-color-light);
        height: var(--van-padding-lg);
    }
    .button-container .button {
        border-radius: 10px;
        padding: var(--van-padding-base);
        overflow: hidden;
        box-sizing: border-box;
        flex-grow: 1;
    }

    .item .car-mode {
        font-size: var(--van-font-size-sm);
        font-weight: var(--van-font-weight-bold);
        color: var(--van-text-color-2);
    }
    .item .repair-count {
        font-size: var(--van-font-size-sm);
        font-weight: var(--van-font-weight-bold);
        color: var(--van-text-color-2);
    }
    .item .amount {
        font-size: var(--van-font-size-md);
        font-weight: var(--van-font-weight-bold);
        color: var(--van-orange);
    }
    .construction .title {
        font-size: var(--van-font-size-lg);
        font-weight: var(--van-font-weight-bold-2);
        color: var(--van-text-color);
    }
    .user-info-panel {
        display: flex;
        justify-content: flex-start;
        align-items: center;

    }
    .user-info-panel .image {
        padding: var(--van-padding-sm);
        border-radius: 5px;
        overflow: hidden;

    }
    .user-info-panel .info {
        padding: var(--van-padding-sm);
        font-size: var(--van-font-size-md);
        color: var(--van-text-color-2);
    }
    .status-panel {
        padding: var(--van-padding-sm);
        display: flex;
        box-sizing: border-box;
        flex-wrap: wrap;
        justify-content: flex-start;
    }
    .status-panel .item {
        width: 33%;
        text-align: center;
        border: 1px solid var(--van-gray-5);
        border-radius: 5px;
        margin: 5px 0.15%;
        padding: var(--van-padding-base);
        box-sizing: border-box;
       
    }
    .item .status-str {
        font-weight: var(--van-font-weight-bold-2);
    }
    .item .date {
        font-size: var(--van-font-size-md);
        font-weight: var(--van-font-weight-bold-2);
        color: var(--van-text-color);
    }
    .item .week {
        font-size: var(--van-font-size-sm);
        font-weight: var(--van-font-weight-bold);
        color: var(--van-text-color);
    }
    .item .repairing-count {
        color: var(--van-text-color-2);
        font-size: var(--van-font-size-sm);
    }
    .item .complete-count {
        color: var(--van-text-color-2);
        font-size: var(--van-font-size-sm);
    }
    .item .appointment-count {
        color: var(--van-text-color-2);
        font-size: var(--van-font-size-sm);
    }
    .item .count {
        color: var(--van-text-color);
        font-size: var(--van-font-size-md);
        font-weight: var(--van-font-weight-bold-2);
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
import { Image as VanImage, Cell, CellGroup, DatetimePicker, Popup, Toast, Dialog } from "vant";
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
            statusDatas: [],
            receiveStatus: conf.receiveStatus,
            dateDetailShow: false,
            currentIndex: 0,
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
        repairingCount(cons) {
            const constructions = Object.entries(cons).map(([key, value]) => value);
            if (constructions.hasOwnProperty("length")) {
                const finallyConstructions = constructions.filter(item => {
                    return item.appointment == 0 && !item.real_complete_at;
                })
                return finallyConstructions.length;
            }
            return 0;
        },
        daysFromDate(date) {
            const currentDate = new Date(date);
            const days = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
            return days[currentDate.getDay()];

        },
        // 跳转到施工单详情
        handleToConstruction(id) {
            this.$router.push({name: "construction", params: {id: id}});
        },
        // 选择查看详情
        handleDetail(key) {
            this.dateDetailShow = true;
            this.currentIndex = key;
        },
        // 设置当前时间为休息日
        async handleHoliday() {
            const date = this.currentStatus.date;
            const constructions = Object.entries(this.currentStatus.constructions).map((key, val) => val);
            Dialog.confirm({
            title: '提醒',
            message: `将${date}设置为休息日吗？`,
            })
            .then(() => {
                Toast.loading("执行中");
                return this.post(URL.api_vacationsStoreByOneday, {date: date});
            }).then (data => {
                if (data.data.hasOwnProperty("id")) {
                    //Toast.clear();
                    this.currentStatus.status = 5;
                    Toast("设置成功");
                    return ;
                }
            })    
        },

        async handleDestoryHoliday()
        {
            const date = this.currentStatus.date;
            Dialog.confirm({
                title: "提醒",
                message: `确定取消${date}的休假计划吗？`
            }).then(() => {
                Toast.loading("执行中");
                return this.post(`${URL.api_vacationsDestoryByDate}${date}`);
            }).then(data => {
                Toast.clear();
                this.currentStatus.status = 1,
                Toast("设置成功");
            })
            
        },

        async handleEndDatePickerSubmit(value) {
            this.endDatePickerShow = false;
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
            Toast.clear();
        },
        async getReceiveStatus() {
            console.log(this.startDateStr,this.endDateStr );
            const data = await this.get(`${URL.api_construction_receive_status}/${this.startDateStr}/${this.endDateStr}`);
            if (data.data) {
                return data.data;
            }
           
        },
      
    },
    computed: {
        // 选择查看的某一天
        currentStatus() {
            return this.statusDatas[this.currentIndex] ? this.statusDatas[this.currentIndex] : {status: 0, date: ""} ;
        },
        // 某一天的所有施工单
        currentStatusConstructions() {
            return this.currentStatus ? this.currentStatus.hasOwnProperty("constructions") ? this.currentStatus.constructions : [] : []; 
        },
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
            return this.statusDatas.reduce((total, item) => {
                if (item.status == 5) {
                    return total += 1
                };
                return total;
            }, 0);
        },
        completeAmount() {
            if (this.finallyConstructions.length > 0) {
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
            Toast.clear();
        }
    }



}
</script>

<style>

</style>