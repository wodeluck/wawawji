<template>
  <div>
    <head-top :head-title="headTitle" back-color="86d8ff">
      <section slot="head_l">
        <router-link class="linkToCenter" :to="{path:'/personal_center',query:{}}"></router-link>
      </section>
      <section slot="head_r">
        <router-link class="" :to="{path:'/#',query:{}}"></router-link>
      </section>
    </head-top>
    <nav class="msite_nav mt82">
      <div class="swiper-container" v-if="bannerList.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide banner_list_container" v-for="(item, index) in bannerList" :key="index">
            <router-link v-if="item.slide_content && !item.slide_url" :to="{path: '/showConFromBanner',query:{_index:index}}" class="link_to_content">
              <figure>
                <img :src="item.slide_pic">
              </figure>
            </router-link>
            <a v-else-if="item.slide_url" :href="item.slide_url" class="link_to_content">
              <figure>
                <img :src="item.slide_pic">
              </figure>
            </a>
            <router-link v-else :to="{path: '/#'}" class="link_to_content">
              <figure>
                <img :src="item.slide_pic">
              </figure>
            </router-link>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
      <img src="../../images/fl.svg" class="fl_back animation_opactiy" v-else>
    </nav>
    <div class="marquee">
      <marquee>
        <marquee-item class="marqueeItem" v-scroll="onScroll" v-for="(item,index) in newsList" :key="index">
          <img :src="item.avatar_thumb"/>
          <span>{{item.user}}</span>
          <span>{{item.desc}}</span>
        </marquee-item>
      </marquee>
    </div>
    <div class="roomList">
      <flexbox :gutter="0" wrap="wrap">
        <flexbox-item :span="1/2" v-for="(item,index) in wawaRoomList" :key="index" class="wawaItem">
          <router-link v-if="item.status==0 || item.status==3" :to="{path:'/room',query:{roomId:item.room_id}}" class="wawaLink">
            <img :src="item.gifticon">
            <div class="wawaStatus">
              <span v-if="item.status==0" class="s1">在线</span>
              <span v-else-if="item.status==1" class="s2">补货中</span>
              <span v-else-if="item.status==2" class="s3">维修中</span>
              <span v-else-if="item.status==3" class="s4">游戏中</span>
              <span v-else class="s5">离线</span>
            </div>
            <div class="wawaName">
              <span>{{item.giftname}}</span>
            </div>
            <div class="wawaTargetStatus">
              <span>{{item.spendcoin}}币/次</span>
              <span>排队{{item.wait_nums}}</span>
            </div>
          </router-link>
          <router-link v-else :to="{path:'/#',query:{}}" class="wawaLink">
            <img :src="item.gifticon">
            <div class="wawaStatus">
              <span v-if="item.status==0" class="s1">在线</span>
              <span v-else-if="item.status==1" class="s2">补货中</span>
              <span v-else-if="item.status==2" class="s3">维修中</span>
              <span v-else-if="item.status==3" class="s4">游戏中</span>
              <span v-else class="s5">离线</span>
            </div>
            <div class="wawaName">
              <span>{{item.giftname}}</span>
            </div>
            <div class="wawaTargetStatus">
              <span>{{item.spendcoin}}币/次</span>
              <span>排队{{item.wait_nums}}</span>
            </div>
          </router-link>
        </flexbox-item>
      </flexbox>
    </div>
    <div>{{errorCode}}</div>
  </div>
</template>
<script>
  import headTop from '../../components/header/head';
  import {Flexbox, FlexboxItem} from 'vux';
  import {wawaList, wawaBanner, getNewNotice} from '../../service/getData';
  import 'src/plugins/swiper.min.js';
  import 'src/style/swiper.min.css';
  import {mapMutations, mapState} from 'vuex';
  import Marquee from "vux/src/components/marquee/marquee";
  import MarqueeItem from "vux/src/components/marquee/marquee-item";
  import {setStore,delCookie,removeStore} from "../../config/mUtils";

  export default {
    data() {
      return {
        wawaRoomList: [],
        bannerList: [],
        headTitle: '娃娃机',
        newsList: '',
      }
    },
    mounted() {
      this.initData();
    },
    async beforeMount() {
      this.SAVE_TOKEN('df2bf05112653a8acdd7b8c8b19a5e31');
    },
    components: {
      MarqueeItem,
      Marquee,
      headTop,
      Flexbox,
      FlexboxItem,
    },

    computed: {
      ...mapState([
        'errorCode'
      ])
    },

    methods: {
      ...mapMutations([
        'SAVE_TOKEN', 'REQUEST_ERROR'
      ]),
      async initData() {
        await wawaList().then(res => {
          if (res.code == 1) {
            this.wawaRoomList = res.data;
          }else{
            delCookie('code');
            delCookie('token');
            removeStore('userInfo');
            window.location.reload();
          }
        });
        await  wawaBanner().then(res => {
          this.bannerList = res.data.slide;
          setStore('bannerList',JSON.stringify(res.data.slide))
        }).then(() => {
          new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            loop: true
          });
        });
        await getNewNotice().then(res => {
          if (res.code == 1) {
            this.newsList = res.data;
          }
          console.log(res);
        })
      },
      onScroll: function (e, position) {
        console.log(position);
      }
    }
  }

</script>

<style lang="scss" scoped>
  @import '../../style/mixin';

  html, body {
    height: 100%;
    overflow-x: hidden;
    background-color: #eefaff;
  }

  .roomList {
    @include px2rem(padding, 10);
  }

  .wawaItem {
    height: auto;
    @include px2rem(width, 336);
    &:nth-child(n+3) {
      @include px2rem(margin-top, 10);
    }
    &:nth-child(odd) {
      .wawaLink {
        @include px2rem(margin-right, 5);
      }
    }
    &:nth-child(even) {
      .wawaLink {
        @include px2rem(margin-left, 5);
      }
    }
  }

  .wawaLink {
    background-color: white;
    display: block;
    border: 1px solid #e5e5e5;
    font-size: 0;
    img {
      max-width: 100%;
    }
  }

  .wawaStatus {
    border-bottom: 1px solid #e5e5e5;
    @include px2rem(padding, 10 0);
    @include px2rem(margin, 0 10);
    margin: 0 10px;
    font-size: 0;
    span {
      display: inline-block;
      @include font-dpr(13px);
      &.s1 {
        color: #b5ed49;
      }
      &.s2 {
        color: #ff9900;
      }
      &.s3 {
        color: #adadac;
      }
      &.s4 {
        color: #ff847d;
      }
      &.s5 {
        color: #ed1d09;
      }
      &:before {
        @include px2rem(margin-right, 10);
        content: '';
        display: inline-block;
        @include px2rem(height, 10);
        @include px2rem(width, 10);
        border-radius: 50%;
        background-color: currentColor;
      }
    }
  }

  .wawaName {
    @include font-dpr(14px);
    @include px2rem(padding, 10);
    span {
      color: #333;
    }
  }

  .wawaTargetStatus {
    @include px2rem(padding, 0 10 10);
    @include font-dpr(13px);
    display: flex;
    span {
      flex: 1;
      &:nth-child(1) {
        color: #ffcc00;
      }
      &:nth-child(2) {
        text-align: right;
        color: #999999;
      }
    }
  }

  .banner_list_container {
    img {
      @include px2rem(max-height, 313);
      width: 100%;
    }
  }

  .user_setting {
    @include px2rem(height, 32);
    @include px2rem(width, 32);
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }

  .settingWrap {
    display: inline-block;
    @include px2rem(height, 62);
    @include px2rem(width, 62);
    background-color: white;
    border-radius: 50%;
    position: relative;
  }

  .linkToCenter {
    @include px2rem(height, 62);
    @include px2rem(width, 62);
    background: transparent url("../../images/linkToCenter.png") no-repeat center/cover;
    display: inline-block;
  }

  .linkToSetting {
    display: inline-block;
    @include px2rem(height, 62);
    @include px2rem(width, 62);
    background: transparent url("../../images/linkToSetting.png") no-repeat center/cover;
  }

  .marqueeItem {
    text-align: center;
    img {
      height: 21px;
      width: 21px;
      border-radius: 50%;
      border: 1px solid #fff;
    }
    span {
      display: inline-block;
      vertical-align: super;
      color: white;
    }
  }

  .marquee {
    @include px2rem(padding, 10 0 15 0);
    background: #86d8ff url("../../images/marquee.png") no-repeat center bottom/contain;
  }
</style>
