
<template>
  <!-- template  标签下只有一个根元素，所以加了一个div将所有元素包裹起来-->
    <div>
      <el-tabs type="border-card">
        <el-tab-pane label="广告模板">
          <el-row>
            <el-col :span="24"><el-link type="primary">主要链接</el-link></el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="消息中心">消息中心</el-tab-pane>
        <el-tab-pane label="角色管理">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
      </el-tabs>
      <div class = "cont">
        <el-form :inline="true"  class="demo-form-inline">
        <el-row type="flex" justify="start">
          <el-col :span="8">
            <el-form-item label="卖家SKU">
              <el-input  type="textarea" size="medium" placeholder="输入seller sku 以换行符或者，间隔"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span = "4">
            <el-form-item label="选择区域">
              <el-select  placeholder="活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="选择区域">
              <el-select  placeholder="活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <el-button type="primary" >查询</el-button>
            </el-form-item>
          </el-col>
          </el-row>
        </el-form>
        <el-row>
          <el-col :span="12">
            <el-dropdown>
              <el-button type="primary">
                上传表格<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <el-upload ref="upload" action="/" :show-file-list="false" :on-change="importExcelData" :auto-upload="false">
                    <el-button slot="trigger" icon="el-icon-upload" size="small"  type="primary">库存文件</el-button>
                  </el-upload>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown >
              <el-button type="primary">
                系统读取<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <el-button
                    type="primary"
                    @click="getDatas"
                    >
                    获取数据
                  </el-button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown>
              <el-button type="primary">
                生成模板<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <el-button
                    type="primary"
                    @click="makeModel(tableData)"
                    >
                    库存-广告
                  </el-button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown>
              <el-button type="primary">
                下载模板<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <el-button
                    type="primary"
                    @click="downLoadXlsx"
                    >
                    广告模板
                  </el-button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

          </el-col>
          <el-col :span="12" push="7">
            <el-button type="primary" @click="dialogFormVisible = true">
              预期利润率{{set.profitRate}}
            </el-button>
            <el-button type="primary" @click="dialogFormVisible = true">
              转化率{{set.changeRate}}
            </el-button>
            <el-button type="primary" @click="dialogFormVisible = true">
              最高竞价{{set.maxBid}}
            </el-button>
          </el-col>
        </el-row>




      <el-table
        v-loading="loading"
        :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        style="width: 100%"
        height = "650">

        <el-table-column
          v-for="col in cols.currentCols"
          :prop="col.prop"
          :label="col.label"
          >
        </el-table-column>
        <el-table-column
          align="right">
          <template slot="header" slot-scope="scope">
            <el-tag size="medium" style="width: 50pxl">操作</el-tag>
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
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length">
        </el-pagination>


      </div>
      <el-dialog title="参数设置" :visible.sync="dialogFormVisible" width="20%">
        <el-form :model="set">
          <el-form-item label="利润比率" :label-width="50">
            <el-input v-model="set.profitRate" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="转化率" :label-width="50">
            <el-input v-model="set.changeRate" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="最高竞价" :label-width="50">
            <el-input v-model="set.maxBid" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="最低竞价" :label-width="50">
            <el-input v-model="set.minBid" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
        <!-- 编辑弹出层-->
        <el-dialog title="编辑" :visible.sync="editFormVisible">

          <el-form :model="formData">

            <el-form-item label="每日预算" label-width="50">
              <el-input v-model="formData['广告活动每日预算']" autocomplete="off"></el-input>
            </el-form-item>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="editFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="editFormVisible = false">确 定</el-button>
          </div>
        </el-dialog>
    </div>




</template>
<style>
  .el-dropdown {
    vertical-align: top;
  }
  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .cont {
    padding: 20px;
    padding-left: 20px;
  }
  .el-link {
    margin: 0;
    padding: 0;
  }
  .el-row {
    margin: 0;
    padding: 0;

  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
<script>
import { importExcel , listToExcel } from '@/function/xlsx.js'
//  导入export default 的文件不需要花括号，export default文件中只适用于只有一个输出对象
import Exl from '@/function/excel.js'
var dateFormat = require('dateformat')
export default {
  // 继承相关的方法
  mixins : [ require ( "@/mymixins" ).default ] ,
  data() {
    return {
      changKeys:{'sku': 'seller-sku', '产品英文名':'name','最新采购价': 'new_price'},
      tableData: [],
      formData: {
         '广告活动每日预算': '1000'
      },
      loading: false,
      // 设置弹窗控制
      dialogFormVisible: false,
      set: {
        profitRate: 0.1,
        changeRate: 0.05,
        // 最高竞价
        maxBid: 0.5,
        // 最低竞价
        minBid: 0.02,

      },
      // 当前分页
      currentPage: 4,
      pageSize: 100,
      // 当前编辑的行
      editIndex: 0,
      // 编辑弹出控制
      editFormVisible: false,
      //广告设置
      advertise: {
        name: '自动广告',
        // 每日花费上限
        cost: 10,
        startDate: dateFormat (new Date(), 'yyyy/mm/dd' ),
        state: '启用',
        // 竞价策略
        biddingStrategies: '动态竞价（只降低）'
      },
      // 固定的表格头部
      cols: {
        maxLength: 12,
        cols: [
          {prop: '广告活动', label: '广告活动'},
          {prop: '广告活动每日预算', label: '广告活动每日预算'},
          {prop: '广告组', label: '广告组'},
          {prop: 'SKU', label: 'SKU'},
          {prop: '最高竞价', label: '最高竞价'},
          {prop: '广告活动状态', label: '广告活动状态'},
          {prop: '广告组状态', label: '广告组状态'},
          {prop: '状态', label: '状态'},
          {prop: '广告活动开始日期', label: '广告活动开始日期'},
          {prop: '广告活动结束日期', label: '广告活动结束日期'},
          {prop: '竞价策略', label: '竞价策略'},
          {prop: '关键词或商品投放', label: '关键词或商品投放'},
          {prop: '匹配类型', label: '匹配类型'},

        ],
        currentCols: [{prop: '广告活动', label: '广告活动'}]

      },
      adHeaderData: [
        '匹配类型',
        '记录编号',
        '记录类型',
        '广告活动编号',
        '广告活动',
        '广告活动每日预算',
        '广告组合编号',
        '广告活动开始日期',
        '广告活动结束日期',
        '广告活动投放类型',
        '广告组',
        '最高竞价',
        '关键词或商品投放',
        '商品投放编号',
        '匹配类型',
        'SKU',
        '广告活动状态',
        '广告组状态',
        '状态',
        '展示次数',
        '点击次数',
        '支出',
        '订单数量',
        '商品总计',
        '销售额',
        'ACOS',
        '竞价策略',
        '广告位类型',
        '按广告位提高竞价',
      ],

      search: ''
    }
  },
  methods: {
    handleEdit(index, row) {
        console.log('index', this.formData)
        this.editIndex = index
        this.editFormVisible = true
        this.formData = this.tableData[this.editIndex]
        console.log(this.formData)
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSizeChange(val) {
        this.currentPage = 1;
        this.pageSize = val;

    },
    handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;

    },


    /**
     * [makeAdGroup 生成广告组数据]
     * @param datas array 源数据中必须包含sku 字段，用sku 做广告组名字，广告组默认为启用
     * @type {[array 成功返回生成的新数组，失败返回false]}
     */
    makeAdGroup( datas ) {
        var self = this
        let ndatas = []
        function mathMaxBit ( price, profit, rate, max, min ) {
            console.log(price, profit, rate, max)
            console.log('price' , price * profit * rate)
            console.log('min',min)
            let maxBid = ( price * profit * rate).toFixed(2) < min ? min: (price * profit * rate).toFixed(2)
            maxBid = ( price * profit * rate).toFixed(2) > max? max: (price * profit * rate).toFixed(2)
            return maxBid
        }
        // 创建广告活动
        function makeAd ( advertise ) {
            let nitem = {}

            self.adHeaderData.forEach (  i => {

                if ( i == '广告活动') {
                  nitem['广告活动'] = advertise.name
                } else if ( i == '广告活动每日预算' ) {
                  nitem['广告活动每日预算'] = advertise.cost
                } else if ( i == '广告活动开始日期' ) {
                  nitem['广告活动开始日期'] = advertise.startDate
                } else if ( i == '广告活动状态' ) {
                  nitem['广告活动状态'] = advertise.state
                }else if ( i == '竞价策略' ) {
                  nitem['竞价策略'] = advertise.biddingStrategies
                }
                else {
                  nitem[i] = ''
                }

            })
            return nitem


        }
       // 创建具体广告内容
        function makeAdCon ( datas ) {
            let ndatas = datas.map( function( item ){
                if (!'seller-sku' in Object.keys(item)) {

                  return false
                }
                let nitem = {}
                self.adHeaderData.forEach (  i => {
                    if ( i == '广告活动') {
                        nitem['广告活动'] = self.advertise.name
                    }else if ( i == 'SKU') {
                        nitem['SKU'] = item['seller-sku']
                    }else if ( i == '状态' ) {
                        nitem['状态'] = '启用'
                    } else if ( i == '广告组') {
                        nitem['广告组'] = item['seller-sku']
                    }else {
                        nitem[i] = ''
                    }

                })
                return nitem

            })
            return ndatas
        }

        function makeGroup ( datas ) {
            let ndatas = datas.map( function( item ){
                if (!'seller-sku' in Object.keys(item) || !'price' in Object.keys(item)) {

                    return false
                }
                let nitem = {}
                self.adHeaderData.forEach (  i => {
                    if ( i == '广告活动') {
                        nitem['广告活动'] = self.advertise.name
                    } else if ( i == 'SKU') {
                        nitem['广告组'] = item['seller-sku']
                    } else if ( i == '广告组状态' ) {
                        nitem['广告组状态'] = '启用'
                    } else if ( i == '最高竞价' ) {
                        let price = item['price']
                        nitem['最高竞价'] = mathMaxBit ( price, self.set.profitRate, self.set.changeRate, self.set.maxBid, self.set.minBid )
                    } else {
                        nitem[i] = ''
                    }

                })

                return nitem
                console.log(nitem)
            })

            return ndatas

        }
        let ad  =  makeAd ( self.advertise )
        let group = makeGroup ( datas )
        let adCon = makeAdCon ( datas )
        console.log( 'group', group)
        ndatas.push(ad)
        ndatas = ndatas.concat( group, adCon)
        if ( false in ndatas ) {
            return false
        } else {
            return ndatas
        }


    },

    makeModel (datas) {
        this.loading = true
        var ndatas = this.makeAdGroup( datas )
        if (ndatas.length > 0) {
            this.cols.currentCols = this.cols.cols
            this.tableData = ndatas
            this.currentPage = 1
            this.loading = false
        } else {
            this.$alert('生成表格时产生了错误', '注意', {
                confirmButtonText: '确定',
                callback: action => {
                    this.$message({
                        type: 'info',
                        message: `action: ${ action }`
                    });
                }
            })
        }


    },
    /*根据数据取表格列*/
    getColumn ( datas, maxLength ) {
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
        importExcel( file,this.changKeys).then(res=>{
            console.log(res)
            this.cols.currentCols = this.getColumn( res , this.cols.maxLength)
            //this.cols.push({prop: '产品颜色', label: '产品颜色'})
            this.tableData = res
            this.currentPage = 1
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
      listToExcel( 'advertise_', this.tableData)
      //Exl ('test',data)

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
    computed: {
        dayCost () {
            let form = this.tableData.length > 0? this.tableData[this.editIndex]: false
            console.log(form)
            return  '广告活动每日预算' in Object.keys( form )? form['广告活动每日预算']: ''
        }
    }
}

</script>