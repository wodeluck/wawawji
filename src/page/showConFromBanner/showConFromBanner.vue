<template>
  <div>
    <head-top :head-title="headTitle" back-color="86d8ff">
      <section class="goBack" slot="head_l" @click="$router.go(-1)"></section>
      <section slot="head_r">
      </section>
    </head-top>
    <section class="c_login" ref="bannerCon">
    </section>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import {roomServiceText, roomGameService} from '../../service/getData';
  import headTop from '../../components/header/head';
  import loading from '../../components/common/loading';
  import {getStore} from "../../config/mUtils";

  export default {
    data() {
      return {
        headTitle: '内容详情',
        bannerCon: '',
      }
    },
    components: {
      headTop,
      loading,
    },
    props: [],
    methods: {},
    computed: {},
    mounted() {
      this.$refs.bannerCon.innerHTML=JSON.parse(getStore('bannerList'))[this.$route.query._index].slide_content.replace(/^"(.+(?="$))"$/, '$1');
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

  .c_login {
    @include px2rem(margin-top, 100);
  }

  .serviceTitle {
    @include px2rem(height, 84);
    @include px2rem(line-height, 84);
    color: white;
    text-align: center;
    @include font-dpr(14px);
    background: transparent url("../../images/bg_03@2x.png") no-repeat center/contain;
  }

  .serviceList {
    .item {
      &:not(:last-child) {
        border-bottom: 1px solid #f5f5f5;
      }
      @include px2rem(padding, 24);
      background-color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
      & > span {
        color: #333;
        @include font-dpr(14px);
      }
      .postService {
        display: inline-block;
        @include px2rem(padding, 10 30);
        border: 1px solid #86d8ff;
        @include px2rem(border-radius, 15);
        span {
          display: block;
          text-align: center;
          &:nth-child(2) {
            color: #86d8ff;
            @include font-dpr(13px);
            @include px2rem(margin-top, 10);
          }
          &:nth-child(1) {
            color: #333;
            @include font-dpr(14px);
          }
        }
      }
    }
  }
</style>
