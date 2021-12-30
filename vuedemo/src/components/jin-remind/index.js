export default {
  name: 'jinRemind',
  props: {
    remindTitle: {
      type: String,
      default: '默认标题'
    }
      
  },
  data () {
    return {
      title: this.remindTitle
    }
  },
  methods: {
    

  },
  mounted () {
    
   
  } 
}