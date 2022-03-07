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
    background-color: #6AA3C1;
    border-radius: 3px;
    padding: 5px;
    margin: 5px;
    height: 15px;
    line-height: 15px;
    color: #ffffff;
  }
  .mark span {

  }
</style>