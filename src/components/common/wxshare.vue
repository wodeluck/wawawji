<template>
  <div>
    <x-dialog v-model="showHideOnClickFail" @on-hide="this.showHideOnClickFail=false" hide-on-blur>
      <div class="img-box">
        <img src="../../images/wxshare.png" style="max-width:50%">
      </div>
    </x-dialog>
  </div>
</template>

<script>
  import XDialog from "vux/src/components/x-dialog/index";
  import {getTicket} from '../../service/getData';
  const crypto = require('crypto');
  let wx = require('weixin-js-sdk');
  export default {
    components: {
      XDialog,
    },
    data() {
      return {
        timeOut:5,
        showHideOnClickFail:false,
      }
    },
    mounted() {

    },
    created(){
      getTicket().then(res => {
        console.log(res);
        if (res && res.code == 1) {
          let timestamp = (new Date().getTime() / 1000).toFixed(0);
          let nonceStr = Math.random().toString(36).substr(2);
          let ticket = this.wx_js(res.data, timestamp, nonceStr);
          console.log('ticket'+ticket);
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端//alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: 'wxc72b57ad73571b5c', // 必填，公众号的唯一标识
            timestamp: timestamp, // 必填，生成签名的时间戳
            nonceStr: nonceStr, // 必填，生成签名的随机串
            signature: ticket,// 必填，签名，见附录1
            jsApiList: ['checkJsApi',
              'onMenuShareTimeline',
              'onMenuShareAppMessage',
              'onMenuShareQQ',
              'onMenuShareWeibo',
              'hideMenuItems',
              'showMenuItems',
              'hideAllNonBaseMenuItem',
              'showAllNonBaseMenuItem',
              'translateVoice',
              'startRecord',
              'stopRecord',
              'onRecordEnd',
              'playVoice',
              'pauseVoice',
              'stopVoice',
              'uploadVoice',
              'downloadVoice',
              'chooseImage',
              'previewImage',
              'uploadImage',
              'downloadImage',
              'getNetworkType',
              'openLocation',
              'getLocation',
              'hideOptionMenu',
              'showOptionMenu',
              'closeWindow',
              'scanQRCode',
              'chooseWXPay',
              'openProductSpecificView',
              'addCard',
              'chooseCard',
              'openCard'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });

          wx.ready(function () {
            wx.onMenuShareAppMessage({
              title: '娃娃机',
              desc: '娃娃机分享',
              link: 'http://wawa.app.xiaozhuschool.com/share/html/share.html',
              imgUrl: 'http://wawa.app.xiaozhuschool.com/default.jpg',
              trigger: function (res) {
              },
              success: function (res) {
                this.wxtask=false;
              },
              cancel: function (res) {
                this.wxtask=false;
              },
              fail: function (res) {
                console.log(JSON.stringify(res));
              }
            });
          })
        }
      })
    },
    methods: {
      wx_js(signature, timestamp, nonceStr) {
        let e = decodeURIComponent('jsapi_ticket=' + signature + '&noncestr=' + nonceStr + '&timestamp=' + timestamp + '&url=' + location.href.split("#")[0]);
        let shasum = crypto.createHash('sha1');
        shasum.update(e);
        return shasum.digest('hex');
      }
    },
    props: ['showHideOnClick'],
    watch:{
      showHideOnClick:function () {
        this.showHideOnClickFail=this.showHideOnClick;
       
      }
    },
    computed:{
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../style/mixin';

  .regainGame {
    color: white;
    @include font-dpr(15px);
    margin: auto;
    @include px2rem(width, 277);
    @include px2rem(height, 90);
    @include px2rem(line-height, 90);
    background: transparent url("../../images/btn_again1.png") no-repeat center/contain;
    @include px2rem(padding-right,10);
    span{
      display: inline-block;
      color: inherit;
    }
  }
  /*.nonebg{*/
    /*.weui-dialog {*/
      /*background-color: transparent !important;*/
      /*top: 25%;*/
      /*left: 65%;*/
    /*}*/
  /*}*/
</style>
