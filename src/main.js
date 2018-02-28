import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/router'
import store from './store/';
import {routerMode} from './config/env'
import './config/rem'
import FastClick from 'fastclick'
import {getCookie,getStore,setCookie,setStore,delCookie,removeStore} from "./config/mUtils";
import {AlertPlugin,ToastPlugin,LoadingPlugin,ConfirmPlugin } from 'vux';
import vuescroll from 'vue-scroll';
import VueChatScroll from 'vue-chat-scroll';
import {mapState,mapMutations} from 'vuex';
import { WechatPlugin } from 'vux';
import {weixinLogin} from "./service/getData";


Vue.use(AlertPlugin);
Vue.use(ToastPlugin );
Vue.use(LoadingPlugin);
Vue.use(vuescroll);
Vue.use(VueChatScroll);
Vue.use(ConfirmPlugin);
Vue.use(WechatPlugin);




if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body);
  }, false);
}

Vue.use(VueRouter);
const router = new VueRouter({
  routes,
  mode: routerMode,
  strict: process.env.NODE_ENV !== 'production',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop;
      }
      return {x: 0, y: to.meta.savedPosition || 0}
    }
  }
});


router.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', {isLoading: true});
  // next();
  if (!getCookie('code') && !getStore('userInfo') && !getCookie('token')) {
    window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc72b57ad73571b5c&redirect_uri=http%3a%2f%2fwawa.app.xiaozhuschool.com%2fh5%2fbuilded%2ftransit.html&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect";
  } else if (!getStore('userInfo') ) {
    weixinLogin(getCookie('code')).then(res => {
      if (res.code == 1) {
        let expireDays = 1000 * 60 * 60 * 24;
        setCookie('token', res.data.token, expireDays);
        // store.commit('SAVE_USERINFOR',res.data);
        setStore('userInfo',JSON.stringify(res.data));
        setStore('tim_uid',res.data.tim_uid);
        setStore('tim_sig',res.data.tim_sig);
        setStore('uid',res.data.id);
        next();
      }else{
        delCookie('code');
        removeStore('userInfo');
        delCookie('token');
      }
    });
  } else {
    console.log('已登录');
    next()
  }
});


router.afterEach(function (to) {
  store.commit('updateLoadingStatus', {isLoading: false})
});

new Vue({
  router,
  store,
  created(){
     // this.checkLogin();
  },
  methods:{
    // checkLogin(){
    //   if(!getCookie('session') || !getStore('userInfo2')){
    //     this.$router.push('/login');
    //   }else{
    //     this.SAVE_USERINFOR(JSON.parse(getStore('userInfo2')));
    //     // this.$router.push('/home');
    //   }
    // },

    ...mapMutations([
      'SAVE_USERINFOR',
      'SAVE_IMINFO',
    ])
  },
  watch:{
    // router:'checkLogin'
  },
  compute:{
    ...mapState([
      'userInfo',
    ])
  }
}).$mount('#app');

