<template>
<div class="jin-image-upload-pop">
    <van-popup
        v-model:show="popShow"
        round
        position="bottom"
        :style="{ height: '50%' }"
    >
        <slot name="default">
            <van-uploader
            ref="uploader"
            name="file"
            :accept="acceptType"
            :max-size="maxSize"
            :before-read="beforeUpload"
            :after-read="afterRead"
            v-model="fileList"
            >
            </van-uploader>
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
            }

        },

        data() {
            return {
                fileList: [
                    { url: 'https://img.yzcdn.cn/vant/leaf.jpg' },
                    // Uploader 根据文件后缀来判断是否为图片文件
                    // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
                    { url: 'https://cloud-image', isImage: true },
                ],
                popShow: this.show,
            }

        },

        computed: {

        },

        watch: {
            // 在watch中使用this要注意，不能用箭头函数，否则会出错，例如：
            popShow (nval) {
                this.$emit('update:show', nval);
            }

        },

        created() {},

        mounted() {},

        unmounted() {},

        methods: {
            //  async 是一个修饰符，async 定义的函数会默认的返回一个Promise对象resolve的值，因此对async函数可以直接进行then操作,返回的值即为then方法的传入函数,
            async uploadFiles(fileObject){
                // 压缩
                //  //  await 关键字 只能放在 async 函数内部， await关键字的作用 就是获取 Promise中返回的内容， 获取的是Promise函数中resolve或者reject的值
               // 如果await 后面并不是一个Promise的返回值，则会按照同步程序返回值处理,为undefined
                let file = await compressConversion(fileObject,{width:170,height:230,size:80});
                return file;
            },
            beforeUpload(file) {
                return new Promise((resolve, reject) => {
                    if (file.type !== 'image/jpeg') {
                      Toast('请上传 jpg 格式图片');
                      reject();
                    } else {
                        const img = this.uploadFiles(file)
                        resolve(img);
                    }
                })
            },
            afterRead (file) {
                // 此时可以自行将文件上传至服务器
                console.log(file);

            },
            handleSuccess(res) {
                console.log('handleSuccess：', res);
            }
        }
    }
</script>