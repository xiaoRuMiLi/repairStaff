<template>
  <div class="mark">
    <div class="mark-item" v-for="(item,key) in marks" :key="key">
      <span>{{item}}</span>
    </div>
  </div>
</template>
<script >
  export default {
    name: 'JinMarks',
    props: {
      marks: {
        type: Array,
        default: []
      }
    }
  }
</script>
<style scoped>
  /* 标记组 */
  .mark {
    display: flex;
    padding-left: 20px;

  }
  .mark .mark-item {
    border: 1px solid #6AA3C1;
    background-color: #ffffff;
    border-radius: 3px;
    padding: 3px;
    margin: 5px;
    height: 15px;
    line-height: 15px;
    color: #1989fa;
  }
  .mark span {

  }
</style>