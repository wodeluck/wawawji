<template>
  <div class="main">
    <header>
      <a  @click="black_go"><img :src="require('assets/img/header_back.png')"></a>
      <h2>我的邀请码</h2>
    </header>
    <section>
      <div class="input">
        <input type="text" placeholder="请输入邀请码" v-model="code"/>
        <button @click="exchange">兑换</button>
      </div>
      <div class="code">
        <img :src="require('assets/img/code.png')">
        <p class="code_one"><span>我的邀请码</span>{{data}}</p>
        <p class="code_two">{{rule_data.str}}</p>
      </div>
      <div class="old">
        <div class="old_line">
          <p class="old_one"></p>
          <span>分享</span>
          <p class="old_two"></p>
        </div>
        <div class="weixin">
          <div class="weixin_left" @click="wxtask=true">
            <a>
              <img :src="require('assets/img/weixin_person.png')">
              <p>微信好友</p>
            </a>
          </div>
          <div class="weixin_right" @click="wxtask=true">
            <a>
              <img :src="require('assets/img/weixin_friend.png')">
              <p>朋友圈</p>
            </a>
          </div>
        </div>
      </div>
      <wxshare class="nonebg" :show-hide-on-click="wxtask"></wxshare>
    </section>
  </div>

</template>

<script>
  import {my_code_data, my_rule_data, convert_code} from '../../service/getData';
  import wxshare from '../../components/common/wxshare';
  export default {
    data() {
      return {
        user_id: "54e3bde9a9c25741acd151dd4b957641",
        data: "",
        rule_data: "",
        code: "",
        wxtask:false,
      }
    },
    components:{
      wxshare
    },
    created() {
      my_code_data().then(res => {   //获取我的邀请码
        console.log(res);
        if (res.code == 1) {
          this.data = res.data;
        } else {
          console.log(err)
        }
      });
      my_rule_data().then(res => {   //获取填写邀请码规则信息
        console.log(res);
        if (res.code == 1) {
          this.rule_data = res.data;
        } else {
          console.log(err)
        }
      });
    },
    methods: {
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
      exchange() {
        if (this.code == '') {
          this.toastContent = '请输入邀请码';
          this.showToastPlugin();
          return false;
        }
        convert_code(this.code).then(res => {
          console.log(res);
          this.toastContent = res.msg;
          this.showToastPlugin();
          if (res.code == 1) {
            setTimeout(() => {
              history.back();
            }, 1500);
          } else {
            console.log(res.msg);
          }
        })
      },
			 black_go(){
	  		this.$router.go(-1)
	  		}
    }

  }
</script>

<style lang="scss" scoped>
  @import '../../style/mixin';
  .main{
    @include px2rem(padding-top, 80);
  }
  section {
    /*@include px2rem(padding-top, 80);*/
    @include px2rem(padding, 20);
  }

  section .input {
    @include px2rem(padding, 40 0);
  }

  section .input input {
    @include px2rem(height, 80);
    border: 2px dashed #9DDFFF;
    @include font-dpr(18px);
    letter-spacing: 1px;
    @include px2rem(text-indent,30);
    @include px2rem(border-radius,40);
  }

  section .input button {
    float: right;
    @include px2rem(width, 200);
    @include px2rem(height, 88);
    @include font-dpr(18px);
    color: #fff;
    border: none;
    @include px2rem(border-radius, 50);
    background: #9DDFFF;
  }

  .code {
    text-align: center;
    @include px2rem(margin-top, 80);
  }

  .code img {
    @include px2rem(width, 320);
  }

  .code p.code_one {
    @include px2rem(margin-top, 40);
    @include font-dpr(18px);
  }

  .code p.code_one span {
    @include font-dpr(15px);
    color: #aaa;
    @include px2rem(padding-right, 20);
  }

  .code p.code_two {
    @include font-dpr(13px);
    color: #aaa;
    width: 80%;
    margin: 40px 10%;
    @include px2rem(margin-top,40);
    @include px2rem(margin-bottom,40);
  }

  .code p.code_three {
    @include font-dpr(13px);
    @include px2rem(line-height,52);
    color: #aaa;
  }

  .old {
    /*position: fixed;*/
    /*bottom: 0;*/
    /*width: 100%;*/
    /*height:130px;*/
    /*left:0;*/

  }

  .old .weixin div {
    display: inline-block;
    width: 49%;
    position: absolute;
    text-align: center;
  }

  .old .weixin div a {
    display: inline-block;

  }

  .old .weixin div img {
    @include px2rem(width,80);
  }

  .old_line {
    text-align: center;
    position: relative;
  }

  .old_line p {
    @include px2rem(width,220);
    border-bottom: 1px solid #eee;
    position: absolute;
    @include px2rem(top,20);
  }

  .old_line p.old_one {
    @include px2rem(left,40);
  }

  .old_line p.old_two {
    @include px2rem(right,40);
  }

  .old_line span {
    @include font-dpr(16px);
    color: #aaa;
  }

  .old .weixin {
    @include px2rem(padding-top,40);
  }

  .old .weixin .weixin_left {
    left: 0;
  }

  .old .weixin .weixin_left a {
    @include px2rem(padding-left,112);
  }

  .old .weixin .weixin_right {
    right: 0;
  }

  .old .weixin .weixin_right a {
    @include px2rem(padding-right,112);
  }

  .old .weixin a p {
    color: #aaa;
    @include px2rem(line-height,60);
    @include font-dpr(15px);
  }
</style>
