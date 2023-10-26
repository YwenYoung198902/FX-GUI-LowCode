import Vue from "vue";
import Vuex from "vuex";
import Cookies from "js-cookie";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawingList: [],
    XbsjEarthUI: null,
    currentConfig: {},
    currentContainterConfig: {},
    isShowLayerManagement: false,
    currentContainterConfig: {},
    operationStackList: [],
    operationStackIndex: 0,
    isClickUndoTools: false,
    isClickAdvanceTools: false,
    operationAdvanceStackList: [],
    isShowContainerMask: false,
    selectedContainerId: "",
    isEditContainer: false,
    deleteContainerChildren: {
      id: '',
      parentId: '',
    },
    canvasConfig: {
      width: 1920,
      height: 1080,
      name: "页面一",
      plugins: [],
      duration: 100,
      style: {
        opacity: 100,
        backgroundColor: "#fff",
      },
      attr: {
        src: "",
      },
    }
  },
  mutations: {
    SET_CANVASCONFIG(state, data) {
      state.canvasConfig = data;
    },
    SET_ISEDITCONTAINER(state, data) {
      state.isEditContainer = data;
    },
    SET_CONTAINTERCONFIG(state, data) {
      state.currentContainterConfig = data;
    },
    SET_XBSJEARTHUI(state, data) {
      state.XbsjEarthUI = data;
    },
    SET_DRAWING_LIST(state, data) {
      state.drawingList = data;
    },
    SET_CURRENT_CONFIG(state, data) {
      state.currentConfig = data;
    },
    SET_LAYER_MANAGEMENT(state, data) {
      state.isShowLayerManagement = data;
    },
    ADD_OPERATIONSTACKLIST(state, data) {
      state.operationStackList.unshift(data);
    },
    SET_OPERATIONSTACKLIST(state, data) {
      state.operationStackList = data;
    },
    DELETE_OPERATIONSTACKLIST(state, data) {
      // state.operationStackList.push(data);
      console.log("data::::::::::::::::::::::", data);
    },
    SET_OPERATIONSTACKINDEX(state, data) {
      state.operationStackIndex = data;
    },
    SET_isClickUndoTools(state, data) {
      state.isClickUndoTools = data;
    },
    SET_ISCLICKADVANCETOOLS(state, data) {
      state.isClickAdvanceTools = data;
    },
    ADD_OPERATIONADVANCESTACKLIST(state, data) {
      state.operationAdvanceStackList.unshift(data);
    },
    SET_ISSHOWCONTAINERMASK(state, data) {
      state.isShowContainerMask = data;
    },
    SET_SELECTEDCONTAINERID(state, data) {
      state.selectedContainerId = data;
    },
  },
  getters: {
    canvasConfig: (state) => {
      return state.canvasConfig;
    },
    isShowLayerManagement: (state) => {
      return state.isShowLayerManagement;
    },
    currentContainterConfig: (state) => {
      return state.currentContainterConfig;
    },
    getXbsjEarthUI(state) {
      return window.$lodash.cloneDeep(state.XbsjEarthUI);
    },
    drawingList: (state) => {
      return state.drawingList;
    },
    operationStackList: (state) => {
      return state.operationStackList;
    },
    operationStackIndex: (state) => {
      return state.operationStackIndex;
    },
    isClickUndoTools: (state) => {
      return state.isClickUndoTools;
    },
    operationAdvanceStackList: (state) => {
      return state.operationAdvanceStackList;
    },
    isClickAdvanceTools: (state) => {
      return state.isClickAdvanceTools;
    },
    isShowContainerMask: (state) => {
      return state.isShowContainerMask;
    },
    selectedContainerId: (state) => {
      return state.selectedContainerId;
    },
  },
  actions: {},
  modules: {},
});
