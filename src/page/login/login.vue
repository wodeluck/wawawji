<template>
  <div>
    <head-top :head-title="headTitle" back-color="fff"></head-top>
    <!--<loading></loading>-->
    <section class="c_login">
      <div class="c_logo">
      </div>
      <div class="c_form">
        <div class="c_line">
          <input type="number" v-model="account" placeholder="请输入你的手机号码"/>
        </div>
        <div class="c_line">
          <input type="password" v-model="password" placeholder="请输入密码"/>
        </div>
        <div class="c_btn" @click="mobileLogin">登录</div>
        <div class="c_ctrl">
          <router-link class="goReg" :to="{path:'/reg',query:{}}">注册</router-link>
          <router-link class="forgetPass" :to="{path:'/forgetPass',query:{}}">忘记密码?</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex';
  import 'src/plugins/sha1.min';
  import {loginByPhone} from '../../service/getData';
  import {hex_sha1} from "../../plugins/sha1.min";
  import {setCookie,setStore} from "../../config/mUtils";
  import headTop from '../../components/header/head';
  import loading from '../../components/common/loading';

  export default {
    data() {
      return {
        isLoging: false,
        account: '',
        password: '',
        headTitle: '登录',
        alertContent: '',
        toastContent: '',
      }
    },
    components: {
      headTop,
      loading,
    },
    props: [],
    methods: {
      ...mapMutations([
        'SAVE_IMINFO',
        'SAVE_USERINFOR'
      ]),
      login() {
        if (this.account != '' && this.password != '') {
          this.mobileLogin();
        }
      },
      //发送登录信息
      async mobileLogin() {
        if (!this.rightPhoneNumber) {
          this.alertContent = '请输入正确手机号码...';
          this.showAlertPlugin();
          return
        }

        if (!this.password) {
          this.alertContent = '请输入登陆密码...';
          this.showAlertPlugin();
          return
        }

        await loginByPhone(this.account, this.password).then(res => {
          console.log(res);
          if (res.code == 1) {
            this.toastContent = res.msg;
            this.showToastPlugin();
            let expireDays = 1000 * 60 * 60 * 24 * 15;
            setCookie('session', res.data.token, expireDays);
            const imInfo = {};
            imInfo.tim_uid = res.data.tim_uid;
            imInfo.tim_sig = res.data.tim_sig;
            imInfo.id = res.data.id;
            console.log(imInfo);
            this.SAVE_IMINFO(imInfo);
            this.SAVE_USERINFOR(res.data);
            setStore('userInfo2',JSON.stringify(res.data));  //将userinfo存入localstorage
            setTimeout(this.$router.push('/home'), 2000).bind(this);
          } else {
            this.alertContent = res.msg;
            this.showAlertPlugin();
          }
        });
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
      }
    },
    computed: {
      rightPhoneNumber: function () {
        return /^1\d{10}$/gi.test(this.account)
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
    background: transparent url("../../images/logo.png") no-repeat center/contain;
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
    input {
      display: block;
      width: 100%;
      @include px2rem(padding, padding 30 50);
      @include px2rem(border-radius, 40);
      border: 1px solid #e3e3e3;
      color: #999999;
      @include font-dpr(14px);
    }
    &:nth-child(2) {
      @include px2rem(margin-top, 17);
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
    &:after {
      display: inline-block;
      content: '|';
      @include px2rem(padding-right, 10);
      @include px2rem(padding-left, 10);
    }
  }

  .forgetPass {
    @include font-dpr(13px);
    color: #999;
  }
</style>
