<template>
  <el-container style="height: 100%; border: 1px solid #eee">
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span>
      </el-header>

      <el-row>
        <el-col :span="6">
          <el-button
            type="primary"
            @click="getDatas"
            >
            获取数据
          </el-button>
        </el-col>
        <el-col :span="6">
          <el-upload ref="upload" action="/" :show-file-list="false" :on-change="uploadAd" :auto-upload="false">
            <el-button slot="trigger" icon="el-icon-upload" size="small"  type="primary">库存-广告</el-button>
          </el-upload>
        </el-col>
        <el-col :span="6">
          <el-button
            type="primary"
            @click="downLoadXlsx"
            >
            下载数据
          </el-button>
        </el-col>
        <el-col :span="6">
          <el-upload ref="upload" action="/" :show-file-list="false" :on-change="importExcelData" :auto-upload="false">
            <el-button slot="trigger" icon="el-icon-upload" size="small"  type="primary">上传文件</el-button>
          </el-upload>
        </el-col>
      </el-row>
      <el-main style="position: ab">
        <el-table
          v-loading="loading"
          :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%"
          height = "650">

          <el-table-column
            v-for="col in cols.cols"
            :prop="col.prop"
            :label="col.label"
            >
          </el-table-column>
          <el-table-column
            align="right">
            <template slot="header" slot-scope="scope">
              <el-input
                v-model="search"
                size="mini"
                placeholder="输入关键字搜索"/>
            </template>
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </el-container>
</template>
<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>

<script>
import { importExcel , listToExcel } from '@/function/xlsx.js'
//  导入export default 的文件不需要花括号，export default文件中只适用于只有一个输出对象
import Exl from '@/function/excel.js'
export default {
  // 继承相关的方法
  mixins : [ require ( "@/mymixins" ).default ] ,
  data() {
    return {
      changKeys:{'系统SKU': 'sys_sku', '产品英文名':'name','最新采购价': 'new_price'},
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      loading: false,
      cols: {
        maxLength: 12,
        cols: [
          {prop: 'item_sku', label: '系统sku'},
          {prop: 'chn_name', label: '中文名称'},
          {prop: 'tem_name', label: '英文名称'},
          {prop: 'logistics_attr', label: '物流属性'},
          {prop: 'state', label: '状态'},

        ],

      },
      // 外键,外部数据源和表格数据的对应关系。key 是数据源的键名，val 是表格的键名
      foreignKey: {
        id: 'sys_sku'
      },
      // 整合到表格中的数据, key 是数据源的键名，val 是表格的键名
      mergeData: {
        item_sku: 'item_sku'
      },

      search: ''
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    /*根据数据取表格列*/
    getColumn (datas, maxLength) {
      var data = datas.length > 0? datas[0]: {}
      var keys = Object.keys(data)
      console.log(keys)
      var res = keys.map(function (key) {
        return {prop: key, label: key}

      })
      console.log(res)
      return res.slice(0,maxLength)

    },
    importExcelData(file){
    // 获取对应数据库表的列名与注释

      // 将excel表的数据转换成json格式
      this.loading = true;
      importExcel(file,this.changKeys).then(res=>{
        console.log(res)
        this.cols.cols = this.getColumn( res , this.cols.maxLength)
        //this.cols.push({prop: '产品颜色', label: '产品颜色'})
        this.tableData = res
        // this.doUpdateList(res);
        this.loading = false;
      }).catch(err=>{
         alert(err);
      })

    },
    getDatas () {
      self = this
      this.get ('/good-get-all').then( (data) => {
        var datas = JSON.parse(data);
        if (datas.code == 200) {
          var res = datas.data
          console.log(datas.data)
          this.tableData = res
        }

      })
    },
    // 下载表格
    downLoadXlsx () {
      listToExcel( 'test', this.tableData)
      //Exl ('test',data)

    },
    // 上传广告文件 计算maxBid
    uploadAd ( file ) {
      this.loading = true;
      importExcel(file,this.changKeys).then(res=>{
        console.log(res)
        let n_res = res.map(this.advertising)
        this.cols.cols = this.getColumn( res , this.cols.maxLength)
        this.tableData = n_res
        // this.doUpdateList(res);
        this.loading = false;
      }).catch(err=>{
         alert(err);
      })


    },
    // 上传广告map
    advertising ( item ) {
      //console.log(item)
      let price = item.price;
      // 利润比率，意思是最大从售价中投入多少广告费
      let profit = 0.10
      // 转化率
      let rate  = 0.05
      // maxBid 最大值
      let max = 0.5
      let nitem = item
      nitem.maxBid = (price * profit * rate).toFixed(2) > max? max: (price * profit * rate).toFixed(2)

      return nitem

    },

    // 根据列表调用接口，更新数据
    doUpdateList(excelDataList){
        //提交Excel数据
        this.api({
            url: "/xxx/xxxx/doAddListByExcel",//调用后台接口
            method: "post",
            data: excelDataList
         }).then(() => {
             this.$message({
                 message: '保存成功',
                 type: 'success'
             });
             this.getList();
         }).catch(() => {

          });
    }
  },
}

</script>
