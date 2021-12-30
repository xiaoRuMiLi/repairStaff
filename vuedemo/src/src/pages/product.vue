
<template>
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
        <el-form :inline="true" ref="searchForm" :model="searchForm" class="demo-form-inline">
        <el-row type="flex" justify="start">
          <el-col :span="4">
            <el-form-item label="商品SKU">
              <el-input  type="textarea" size="medium" v-model="searchForm.pk" placeholder="输入商品 sku 以换行符或者，间隔"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="母体SKU">
              <el-input  type="textarea" v-model="searchForm.item_sku" size="medium" placeholder="输入奈思 sku 以换行符或者，间隔"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span = "4">
            <el-form-item label="商品状态">
              <el-select  placeholder="活动区域" v-model="searchForm.state">
                <el-option label="违禁" value="违禁"></el-option>
                <el-option label="正常" value="正常"></el-option>
                <el-option label="侵权" value="侵权"></el-option>
                <el-option label="停产" value="停产"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="物流属性">
              <el-select  placeholder="活动区域" v-model="searchForm.logistics_attr">
                <el-option label="普货" value="普货"></el-option>
                <el-option label="带电" value="带电"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <el-button @click="searchFormSub" type="primary" >查询</el-button>
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
                  <el-upload ref="upload" action="/" :show-file-list="false" :on-change="importStockExcel" :auto-upload="false">
                    <el-button slot="trigger" icon="el-icon-upload" size="small"  type="primary">库存文件</el-button>
                  </el-upload>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-upload ref="upload" action="/" :show-file-list="false" :on-change="importSupplyExcel" :auto-upload="false">
                    <el-button slot="trigger" icon="el-icon-upload" size="small"  type="primary">供应信息</el-button>
                  </el-upload>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-upload ref="upload" action="/" :show-file-list="false" :on-change="importGoodExcel" :auto-upload="false">
                    <el-button slot="trigger" icon="el-icon-upload" size="small"  type="primary">商品信息</el-button>
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
                    全部商品
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
                    @click="handleMakeStock"
                    >
                   库存价格修改
                  </el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button
                    type="primary"
                    @click="handleOffShelf"
                    >
                   库存下架
                  </el-button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown>
              <el-button type="primary">
                提交系统<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <el-button
                    type="primary"
                    @click="handleUpdeteSupply"
                    >
                    修改供应信息
                  </el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button
                    type="primary"
                    @click="handleUpdeteGood"
                    >
                    修改商品信息
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
                    下载模板
                  </el-button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

          </el-col>
          <el-col :span="12" :push="7" >
            <el-button type="primary" @click="dialogFormVisible = true">
              国家站点{{setting.COUNTRY}}
            </el-button>
            <el-button type="primary" @click="dialogFormVisible = true">
              汇率{{setting.exchangeRate}}
            </el-button>
            <el-button type="primary" @click="dialogFormVisible = true">
              税收比例{{setting.tax}}
            </el-button>
             <el-button type="primary" @click="dialogFormVisible = true">
              其它费用{{setting.otherCost}}
            </el-button>
            <el-button type="primary" @click="dialogFormVisible = true">
              预期利润率{{setting.profit}}
            </el-button>
            <el-button type="primary" @click="dialogFormVisible = true">
              平台佣金{{setting.commission}}
            </el-button>
          </el-col>
        </el-row>




      <el-table
        v-loading="loading"
        :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        style="width: 100%"
        :row-style="{height: '30px'}"
        :cell-style=" {padding: '5px 0'}"
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
          <el-form-item label="站点国家" :label-width="50">
            <el-input v-model="setting.COUNTRY" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="汇率" :label-width="50">
            <el-input v-model="setting.exchangeRate" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="税收比例" :label-width="50">
            <el-input v-model="setting.tax" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="其它费用" :label-width="50">
            <el-input v-model="setting.otherCost" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="平台佣金" :label-width="50">
            <el-input v-model="setting.commission" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="预期利润率" :label-width="50">
            <el-input v-model="setting.profit" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="活动天数" :label-width="50">
            <el-input v-model="setting.discountDays" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="优惠幅度" :label-width="50">
            <el-input v-model="setting.preferentialRange" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="最小长度" :label-width="50">
            <el-input v-model="setting.minLength" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="最小宽度" :label-width="50">
            <el-input v-model="setting.minWidth" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="最小高度" :label-width="50">
            <el-input v-model="setting.minHeight" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-radio v-model="setting.useComma" label="1">逗号作为小数点</el-radio>
            <el-radio v-model="setting.useComma" label="0">点作为小数点</el-radio>
          </el-form-item>
          <el-form-item>
            <el-radio v-model="setting.first" label="price">价格优先</el-radio>
            <el-radio v-model="setting.first" label="aging">时间优先</el-radio>
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
import { Logistic, px_battery_OH, px_battery_QZ, px_ordinary_QY, px_ordinary_O5, px_ordinary_QC, px_ordinary_PX } from '@/function/Logistic.js'
//  导入export default 的文件不需要花括号，export default文件中只适用于只有一个输出对象
import Exl from '@/function/excel.js'
import API from '@/config/api.js'
var dateFormat = require('dateformat')
export default {
  // 继承相关的方法
    mixins : [ require ( "@/mymixins" ).default ] ,
    data() {
        return {
            searchForm: {
                pk: 0,
                item_sku: 123456,
                state: '正常',
                logistics_attr: '普货'

            },
            setting: {
                COUNTRY: 'US',
                minLength: 15,
                minWidth: 10,
                minHeight: 1,
                // 汇率
                exchangeRate: 6.5,
                // 税收比率
                tax: 0.0,
                // 其它费用
                otherCost: 8,
                // 平台佣金
                commission: 0.15,
                // 预期利润率
                profit: 0.15,
                defaultData: {
                    brand_name: 'HuaHuoYou',
                    external_product_id_type: 'EAN',
                },
                // 优惠活动持续天数
                discountDays: 7,
                // 活动优惠幅度
                preferentialRange: 0.1,
                // 使用逗号作为分隔符
                useComma: '0',
                // 选择物流优先价格优先price时间优先
                first: 'price'
            },
            ordinaryLogistics: [
                new Logistic( px_ordinary_QY, 'FR'),
                new Logistic( px_ordinary_O5, 'DE'),
                new Logistic( px_ordinary_QC, 'DE'),
                new Logistic( px_ordinary_PX, this.country),
                new Logistic( px_battery_OH, this.country),
                new Logistic( px_battery_QZ, this.country),
            ],
            batteryLogistics: [
                new Logistic( px_battery_OH, this.country),
                new Logistic( px_battery_QZ, this.country),
            ],

            cols: {
                // 源数据表格头部
                // brand_name: (...)
                sourceCols :[
                    {prop: 'good', label: 'good'},
                    {prop: 'item_sku', label: 'item_sku'},
                    {prop: 'item_type', label: 'item_type'},
                    {prop: 'logistics_attr', label: 'logistics_attr'},
                    {prop: 'main_image_url', label: 'main_image_url'},
                    {prop: 'manufacturer', label: 'manufacturer'},
                    {prop: 'part_number', label: 'part_number'},
                    {prop: 'quantity', label: 'quantity'},
                    {prop: 'chn_name', label: 'chn_name'},
                    {prop: 'chn_name_declaration', label: 'chn_name_declaration'},
                    {prop: 'olor_map', label: 'olor_map'},
                    {prop: 'color_name', label: 'color_name'},
                    {prop: 'full_chinese_category', label: 'full_chinese_category'},
                    {prop: 'remarks', label: 'remarks'},
                    {prop: 'state', label: 'state'},
                    {prop: 'tem_name', label: 'tem_name'},
                    {prop: 'uk_name_declaration', label: 'uk_name_declaration'},
                    {prop: 'update_date', label: 'update_date'},

                ],
                 // 库存文件表格头部
                 //

                stockCols: [
                    {prop: 'item_sku', label: 'item_sku'},
                    {prop: 'item_name', label: 'item_name'},
                    {prop: 'item_type', label: 'item_type'},
                    {prop: 'standard_price', label: 'standard_price'},
                    {prop: 'update_delete', label: 'update_delete'},
                    {prop: 'buy_price', label: 'buy_price'},
                    {prop: 'freight', label: 'freight'},
                    {prop: 'logistic_service', label: 'logistic_service'},
                    {prop: 'max_days', label: 'max_days'},
                    {prop: 'sale_price', label: 'sale_price'},
                    {prop: 'sale_from_date', label: 'sale_from_date'},
                    {prop: 'sale_end_date', label: 'sale_end_date'},
                    {prop: 'merchant_shipping_group_name', lable: 'merchant_shipping_group_name'}

                ],
                offShelf: [
                    {prop: 'item_sku', label: 'item_sku'},
                    {prop: 'update_delete', label: 'update_delete'},
                ],
                // 现在显示色表格头部
                currentCols: [{prop: 'update_date', label: 'update_date'}],

            },
              // changekeys 数据键值转换规则
            changeKeys: {
                // 读取数据后转换键值规则
                source: {},
                // 生成库存修改文件键值转换规则
                stockExcel: {'系统SKU': 'sys_sku', '产品英文名':'name','最新采购价': 'new_price'},
                // 生成供应信息修改文件的键值转换规则
                supplyExcel: { '系统SKU': 'item_sku', '默认供货价': 'default_supplier_price','最新采购价': 'default_supplier_price', '网络采购链接': 'purchasing_links'}

            },
            // 转换成亚马逊修改价格的库存修改文件的规则
            exportStock: {
                item_sku: function ( item , setting ) {
                    if ( Object.keys(item).includes('good')) {
                        if ( parseFloat(item.good) <= 665 ){
                            if ( setting.COUNTRY == 'US' || setting.COUNTRY == 'UK' || parseFloat(item.good) < 390){
                                return item.good
                            } else {
                                return setting.COUNTRY  + '_' + item.good
                            }
                        } else {
                            return setting.COUNTRY  + '_' + item.item_sku + '_' + item.good
                        }


                    }
                },
                quantity: function ( item, setting ) {
                    if (setting.defaultData.hasOwnProperty('quantity')) {
                        return setting.defaultData['quantity']
                    }
                },
                feed_product_type: function ( item, setting ) {
                    if (setting.defaultData.hasOwnProperty('feed_product_type')) {
                        return setting.defaultData['feed_product_type']
                    }
                },
                brand_name: function ( item, setting ) {
                    if (setting.defaultData.hasOwnProperty('brand_name')) {
                        return setting.defaultData['brand_name']
                    }
                },
                manufacturer: function ( item, setting ) {
                    if (setting.defaultData.hasOwnProperty('manufacturer')) {
                        return setting.defaultData['manufacturer']
                    }
                },
                update_delete: function ( item, setting ) {
                    if (setting.defaultData.hasOwnProperty('update_delete')) {
                        return setting.defaultData['update_delete']
                    }
                },
                main_image_url:function ( item, setting ) {
                    if ( Object.keys(item).includes('main_image_url')) {
                        return item['main_image_url']
                    }
                },
                external_product_id: function (item, setting ) {
                    if ( Object.keys(item).includes('external_product_id')) {
                        return item['external_product_id']
                    }
                },
                external_product_id_type: function ( item, setting ) {
                    if ( Object.keys(item).includes('external_product_id_type')) {
                        return item['external_product_id_type']
                    }
                    else if (setting.defaultData.hasOwnProperty('external_product_id_type')) {
                        return setting.defaultData['external_product_id_type']
                    }
                },
                item_name: function ( item, setting ) {
                    if ( Object.keys(item).includes('tem_name')) {
                        return item['tem_name']
                    }
                },
                manufacturer: function ( item, setting ){
                    if ( setting.defaultData.hasOwnProperty('manufacturer') ) {
                        return setting.defaultData['manufacturer']
                    }
                },
                item_type: function ( item, setting ) {
                    if ( Object.keys(item).includes('item_type')) {
                        return item['item_type']
                    }
                    else if (setting.defaultData.hasOwnProperty('item_type')) {
                        return setting.defaultData['item_type']
                    }
                },
                update_delete: function ( item, setting ) {
                    return 'update'

                },
                standard_price: function ( item, setting ) {
                    this.freight = 0
                    this.standardPrice = 0
                    this.logisticService = ''
                    this.maxDays = 0
                    // this的指向好像是vue
                    console.log(this)
                    let set = {
                        logistic: item.logistics_attr == '普货'?this.ordinaryLogistics: this.batteryLogistics,
                        first: this.setting.first,
                    }
                    // 计算售价
                    var mathPrice = function (price, other_cost , commission_rate, profit, tax, exchange_rate ) {
                        let amount = ( price + other_cost ) / ( 1 - commission_rate - profit - tax ) / exchange_rate
                        return amount

                    }

                    // 如果输入的数据有错，返回错误
                    let len = Number(item.website_shipping_length);
                    let wid = Number(item.website_shipping_width);
                    let hei = Number(item.website_shipping_height);
                    let wei = Number(item.website_shipping_weight)
                    if ( len < 1 || wid <1 || hei < 1 || wei < 1 ) {
                        return '错误的size参数'
                    }
                    let length = len < setting.minLength? setting.minLength: len
                    let width = wid < setting.minWidth? setting.minWidth: wid
                    let height = hei < setting.minHeight? setting.minHeight: hei
                    var o = this.mathFreight( length, width, height, wei, set)

                    var price = parseFloat( item.default_supplier_price )
                    if ( isNaN(price) || price <= 0 ) {
                        return '错误价格'
                    }
                    if ( (o && o.hasOwnProperty('freight')) ){
                        var nprice = mathPrice ( Number(o.freight) +Number(price) , Number(setting.otherCost), Number(setting.commission),  Number(setting.profit), Number(setting.tax), Number(setting.exchangeRate))
                        this.freight = o.freight.toFixed(2)
                        this.logisticService = o.name
                        this.maxDays = o.aging.max
                        /*console.log( 'o______', o)
                        console.log(o.freight + price , setting.otherCost, setting.commission,  setting.profit, setting.tax, setting.exchangeRate)
                        console.log('nprice_________', nprice)*/
                        let p = nprice.toFixed(2)
                        this.standardPrice = p
                        // 是否使用逗号作为数字分隔符

                        if ( parseInt(setting.useComma) ){
                            p = this.changeSymbolsToComma(p)
                        }
                        return p
                    } else {
                        return '错误价格'
                    }
                },
                buy_price: function ( item, setting ) {
                    return item.default_supplier_price

                },
                freight: function ( item , setting ) {
                    return this.freight

                },
                logistic_service: function ( item, setting ) {
                    return this.logisticService

                },
                max_days: function ( item, setting ){
                    return this.maxDays

                },
                sale_price: function ( item, setting ) {
                    let preferentialRange = setting.preferentialRange
                    if (this.standardPrice > 0 ) {
                        let salePrice = ( 1 - preferentialRange )* this.standardPrice
                        // 是否使用逗号作为数字分隔符
                        salePrice = salePrice.toFixed(2)
                        if ( parseInt(setting.useComma)){
                            salePrice = this.changeSymbolsToComma( salePrice )
                            return salePrice
                        }
                        return salePrice
                    }else {
                        return '错误价格'
                    }

                },
                merchant_shipping_group_name: function ( item, setting ){
                    let standard_price = this.standardPrice
                    if(standard_price > 0){
                        if ( standard_price > 0 && standard_price <=4) {
                            return '0-4'
                        }else if ( standard_price > 4 && standard_price <=8) {
                            return '4-8'
                        }else if ( standard_price > 8 && standard_price <=16) {
                            return '8-16'
                        }else if ( standard_price > 16 && standard_price <=32) {
                            return '16-32'
                        }else if ( standard_price > 32 && standard_price <=64) {
                            return '32-64'
                        }else {
                            return '8-16'
                        }

                    }else {
                        return '错误的运费模板'
                    }

                },
                sale_from_date: function ( item, setting ) {
                    let nowDate = dateFormat (new Date(), 'yyyy-mm-dd' );
                    return nowDate

                },
                sale_end_date: function ( item, setting ) {
                    let date = new Date()
                    date.setDate(date.getDate() + setting.discountDays);
                    let endDate = dateFormat( date, 'yyyy-mm-dd' );
                    return endDate

                }


            },
            // 转换成下架模板
            offShelf: {
                // 奈思的sku, 后端通过这个来识别对应的good
                item_sku: function ( item , setting ) {
                    if ( Object.keys(item).includes('good')) {
                        if ( parseFloat(item.good) <= 665 ){
                            if ( setting.COUNTRY == 'US' || setting.COUNTRY == 'UK' ){
                                return item.good
                            } else {
                                return setting.COUNTRY  + '_' + item.good
                            }
                        } else {
                            return setting.COUNTRY  + '_' + item.item_sku + '_' + item.good
                        }


                    }
                },
                update_delete: function ( item, setting ) {
                    return 'delete'

                },
            },

            // 转换供应信息修改文件规则
            exportSupply: {
                // 奈思的sku, 后端通过这个来识别对应的good
                item_sku: function ( item, setting ) {
                     if ( item.hasOwnProperty('item_sku')) {
                        return item.item_sku
                     }
                },
                default_supplier_price: function ( item, setting ) {
                    if (item.hasOwnProperty( 'default_supplier_price')) {
                        return item['default_supplier_price']
                    }
                },
                produce_url: function ( item, setting ) {
                    if ( item.hasOwnProperty('produce_url')) {
                        return item.produce_url
                    }
                },
                default_supply_addr: function ( item, setting ) {
                    if ( item.hasOwnProperty('default_supply_addr')) {
                        return item.default_supply_addr
                    }
                },
                purchasing_links: function ( item, setting ) {
                    if ( item.hasOwnProperty('purchasing_links')) {
                        return item.purchasing_links
                    }
                }


            },

            // 显示操作的数组
            tableData: [],
              // 编辑操作的数据
            formData: {
                 '广告活动每日预算': '1000'
                },
              // 源数据
              sourceData: [],
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
                startDate: dateFormat(new Date(), 'yyyy/mm/dd'),
                state: '启用',
                // 竞价策略
                biddingStrategies: '动态竞价（只降低）'
              },
              //源数据表格头部

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
        /**
         * [searchFormSub 提交搜索表单]
         * @return {[type]} [description]
         */
        searchFormSub () {
            var self = this
            console.log(self.searchForm)
            let arr = self.searchForm.item_sku.split('\n').filter( item=> { if( item ) return item })
            console.log(arr)
            const datas = {
                logistics_attr: self.searchForm.logistics_attr,
                item_skus: JSON.stringify(arr),
                state: self.searchForm.state,
                good_id: self.searchForm.pk
            }
            console.log(datas.item_skus)
            this.get( API.good_search, datas ).then( data => {
                var datas = data;
                if (datas.code == 200) {
                    var res = datas.data
                    // 变更表格头部
                    self.cols.currentCols = self.cols.sourceCols
                    // 源数据也指向这里, 搜索出来结果后按一下分页
                    self.sourceData = self.tableData = self.changeObjKeys( res, this.changeKeys.source )

                    console.log(self.tableData)
                }


                }).catch((err)=> {
                    console.log( err )
                })


        },

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
         * [changeObjKeys 切换对象构成的数组的键名]
         * @param  {[type]} list       [源数据]
         * @param  {[type]} colnumData [转换规则]
         * @return {[type]}            [转换后的数据]
         */
        changeObjKeys ( list , colnumData ) {
            let dataList = []
            if (list && list.length > 0) {
              let columnMapping = colnumData;
              const colnumName = Object.keys(columnMapping);
              let dataArr = list;
              dataArr.forEach(item=>{
                  /* Map 对象的使用https://blog.csdn.net/weixin_41646716/article/details/91509295 */
                  let itemMap = {};
                  for (let key in item) {
                      if(colnumName.includes(key)){
                          itemMap[columnMapping[key]] = item[key]
                      } else {
                          itemMap[key] = item[key]
                      }
                  }
                  dataList.push(itemMap);
              });
            }

            return dataList

        },
        /**
         * 生成价格修改库存文件
         *
         */
        makeStock ( list, setting ) {
          let ndatas = list.map( (item)=> {
            var nitem = {}
            for ( let key in this.exportStock){
              if ( 'function' == typeof this.exportStock[key] ) {
                  nitem[key] = this.exportStock[key].call( this, item , setting )
              }
            }
            return nitem
          })

          return ndatas


        },
        /**
         * 点击生成库存文件
         */

        handleMakeStock () {
          var self = this

          self.ordinaryLogistics = [
              new Logistic( px_ordinary_QY, self.setting.COUNTRY),
              new Logistic( px_ordinary_O5, self.setting.COUNTRY),
              new Logistic( px_ordinary_QC, self.setting.COUNTRY),
              new Logistic( px_ordinary_PX, self.setting.COUNTRY),
              new Logistic( px_battery_OH, self.setting.COUNTRY),
              new Logistic( px_battery_QZ, self.setting.COUNTRY),
          ];
          self.batteryLogistics = [
              new Logistic( px_battery_OH, self.setting.COUNTRY),
              new Logistic( px_battery_QZ, self.setting.COUNTRY),
          ]

          let ndatas = this.makeStock( this.tableData, self.setting )
          self.cols.currentCols = self.cols.stockCols
          self.tableData = ndatas
        },
        /**
         * [makeOffShelf 生成下架模板]
         * @param  {[type]} list    [源数据]
         * @param  {[type]} setting [设置]
         * @return {[type]}         [转换后的数组]
         */
        makeOffShelf ( list , setting ) {
            var self = this
            let ndatas = list.map( (item)=> {
                var nitem = {}
                for ( let key in this.offShelf){
                    if ( 'function' == typeof this.offShelf[key] ) {
                        nitem[key] = this.offShelf[key].call( this, item , setting )
                    }
                }
                return nitem
            })

            return ndatas

        },
        /**
         * [handleOffShelf 点击生成下架模板]
         * @return {[type]} [description]
         */
        handleOffShelf () {
            var self = this
            var ndatas = []
            let countrys = ['US','CA','UK','IT','DE','FR','ES']
            countrys.forEach( item => {
                let setting = {COUNTRY:item}
                ndatas = ndatas.concat(self.makeOffShelf( self.tableData, setting ))
            })
            console.log(ndatas)
            self.cols.currentCols = self.cols.stockCols
            self.tableData = ndatas

        },
        /**
         * 点击更新供应信息
         */
        handleUpdeteSupply (){
            var self = this
            self.doUpdateSupply()

        },
        /**
         * [handleUpdeteGood 修改商品信息]
         */
        handleUpdeteGood () {
            var self = this
            let array = JSON.stringify(self.tableData)
            let datas = {
                datas: array,
                pk: 12
            }
            self.doUpdateGood( datas )

        },
        // 将数字中小数点变更符号为“，”
        changeSymbolsToComma ( num ){
            var self = this
            let str = String( num )
            let nnum = str.replace( '.', ',')
            return nnum
        },
        /*
           根据设置计算运价
           setting ibject { logistic: [备选物流列表]: country: 'US', first: 'price' or 'aging' } 时效为先还是价格为先
         */
        mathFreight ( length, width, height, weight, setting ) {
              console.log(setting)
              let logistics = setting.logistic
              let first = setting.first;
              let result = []
              /*
              * 获取某个元素下标
              * arr: 传入的数组
              * obj: 需要获取下标的元素
              * */
            function getArrayIndex(arr, obj) {
                var i = arr.length;
                while (i--) {
                    if (arr[i] === obj) {
                        return i;
                    }
                }
                return -1;
            }
            logistics.forEach ( item=> {
                console.log(length , width , height, weight)
                let r = item.getServiceInfo( length , width , height, weight )
                if ( r ) {
                    result.push(r)
                }

            })
            let prices = result.map( item=>{
                return item.freight
            })
            let agings = result.map( item=>{
                return item.aging.max
            })
            console.log(result)
            var minPrice = Math.min.apply(Math,prices);
            console.log(minPrice)
            var minAging = Math.min.apply(Math,agings);
            if ( first == 'aging' ) {
                return result[getArrayIndex( agings, minAging )]
            }else {
                return result[getArrayIndex( prices, minPrice )]
            }


        },
        // 上传库存文件
        importStockExcel ( file ) {
            var self = this
            // 获取对应数据库表的列名与注释

          // 将excel表的数据转换成json格式
            this.loading = true;
            importExcel( file, this.changeKeys.stockExcel ).then(res=>{
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
        // 上传供应信息文件
        importSupplyExcel ( file ) {
            var self = this;
            this.loading = !1;
            importExcel ( file, this.changeKeys.supplyExcel ). then( res => {
                console.log(res)
                this.cols.currentCols = this.getColumn( res, this.cols.maxLength )
                this.tableData = res
                this.currentPage = 1
                this.loading = false
            }).catch( err => {
                alert( err )
            })

        },
        /**
         * [importGoodExcel 上传商品信息表格文件]
         * @param  {[type]} file [description]
         * @return {[type]}      [description]
         */
        importGoodExcel ( file ) {
            var self = this;
            this.loading = !1;
            importExcel ( file, {} ). then( res => {
                console.log(res)
                this.cols.currentCols = this.cols.sourceCols
                this.tableData = res
                this.currentPage = 1
                this.loading = false
            }).catch( err => {
                alert( err )
            })
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
          this.get ('/good-get-many').then( (data) => {
            var datas = data;
            if (datas.code == 200) {
                var res = datas.data
                // 变更表格头部
                self.cols.currentCols = self.cols.sourceCols
                // 源数据也指向这里
                self.sourceData = self.tableData = self.changeObjKeys( res, this.changeKeys.source )
                console.log(self.sourceData)
            }

          })
        },
        // 下载表格
        downLoadXlsx () {
            listToExcel( 'advertise_', this.tableData)
             //Exl ('test',data)
            /*this.$alert('生成表格时产生了错误', '注意', {
                confirmButtonText: '确定',
                callback: action => {
                    this.$message({
                        type: 'info',
                        message: `action: ${ action }`
                    });
                }
            })*/

        },

        // 根据列表调用接口，更新数据
        doUpdateSupply ( excelDataList ){
            var self = this
            //提交Excel数据 JSON.stringify
            self.tableData.forEach( item=> {
                var datas = {datas: JSON.stringify(item)}
                this.get( API.supply_update_by_itemSku, datas ).then( data => {
                    console.log(data)

                }).catch(()=> {

                })


            })


        },
        /**
         * [doUpdateGood 更新表格数据更新商品，根据item_sku]
         * @param  {[object]} datas [由商品信息对象组成的数组 { excelDataList: [{ **good }]}]
         * @return {[null]}               [没有返回]
         */
        doUpdateGood ( datas ) {
            var self = this
            this.get( API.good_updata_by_itemSku, datas ).then( data =>{
                console.log(data)
            }).catch(()=> {
                console.log('err')
            })


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