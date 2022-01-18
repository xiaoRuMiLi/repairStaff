<template>
  <div>
   
  </div>
</template>
<script>
import axios from 'axios'
import { Popup } from 'vant';
import { URL } from '@/web-config/apiUrl';
import conf from '@/web-config/index';
export default {
  name: 'construction',
  mixins : [ require ( "@/mixins" ).default],
  components: {
   
  },
  data () {
    return {
      // 提交到后端的参数
      params: {},
      onOff:{
        // 弹出右侧弹层
        showPop: !1,
        // 列表下方读取中动画
        loading: true,
        finished: false,
      },
      inputs: {
      
      },
      datas: [
        
      ]
    }

  },
  methods: {

   
  },
  watch: {
   
  },
  mounted () {
   
  },
  created () {

  }
}
</script>