<template>
  <div>
    <div class="historyWrap">
      <head-top :head-title="headTitle" back-color="86d8ff">
        <section class="goBack" slot="head_l" @click="$router.go(-1)"></section>
        <section slot="head_r">
        </section>
      </head-top>
      <div class="historyItem" v-for="(sitem,sindex) in roomUserList" :key="sindex">
        <router-link class="linkto" :to="{path:'userList/userDetailInfo',query:{uid:sitem.user_id}}">
        <div class="itemL">
          <img :src="sitem.avatar"/>
          <span>{{sitem.user_nicename}}</span>
        </div>
        <div class="itemR">
          <span>{{new Date(parseInt(sitem.ctime)*1000).toLocaleString()}}</span>
          <span></span>
        </div>
        </router-link>
      </div>
      <div class="noneRecord" v-show="noneRecord">好像什么也没有哦...</div>
    </div>
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import {gameAudience} from '../../service/getData';
  import headTop from '../../components/header/head';
  import loading from '../../components/common/loading';

  export default {
    data() {
      return {
        headTitle: '用户列表',
        roomUserList: '',
        noneRecord:false,
      }
    },
    components: {
      headTop,
      loading,
    },
    props: [],
    methods: {
      initData() {
        gameAudience(this.roomId).then(res => {
          if(res && res.data.length>0){
            this.roomUserList = res.data;
          }else{
            this.noneRecord=true;
          }
        });
      }
    },
    computed: {
      ...mapState([
        'roomId'
      ])
    },
    mounted() {
      this.initData();
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../style/mixin';

  .goBack {
    display: inline-block;
    @include px2rem(height, 30);
    @include px2rem(width, 30);
    background: transparent url("../../images/arrowback.png") no-repeat center/cover;
  }

  .linkto {
    display: flex;
    justify-content: space-between;
    align-items: center;
    @include px2rem(padding, 20);
    border-bottom: 1px dashed #dedede;
    color: #333;
    .itemL {
      display: inline-block;
      img {
        @include px2rem(height, 70);
        @include px2rem(width, 70);
        border-radius: 50%;
        font-size: 0;
      }
      span {
        display: inline-block;
        @include font-dpr(13px);
        color: #333;
        vertical-align: 70%;
        @include px2rem(margin-left, 10);
      }
    }
  }

  .noneRecord {
    @include px2rem(line-height, 200);
    text-align: center;
    @include font-dpr(14px);
    color: #999;
  }

  .historyWrap{
    @include px2rem(margin-top,85);
    position: absolute;
    left: 0;
    height: 100%;
    right: 0;
    top: 0;
  }

  .router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
  }

  .router-slid-enter, .router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
  }
</style>
