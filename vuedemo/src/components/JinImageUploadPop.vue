<template>
<div class="jin-image-upload-pop">
    <van-popup
        v-model:show="popShow"
        round
        position="bottom"
        style="height: 50%;padding: 20px 0;"
    >
        <slot name="default">
            <div class="wrapper">
                <div class="explain">
                    <span>{{explain}}</span>
                </div>
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
                <div class="button-wrapper">
                    <div class="button-con">
                      <van-button type="primary" size="large"  style="background-color: #1989fa; color: white; width: 80%; border-radius: 5px;" @click="submit" >点击提交{{form.length}}张图片</van-button>
                    </div>
                </div>
            </div>
        </slot>
    </van-popup>

</div>

</template>


<script>
    import { Icon, Button, Popup, Uploader } from 'vant';
    import { compressConversion } from '@/utils/imgUtils.js'
    export default {
        name: 'jinImageUploadPop',

        components: {
            Icon,
            Button,
            'van-popup': Popup,
            'van-uploader': Uploader,
        },

        props: {
            show: {
                type: Boolean,
                default: true,
            },
            acceptType: {
                type: String,
                default: 'image/*',
            },
            maxSize: {
                type: Number,
                default: 60000000000,
            },
            maxCount: {
                type: Number,
                default: 16,

            },
            explain: {
                type: String,
                default: '',
            },
            compressionRate: {
                type: Object,
                default: ()=> { return {width:270,height:230,size:80}},
            },
            imageAccept: {
                type: Array,
                default: function () {
                    return ['image/jpg','image/png','image/JPEG','image/jpeg'];
                }
            },
            files: {
                type: Array,
                default: function () {
                    return [
                        {
                            url: 'https://img.yzcdn.cn/vant/leaf.jpg',
                        },
                        // Uploader 根据文件后缀来判断是否为图片文件
                        // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
                        {
                            url: 'https://cloud-image', isImage: true
                        },
                    ];
                }
            }


        },
        data() {
            return {
                fileList: this.files,
                popShow: this.show,
                form: [],

            }

        },

        computed: {

        },

        watch: {
            // 在watch中使用this要注意，不能用箭头函数，否则会出错，例如：
            popShow (nval) {
                this.$emit('update:show', nval);
            },
            show (nval) {
                this.popShow = nval;
            },
            files ( nval ) {
                this.fileList = nval;
            },
            fileList ( nval ) {
                this.$emit('update:files', nval);
            }


        },

        created() {
            // this.form = [];
            // 对象被冻结后不可修改
            // Object.freeze(this.form);
        },

        mounted() {},

        unmounted() {},

        methods: {
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
                        resolve(img);
                    }
                })
            },
            afterRead (file) {
                var self = this;
                // 此时可以自行将文件上传至服务器
                self.form.push({
                    image: file.file,
                });
                console.log(self.fileList)
                self.fileList[self.fileList.length-1].status = '';
                self.fileList[self.fileList.length-1].name = file.file.name;
                self.fileList[self.fileList.length-1].message='待上传'
            },
            submit () {
                var self = this;
                this.$emit( 'upload', self.form );
                self.form = [];
            },
            del (file) {
                this.$emit( 'delete', file );
            }

        }
    }
</script>

<style scoped>
.wrapper {
    padding: 20px;
}
.explain {
    padding: 30px 0;
    color: #999999;
}
.button-wrapper {
    margin-top: 50px;
}
.button-con {
    text-align: center;
}
</style>