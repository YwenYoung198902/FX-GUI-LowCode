<template>
  <div class="business-info">
    <div class="close" @click="close" />
    <div class="main-box">
      <div class="title-box">
        <div class="business">
          {{ businessDetail.business }}
        </div>
        <div class="check-button" @click="checkDetail">
          查看详情
        </div>
      </div>
      <div class="main">
        <div class="data-box">
          <div class="content-box">
            <div class="txt">
              法人:
            </div>
            <div class="content txt-ellipsis">
              {{ businessDetail.representative }}
            </div>
          </div>
          <div class="content-box">
            <div class="txt">
              企业规模:
            </div>
            <div class="content txt-ellipsis">
              {{ businessDetail.business_scale }}
            </div>
          </div>
          <div class="content-box">
            <div class="txt">
              纳税人类型:
            </div>
            <div class="content txt-ellipsis">
              {{ businessDetail.taxpayer_type }}
            </div>
          </div>
          <div class="content-box">
            <div class="txt">
              登记机关:
            </div>
            <div class="content txt-ellipsis">
              {{ businessDetail.registration_authority }}
            </div>
          </div>
        </div>
        <div class="data-box">
          <div class="content-box">
            <div class="txt">
              企业行业名称:
            </div>
            <div class="content txt-ellipsis">
              {{ businessDetail.industry }}
            </div>
          </div>
          <div class="content-box">
            <div class="txt">
              企业性质:
            </div>
            <div class="content txt-ellipsis">
              {{ businessDetail.business_type }}
            </div>
          </div>
          <div class="content-box">
            <div class="txt">
              企业类型:
            </div>
            <div class="content txt-ellipsis">
              {{ businessDetail.business_class }}
            </div>
          </div>
          <div class="content-box">
            <div class="txt">
              所属地块:
            </div>
            <div class="content txt-ellipsis">
              {{ businessDetail.massif }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  props: ['id'],
  data() {
    return {
      businessDetail: {},
      isShow:false
    };
  },
  watch: {
    id() {
      this.getIndustrialDetail();
    }
  },
  mounted() {
    this.getIndustrialDetail();
  },
  methods: {
    getIndustrialDetail() {
      this.$xksapi.getBusinessInfo({ rowid: this.id }).then((res) => {
        this.businessDetail = res.data;
      });
    },
    checkDetail() {
      this.$store.commit('setBusinessDetail', this.businessDetail);
      
      this.$store.commit('setPopupName', 'messageDetail');
    },
    close() {
      AMap.DInfoShow.currentInfoWindow && AMap.DInfoShow.closeInfoWindow();
    }
  }
};
</script>

<style lang="scss">
.business-info {
  width: 404px;
  height: 335px;
  background-image: url(../../../assets/img/sheshanIndustry/common/info_bg.png);
  background-size: 100% 100%;
  position: relative;
  .close{
    width: 24px;
    height: 24px;
    background-image: url(../../../assets/img/sheshanIndustry/common/close.png);
    position: absolute;
    right:-8px;
    top:-8px;
    cursor: pointer;
  }
  .main-box{
    padding:20px 16px 20px 80px;
    .title-box{
      width: 100%;
      height: 34px;
      line-height: 34px;
      box-sizing: border-box;
      background: #0E263F;
      border: 1px solid ;
      border-image: linear-gradient(90deg, rgba(33,163,255,0.30) 0%, rgba(33,163,255,0.00) 100%) 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .business{
        background: url(../../../assets/img/sheshanIndustry/common/icon1.png) no-repeat left bottom;
        padding-left:40px;
      }
      .check-button{
        width: 64px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        box-sizing: border-box;
        border: 1px solid #21A3FF;
        color: #21A3FF;
        margin-right:9px;
        cursor: pointer;
      }
    }
    .data-box{
      margin-top:15px;
      .content-box{
        display: flex;
        height:26px;
        line-height: 26px;
        margin-top:4px;
        .txt{
          width: 100px;
          background: rgba(33, 163, 255, 0.05);
          box-sizing: border-box;
          border: 1px solid rgba(33, 163, 255, 0.1);
          padding:0 6px;
        }
        .content{
          margin-left:4px;
          padding:0 10px;
          flex:1;
          background: rgba(33, 163, 255, 0.08);
          box-sizing: border-box;
          border: 1px solid rgba(33, 163, 255, 0.3);
        }
      }
      .content-box:first-child{
        margin-top:0;
      }
    }
  }
}
</style>
