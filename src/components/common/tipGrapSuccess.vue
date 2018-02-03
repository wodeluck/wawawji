<template>
  <div>
    <x-dialog v-model="showHideOnClickSuccess" class="dialog-demo" hide-on-blur>
      <div class="img-box">
        <img src="../../images/grapSuccess.png" style="max-width:100%">
      </div>
      <div class="bottomBtn">
        <div class="btnShare" @click="wxmask=true;showHideOnClickSuccess=false;">分享</div>
        <div class="playAgain" @click="againGame">再玩一局{{timeOut}}s</div>
      </div>
      <div class="moreInfo">
        您可到“我的娃娃”页面查看你抓到的娃娃
      </div>
      <div class="closeIcon" @click="closeMask"></div>
    </x-dialog>
    <wxshare class="nonebg showT" :show-hide-on-click="wxmask"></wxshare>
  </div>
</template>

<script>
  import XDialog from "vux/src/components/x-dialog/index";
  import {mapState} from 'vuex';
  import {roomGameCancel} from '../../service/getData';
  import wxshare from '../../components/common/wxshare';
  export default {
    components: {
      XDialog,
      wxshare,
    },
    data() {
      return {
        timeOut:5,
        showHideOnClickSuccess:false,
        wxmask: false,//分享遮罩
      }
    },
    mounted() {

    },
    methods: {
      closeMask(){
        this.showHideOnClickFail = false;
        this.$emit('listenToChildAgainGame', [false, false]);
      },
      againGame() {
        if(this.timeOut>=0){
          roomGameCancel(this.roomId).then(res=>{
            if(res.code==1){
              this.$emit('listenToChildAgainGame', [true, true]);
              this.showHideOnClickSuccess = false;
            }
          });
        }
      },
      begainTime(){
        let st=setInterval(function () {
          if(this.timeOut==0){
            clearInterval(st);
            roomGameCancel(this.roomId).then(res=>{
              console.log(res);
            })
          }else{
            this.timeOut--;
          }
        }.bind(this),1000);
      }
    },
    props: ['showHideOnClick'],
    watch:{
      timeOut:function () {
        if(this.timeOut==0){
          this.showHideOnClickSuccess = false;
          this.$emit('listenToChildAgainGame', [false, false]);
        }
      },
      showHideOnClick:function () {
        this.showHideOnClickSuccess=this.showHideOnClick;
        if(this.showHideOnClickSuccess){
          this.begainTime();
          this.timeOut=5;
        }
      }
    },
    computed:{
      ...mapState([
        'roomId'
      ])
    }
  }
</script>

<style lang="scss">
  @import '../../style/mixin';

  .bottomBtn {
    display: flex;
    justify-content: space-between;
    @include px2rem(margin-top, 34);
  }

  .btnShare {
    @include px2rem(width, 278);
    @include px2rem(height, 108);
    @include px2rem(line-height, 108);
    display: inline-block;
    background: transparent url("../../images/btn_01@2x.png") no-repeat center/contain;
    color: white;
    @include font-dpr(16px);
  }

  .playAgain {
    @include px2rem(width, 278);
    @include px2rem(height, 108);
    @include px2rem(line-height, 108);
    color: white;
    display: inline-block;
    background: transparent url("../../images/btn_again@2x.png") no-repeat center/contain;
    @include font-dpr(16px);
  }

  .moreInfo {
    color: white;
    @include font-dpr(14px);
    @include px2rem(margin-top, 32);
  }
  .nonebg{
    .weui-dialog {
      background-color: transparent !important;
    }
  }

  .showT{
    .weui-dialog {
      top: 25%;
      left: 65%;
    }
  }
</style>
