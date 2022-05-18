<template>
    <div>
        <div class="remind">
        {{language.opinionRemind}}
        </div>
        <!-- 要表单验证必须要把input放在van-form中 -->
        <van-form validate-first @failed="onFailed">
            <van-cell-group inset>
                <van-field
                    v-model="message"
                    rows="3"
                    autosize
                    label="意见"
                    type="textarea"
                    maxlength="125"
                    placeholder="请输入意见"
                    show-word-limit
                    :rules="[
                        {
                            required: true,
                            trigger:'onBlur',
                            message: language.inputNotNull
                        },
                        {
                            pattern: /\S+/,
                            message: language.pleaseInputAny,
                            trigger: 'onBlur'
                        }
                    ]"
                />
                <!--正则验证 必须先给name赋值 :rules="[{正则变量 , message: '错误提示内容' }]" -->
            </van-cell-group>


            <div class="button-wrapper" style="padding: 50px var(--van-padding-md);">
                <div class="button-con" style="text-align: center; width: 100%;">
                  <van-button type="info"  size="large"  style="background-color: #1989fa; color: white; width: 80%; border-radius: 5px;" @click="submit" >点击提交</van-button>
                </div>
            </div>
        </van-form>
    </div>
</template>
<script>
    import { Cell, CellGroup, Field, Toast } from "vant";
    import { URL } from '@/web-config/apiUrl';
    import conf from '@/web-config/index';
    export default {
        name: 'construction',
        mixins : [ require ( "@/mixins" ).default],
        components: {
            Cell,
            CellGroup,
            Field,
        },
        data () {
            return {
                message: "",

           }

        },

        computed: {


        },
        watch: {
            // 在watch中使用this要注意，不能用箭头函数，否则会出错，例如：
        },

        created() {},

        mounted() {
            console.log(this.language);

        },
        methods: {
            onFailed(errorInfo) {
                // 表单验证错误，会执行这里
                console.log('failed', errorInfo);
            },
            async submit () {
                const self = this;
                console.log(URL.api_opinionStore);
                const data = await this.post(URL.api_opinionStore, {content: this.message}).catch(err => console.log(err));;
                let da = data.data;
                if ("id" in da) {
                    Toast(this.language.success);
                    self.message = "";
                }

            }

        },
    }
</script>
<style scoped>
.remind {
    color: var(--van-text-color-2);
    padding: 40px var(--van-padding-md);
}
</style>