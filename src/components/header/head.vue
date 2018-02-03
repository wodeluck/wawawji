<template>
  <div :id="$route.path=='/login'?'head_top2':'head_top'" :style="{backgroundColor: '#' + backColor}">
    <slot name="head_l"></slot>
    <section class="title">
      {{headTitle}}
    </section>
    <slot name="head_r"></slot>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'

  export default {
    data() {
      return {

      }
    },
    mounted() {
    },
    props: ['headTitle', 'backColor','goBack'],
    computed: {
      ...mapState([
        'userInfo'
      ]),
    },
    methods: {
      ...mapActions([
        'getUserInfo'
      ]),
    },

  }

</script>

<style lang="scss" scoped>
  @import '../../style/mixin';

  #head_top {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    @include px2rem(padding, 20 10);
    display: flex;
    justify-content: space-between;
    align-items: center;
    @include font-dpr(16px);
    z-index: 999999;
    .title{
      color: white;
    }
  }

  #head_top2 {
    @include px2rem(padding, 20 10);
    display: flex;
    justify-content: center;
    align-items: center;
    @include font-dpr(16px);
  }

  #head_top > * {
    display: inline-block;
  }

  .head_title {
    color: white;
    @include font-dpr(18px);
    color: white;
  }
  .head_title2{
    display: block;
    text-align: center;
    color: #333;
    @include font-dpr(18px);
  }
</style>
