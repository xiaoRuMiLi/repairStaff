export default {
  name: 'jinRemindItem',
  props: {
    num: Number,
    msg: String,
    ind: Number,  
  },
  data () {
    return {
     
    }
  },
  emits: {
    // 接收父组件传递过来的函数，父组件绑定的函数。emits 可以是对象也可以是数组【‘click’,'submit'】
    // 没有验证，感觉没有起作用
    open: null,

    // 验证 submit 事件
    clickitem: ( index ) => {
      console.log( index );
      if ( typeof index == 'Number') {
        return true;
      } else {
        console.warn('Invalid submit event payload!')
        return false;
      }
    }
  },
 
  methods: {

    tapItem: function ( index ) {
      console.log(this)
      // 这个地方使用箭头定义方法 传递过来的this为组件本身， 使用function 定义方法传递过来的this 等于VueComponent 如果用箭头定义的话会报错“_this.$emit is not a function"
      // 事件命名最好都是小写，因为不区分大小写，有时候会造成错误，可以用连字符来区分多个单词。
      // 调用外部父元素传递过来的函数，后面一个参数是传递到父元素函数的参数
      this.$emit( 'click-item', this.ind )
    },
   
    

  },
  mounted () {
    
   
  } 
}