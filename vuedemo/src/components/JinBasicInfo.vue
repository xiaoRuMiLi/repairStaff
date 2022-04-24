<template>
<!-- 车辆基本信息 -->
<div id="basic-info">
  <div class="left">
    <div class="car-number"> {{carNumber}}</div>
    <div class="car-mode">{{carModel}}</div>
    <div class="money">
      <div class="flag">
        $
      </div>
      <span> {{amount}} </span>
    </div>

  </div>
  <div class="right">
    <i class="van-icon van-icon-arrow"></i>
  </div>
</div>
</template>
<script >
export default {
  name: 'JinBasicInfo',
  props: {
    carNumber: {
      type: String,
      default: 'carNumber',
    },
    carModel: {
      type: String,
      default: 'carModel',
    },
    amount: {
      type: Number,
      default: 'amount',
    }
  },
  data () {
    return {

    }
  }

}
</script>
<style scoped>
  /* 基本信息 */
  #basic-info {
    width: 100%;
    padding: 20px;
    position: relative;
    text-align: left;
    box-sizing: border-box;
    display: flex;

  }
  #basic-info .left {
    text-align: left;
    display: inline-block;

  }
  #basic-info .left .car-number {
    font-size: 18px;
    font-weight: 600;
    padding: 0px 10px 10px 10px;

  }
  #basic-info .left .car-mode {
    font-size: 16px;
    font-weight: 600;
    padding: 0px 10px 10px 10px;

  }
  #basic-info .left .money {
    padding-left: 10px;

  }
  .money .flag {
    display: inline;
    color: #ff8917;
    font-size: 18px;
    font-weight: 600;

  }
  .money span {
    color: #ee0a24;
    font-size: 16px;
    font-weight: 600;
  }
  #basic-info .right {
    height: 100%;
    display: inline-block;
    flex-grow: 1;
    text-align: end;
  }
  #basic-info .right> i {
    position: absolute;
    /* top: 50%; */
    bottom: 50%;
    transform: translate(-15px,7px);
    font-size: 15px;
    font-weight: 600;
  }
</style>
