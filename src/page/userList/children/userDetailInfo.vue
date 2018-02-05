<template>
  <div>
    <head-top :head-title="headTitle" back-color="86d8ff">
      <section class="goBack" slot="head_l" @click="$router.go(-1)"></section>
      <section slot="head_r">
      </section>
    </head-top>
    <div class="userDetailInfo">
      <div class="infoT">
        <div class="l">
          <div class="avatorWrap">
            <img :src="userDetailInfo.avatar"/>
            <span :class="{sexman:userDetailInfo.sex==1,sexwuman:userDetailInfo.sex==2}"></span>
          </div>
          <div class="userName">
            <span>{{userDetailInfo.user_nicename}}</span>
            <span>ID:{{userDetailInfo.user_id}}</span>
          </div>
        </div>
        <div class="r">
          <div class="rl">
            <span>抓中{{userDetailInfo.total}}次</span>
            <span>转赠{{userDetailInfo.ztotal}}个</span>
            <span>获赠{{userDetailInfo.gtotal}}个</span>
          </div>
          <div class="rr" @click="donation">送TA娃娃</div>
        </div>
      </div>
      <div class="wawaList">
        <ul>
          <li v-for="(item,index) in wawaList" :key="index">
            <div class="wrap">
              <img :src="item.gifticon"/>
              <span v-show="item.is_receive>=1" :class="{zengsong:item.is_receive>=1}"></span>
            </div>
            <div class="wawaInfo">
              <span>{{item.giftname}}</span>
              <span>{{new Date(parseInt(item.ctime)*1000).toLocaleString()}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <gift-wawa v-on:listenToReset="listenToReset" :show-hide-on-click-fail2="showHideOnClickFail" v-on:listenToDonationSuccess="listenToDonationSuccess" :user-avatar="userAvatar" :user-nick-name="userNickName" :user-id="userId"></gift-wawa>
    <donation-success v-on:listenToReset2="listenToReset2" class="nonebg" :show-donation-success="showDonationSuccess"></donation-success>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import {audienceDetail,my_wawas} from '../../../service/getData';
  import headTop from '../../../components/header/head';
  import giftWawa from '../../../components/common/giftWawa';
  import donationSuccess from '../../../components/common/donationSuccess';
  import { dateFormat } from 'vux'

  export default {
    data() {
      return {
        headTitle: '用户资料',
        userDetailInfo:'',
        wawaList:'',
        userAvatar:'',
        userNickName:'',
        userId:'',
        showDonationSuccess:false,
        showHideOnClickFail:false,
      }
    },
    components: {
      donationSuccess,
      headTop,
      giftWawa,
    },
    props: [],
    methods: {
      listenToReset(){
        this.showHideOnClickFail=false;
      },
      listenToReset2(){
        this.showDonationSuccess=false;
      },
      initData() {
        audienceDetail(this.$route.query.uid).then(res => {
          if(res && res.code==1){
            this.userDetailInfo = res.data;
            this.userAvatar=res.data.avatar;
            this.userNickName=res.data.user_nicename;
            this.userId=res.data.user_id;
          }
        });

        my_wawas().then(res=>{
          if(res && res.code==1){
            if(res.data){
              this.wawaList=res.data;
            }
          }
        })
      },
      listenToDonationSuccess(data){
        if(data[0]){
          this.showDonationSuccess=true;
        }
      },
      donation(){
        this.showHideOnClickFail=true;
      }
    },
    computed: {
      ...mapState([
        'userInfo'
      ])
    },
    mounted() {
      this.initData();
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../style/mixin';

  .goBack {
    display: inline-block;
    @include px2rem(height, 30);
    @include px2rem(width, 30);
    background: transparent url("../../../images/arrowback.png") no-repeat center/cover;
  }
  .sexman{
    background: transparent url("../../../images/ic_man@2x.png") no-repeat center/contain;
  }

  .sexwuman{
    background: transparent url("../../../images/ic_lady@2x.png") no-repeat center/contain;
  }

  .wrap{
    position: relative;
  }
  .zengsong{
    background: transparent url("../../../images/ic_give@2x.png") no-repeat center/contain;
    @include px2rem(height,36);
    @include px2rem(width,36);
    position: absolute;
    @include px2rem(bottom,15);
    @include px2rem(left,15);
  }

  .userDetailInfo{
    margin-top: 1.2rem;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: white;
  }

  .infoT{
    @include px2rem(height,182);
    display: flex;
    background: transparent url("../../../images/bg_04@2x.png") no-repeat center/cover;
    align-items: center;
    text-align: center;
    .l{
      flex: 1;
      .avatorWrap{
        position: relative;
        display: inline-block;
        font-size: 0;
        img{
          @include px2rem(height,110);
          @include px2rem(width,110);
          border-radius: 50%;
        }
        span{
          @include px2rem(height,30);
          display: inline-block;
          @include px2rem(width,30);
          border-radius: 50%;
          position: absolute;
          right: 0;
          bottom: 0;
          @include font-dpr(13px);
          color: #333;
          font-weight: 600;
        }
      }
      .userName{
        display: inline-block;
        vertical-align: 110%;
        span{
          display: block;
        }
      }
    }
    .r{
      flex: 1;
      .rl{
        display: inline-block;
        span{
          @include font-dpr(13px);
          display: block;
          &:nth-child(2){
            @include px2rem(margin,10 0);
          }
        }
      }
      .rr{
        display: inline-block;
        vertical-align: 100%;
        background-color: #95ddff;
        @include px2rem(padding,5 10);
        color: white;
        @include font-dpr(13px);
        border-radius: 10px;
      }
    }
  }

  .wawaList{
    ul{
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      @include px2rem(padding,24 10);
    }
    li{
      width: 50%;
      img{
        width: 100%;
        border: 1px solid #f2f2f2;
      }
      &:nth-child(odd){
        @include px2rem(padding-right,10);
      }
      &:nth-child(even){
        @include px2rem(padding-left,10);
      }
      &:nth-child(n+3){
        @include px2rem(margin-top,47);
      }
    }
  }

  .wawaInfo{
    @include px2rem(margin-top,10);
    span{
      display: block;
      &:nth-child(1){
        @include font-dpr(14px);
        font-weight: bold;
      }
    }
  }
</style>
