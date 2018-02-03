<template>
  <div>
    <head-top :head-title="headTitle" back-color="fff"></head-top>
    <section class="c_login">
      <div class="c_logo">
        <img src=""/>
      </div>
      <div class="c_form">
        <div class="c_line">
          <input type="number" v-model="phoneNumber" maxlength="11" placeholder="请输入你的手机号码"/>
          <button @click.prevent="getVerifyCode" :class="{right_phone_number:rightPhoneNumber}" v-show="!computedTime">
            获取验证码
          </button>
          <button @click.prevent v-show="computedTime">已发送({{computedTime}}s)</button>
        </div>
        <div class="c_line">
          <input type="number" v-model="codeNumber" maxlength="4" placeholder="请输入验证码"/>
        </div>
        <div class="c_line">
          <input v-if="!showPassword" type="password" placeholder="密码" v-model="password">
          <input v-else type="text" placeholder="密码" v-model="password">
          <div class="button_switch" :class="{change_to_text: showPassword}">
            <div class="circel_button" :class="{trans_to_right: showPassword}" @click="changePassWordType"></div>
          </div>
        </div>
        <div class="c_btn" @click="mobileReg">注册</div>
        <div class="c_ctrl">
          <router-link class="goReg" :to="{path:'/login',query:{}}">登陆</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import 'src/plugins/sha1.min';
  import {mobileCode, mobileReg} from '../../service/getData';
  import headTop from '../../components/header/head';

  export default {
    data() {
      return {
        isLoging: false,
        phoneNumber: '',
        password: '',
        headTitle: '注册',
        alertContent: '',
        computedTime: 0,
        codeNumber: '',
        toastContent: '',
        showPassword: false,
      }
    },
    components: {
      headTop,
    },
    props: [],
    methods: {
      //获取验证码
      async getVerifyCode() {
        if (this.rightPhoneNumber) {
          this.computedTime = 30;
          this.timer = setInterval(() => {
            this.computedTime--;
            if (this.computedTime == 0) {
              clearInterval(this.timer)
            }
          }, 1000);
          // //判读用户是否存在
          // let exsis = await checkExsis(this.phoneNumber, 'mobile');
          // if (exsis.message) {
          //   this.showAlert = true;
          //   this.alertText = exsis.message;
          //   return
          // }else if(!exsis.is_exists) {
          //   this.showAlert = true;
          //   this.alertText = '您输入的手机号尚未绑定';
          //   return
          // }
          //发送短信验证码
          await mobileCode(this.phoneNumber).then(function (res) {
            if (res) {
              this.toastContent = res.msg;
              this.showToastPlugin();
            }
          }.bind(this));
        } else {
          this.alertContent = '请输入正确的手机号码...';
          this.showAlertPlugin();
        }
      },
      showAlertPlugin() {
        this.$vux.alert.show({
          title: '提示',
          content: this.alertContent,
          onShow() {
          },
          onHide() {
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
      async mobileReg() {
        if (!this.rightPhoneNumber) {
          this.toastContent = '请输入正确手机号码...';
          this.showToastPlugin();
          return
        }

        if (!this.password) {
          this.toastContent = '请输入登陆密码...';
          this.showToastPlugin();
          return
        }

        if (!this.codeNumber) {
          this.toastContent = '请输入验证码...';
          this.showToastPlugin();
          return
        }

        await mobileReg(this.phoneNumber, this.password, this.codeNumber).then(function (res) {
          this.toastContent = res.msg;
          this.showToastPlugin();
          console.log(res);
          if (res.code == 1) {
            this.$router.go(-1);
          }
        }.bind(this));
      },
      changePassWordType() {
        this.showPassword = !this.showPassword;
      }
    },
    computed: {
      rightPhoneNumber: function () {
        return /^1\d{10}$/gi.test(this.phoneNumber)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../style/mixin';

  body, html {
    height: 100%;
    background-color: white;
  }

  .c_login {
    @include px2rem(padding, 110 42 0);
    text-align: center;
  }

  .c_logo {
    display: inline-block;
    @include px2rem(height, 180);
    @include px2rem(width, 180);
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid #e3e3e3;
    img {
      height: 100%;
      width: 100%;
    }
  }

  .c_form {
    @include px2rem(margin-top, 68);
  }

  .c_line {
    position: relative;
    input {
      display: block;
      width: 100%;
      @include px2rem(padding, padding 30 50);
      @include px2rem(border-radius, 40);
      border: 1px solid #e3e3e3;
      color: #999999;
      @include font-dpr(14px);
    }
    &:nth-child(2), &:nth-child(3) {
      @include px2rem(margin-top, 17);
    }
    button {
      position: absolute;
      @include px2rem(line-height, 68);
      @include px2rem(height, 68);
      @include px2rem(width, 180);
      text-align: center;
      top: 0;
      bottom: 0;
      margin: auto;
      @include px2rem(border-radius, 40);
      @include px2rem(right, 10);
      background-color: #86d8ff;
      color: white;
      @include font-dpr(15px);
    }
  }

  .c_btn {
    display: block;
    @include px2rem(padding, padding 30 50);
    @include px2rem(border-radius, 40);
    text-align: center;
    background-color: #86d8ff;
    color: white;
    @include font-dpr(16px);
    @include px2rem(margin-top, 34);
    @include px2rem(margin-bottom, 24);
  }

  .goReg {
    @include font-dpr(13px);
    color: #f47e8c;
    display: inline-block;
  }

  .forgetPass {
    @include font-dpr(13px);
    color: #999;
  }

  .circel_button {
    @include px2rem(width, 46);
    @include px2rem(height, 34);
    background: transparent url("../../images/showPass.png") no-repeat center/cover;
    position: absolute;
    @include px2rem(right, 10);
    top: 0;
    bottom: 0;
    margin: auto;
  }
</style>
