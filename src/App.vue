<template>
  <div>
    <transition name="router-fade" mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="router-fade" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
    <svg-icon></svg-icon>
    <loading loading=false v-model="isLoading"></loading>
  </div>
</template>

<script>
  import svgIcon from './components/common/svg';
  import { Loading } from 'vux'
  import { mapState } from 'vuex'
  export default {
    components: {
      svgIcon,
      Loading,
    },
    computed: {
      ...mapState({
        isLoading: state => state.vux.isLoading
      })
    }
  }

</script>

<style lang="scss">
  @import './style/common';

  .router-fade-enter-active, .router-fade-leave-active {
    transition: opacity .3s;
  }

  .router-fade-enter, .router-fade-leave-active {
    opacity: 0;
  }
  .weui-dialog {
    /*background-color: transparent !important;*/
  }
  .static-theme-style__unmuteButtonSvg{
    display: none;
  }
</style>
