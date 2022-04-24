/*
* @Author: Marte
* @Date:   2022-02-26 20:49:10
* @Last Modified by:   Marte
* @Last Modified time: 2022-02-26 22:04:09
*/

'use strict';
 const imageConversion = require("image-conversion")
 /**
 * file:文件
 * config:{ //压缩配置
 * size     Number  指定压缩大小
 * scale    Number  相对于原始图像的缩放比例，范围0-10
 * width    Number  结果图像的宽度
 * height   Number  结果图像的高度
 * quality  Number  0-1 默认0.92
 * }
 *
*/
export async  function compressConversion (file, config){
    const resAvatarBlob = await imageConversion.compressAccurately(file, config)
       // console.log('压缩后',resAvatarBlob)
    const resAvatarFile = new window.File(
    [resAvatarBlob],
    file.name,
    { type: file.type },
    )
    console.log('压缩后的大小',resAvatarFile.size/1024)
    return resAvatarFile
}
