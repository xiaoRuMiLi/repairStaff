<template>
    <div>
        <div class="info">
            <div class="infomation">
                在此你可以设置的你的接单参数，合理的接单规划可以更获取到更多的施工单，提交之前请关注剩余修改次数，每个月只有相应次数的设置机会。
            </div>
            <div class="remaining-times">
                <div class="title">
                   
                    本月剩余修改次数
                    
                </div>
                <div class="val">
                    {{remainingTimes}}
                </div>
            </div>
        </div>
        <div class="form-wrapper">
            <van-form @submit="handleSubmit">
                <van-cell-group>
                    <van-field v-model="maxAmount" name="max_amount" label="最大接单金额" type="number" placeholder="输入金额" 
                    :rules="[{required: true, message: '请输入接单金额'}, {validator: validatorMaxAmount, message: '最大金额设置数应该是介于500至10000之间数值'}]"/>

                    <van-field v-model="maxCount" name="max_count" label="最大接单数量" type="digit" placeholder="输入最大接单数量" 
                    :rules="[{required: true, message: '请输入接单数量'}, {validator: validatorMaxCount, message: '最大接单数量应该是介于1和100之间的整数'}]"/>

                    <van-field v-model="lgnoredHours" name="lgnored_hours" label="忽略的小时数" type="digit" placeholder="输入小时数" 
                    :rules="[{required: true, message: '请输入小时数'}, {validator: validatorlgnoredHours, message: '忽略的小时数应该介于0和8之间的整数'}]"/>
                </van-cell-group>
                <div class="submit-wrapper">
                    <div class="white-space">
                    </div>
                    <van-button block type="info" native-type="submit">
                        提交
                    </van-button>
                </div>
            </van-form>

        </div>
    </div>
</template>

<script>
import { CellGroup, Field, Form, Toast } from "vant";
import { URL } from '@/web-config/apiUrl';
export default {
    data() {
        return {
            // 本月剩余修改次数
            remainingTimes: 0,
            maxAmount: 2000.00,
            maxCount: 4,
            lgnoredHours: 1 
        }
    },
    mixins: [require("@/mixins").default],
    components: {
        CellGroup,
        Field,
        Form,
    },
    methods: {
        handleSubmit(values) {
            console.log(values);
            Toast.loading({
                message: '加载中...',
                forbidClick: true,
            });
            this.post(URL.api_constructionReceiveConfigStore, values).then(data => {
                const result = data.data;
                if (result.hasOwnProperty("max_amount")) {
                    Toast.success('创建成功');
                    this.remainingTimes --;
                }
                Toast.fail("创建失败");
            })
            .catch( err => console.log(err))
            .finally( () => {

            });

            

            
        },
        validatorMaxAmount(value) {
            if (value > 10000 || value < 500) {
                return false;
            }
            return true;
        },
        validatorMaxCount(value) {
            if (value > 100 || value < 1) {
                return false;
            }
            return true;
        },
        validatorlgnoredHours(value) {
            if (value > 8 || value < 0) {
                return false;
            }
            return true;
        },
        async getRemainingTimes() {
            // 获取当前用户的可以修改次数
            const result = await this.get(URL.api_getRemainingTimes);
            return result.data;
        }
        

    },
    async mounted() {
        this.remainingTimes = await this.getRemainingTimes();
    }
}
</script>

<style>
.info {
    padding: var(--van-padding-md);
    background-color: var(--van-background-color-light);
}
.infomation {
    font-size: var(--van-font-size-md);
    color: var(--com-text-color-2);
    font-weight: var(--van-font-weight-blod);
    line-height: var(--van-line-height-lg);
}
.remaining-times {
    display: flex;
    padding: var(--van-padding-lg) var(--van-padding-md) var(--van-padding-md) 0;
    justify-content:start;
    align-items: flex-end;
    
}
.remaining-times .title {
    padding-right: var(--van-padding-md);
    font-size: var(--van-font-size-lg);
    color: var(--van-orange);
    vertical-align: bottom;
}
.remaining-times .val {
    font-size: var(--van-font-size-lg);
    padding-left: var(--van-padding-md);
    vertical-align: text-bottom;
}
.white-space {
    height: 100px;
    background-color: var(--van-background-color-light);
}
.submit-wrapper {
    padding: var(--van-padding-lg);
    background-color: var(--van-background-color-light);
}

</style>
        
