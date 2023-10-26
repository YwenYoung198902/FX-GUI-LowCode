<template>
  <div
    ref="canvasBox"
    v-drag
    :class="classname"
    style="background:#000;position:relative"
    @click="changeClose"
  >
    <canvas
      :id="radom"
      :width="width"
      :height="height"
      @mousedown="canvasDown($event)"
      @touchstart="canvasDown($event)"
    />
    <div
      v-if="isNoImg"
      class="noImg"
    >
      加载失败
    </div>
  </div>
</template>
<script>
const uuid = require('node-uuid');
export default {
  // 注册局部组件指令
  directives: {
    drag: (el, binding, vnode) => {
      if (vnode.context.isCanDraw == false && vnode.context.isMove) {
        const dragBox = el; // 获取当前元素
        dragBox.onmousedown = (e) => {
          // 算出鼠标相对元素的位置
          const disX = e.clientX - dragBox.offsetLeft;
          const disY = e.clientY - dragBox.offsetTop;
          document.onmousemove = (e) => {
            // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
            const left = e.clientX - disX;
            const top = e.clientY - disY;
            // 移动当前元素
            dragBox.style.left = left + 'px';
            dragBox.style.top = top + 'px';
          };
          document.onmouseup = (e) => {
            // 鼠标弹起来的时候不再移动
            document.onmousemove = null;
            // 预防鼠标弹起来后还会循环（即预防鼠标放上去的时候还会移动）
            document.onmouseup = null;
          };
        };
      }
    }
  },
  props: {
    link: {
      // 图片路径
      type: String
    },
    info: {
      // 位置点信息
      type: Array
    },
    width: {
      // 绘图区域宽度
      // type: String
    },
    height: {
      // 绘图区域高度
      // type: String
    },
    lineColor: {
      // 画笔颜色
      type: String,
      default: '#0055ff'
    },
    id: {
      // 图片的id
      type: String,
      default: ''
    },
    isCanDraw: {
      // 是否可绘制
      type: Boolean,
      default: true
    },
    isMove: {
      // 是否可绘制
      type: Boolean,
      default: false
    },
    classname: {
      type: String
    },
    isShowDrag: {
      type: Boolean,
      default: true
    },
    area: {
      type: Array
    },
    area_new: {}
  },
  data() {
    return {
      url: '',
      // 同一页面多次渲染时，用于区分元素的id
      radom: uuid.v4(),
      // canvas对象
      context: {},
      // 储存坐标信息
      drawInfo: [],
      areaInfo: [],
      areaNewInfo: {},
      defaultText: '',
      // 背景图片缓存
      img: new Image(),
      moving: false, // 是否移动
      moveItem: null, // 移动的图形
      startPos: {}, // 移动起始
      isChecked: false, // 是否选中
      isDraw: false,
      checkItem: null,
      scale: 1,
      realW: '',
      realH: '',
      canDraw: {
        x: '',
        y: '',
        w: '',
        h: '',
        text: ''
      },
      isNoImg: false
    };
  },
  watch: {
    link() {
      this.url = this.link;
      this.initDraw();
    },
    info() {
      this.drawInfo = this.info;
      this.initDraw();
    },
    height() {
      this.height = this.height;
      this.initDraw();
    },
    width() {
      this.width = this.width;
      this.initDraw();
    },
    isShowDrag() {
      this.initDraw();
    },
    area: {
      handler() {
        this.areaInfo = this.area || [];
      },
      deep: true
    },
    area_new: {
      handler() {
        this.areaNewInfo = this.area_new;
      },
      deep: true
    }
  },
  mounted() {
    this.url = this.link;
    this.drawInfo = this.info;
    this.areaInfo = this.area;
    this.areaNewInfo = this.area_new;
    this.initDraw();
  },
  methods: {
    // 初始化绘制信息
    initDraw() {
      this.isNoImg = false;
      this.$refs.canvasBox.style.height = this.height + 'px';
      this.$refs.canvasBox.style.width = this.width + 'px';
      // 初始化画布
      const canvas = document.getElementById(this.radom);
      this.context = canvas.getContext('2d');
      // 初始化背景图片
      this.img.src = this.url;
      this.img.onerror = () => {
        this.context.clearRect(0, 0, this.width, this.height);
        this.isNoImg = true;
      };
      this.img.onload = () => {
        // 计算图片根据画布缩放后的宽高
        const w = this.img.width / this.width;
        const h = this.img.height / this.height;
        this.scale = Math.max(w, h);
        this.realW = this.img.width / this.scale;
        this.realH = this.img.height / this.scale;
        if (this.isShowDrag) {
          this.drawBg();
          this.init();
          if (this.areaNewInfo) {
            this.areaNewInit(this.areaNewInfo);
          } else {
            this.areaInit(this.areaInfo);
          }
        } else {
          this.clean();
        }
      };
      // 初始化画笔
      this.context.strokeStyle = this.lineColor;
      // this.copyData();
    },
    // copyData() {},
    scaleCanvas() {
      this.initDraw();
      this.toDraw();
    },
    toDraw() {
      this.drawInfo.forEach((item) => {
        this.drawRect(
          this.getX(item.x),
          this.getY(item.y),
          this.getW(item.w),
          this.getH(item.h)
        );
        if (item.text !== '') {
          this.context.strokeStyle = '#0055ff';
        } else {
          this.context.strokeStyle = '#ff0000';
        }
        this.context.stroke();
      });
    },
    /**
     * 绘制背景
     */
    drawBg() {
      let x = 0;
      let y = 0;
      if (this.realW < this.width) {
        x = (this.width - this.realW) / 2;
      }
      if (this.realH < this.height) {
        y = (this.height - this.realH) / 2;
      }
      this.context.drawImage(this.img, x, y, this.realW, this.realH);
    },
    /**
     * 根据比例计算X纠偏(canvas的宽高为固定值时需要纠偏)
     */
    getX(n) {
      return this.realW * n + (this.width - this.realW) / 2;
    },
    /**
     * 根据比例计算Y纠偏(canvas的宽高为固定值时需要纠偏)
     */
    getY(n) {
      return this.realH * n + (this.height - this.realH) / 2;
    },
    /**
     * 根据比例计算宽
     */
    getW(n) {
      return this.realW * n;
    },
    /**
     * 根据比例计算高
     */
    getH(n) {
      return this.realH * n;
    },
    // 根据传入内容绘制
    init() {
      this.clean();
      this.drawInfo &&
        this.drawInfo.map((item) => {
          this.drawRect(
            this.getX(item.x),
            this.getY(item.y),
            this.getW(item.w),
            this.getH(item.h)
          );
          this.context.stroke();
        });
    },
    // 绘制区域
    areaInit(points) {
      if (points && points.length > 0) {
        this.context.beginPath();
        points.push(points[0]);
        points.forEach((item) => {
          const x = this.getX(item[0]);
          const y = this.getY(item[1]);
          this.context.lineTo(x, y);
          this.context.strokeStyle = 'rgba(250,173,20, 1)';
          this.context.fillStyle = 'rgba(250,173,20, 0.25)';
        });
        this.context.stroke();
        this.context.fill();
      }
    },
    areaNewInit(points) {
      if (Array.isArray(points)) {
        this.areaInit(points);
      } else {
        const area_y = points.area_y;
        area_y &&
          area_y.forEach((val) => {
            this.context.beginPath();
            val.push(val[0]);
            val.forEach((item, index) => {
              const x = this.getX(item[0]);
              const y = this.getY(item[1]);
              this.context.lineTo(x, y);
              this.context.strokeStyle = 'rgba(250,173,20, 1)';
              this.context.fillStyle = 'rgba(250,173,20, 0.25)';
            });
            this.context.stroke();
            this.context.fill();
          });
      }
    },
    // 绘制矩型
    drawRect(x, y, w, h) {
      this.context.beginPath();
      this.lineWidth = (3 / 1400) * this.width;
      this.context.lineWidth = this.lineWidth;
      this.context.strokeStyle = 'red';
      this.context.rect(x, y, w, h);
    },
    // 绘制文字
    drawText(text, x, y, color) {
      this.context.fillStyle = color; // 设置填充画笔颜色为红色，即字体颜色
      const font =
        'bold ' + Math.ceil((35 / 1400) * this.width) + 'px' + ' ' + 'serif';
      this.context.font = font; // 设置字体大小
      this.context.fillText(text, x, y); // 绘制 "实心" 文字
    },
    // 绘制底部框
    drawBottom(x, y, w, h) {
      this.context.fillStyle = 'rgba(255, 255, 255, 0.9)';
      this.context.fillRect(x, y + h - 30, w, 30);
    },
    // 把点击坐标换算成CanvasXY轴坐标
    getCanvasPoint(e) {
      return {
        x: e.offsetX,
        y: e.offsetY
      };
    },
    changeClose() {
      this.$emit('isClose');
    },
    // 鼠标点击
    canvasDown(e) {
      this.$emit('isclick', true);
      this.isChecked = false;
      this.checkItem = null;
      this.isDraw = false;
      const point = this.getCanvasPoint(e);
      this.clean();
      if (this.isShowDrag) {
        if (this.areaNewInfo) {
          this.areaNewInit(this.areaNewInfo);
        } else {
          if (this.areaInfo.length > 0) {
            this.areaInit(this.areaInfo);
          }
        }
        this.drawInfo.forEach((item) => {
          const font = Math.ceil((35 / 1400) * this.width);
          this.drawRect(
            this.getX(item.x),
            this.getY(item.y),
            this.getW(item.w),
            this.getH(item.h)
          );
          if (this.context.isPointInPath(point.x, point.y)) {
            this.moveItem = item;
            this.startPos.x = point.x;
            this.startPos.y = point.y;
            this.context.strokeStyle = '#fff';
            this.isChecked = true;
            this.checkItem = item;
            this.$emit('isclick', false);
            const length = this.getTextLength(item.text) + 1;
            let leftWidth = 0;
            if (item.confident) {
              const confidentLength = this.getTextLength(item.confident) + 1;
              const confidentWidth =
                this.getX(item.x) + (length + confidentLength) * font;
              if (
                confidentWidth >= this.realW &&
                this.getX(item.x) < this.realW
              ) {
                leftWidth = confidentWidth - this.realW;
                this.drawText(
                  item.text,
                  this.getX(item.x) - leftWidth,
                  this.getY(item.y) + font,
                  'red'
                );
                this.drawText(
                  item.confident,
                  this.getX(item.x) + length * font - leftWidth,
                  this.getY(item.y) + font,
                  'red'
                );
              } else {
                this.drawText(
                  item.text,
                  this.getX(item.x),
                  this.getY(item.y) + font,
                  'red'
                );
                this.drawText(
                  item.confident,
                  this.getX(item.x) + length * font,
                  this.getY(item.y) + font,
                  'red'
                );
              }
            } else {
              const txtWidth = this.getX(item.x) + length * font;
              if (txtWidth >= this.realW && this.getX(item.x) < this.realW) {
                leftWidth = txtWidth - this.realW;
                this.drawText(
                  item.text,
                  this.getX(item.x) - leftWidth,
                  this.getY(item.y) + font,
                  'red'
                );
              } else {
                this.drawText(
                  item.text,
                  this.getX(item.x),
                  this.getY(item.y) + font,
                  'red'
                );
              }
            }
            const multiple = 2;
            let namelength = 0;
            let agelength = 0;
            if (item.name) {
              this.drawText(
                item.name,
                this.getX(item.x) - leftWidth,
                this.getY(item.y) + font * multiple,
                'red'
              );
              namelength = this.getTextLength(item.name) + 0.5;
            }
            if (item.age) {
              this.drawText(
                item.age,
                this.getX(item.x) + namelength * font - leftWidth,
                this.getY(item.y) + font * multiple,
                'red'
              );
              agelength = this.getTextLength(item.age) + 0.5;
            }
            if (item.gender || item.gender === 0) {
              let gender;
              switch (item.gender) {
                case 1:
                  gender = '男性';
                  break;
                case 2:
                  gender = '女性';
                  break;
                default:
                  gender = '未知';
              }
              this.drawText(
                gender,
                this.getX(item.x) + (namelength + agelength) * font - leftWidth,
                this.getY(item.y) + font * multiple,
                'red'
              );
            }
          } else {
            this.context.strokeStyle = '#ff0000';
          }
          this.context.stroke();
        });
      }
      if (this.isChecked == false && this.isCanDraw == true) {
        this.canDraw.x = point.x;
        this.canDraw.y = point.y;
        this.isDraw = true;
      }
    },
    getTextLength(text) {
      const txt = '' + text;
      const len = txt.length;
      let nlen = 0;
      for (var x = 0; x < len; x++) {
        if (txt.charCodeAt(x) > 128) {
          nlen += 1;
        } else {
          nlen += 0.5;
        }
      }
      return nlen;
    },
    // 清空画布
    clean() {
      this.context.clearRect(0, 0, this.width, this.height);
      this.drawBg();
    }
  }
};
</script>
<style lang="scss" scoped>
.canvasBox {
  position: absolute;
}
.canvas {
  cursor: crosshair;
  border: 1px solid #000000;
}
.noImg {
  position: absolute;
  color: #fff;
  font-size: 18px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>