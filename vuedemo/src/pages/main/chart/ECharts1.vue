<template>
  <div class="wrapper">
    <div id="myChart" class="charts"></div>
    <div class="btn-wrapper">
      <div class="btn" @click="onClick">获取数据</div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  padding-top: 20px;
}
.charts {
  width: 100vw;
  height: 400px;
}
.btn {
  width: 100px;
  height: 30px;
  background: var(--van-blue);
  line-height: 30px;
  text-align: center;
  color: var(--van-white);
}
.btn-wrapper {
  padding: 20px;
  text-align: center;
}
</style>

<script>
import * as echarts from "echarts";
import { URL } from '@/web-config/apiUrl'

export default {
  name: "hello",
  mixins : [ require ( "@/mixins" ).default],
  data() {
    return {
      title: "柱状图-异步加载",
      myChart: null,
    };
  },
  mounted() {
    console.log("初始化");
    // this.drawLine();
    this.init_echarts1();

    setTimeout(() => {
      this.requestData()
    }, 1000);
  },
  methods: {
    onClick() {
      console.log();
      this.requestData();
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: { text: "在Vue中使用echarts" },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      });
    },
    //初始化图表
    init_echarts1() {
      var chartData = {
        title: "",
        legendData: ["", ""],
        xData: [
          "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月",],
        seriesData: [],
      };
      this.myChart = echarts.init(document.getElementById("myChart"));
      this.myChart.setOption(this.getOption1(chartData));
    },
    //图表配置
    getOption1(chartData) {
      var option = {
        color: ["#3398DB", "#EB5E5E"],
        title: {
          left: "center",
          text: chartData ? chartData.title : "默认标题",
        },
        grid: {
          left: "3%", // 整个表网格距离左侧边框距离
          right: "2%", // 整个表网格距离左侧边框距离
          containLabel: true,
        },
        //坐标轴触发，。   'item'  , 'axis' ,'none'
        // tooltip:提示框组件，用于配置鼠标滑过或点击图表时的显示框。
        /**tooltip: {
          show: true, // 是否显示
          trigger: 'axis', // 触发类型  'item'图形触发：散点图，饼图等无类目轴的图表中使用； 'axis'坐标轴触发；'none'：什么都不触发。
          axisPointer: { // 坐标轴指示器配置项。
              type: 'shadow', // 'line' 直线指示器  'shadow' 阴影指示器  'none' 无指示器  'cross' 十字准星指示器。
              axis: 'auto', // 指示器的坐标轴。
              snap: true, // 坐标轴指示器是否自动吸附到点上
          },
          // showContent: true, //是否显示提示框浮层，默认显示。
          // triggerOn: 'mouseover', // 触发时机  'mouseover'鼠标移动时触发。     'click'鼠标点击时触发。  'mousemove|click'同时鼠标移动和点击时触发。
          // enterable: false, // 鼠标是否可进入提示框浮层中，默认为false，如需详情内交互，如添加链接，按钮，可设置为 true。
          renderMode: 'html', // 浮层的渲染模式，默认以 'html 即额外的 DOM 节点展示 tooltip；
          backgroundColor: 'rgba(50,50,50,0.7)', // 提示框浮层的背景颜色。
          borderColor: '#333', // 提示框浮层的边框颜色。
          borderWidth: 0, // 提示框浮层的边框宽。
          padding: 5, // 提示框浮层内边距，
          textStyle: { // 提示框浮层的文本样式。
              color: '#fff',
              fontStyle: 'normal',
              fontWeight: 'normal',
              fontFamily: 'sans-serif',
              fontSize: 14,
          },
          extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);', // 额外附加到浮层的 css 样式
          confine: false, // 是否将 tooltip 框限制在图表的区域内。
          // formatter: '{b} 的成绩是 {c}'
          formatter: function(arg) {
              return arg[0].name + '的分数是:' + arg[0].data
          }
            },
         *
         */
        tooltip: {
          trigger: "axis",
        },
        /**
         * [legend 而legend就是Echarts图表中对图形的解释部分：]
         * 就是表下方各种颜色表示什么，蓝色蒸发量， 红色降雨量，
         */
        legend: {
          bottom: 10,
          data: chartData.legendData, // legendData: ["蒸发量", "降水量"]
        },
        xAxis: [
          {
            data: chartData.xData, // 横坐标， [1月，2月 。。。]
            axisLabel: {
              interval: 0,
            },
          },
        ],
        yAxis: {},
        series: chartData.seriesData,
      };
      return option;
    },

    requestData() {
      var dataArr = [
        {
          name: "蒸发量",
          data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3,],
          barGap: 0,
          barMaxWidth: 6,
        },
        {
          name: "降水量",
          data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3,],
          barGap: 0,
          barMaxWidth: 6,
        },
      ];

      this.get(URL.api_constructionGetTotalGroupByMoon).then( res=> {
          console.log(res);
          let data = res.data.map( item => {
            let year = this.$isFalse(item.date)? 'null': item.date.split('-')[0];
            let moon = this.$isFalse(item.date)? 'null': item.date.split('-')[1];
            return {
              total: item.total,
              year: year,
              moon: moon,
            }
          })
          let years = Array.from(new Set(data.map( item=> {
            return item.year;
          })));
          let dataArr = years.map ( item=> {
            let rArray = [];
            // 按月份获取，缺失数据的月份用0来代替
            for ( let i = 1; i < 13; i++)
            {
              let currentMoonData = data.filter( obj => {
                if(obj.year == item && obj.moon == i)
                {
                  return true;
                }
              })
              rArray.push(currentMoonData.length > 0? currentMoonData[0].total: 0 );
            }
            return {
              name: item,
              data: rArray,
              barGap: 0,
              barMaxWidth: 6,
            }
          })

          // 补全一些设置
          for (var i = 0; i < dataArr.length; i++) {
            var dic = dataArr[i];
            dic["type"] = "bar";
            dic["label"] = {
              show: true, //开启显示
              position: "top", //在上方显示
              distance: i == 0 ? 5 : 10,
              // rotate: 15, // 旋转
              //offset: [20, 0], // 偏移
              formatter: function (val) {
                if (val.value !== 0) {
                  return val.value;
                } else {
                  return "";
                }
              },
              fontSize: 12,
              color: "black",
            };
          }
          console.log('language:',this.language.monthlyTotalOfConstructionOrdersInThePastTwoYears);
          var chartData = {
            title: this.language.monthlyTotalOfConstructionOrdersInThePastTwoYears,
            legendData: years,
            xData: [
              "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月",
            ],
            seriesData: dataArr,
          };
          console.log('dataArr____',dataArr);
          /**0:
          barGap: 0 // 间隙
          barMaxWidth: 6 // 条形宽度
          data: (12) [2, 4.9, 7, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20, 6.4, 3.3]
          label:
            color: "black" // 标签颜色
            distance: 5 // 标签和条形的距离，position为top 指在条形上方5
            fontSize: 12 // 字体大小
            formatter: ƒ formatter(val) // 对数据进行map操作
            position: "top"
            show: true // 是否显示
          [[Prototype]]: Object
          name: "蒸发量"
          type: "bar"
          [[Prototype]]: Object
          1: {name: '降水量', data: Array(12), barGap: 0, barMaxWidth: 6, type: 'bar', …}
          length: 2
          */
          this.myChart.setOption(this.getOption1(chartData), true);

      }).catch( err=>{
        console.log(err)
      })


    },
  },
};
</script>
