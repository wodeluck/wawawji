<template>
  <div>
    <x-dialog v-model="showDonationSuccess" class="dialog-demo" hide-on-blur>
      <div class="img-box">
        <img src="../../images/bg_yes@2x.png" style="max-width:100%">
      </div>
    </x-dialog>
  </div>
</template>

<script>
  import XDialog from "vux/src/components/x-dialog/index";
  import {mapState} from 'vuex';
  import {roomGameCancel} from '../../service/getData';
  export default {
    components: {
      XDialog,
    },
    data() {
      return {
        timeOut:5,
      }
    },
    mounted() {

    },
    methods: {
      hide(){
        console.log('hide');
      }
    },
    props: ['showDonationSuccess'],
    watch:{
      showDonationSuccess(){
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
</style>
