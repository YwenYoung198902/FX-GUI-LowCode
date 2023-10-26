<template>
  <div class="earth-wrap">
    <div class="earth-silder">
      <div class="earth-list">
        <div
          class="earth-item"
          @click="changeScene(item, index)"
          v-for="(item, index) in sceneList"
          :key="item.rowid"
        >
          <div
            class="earth-item_img"
            :class="{ active: currectId === item.rowid }"
          >
            <div class="earth-item_btn" @click="delScene($event, item)">
              <img
                :src="require('../../assets/image/del_sence.png')"
                alt=""
                srcset=""
              />
            </div>
            <img
              :src="
                item.scene_snapshot && (JSON.parse(item.scene_snapshot).length > 0)
                  ? JSON.parse(item.scene_snapshot)[0].DownloadUrl
                  : require('../../assets/image/cockpit_default.png')
              "
              alt=""
            />
          </div>
          <div class="earth-item_title">{{ item.name }}</div>
        </div>
      </div>
      <div class="add-btn">
        <el-button
          @click="isShowAddSceneDialog = true"
          type="primary"
          icon="el-icon-plus"
          size="mini"
          >新增场景</el-button
        >
      </div>
    </div>

    <div class="earth-content">
      <div ref="earthContainer" id="earthContainer"></div>
    </div>

    <el-dialog
      title="新增场景"
      width="300"
      :visible.sync="isShowAddSceneDialog"
    >
      <el-form :model="form" :rules="rules" ref="ruleForm" label-position="top">
        <el-form-item label="场景名称" prop="title">
          <el-input
            size="mini"
            v-model="form.title"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="submitForm('ruleForm')"
            >确 定</el-button
          >
          <el-button size="mini" @click="isShowAddSceneDialog = false"
            >取 消</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
  
  <script>
import "./index.scss";
import { getRowDetail, addRow, getFilterRows, delRow } from "@/utils/api";
import { appKey, sign } from "@/utils/const.js";
import { guid } from "@/utils/index";
export default {
  name: "Earth",
  components: {},
  data() {
    return {
      message: "页面加载于 " + new Date().toLocaleString(),
      _earth: undefined, // 注意：Earth和Cesium的相关变量放在vue中，必须使用下划线作为前缀！
      _bgImagery: undefined,
      sceneList: [],
      isShowAddSceneDialog: false,
      currectId: -1,
      rules: {
        title: [{ required: true, message: "请输入场景名称", trigger: "blur" }],
      },
      form: {
        title: "",
      },
    };
  },
  mounted() {
    let cloneXbsjEarthUI = null;
    if (this.$store.state.XbsjEarthUI) {
      cloneXbsjEarthUI = this.$lodash.cloneDeep(this.$store.state.XbsjEarthUI);
    } else {
      this.$store.commit("SET_XBSJEARTHUI", XbsjEarthUI);
      cloneXbsjEarthUI = XbsjEarthUI;
    }

    cloneXbsjEarthUI.create("earthContainer").then(async (earthUI) => {
      console.log("XE:::::::::::", XE, earthUI);
      this._earth = earthUI;
      // 设置earth导航
      this._earth._mainbar.mainBarList = [
        "navigate",
        "view",
        "imagery",
        "model",
        "terrain",
        "analysis",
        "effect",
        "entity",
        "other",
        "extend",
      ];

      this.laodData();
      // const rowId = sessionStorage.getItem("rowid");
      // await this._earth.labScene.loadScene(rowId);
    });
  },
  beforeDestroy() {
    this._earth && this._earth.labScene.destroy();
  },
  computed: {},
  methods: {
    // 删除场景
    delScene(e, data) {
      e.stopPropagation();
      this.$confirm("删除场景后无法找回，是否确认删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await delRow({
            appKey: appKey,
            sign: sign,
            worksheetId: "scene",
            rowId: data.rowid,
            // rowId: sessionStorage.getItem("rowid"),
          });
          this.laodData();
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    async laodData() {
      const {
        data: { rows },
      } = await getFilterRows({
        appKey: appKey,
        sign: sign,
        worksheetId: "scene",
        // rowId: sessionStorage.getItem("rowid"),
      });
      // if (scene_json) {
      this.sceneList = rows;
      rows[0] && this.changeScene(rows[0]);
      // this.currectId = rows[0] && rows[0].rowid
      // }

      console.log("this.sceneList:::::::", this.sceneList);
    },
    // 选择场景
    changeScene(data, index) {
      this.currectId = data.rowid;
      sessionStorage.setItem("sceneid", data.rowid);
      //解析场景内容
      var jc = data.scene_json
        ? JSON.parse(data.scene_json)
        : {
            sceneTree: {
              root: {
                children: [],
              },
            },
            cameraViewManager: {
              globe: {
                position: [
                  2.1031217486531677, 0.5042461979915104, 22191651.019924622,
                ],
                rotation: [0, -1.5704894508531937, 0],
                near: 0.1,
                far: 10000000000,
              },
              china: {
                position: [
                  1.8770894704964525, 0.662547523843314, 8511735.797037361,
                ],
                rotation: [0, -1.5701114159178209, 0],
                near: 0.1,
                far: 10000000000,
              },
              lastView: {
                position: [
                  1.3473465131986337, 0.9717354586405952, 12708692.488181122,
                ],
                rotation: [6.283185307179576, -1.570783974496222, 0],
                fov: 1.0471975511965976,
                near: 0.1,
                far: 10000000000,
              },
            },
            cameraFlight: {
              xbsjType: "CameraFlight",
              xbsjGuid: "aa72ded1-e4b4-4535-9a23-4fe88c1072ee",
              rotateGlobe: {
                xbsjType: "RotateGlobe",
                xbsjGuid: "4b574de4-fa2a-455b-a0de-46139c09b925",
                latitude: 0.6632251157578453,
              },
              rotateCenter: {
                xbsjType: "RotateCenter",
                xbsjGuid: "4e8a8cca-70ba-4aa6-bf88-d48423435ee8",
                pitch: -0.5235987755982988,
              },
              track: {
                xbsjType: "CameraTrack",
                xbsjGuid: "8201a249-e53b-4869-bd59-1d079ea69351",
              },
            },
            weather: {
              fog: {},
              sun: {},
              skyBox: {},
              moon: {},
              rain: {},
              snow: {},
              cloud: {},
              atmosphere: {},
              rainPostProcess: {},
              snowPostProcess: {},
              fogPostProcess: {},
            },
            terrainEffect: {
              elevation: {
                xbsjType: "ElevationRamp",
                xbsjGuid: "5a90a913-d28c-41f6-834e-310b8eaad681",
              },
              slope: {
                xbsjType: "SlopeRamp",
                xbsjGuid: "5024412d-6990-43c1-9be4-13b79844a1ea",
              },
              aspect: {
                xbsjType: "AspectRamp",
                xbsjGuid: "90264789-a47b-41db-88e0-6c123c91e361",
              },
              contour: {},
              restrict: {},
              globeTranslucency: {},
            },
            postProcess: {
              xbsjType: "PostProcess",
              xbsjGuid: "075cb105-bc75-4ae3-b05e-e699257ff03e",
              ambientOcclusion: {
                xbsjType: "AmbientOcclusionStage",
                xbsjGuid: "51fff25f-5bfc-4f2a-a72c-f6185ad7c37f",
              },
              bloom: {
                xbsjType: "BloomStage",
                xbsjGuid: "98ef1463-a459-40ae-8520-06993a3f0537",
              },
              blackAndWhite: {
                xbsjType: "BlackAndWhiteStage",
                xbsjGuid: "ac2de187-d2fe-444c-abf5-77e31888fd8c",
              },
              brightness: {
                xbsjType: "BrightnessStage",
                xbsjGuid: "06e5ba06-e6e4-4f44-94cf-c5a4e6b66f8b",
              },
              depthOfField: {
                xbsjType: "DepthOfFieldStage",
                xbsjGuid: "829bf23a-5fb6-448e-a58f-5d0693c84463",
              },
              lensFlare: {
                xbsjType: "LensFlareStage",
                xbsjGuid: "62e1e4eb-7d19-44e7-83e2-eee382130b1b",
              },
              mosaic: {
                xbsjType: "MosaicStage",
                xbsjGuid: "6248a0da-3013-4d8c-b811-9305748a45ed",
              },
              nightVision: {
                xbsjType: "NightVisionStage",
                xbsjGuid: "97a1432f-4b86-4b6b-92da-b7d03431fa5e",
              },
              silhouette: {
                xbsjType: "XbsSilhouetteStage",
                xbsjGuid: "120c28bd-e451-48df-a753-289118f86f89",
              },
            },
            effect: {
              xbsjType: "Effect",
              xbsjGuid: "5e8ef13c-4199-46c2-bddd-48d6bf573834",
              shadow: {
                xbsjType: "Shadow",
                xbsjGuid: "c7820b61-6019-43a8-96fd-a28badd193b0",
              },
              forceSunPos: {
                position: [2.0245819323134224, 0.6981317007977318, 10000000],
              },
            },
            camera: {},
            interaction: { picking: {} },
            ionDefaultAccessToken: "",
          };
      console.log("jc:::::::::::::::::::", jc);
      this._earth.earth.xbsjFromJSON(jc);
    },
    async addScene(name) {
      const result = await addRow({
        appKey: appKey,
        sign: sign,
        worksheetId: "scene",
        controls: [
          {
            controlId: "name",
            value: name,
          },
        ],
      });
      return result;
    },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const { title } = this.form;
          const { success } = await this.addScene(title);
          // this.sceneList.push({
          //   id: guid(),
          //   title,
          //   content: '',
          if (success) {
            this.laodData();
            this.$message.success("创建成功");
          } else {
            this.$message.error("创建失败");
          }
          this.isShowAddSceneDialog = false;
          // })
          console.log("this.form::::::::::::", this.form, result);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
  <style >
</style>
  