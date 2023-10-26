<template>
  <el-scrollbar class="right-setting scrollbar-wrapper">
    <el-form
      label-width="110px"
      size="small"
      class="border-box"
      style="padding: 8px 16px"
    >
      <el-form-item label="名称：">
        <div
          class="componentName"
          style="display:flex;align-items:center"
        >
          <el-input
            v-model="config.name"
            size="mini"
            placeholder=""
            @change="(val) => $emit('changeSize', 'name', val)"
          ></el-input>
          <span
            :class="config.isLock? 'active': ''"
            @click="(val) => $emit('changeSize', 'isLock', !config.isLock)"
          ></span>
          <span
            :class="config.isShow? 'active': ''"
            @click="(val) => $emit('changeSize', 'isShow', !config.isShow)"
          ></span>
        </div>
      </el-form-item>
      <el-form-item label="组件宽度：">
        <el-input
          v-model="config.width"
          size="mini"
          @change="(val) => $emit('changeSize', 'width', val)"
          placeholder="请输入组件宽度"
        ></el-input>
      </el-form-item>
      <el-form-item label="组件高度：">
        <el-input
          v-model="config.height"
          size="mini"
          @change="(val) => $emit('changeSize', 'height', val)"
          placeholder="请输入组件高度"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="默认展示隐藏："
        label-width="110px"
      >
        <el-switch
          style="margin-top: 7px;"
          v-model="config.isShowModule"
          @change="(val) => $emit('changeSize', 'isShowModule', val)"
        ></el-switch>
      </el-form-item>
      <el-form-item label="组件背景色：">
        <el-color-picker
          v-model="config.box.backgroundColor"
          show-alpha
        ></el-color-picker>
      </el-form-item>
      <el-form-item label="X距离：">
        <el-input
          v-model="config.left"
          size="mini"
          @change="(val) => $emit('changeSize', 'left', val)"
        ></el-input>
      </el-form-item>
      <el-form-item label="Y距离：">
        <el-input
          v-model="config.top"
          size="mini"
          @change="(val) => $emit('changeSize', 'top', val)"
        ></el-input>
      </el-form-item>
      <el-form-item label="单个容器宽高：">
        <div style="display: flex;align-items:center">
          <el-input
            v-model="config.box.boxWidth"
            size="mini"
            placeholder=""
          ></el-input>
          <span>x</span>
          <el-input
            v-model="config.box.boxHeight"
            size="mini"
            placeholder=""
          ></el-input>
        </div>
      </el-form-item>
      <el-form-item label="一行：">
        <el-input-number
          size="small"
          v-model="config.box.arrangeNum"
          :min="1"
          :max="10"
          label=""
        ></el-input-number>个
      </el-form-item>
      <el-form-item label="图片宽高：">
        <div style="display: flex;align-items:center">
          <el-input
            v-model="config.box.width"
            size="mini"
            placeholder=""
          ></el-input>
          <span>x</span>
          <el-input
            v-model="config.box.height"
            size="mini"
            placeholder=""
          ></el-input>
        </div>
      </el-form-item>
      <el-form-item label="是否自动滚动：">
        <el-switch v-model="config.box.autoplay"></el-switch>
      </el-form-item>
      <el-form-item
        label="滚动时间间隔："
        v-if="config.box.autoplay"
      >
        <div style="display:flex;align-items:center">
          <el-input
            v-model="config.box.interval"
            size="mini"
            placeholder=""
          ></el-input>
          <span style="margin-left: 10px">秒</span>
        </div>
      </el-form-item>
      <el-form-item label="滚动方向：">
        <el-select v-model="config.box.direction">
          <el-option
            label="横"
            value="horizontal"
          ></el-option>
          <el-option
            label="竖"
            value="vertical"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-collapse>
        <el-collapse-item>
          <template slot="title">
            <div
              class="custom-title"
              @click.stop
            >
              <span>图片位</span>
              <el-input-number
                size="small"
                v-model="config.box.cardNum"
                @change="cardInputChange"
                :min="1"
                :max="10"
                label="图片位数量"
              ></el-input-number>
            </div>
          </template>
          <el-form
            label-width="80px"
            size="small"
            class="border-box"
            style="padding: 8px 16px"
          >
            <el-select
              v-model="currentPic"
              @change="selectChange"
              size="small"
              class="currentPic"
            >
              <el-option
                v-for="item,index in pictureList"
                :key="item.rowid"
                :label="`图片位${index + 1}`"
                :value="item.rowid"
              ></el-option>
            </el-select>
            <el-form-item label="标题：">
              <el-input
                v-model="name"
                @input="contentChange"
              ></el-input>
            </el-form-item>
            <el-form-item label="描述：">
              <el-input
                v-model="desc"
                @input="contentChange"
              ></el-input>
            </el-form-item>
            <el-form-item label="图片: ">
              <div
                class="img-bock"
                v-for="(item,index) in photoList"
                :key="index"
              >
                <img
                  :src="item.includes('http') ? item: item.includes('base64')? item: IMG_URL + item"
                  alt=""
                >
                <i
                  class="el-icon-delete"
                  @click="delPic(item,index)"
                ></i>
                <el-upload
                  action=""
                  multiple
                  :before-upload="function (file) { return editPic(file, index)}"
                >
                  <i class="el-icon-edit"></i>
                </el-upload>
              </div>
              <el-upload
                action=""
                multiple
                :before-upload="beforeUpload"
              >
                <i class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-form>
        </el-collapse-item>
      </el-collapse>

      <el-collapse>
        <el-collapse-item
          title="文本(标题)"
          name="title"
        >
          <div class="fontStyle">
            <div class="block">
              <span
                class="bg"
                :class="config.title.fontWeight=== 'bold'? 'active':''"
              ><span
                  :class="config.title.fontWeight=== 'bold'? 'bold':'non-bold'"
                  @click="$emit('changeValue', 'title','fontWeight', config.title.fontWeight=== 'bold'? 'normal':'bold')"
                ></span></span>
              <span class="title">加粗</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.title.fontStyle === 'italic'? 'active':''"
              ><span
                  :class="config.title.fontStyle === 'italic'? 'incline':'non-incline'"
                  @click="$emit('changeValue', 'title','fontStyle', config.title.fontStyle=== 'normal'? 'italic':'normal')"
                ></span></span>
              <span class="title">倾斜</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.title.textAlign === 'left'? 'active':''"
              ><span
                  :class="config.title.textAlign==='left'? 'left':'non-left'"
                  @click="$emit('changeValue', 'title','textAlign', 'left')"
                ></span></span>
              <span class="title">左对齐</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.title.textAlign==='center'? 'active':''"
              ><span
                  :class="config.title.textAlign==='center'? 'center':'non-center'"
                  @click="$emit('changeValue', 'title','textAlign', 'center')"
                ></span></span>
              <span class="title">居中</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.title.textAlign==='right'? 'active':''"
              ><span
                  :class="config.title.textAlign==='right'? 'right':'non-right'"
                  @click="$emit('changeValue', 'title','textAlign', 'right')"
                ></span></span>
              <span class="title">右对齐</span>
            </div>
          </div>
          <el-form-item label="是否显示：">
            <el-switch
              v-model="config.title.display"
              active-value="block"
              inactive-value="none"
            ></el-switch>
          </el-form-item>
          <el-form-item label="颜色/字号：">
            <div class="flex align-center">
              <el-color-picker
                v-model="config.title.color"
                show-alpha
                size="mini"
              ></el-color-picker>
              <el-input
                v-model="config.title.fontSize"
                size="mini"
                style="margin: 0 8px 0 12px"
              ></el-input>px
            </div>
          </el-form-item>
          <el-form-item label="字体：">
            <div class="flex align-center">
              <el-select
                v-model="config.title.fontFamily"
                placeholder="请选择"
              >
                <el-option
                  label="微软雅黑"
                  value="微软雅黑"
                ></el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item label="字间距：">
            <el-input
              v-model="config.title.letterSpacing"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-collapse-item>
      </el-collapse>

      <el-collapse>
        <el-collapse-item
          title="文本(描述)"
          name="title"
        >
          <div class="fontStyle">
            <div class="block">
              <span
                class="bg"
                :class="config.description.fontWeight=== 'bold'? 'active':''"
              ><span
                  :class="config.description.fontWeight=== 'bold'? 'bold':'non-bold'"
                  @click="$emit('changeValue', 'description','fontWeight', config.description.fontWeight=== 'bold'? 'normal':'bold')"
                ></span></span>
              <span class="title">加粗</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.description.fontStyle === 'italic'? 'active':''"
              ><span
                  :class="config.description.fontStyle === 'italic'? 'incline':'non-incline'"
                  @click="$emit('changeValue', 'description','fontStyle', config.description.fontStyle=== 'normal'? 'italic':'normal')"
                ></span></span>
              <span class="title">倾斜</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.description.textAlign === 'left'? 'active':''"
              ><span
                  :class="config.description.textAlign==='left'? 'left':'non-left'"
                  @click="$emit('changeValue', 'description','textAlign', 'left')"
                ></span></span>
              <span class="title">左对齐</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.description.textAlign==='center'? 'active':''"
              ><span
                  :class="config.description.textAlign==='center'? 'center':'non-center'"
                  @click="$emit('changeValue', 'description','textAlign', 'center')"
                ></span></span>
              <span class="title">居中</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.description.textAlign==='right'? 'active':''"
              ><span
                  :class="config.description.textAlign==='right'? 'right':'non-right'"
                  @click="$emit('changeValue', 'description','textAlign', 'right')"
                ></span></span>
              <span class="title">右对齐</span>
            </div>
          </div>
          <el-form-item label="是否显示：">
            <el-switch
              v-model="config.description.display"
              active-value="block"
              inactive-value="none"
            ></el-switch>
          </el-form-item>
          <el-form-item label="颜色/字号：">
            <div class="flex align-center">
              <el-color-picker
                v-model="config.description.color"
                show-alpha
                size="mini"
              ></el-color-picker>
              <el-input
                v-model="config.description.fontSize"
                size="mini"
                style="margin: 0 8px 0 12px"
              ></el-input>px
            </div>
          </el-form-item>
          <el-form-item label="字体：">
            <div class="flex align-center">
              <el-select
                v-model="config.description.fontFamily"
                placeholder="请选择"
              >
                <el-option
                  label="微软雅黑"
                  value="微软雅黑"
                ></el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item label="字间距：">
            <el-input
              v-model="config.description.letterSpacing"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-collapse-item>
      </el-collapse>
    </el-form>
  </el-scrollbar>
</template>
  
<script>
export default {
  name: 'progressBar',
  data() {
    return {
      name: '',
      desc: '',
      currentPic: '',
      pictureList: [],
      photoList: [],
      IMG_URL:
        window.location.host.includes('localhost') ||
        window.location.host.includes('192.168') ||
        window.location.host.includes('127.0.0.1')
          ? 'https://www.sjxks.com'
          : window.location.protocol + '//' + window.location.host
    };
  },
  props: {
    config: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  watch: {
    config: {
      handler() {
        this.pictureList = this.config.data;
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {
    if (this.config.data && this.config.data.length) {
      this.pictureList = this.config.data;
      this.$emit('changeValue', 'box', 'cardNum', this.config.data.length);
    } else {
      this.pictureList = [];
      this.initPicList();
    }
  },
  methods: {
    //初始化图片位
    initPicList() {
      for (let i = 0; i < this.config.box.cardNum; i++) {
        this.pictureList.push({
          rowid: i + new Date().getTime(),
          name: '',
          desc: '',
          photo: []
        });
      }
      this.$emit(
        'changeSize',
        'data',
        JSON.parse(JSON.stringify(this.pictureList))
      );
    },
    //图片位改变时，生成数组占位
    cardInputChange(currentValue, oldValue) {
      if (currentValue > oldValue) {
        this.pictureList.push({
          rowid: new Date().getTime(),
          name: '',
          desc: '',
          photo: []
        });
      } else {
        this.currentPic = this.pictureList[currentValue - 1].rowid;
        this.selectChange();
        this.pictureList.pop();
      }
      this.$emit(
        'changeSize',
        'data',
        JSON.parse(JSON.stringify(this.pictureList))
      );
    },
    beforeUpload(res) {
      if (!this.currentPic) {
        this.$message.warning('请先选择图片位！');
        return;
      }
      let that = this;
      let index = this.pictureList.findIndex(
        (item) => item.rowid === this.currentPic
      );
      var reader = new FileReader();
      reader.readAsDataURL(res);
      reader.onload = function () {
        that.pictureList[index].photo.push(reader.result);
        that.$emit(
          'changeSize',
          'data',
          JSON.parse(JSON.stringify(that.pictureList))
        );
      };
    },
    changePic(el) {
      let Index = this.pictureList.findIndex(
        (item) => item.rowid === this.currentPic
      );
      this.pictureList.forEach((item, index) => {
        if (index === Index) {
          item.url = el.url;
        }
      });
      this.$emit('changeSize', 'data', this.pictureList);
    },
    delPic(item, index) {
      this.photoList.splice(index, 1);
      let i = this.pictureList.findIndex(
        (item) => item.rowid === this.currentPic
      );
      this.pictureList[i].photo = this.photoList;
      this.$emit('changeSize', 'data', this.pictureList);
    },
    editPic(file, index) {
      console.log(file, index);
      let that = this;
      let i = this.pictureList.findIndex(
        (item) => item.rowid === this.currentPic
      );
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        that.pictureList[i].photo[index] = reader.result;
        that.$emit(
          'changeSize',
          'data',
          JSON.parse(JSON.stringify(that.pictureList))
        );
        that.$forceUpdate();
      };
    },
    selectChange() {
      let index = this.pictureList.findIndex(
        (item) => item.rowid === this.currentPic
      );
      this.name = this.pictureList[index].name;
      this.desc = this.pictureList[index].desc;
      this.photoList = this.pictureList[index].photo;
    },
    contentChange() {
      let index = this.pictureList.findIndex(
        (item) => item.rowid === this.currentPic
      );
      this.pictureList[index].name = this.name;
      this.pictureList[index].desc = this.desc;
      this.$emit('changeSize', 'data', this.pictureList);
      this.$forceUpdate();
    }
  }
};
</script>
  
  <style lang="scss" >
.right-setting {
  .custom-title {
    width: 250px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: default;

    i {
      cursor: pointer;
    }
  }
  .componentName {
    display: flex;
    align-items: center;

    .el-input {
      flex: 1;
    }

    > span:nth-of-type(1) {
      width: 20px;
      height: 20px;
      background-size: 100% 100%;
      background-image: url('../../../../../../assets/image/jiesuo.png');
      cursor: pointer;

      &.active {
        background-image: url('../../../../../../assets/image/suoding.png');
      }
    }

    > span:nth-of-type(2) {
      width: 20px;
      height: 20px;
      background-size: 100% 100%;
      background-image: url('../../../../../../assets/image/yanjing_yincang.png');
      cursor: pointer;

      &.active {
        background-image: url('../../../../../../assets/image/yanjing_xianshi.png');
      }
    }
  }

  .el-form-item__label {
    font-family: MicrosoftYaHei;
    font-size: 14px;
    font-weight: normal;
    letter-spacing: 0em;
    color: #ffffff;
  }

  .el-input__inner {
    background-color: #191a1a;
    color: #ffffff;
    border: none;
  }

  .el-collapse {
    border: none;

    .el-collapse-item__header {
      background-color: #25262a;
      color: #ffffff;
      border: none;
    }

    .el-collapse-item__content {
      padding-bottom: 0;
    }

    .el-collapse-item__wrap {
      background: #1c1c1f;
      border: none;
      padding: 10px;
      box-sizing: border-box;

      .el-input__inner {
        background-color: #25262a;
        color: #ffffff;
        border: none;
      }
    }

    .icon {
      align-items: center;

      span {
        width: 20px;
        margin: 0 5px;
      }

      .el-input {
        flex: 1;
      }
    }

    .fontStyle {
      display: flex;
      justify-content: center;
      color: #fff;
      font-size: 12px;

      .block {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 40px;
      }
    }
  }

  .el-upload-list {
    display: none;
  }

  .currentPic {
    margin-bottom: 20px;
    width: 100%;
  }

  .img-bock {
    display: inline-block;
    font-size: 0;
    margin-right: 10px;
    position: relative;

    &:nth-child(3n) {
      margin-right: 0;
    }

    img {
      width: 50px;
      height: 50px;
    }

    i {
      color: red;
      width: 20px;
      height: 20px;
      z-index: 1;
      font-size: 16px;
    }

    .el-icon-delete {
      position: absolute;
      right: 0;
      top: 5px;
    }

    .el-icon-edit {
      position: absolute;
      right: 20px;
      top: 5px;
    }
  }

  .el-form-item {
    .el-icon-plus.avatar-uploader-icon {
      color: #fff;
      font-size: 50px;
    }

    .el-form-item__content {
      flex-wrap: wrap;
    }
  }
}
</style>
  