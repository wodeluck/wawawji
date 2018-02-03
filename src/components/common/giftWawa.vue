<template>
  <div>
    <x-dialog v-model="showHideOnClickFail" class="dialog-demo" @on-hide="hide" hide-on-blur>
      <div class="giftWawa">
        <div class="top">
          <img :src="userAvatar"/>
          <div class="topR">
            <span>{{userNickName}}</span>
            <span>{{userId}}</span>
          </div>
        </div>
        <div class="button">
          <p>你现有可转赠的娃娃：</p>
          <ul class="giftList" v-if="donationwawaList.length>=1">
            <li v-for="(item,index) in donationwawaList" :key="index">
              <div class="ll">
                <img :src="item.gifticon"/>
                <div class="llr">
                  <span>{{item.giftname}}</span>
                  <span>我还有{{item.total}}个</span>
                </div>
              </div>
              <div class="lr">
                <x-number @on-change="change" v-model="roundValue[index]" button-style="round" :min="0"
                          :max="parseInt(item.total)"></x-number>
              </div>
            </li>
          </ul>
          <x-textarea class="textarea2" v-model="textarea" placeholder="转赠留言，你可以留下自己的联系方式哦！" :show-counter="true"
                      :rows="4"
                      autosize></x-textarea>
        </div>
        <div class="btnSure">
          <span>已选<i>{{dnums}}</i>个</span>
          <span @click="dsure">确认</span>
        </div>
      </div>
    </x-dialog>
  </div>
</template>

<script>
  import XDialog from "vux/src/components/x-dialog/index";
  import {mapState} from 'vuex';
  import {myDonationwawa, donationwawa} from '../../service/getData';
  import InlineXNumber from "vux/src/components/inline-x-number/index";
  import XNumber from "vux/src/components/x-number/index";
  import XTextarea from "vux/src/components/x-textarea/index";

  export default {
    components: {
      XTextarea,
      XNumber,
      InlineXNumber,
      XDialog,
    },
    data() {
      return {
        timeOut: 5,
        showHideOnClickFail: false,
        donationwawaList: '',
        textarea: '',
        roundValue: '',
        dnums: 0,
        choiceList: '',
        toastContent: '',
      }
    },
    mounted() {
      this.initData();
    },
    methods: {
      async initData() {
        await myDonationwawa().then(res => {
          if (res && res.code) {
            this.donationwawaList = res.data;
            if (res.data.length >= 1) {
              this.roundValue = new Array(res.data.length).fill(0);
            }
          }
        })
      },
      dsure() {
        let _arr = [];
        this.donationwawaList.forEach((p1, p2, p3) => {
          if (this.roundValue[p2] != 0) {
            const str = p1.wawa_id + ':' + this.roundValue[p2];
            _arr.push(str);
          }
        });
        this.choiceList = _arr;

        donationwawa(this.choiceList, this.$route.query.uid, this.textarea).then(res => {
          if (res.code == 1) {
            this.$emit('listenToDonationSuccess',[true]);
            this.showHideOnClickFail=false;
          } else {
            this.toastContent = res.msg;
            this.showToastPlugin();
          }
        })

      },
      showToastPlugin() {
        this.$vux.toast.show({
          text: this.toastContent,
          width: '20em',
          type: 'text',
          position: 'middle',
          onShow() {

          },
          onHide() {
          }
        })
      },
      change() {
        const _roundValue = this.roundValue;
        this.dnums = _roundValue.reduce(this.reducer);
      },
      reducer(accumulator, currentValue) {
        return accumulator + currentValue;
      },
      hide(){
        this.showHideOnClickFail=false;
      }
    },
    props: ['showHideOnClickFail2', 'userAvatar', 'userNickName', 'userId'],
    watch: {
      showHideOnClickFail2(){
        this.showHideOnClickFail=this.showHideOnClickFail2;
      }
    },
    computed: {
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
    @include px2rem(padding-right, 10);
    span {
      display: inline-block;
      color: inherit;
    }
  }

  .giftList {
    @include px2rem(padding, 20 25);
    @include px2rem(padding-bottom, 0);
    li {
      display: flex;
      width: 100%;
      align-items: center;
      border-bottom: 1px dashed #c7c7c7;
    }
    .ll {
      flex: 1;
      @include px2rem(padding, 20 0);
      text-align: left;
      img {
        @include px2rem(height, 110);
        @include px2rem(width, 110);
      }
      .llr {
        @include px2rem(margin-left, 20);
        display: inline-block;
        vertical-align: 60%;
        span {
          display: block;
          &:nth-child(1) {
            color: #333;
            @include font-dpr(15px);
            width: 2rem;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
          &:nth-child(2) {
            color: #f47e8c;
            @include font-dpr(12px);
          }
        }
      }
    }
    .lr {
      text-align: right;
      display: inline-block;
      flex-shrink: 0;
      flex-grow: 0;
    }
  }

  .giftWawa {
    .top {
      border-bottom: 1px dashed #c7c7c7;
      text-align: left;
      @include px2rem(padding, 25);
      img {
        @include px2rem(height, 141);
        @include px2rem(width, 141);
        border-radius: 50%;
      }
      .topR {
        display: inline-block;
        vertical-align: 100%;
      }
    }
    p {
      text-align: left;
      @include px2rem(padding-left, 25);
      @include px2rem(padding-top, 20);
    }
  }

  .textarea2 {
    border: 1px solid #f0f0f0;
    border-radius: 5px;
    @include px2rem(margin, 20);
  }

  .btnSure {
    text-align: right;
    @include px2rem(padding, 20 20 40 20);
    span {
      display: inline-block;
      &:nth-child(1) {
        color: #333;
        @include font-dpr(13px);
        i {
          color: #ff3d01;
          @include font-dpr(16px);
        }
      }
      &:nth-child(2) {
        background-color: #86d8ff;
        @include font-dpr(15px);
        color: white;
        @include px2rem(padding, 10 50);
        border-radius: 20px;
        @include px2rem(margin-left, 20);
      }
    }
  }

  .nonebg{
    .weui-dialog {
      background-color: transparent !important;
    }
  }
</style>
