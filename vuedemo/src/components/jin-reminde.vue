<template>
  <div class="remind-container">
    <div class="remind-title-div">
      <span class="remind-title-span">
        待办事项
      </span>
    </div>
    <div class="remind-panel">
      <div v-for="(key,item) in remindData" class="remind-item" @click="clickItem(key)">
        <div class="remind-msg">
          <span class= "remind-msg-num">
            {{item.num}}
          </span>
          <span class="remind-info">
            {{item.msg}}
          </span>
        </div>
      </div>
    </div> 
  </div>

</template>

<script>

export default {
  name: 'jinRemind',
  props: {
    remindData:[
      {
        num: 10,
        msg: '急需回复,这是一个消息内容，用于测试长文本的效果'
      }
    ]
      
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    clickItem: key=> {

      console.log(key)
      this.$emit('clickItem', key, '这是我暴露出去的数据2')
    }
    

  },
  mounted () {
    
   
  } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- vue组件中，在style标签中有一个属性，叫做scoped。当此标签拥有scoped属性的时候，该组件下的css样式只适用于本组件，而不会影响全局组件。这其实也相当于样式的模块化了。
编译后，我们发现css中，PostCSS给所有的dom都添加了一个独一无二的动态属性，给css选择器也添加了一个对应的属性选择器，这样就可以让样式只作用于该属性的dom元素（组件内部的dom）
-->
<style scoped>

.remind-container {
  width: 100%;

}
.remind-title-div {
  font-weight: 600;
  width: 100%;
  text-align: left;
  margin: 10px 5px;

}
.remind-title-span {

}
.remind-panel {
  display: flex;
  box-sizing: border-box;
  flex-flow: row wrap;
  justify-content: start;
  margin-left: 5px;

}
.remind-item {
  width: 31.5%;
  background-color: #fff;
  border-radius: 8px;
  flex-grow: 1;
  margin: 0px 5px 5px 0;
  max-width: 33%;


}
.remind-msg {
  display: block;
  text-align: left;
  padding: 5px 0;

}
.remind-msg-num {
  display: block;
  text-align: left;
  padding: 10px 5px;
  font-weight: 600;

}
.remind-info {
  padding: 10px 5px;
  text-align: left;
  text-overflow: ellipsis;
  font-size: 5px;
  overflow: hidden;
  /* span 标签 display 设置成block width 属性才会生效*/
  display: block;
  width: 100%;
  white-space: nowrap;
  box-sizing: border-box;


}



</style>