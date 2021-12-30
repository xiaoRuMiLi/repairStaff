/*
* @Author: JinJie
* @Date:   2021-05-18 21:03:48
* @Last Modified by:   Marte
* @Last Modified time: 2021-05-21 19:49:40
*/
/*
   打包的xlsx模块
 */
import XLSX from 'xlsx'

///excel导入功能使用：
// 1、首先要安装SheetJs, npm install xlsx --save;
// 2、在需要的文件中引入importExcel.js文件
// 3、参数说明：file是指需要导入的excel文件（会有弹窗选择即可）；colnumData是指对应数据库表的列名与注释组成的集合
// 4、excel的列名称要与数据库表中的注释保持一致
export function importExcel(file,colnumData){
    const types = file.name.split('.').pop();
    let dataList = [];
    const fileType = ['xlsx', 'xlc', 'xlm', 'xls', 'xlt', 'xlw', 'csv'].some(item => item === types);
    if (!fileType) {
        this.$message('格式错误！请重新选择')
        return
    }
    return new Promise(function(resolve,reject){
        file2Xce(file).then(tabJson => {
            // tabJson格式是[{sheetName: sheet1, sheet: [{key: val},{key:val}]}]
            if (tabJson && tabJson.length > 0) {
                let columnMapping = colnumData;
                const colnumName = Object.keys(columnMapping);
                let dataArr = tabJson[0].sheet;
                dataArr.forEach(item=>{
                    /* Map 对象的使用https://blog.csdn.net/weixin_41646716/article/details/91509295 */
                    let itemMap = new Map();
                    for (let key in item) {
                        // 如果 colnumName 中包含了 表格中列名，意思是colnumData的数据格式必须完全和sheet元素一致，否则不会执行，将列名转换成colnumData对应的值，
                        // colnumData是列名转换规则对象, 里面包含的键名会被转换，不被包含的不会被转换
                        if(colnumName.includes(key)){
                            itemMap.set(columnMapping[key],item[key])
                        } else {
                            itemMap.set(key,item[key])
                        }
                    }
                    dataList.push(itemMap);
                });
                resolve(map2json(dataList));
            }else{
                reject("EXCEL文件没有数据！")
            }
        })
    })

}
/**
 * [listToExcel 将json数据转换成excel下载]
 * @param  {[str]} file [description]
 * @param  {[str]} data [description]
 * @param  {[array]} header
 * @param  {[array]} clos
 * @return {[bool]}      [description]
 */
export function listToExcel ( file , data , header, headerDisplay, cols) {
    const newFile = file || 'file';
    var data = data || [{testid : 1},{testid : 2}]
    if (!header) {
        var newHeader = data.length > 0? Object.keys(data[0]): ["testid", "S","h","e","e_1","t","J"]
    }
    var header = header? header: newHeader
    if (!headerDisplay) {
        var obj = {}
        header.forEach(( item, index )=>{ obj[item] = item })
        var newHeaderDisplay = obj
    }

    var headerDisplay = headerDisplay? headerDisplay: newHeaderDisplay
    //展示的顺序，把data中对象的属性按照你想要的顺序排放就可以了，我这里把id移到了第一列展示
    // const header = ["id", "S","h","e","e_1","t","J"];
    //展示的名称
    // const headerDisplay = {S:"S栏", h:"h栏", e:"e栏", e_1:"e_1栏", t:"t栏", J:"J栏", id:"id栏"};

    //将表头放到原始数据里面去，要保证表头在数组的最前面
    const newData = [headerDisplay, ...data];
    //创建book
    var wb = XLSX.utils.book_new();
    //json转sheet
    //加了一句skipHeader:true，这样就会忽略原来的表头
    var ws = XLSX.utils.json_to_sheet(newData, {header:header, skipHeader:true});
    if ( cols ) {
        /*设置列宽
        ws['!cols']= [
            {width: 15},
            {width: 15},
            {width: 15},
            {width: 15},
            {width: 10}
        ];*/
        ws['!cols'] = cols
    }
    var timestamp = (new Date()).getTime();
    //sheet写入book
    XLSX.utils.book_append_sheet( wb, ws, "file" );
    //输出
    XLSX.writeFile( wb, newFile + timestamp + ".xlsx" );

}

function file2Xce(file) {
    return new Promise(function(resolve, reject) {
        const reader = new FileReader()
        reader.onload = function(e) {
            const data = e.target.result
            this.wb = XLSX.read(data, {
                type: 'binary'
            })
            const result = []
            console.log(this.wb)
            // 取出各表的json 格式数据 result格式是[{sheetName: sheet1, sheet: [{key: val},{key:val}]}]
            this.wb.SheetNames.forEach((sheetName) => {
                result.push({
                sheetName: sheetName,
                sheet: XLSX.utils.sheet_to_json(this.wb.Sheets[sheetName])
                })
            })
            resolve(result)
        }
        reader.readAsBinaryString(file.raw)
    })
}

function map2json (list) {
    let datalist = [];
    list.forEach(element => {
        let json = {};
        for(let [k,v] of element){
            json[k]=v;
        }
        datalist.push(json);
    });
    return datalist;
}


// https://blog.csdn.net/guo_123258/article/details/102723096