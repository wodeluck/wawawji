<template>
  <div>
    <x-dialog v-model="showHideOnClickFail" class="dialog-demo" hide-on-blur>
      <div class="img-box">
        <img src="../../images/grapFail.png" style="max-width:100%">
      </div>
      <div class="regainGameWrap">
        <div class="regainGame" @click="againGame">
          在玩一局<span>{{timeOut}}s</span>
        </div>
      </div>
      <div class="closeIcon" @click="closeMask"></div>
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
        showHideOnClickFail:false,
        st:'',
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
        if(this.timeOut>=1){
          roomGameCancel(this.roomId).then(res=>{
            if(res.code==1){
              this.$emit('listenToChildAgainGame', [true, true]); //是否隐藏当前组建,是否再来一局
              this.showHideOnClickFail = false;
            }
          });
        }
      },
      begainTime(){
        this.st=setInterval(function () {
          if(this.timeOut==0){
             clearInterval(this.st);
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
          this.showHideOnClickFail = false;
          this.$emit('listenToChildAgainGame', [false, false]);
        }
      },
      showHideOnClick:function () {
        this.showHideOnClickFail=this.showHideOnClick;
        if(this.showHideOnClickFail==true){
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
  .nonebg{
    .weui-dialog {
      background-color: transparent !important;
    }
  }
  .closeIcon{
    @include px2rem(height,30);
    @include px2rem(width,30);
    background: transparent url("../../images/ic_close@2x.png") no-repeat center/contain;
    position: absolute;
    right: 0;
    top: 1rem;
  }
</style>
