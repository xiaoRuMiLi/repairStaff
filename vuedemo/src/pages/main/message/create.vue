<template>
    <div>
        <van-radio-group v-model="checked">
            <van-cell-group title="接收者" inset>
                <van-cell v-for="(item, index) in list" :title="item.name" clickable @click="toggle(index)">
                    <template #right-icon>
                        <van-radio :name="item.id" />
                    </template>
                </van-cell>

            </van-cell-group>
        </van-radio-group>

        <van-cell-group title="回复类型" inset>
            <van-cell center title="是否必回">
                <template #right-icon>
                    <van-switch v-model="mustReply" size="24" />
                </template>
            </van-cell>
        </van-cell-group>

        <van-cell-group title="信息内容" inset>
            <van-field
                v-model="message"
                rows="3"
                autosize
                label="留言"
                type="textarea"
                maxlength="125"
                placeholder="请输入留言"
                show-word-limit
            />
        </van-cell-group>

        <van-cell-group title="图片附件" inset>
            <div style="padding: var(--van-padding-md);">
                <van-uploader
                ref="uploader"
                name="file"
                :accept="acceptType"
                :max-size="maxSize"
                :before-read="beforeUpload"
                :after-read="afterRead"
                :max-count="maxCount"
                v-model="fileList"
                @delete="del"
                >
                </van-uploader>
            </div>
        </van-cell-group>

        <div class="button-wrapper" style="padding: 50px var(--van-padding-md);">
            <div class="button-con" style="text-align: center; width: 100%;">
              <van-button type="primary" size="large"  style="background-color: #1989fa; color: white; width: 80%; border-radius: 5px;" @click="submit" >点击提交</van-button>
            </div>
        </div>
    </div>
</template>
<script>
    import { RadioGroup, Radio, Cell, CellGroup, Field, Switch, Uploader   } from "vant";
    import { URL } from '@/web-config/apiUrl';
    import conf from '@/web-config/index';
    import { compressConversion } from '@/utils/imgUtils.js';
    export default {
        name: 'construction',
        mixins : [ require ( "@/mixins" ).default],
        components: {
            "van-radio-group": RadioGroup,
            "van-radio": Radio,
            Cell,
            CellGroup,
            Field,
            "van-switch": Switch,
            "van-uploader": Uploader

        },
        data () {
            return {
                // 施工单ID
                id: 0,
                checked: 0,
                checkboxRefs: [],
                list: [],
                message: '',
                mustReply: !0,
                params: {user_id: 0},
                fileList: [],// 提交的文件数据
                acceptType:  'image/*',
                maxSize: 60000000000,
                maxCount: 16,
                explain: "",
                compressionRate: {width:270,height:230,size:80},
                imageAccept: ['image/jpg','image/png','image/JPEG','image/jpeg'],
                params: {}
           }

        },
        /* 判断是否是从详情页过来的，如果是那么不刷新页面 */
        beforeRouteEnter(to, from, next) {
            // 判断是从哪个路由过来的，若是detail页面不需要刷新获取新数据，直接用之前缓存的数据即可
            if(from.name === '路由name属性') { 
                to.meta.isBack = true;
            }
            next();
        },
        // activated 一进入当前页面页面事件，就会触发事件
        // 如果是从详情页过来的，不用刷新页面,如果本路由没有设置keep-alive 为true，则该生命周期函数不会被调用，如果上一个路由，也就是from Keep-alive属性为true，该函数也不会被调用
        activated() {
            console.log('this.$route',this.$route);
            if(!this.$route.meta.isBack) {
                // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
                //this.getDatas(); // ajax获取数据方法
            }
            // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
            this.$route.meta.isBack = false
            let wrapperScrollTop = this.$refs.wrapper.scrollTop;
        },
        computed: {

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
            this.id = this.$route.params.id;
            this.getReceivers(this.id);
        },
        methods: {
            toggle (index) {
                console.log(index)
                console.log(this.checked);
            },
            //  async 是一个修饰符，async 定义的函数会默认的返回一个Promise对象resolve的值，因此对async函数可以直接进行then操作,返回的值即为then方法的传入函数,
            async uploadFiles(fileObject){
                // 压缩
                //  //  await 关键字 只能放在 async 函数内部， await关键字的作用 就是获取 Promise中返回的内容， 获取的是Promise函数中resolve或者reject的值
               // 如果await 后面并不是一个Promise的返回值，则会按照同步程序返回值处理,为undefined
                let file = await compressConversion(fileObject,this.compressionRate);
                return file;
            },
            beforeUpload(file) {
                return new Promise((resolve, reject) => {
                    if (!this.imageAccept.includes(file.type)) {
                        return this.$notify('请上传 jpg/png 格式图片');
                        reject();
                    } else {
                        const img = this.uploadFiles(file)
                        console.log(img);
                        resolve(img);
                    }
                })
            },
            afterRead (file) {
                var self = this;
                self.fileList[self.fileList.length-1].status = '';
                self.fileList[self.fileList.length-1].name = file.file.name;
                self.fileList[self.fileList.length-1].message = '待上传';
                console.log(self.fileList)
            },
            submit () {
                var self = this;
                const images = self.fileList;
                self.params = { 
                    user_id: self.checked, 
                    content: self.message, 
                    must_reply: self.mustReply? 1: 0, 
                    model: conf.models.construction,
                    model_id: self.id,
                    images: images,
                };
                self.creatMessage(self.params);
                console.log(self.params);
                self.fileList = [];
            },
            del (file) {
                this.$emit( 'delete', file );
            },
            async getReceivers (id) {
                const self = this;
                const data = await self.get(URL.api_getMessageReceiversByConstructionId + id);
                self.list = "data" in data? data.data: [];    
            },

            async uploadImages (images, model, model_id) {
                let self = this;
                for ( let i = 0; i < images.length; i++ ) {
                    let image = images[i].file;
                    images[i].status="uploading";
                    images[i].message = '上传中...';
                    let form = {"image": image, model: model, id: model_id};
                    // p params 和 f form 共同组成 axios的 params 参数， ts 为true 弹出上方提示框
                    let res = await self.upload( URL.api_imageUpload, form );
                    console.log(res);
                    if( typeof res.data === 'object' ) {
                        const data  = res.data;
                        images[i].status = "";
                        images[i].url = res.data.url;
                    } else {
                        images[i].status = "failed";
                    }

                }
                
            },
            creatMessage ( form ) {
                let images = form.images || [];
                let params = { 
                    user_id: form.user_id, 
                    content: form.content, 
                    must_reply: form.must_reply, 
                    model: form.model,
                    model_id: form.model_id
                };
                this.get(URL.api_messageCreate, params).then( data=> {
                    let dat = typeof data == 'string'? JSON.parse( data ): data;
                    if( dat.data.hasOwnProperty('id')) {
                        if (images.length > 0) {
                            console.log(data);
                            this.uploadImages(images, 'message', dat.data.id);
                        }
                        
                    }
                })
            },

        },
    }
</script>