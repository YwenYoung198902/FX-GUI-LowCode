/*
 * @Descripttion: 说明
 * @version: V1.0
 * @Author: 卜倩倩
 * @Date: 2023-10-13 09:46:16
 * @LastEditors: 卜倩倩
 * @LastEditTime: 2023-10-17 17:15:00
 */
export default {
  width: 870,
  height: 536,
  left: 100,
  top: 100,
  name: '摄像头',
  isShow: true,
  isLock: false,
  isShowModule: true,
  isRelationPoi: false,
  relationWorksheetId: '',
  relationLayerId: '',
  box: {
    width: 870,
    height: 650,
    backgroundColor: 'rgba(4, 21, 27, 0.95)',
    headPic: '',
    headFontSize: 26,
    closePic: '',
    emptyPic: '',
    closeIconWidth: 20,
    closeIconHeight: 20
  },
  controlBtn: {
    width: 70,
    height: 70,
    upwardPic: '',
    upwardPic_hover: '',
    shrinkPic: '',
    shrinkPic_hover: '',
    enlargePic: '',
    enlargePic_hover: '',
  },
  offline_record: {
    isShow: false,
    pic: '',
    headFont: 16,
    dataFont: 16,
    color: '#fff',
    lineColor: 'rgba(12, 223, 242, 0.05)'
  }
}