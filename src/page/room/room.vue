<template>
  <div>
    <head-top :head-title="headTitle" back-color="86d8ff">
      <section slot="head_l" class="goBack" @click="showConfirmExitRoom"></section>
      <section slot="head_r">
        <router-link v-show="ServiceSwitch==1" class="linkToService" :to="{path:'/gameService',query:{}}"></router-link>
        <div class="linkToShare" @click.prevent="wxmask=!wxmask"></div>
      </section>
    </head-top>
    <section class="contentWrap mt82">
      <section class="c_top">
        <div class="targetUser">
          <div class="targetUserWrap" v-show="userInfo">
            <img class="targetUserAvator" :src="userInfo.avatar"/>
            <div class="targetUserName">
              <span>{{userInfo.user_nicename}}</span>
              <span>游戏中</span>
            </div>
            <span class="spark"></span>
          </div>
        </div>
        <router-link :to="{path:'/userList',query:{}}">
          <div class="userInRoom">
            <div class="userNums">
              <span>{{totalUserNums.length}}人</span>
              <span>在房间</span>
            </div>
            <div class="userAvatorList" v-if="totalUserNums.length" v-for="(item,index) in totalUserNums" :key="index">
              <img :src="item.avatar" class="viewerPor"/>
            </div>
          </div>
        </router-link>
      </section>
      <div class="totalWrap">
        <div class="changeCam" @click="showMainCam=!showMainCam"></div>
        <div class="videoWrapMain" ref="videoWrapMain" v-show="showMainCam"></div>
        <div class="videoWrapSub" ref="videoWrapSub" v-show="!showMainCam"></div>
        <we-i-m v-on:broadcastToAll="broadcastToAll" v-on:listenToCancelReservation="listenToCancelReservation"
                v-on:listenToReservation="listenToReservation" v-on:listenToLiveOutRoom="listenToLiveOutRoom"
                v-on:listenToEnterInRoom="listenToEnterInRoom" v-on:listenToGameOver="listenToGameOver"
                v-on:listenToStartGame="listenToStartGame" :exit-i-m="exitIM"
                v-on:listenToCancelGame="listenToCancelGame" v-on:listenToJoinGame="listenToJoinGame"
                v-on:listenToChildEventSuccess="showMsgFromChildSuccess"
                v-on:listenToChildEventFail="showMsgFromChildFail" commend-user-name="wodeluck" :tim_uid="tim_uid"
                :tim_sig="tim_sig" :send-msg-text="filterMessage" :begin-send-msg="isBeginSendMsg"
                :av-chat-room-id="avChatRoomId" :msg-type="msgType" :game-id="gameId"
                :reservation-random-num="reservationRandomNum"></we-i-m>
        <div class="Countdown">{{timeout}}s</div>
      </div>
      <div class="wawaCtrl" v-show="!isBegin">
        <div class="sendMsg" @click="setFocus()"></div>
        <section v-show="!isGamingMyself">
          <div v-show="my_wait_rownum==1" class="begainWaWa" @click="gameStart"></div>
          <div v-show="my_wait_rownum==0" class="needReservation" @click="needReservation">
            <span>预约抓娃娃</span>
            <span>前面{{my_wait_rownum}}人</span>
          </div>
          <div v-show="my_wait_rownum>=2" class="cancelReservation" @click="cancelReservation">
            <span>取消预约</span>
            <span>前面{{my_wait_rownum-1}}人</span>
          </div>
        </section>
        <div class="ctrlInfo">
          <span>{{spendcoin}}币/次</span>
          <span>余额：{{userCoin}}币</span>
          <router-link :to="{path:'/recharge',query:{}}" class="rechargeCoin"></router-link>
        </div>
      </div>
      <div class="wawaCtrl wawaCtrl2" v-show="isBegin">
        <!--<div class="ctrll" id="rotate" @click="showConfirm()"></div>-->
        <div class="ctrlm">
          <div class="ctrlm_left" @click="operatorMachine" id="left"></div>
          <div class="ctrlm_right" @click="operatorMachine" id="right"></div>
          <div class="ctrlm_top" @click="operatorMachine" id="up"></div>
          <div class="ctrlm_bottom" @click="operatorMachine" id="down"></div>
        </div>
        <div class="ctrlr" @click="operatorMachine" id="grab"></div>
      </div>
    </section>
    <div class="tapWrap">
      <!--<tab line-width="2" defaultColor="#999" active-color="#86d8ff" v-model="index01" prevent-default-->
      <!--@on-before-index-change="switchTabItem">-->
      <!--<tab-item selected>娃娃详情</tab-item>-->
      <!--<tab-item>最近抓中记录</tab-item>-->
      <!--</tab>-->

      <tab :line-width="2" defaultColor="#999" active-color="#86d8ff" v-model="index">
        <tab-item class="vux-center" :selected="tapInitItem === item" v-for="(item, index) in list2"
                  @click="tapInitItem = item"
                  :key="index">{{item}}
        </tab-item>
      </tab>
      <swiper v-model="index" :show-dots="false" class="mt15" ref="swiper">
        <swiper-item v-for="(pitem, pindex) in list2" :key="pindex">
          <div class="tab-swiper vux-center" v-if="pindex==0">
            <img class="w100" v-if="tapItemDetail[pindex]" :src="item" v-for="(item,index) in tapItemDetail[pindex]"
                 :key="index"/>
          </div>
          <div class="tab-swiper vux-center" v-else>
            <div class="historyWrap">
              <div v-if="tapItemDetail[pindex].length" class="historyItem"
                   v-for="(sitem,sindex) in tapItemDetail[pindex]" :key="sindex">
                <div class="itemL">
                  <img :src="sitem.avatar_thumb"/>
                  <span>{{sitem.user_nicename}}</span>
                </div>
                <div class="itemR">
                  <span>{{new Date(parseInt(sitem.ctime)*1000).toLocaleString()}}</span>
                  <span></span>
                </div>
              </div>
              <div class="noneRecord" v-show="noneRecord">暂无记录...</div>
            </div>
          </div>
        </swiper-item>
      </swiper>
    </div>
    <div :class="isFocus?'h2':'h0'" v-show="isFocus" id="commendText">
      <div class="quickTextWrap">
        <checker v-model="quickItem" v-for="(item,index) in quickList" :key="index">
          <checker-item :value="item">{{item}}</checker-item>
        </checker>
      </div>
      <div class="commendInner">
        <input v-model="sendMsgText" type="text" class="form-control" ref="search"
               placeholder="请输入发送内容..."/>
        <div class="submitCommendText" @click="sendMsgToIM(1)">发送</div>
      </div>
    </div>
    <!--<compute-time :time="10"></compute-time>-->
    <tip-grap-success class="nonebg" v-on:listenToChildAgainGame="repeatAgainGame"
                      :show-hide-on-click="showHideOnClickSuccess"></tip-grap-success>
    <tip-grap-fail class="nonebg" v-on:listenToChildAgainGame="repeatAgainGame"
                   :show-hide-on-click="showHideOnClickFail"></tip-grap-fail>
    <wxshare class="nonebg showT" :show-hide-on-click="wxmask"></wxshare>
  </div>
</template>
<script>
  import headTop from '../../components/header/head';
  import computeTime from '../../components/common/computeTime';
  import {Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem, Loading} from 'vux'
  import {
    gameStart,
    getLiveInfo,
    getLiveStream,
    getRoomInfo,
    getUserInfo,
    gameAudience,
    roomHistory,
    getQuick,
    roomwaitEdit,
    roomGameCancel,
    exitRoom,
    getServiceSwitch,
    getKeyword,
  } from '../../service/getData';
  import JSMpeg from 'jsmpeg-player';
  import {mapMutations, mapState} from 'vuex';
  import md5 from 'js-md5';
  import weIM from '../../components/common/weIM';
  import {getStore} from "../../config/mUtils";
  import Checker from "vux/src/components/checker/checker";
  import CheckerItem from "vux/src/components/checker/checker-item";
  import Howl from 'Howl';
  import tipGrapSuccess from '../../components/common/tipGrapSuccess';
  import tipGrapFail from '../../components/common/tipGrapFail';
  import wxshare from '../../components/common/wxshare';


  export default {
    data() {
      return {
        headTitle: '娃娃机',
        targetGameAvator: '',
        targetUserName: '',
        totalUserNums: '',
        messageList: [],
        signalStatus: '',
        singlePrice: '',
        coinBalance: '',
        recentRecord: '',
        userInfo: '',//正在进行的游戏玩家
        gameStatus: '',
        isBegin: false,
        alertContent: '',
        webPort: '',
        webSocket: '',
        macno: '',
        sysnum: '',
        type: '',
        move_time: '',
        mactype: '',
        sign: '',
        index: 0,
        index01: 0,
        wawaDetail: '',
        list2: ['娃娃详情', '最近抓中记录'],
        tapInitItem: '娃娃详情',
        tapItemDetail: [],
        noneRecord: false,
        tim_uid: '',
        tim_sig: '',
        isFocus: false,
        isBeginSendMsg: '',
        sendMsgText: '',
        spendcoin: '',
        avChatRoomId: '',
        quickList: '',
        quickItem: '',
        bgmusic: '',//背景音乐
        yx_anniu: '',//按钮音效
        yx_chenggong: '',//成功音效
        yx_daojishi: '',//倒计时音效
        yx_kaishi: '',//开始音效
        yx_shibai: '',//失败音效
        yx_xiazhua: '',//下抓音效
        timeout: 30,
        showHideOnClickSuccess: false,
        showHideOnClickFail: false,
        all_wait_num: '',//所有排队人数
        front_wait_num: '',//我前面人数
        my_wait_rownum: '',//排队//先判断是不是自己正在玩
        exitIM: false,
        st: '',
        isGamingMyself: false,//是否是自己在玩游戏
        confirmTitle: '',
        startGameUserId: '',//开始游戏userid
        wxmask: false,//分享遮罩
        confirmsz: true,
        confirmExitRoom: true,
        showMainCam: true,
        ServiceSwitch: 2,
        filterMessageSrc: [''],
        userInfo2: '',
        msgType: '',//消息类型
        groupId: '',//群组id
        gameId: '',//游戏id
        userCoin: '',//用户coin
        reservationRandomNum: ''//当前预约用户id

      }
    },
    mounted() {
      this.computeSwiperHeight();
      this.SAVE_ROOMID(this.$route.query.roomId);
    },
    components: {
      CheckerItem,
      Checker,
      headTop,
      weIM,
      Tab,
      TabItem,
      Sticky,
      Divider,
      XButton,
      Swiper,
      SwiperItem,
      Loading,
      computeTime,
      tipGrapSuccess,
      tipGrapFail,
      wxshare,
    },
    beforeCreate() {
    },
    async beforeRouteLeave(to, from, next) {
      this.bgmusic.stop();
      // this.exitIM = true;
      // await exitRoom(this.roomId).then(res => {
      //
      // });
      next();
    },
    methods: {
      broadcastToAll(){
        getRoomInfo(this.$route.query.roomId).then(res=>{
          if(res && res.code==1){
            this.my_wait_rownum = res.data.my_wait_rownum;
            this.userInfo = '';
          }
        });
      },
      listenToCancelReservation(data) {//取消预约娃娃机
        getRoomInfo(this.$route.query.roomId).then(res=>{
          if(res && res.code==1){
            alert(res.data.front_wait_num);
            this.my_wait_rownum = res.data.my_wait_rownum;
          }
        })
      },
      listenToReservation(data) {//预约娃娃机
        getRoomInfo(this.$route.query.roomId).then(res=>{
          if(res && res.code==1){
            this.my_wait_rownum = res.data.my_wait_rownum;
          }
        })

      },
      listenToEnterInRoom(data) {//监听有人进入房间时
        if (this.userInfo2.id != data.user_id) {
          const _totalUserNums = this.totalUserNums;
          _totalUserNums.push(data);
          this.totalUserNums = _totalUserNums;
        }
      },
      listenToGameOver(data) {//监听游戏结束
        this.my_wait_rownum = 1;
        this.userInfo = '';
      },
      listenToStartGame() {//监听游戏开始
        if (this.userInfo2.id != this.startGameUserId) {
          this.my_wait_rownum = 0;
        }
        getRoomInfo(this.$route.query.roomId).then(res => {
          if (res.data.now_user) {
            this.userInfo = res.data.now_user;
          }
        })
      },
      sendMsgToIM(data) {
        this.isBeginSendMsg = Math.random(10);
        this.yx_anniu.play();
        this.$refs.search.value = '';
        this.msgType = data;
      },
      listenToRoomWaitNums(data) {//监控type=18时
        if (this.userInfo2.id != this.startGameUserId) {
          this.front_wait_num = data;
        }
      },
      showConfirmExitRoom() {
        this.confirmTitle = '退出当前房间？';
        const _this = this; // 需要注意 onCancel 和 onConfirm 的 this 指向
        this.$vux.confirm.show({
          title: this.confirmTitle,
          // 组件除show外的属性
          onCancel() {
            console.log(this); // 非当前 vm
            console.log(_this) // 当前 vm
          },
          onConfirm() {
            _this.sendMsgToIM(4);
          }
        });
      },
      async listenToLiveOutRoom(data) {
        if (this.userInfo2.id == data) {
          this.exitIM = true;
          await exitRoom(this.$route.query.roomId).then(res => {
            console.log(res);
            this.$router.back(-1);
          });
        } else {
          let _totalUserNums = this.totalUserNums;
          _totalUserNums.forEach((p1, p2, p3) => {
            for (let i in p1) {
              if (p1[i] == data) {
                _totalUserNums.splice(p2, 1);
              }
            }
          });
          this.totalUserNums = _totalUserNums;
        }
      },
      listenToCancelGame(data) {
        roomGameCancel(this.roomId).then(res => {
          if (res.code == 1) {
            this.my_wait_rownum = 0;
          }
        });

      },
      listenToJoinGame(data) {
        this.gameStart();
      },
      cancelReservation() {//用户取消预约抓娃娃
        roomwaitEdit(this.$route.query.roomId).then(res => {
          if (res && res.code == 1) {
            this.alertContent = res.msg;
            this.showAlertPlugin();
            // this.my_wait_rownum = 0;
            this.sendMsgToIM(6);

            getRoomInfo(this.$route.query.roomId).then(res=>{
              if(res && res.code==1){
                this.front_wait_num = parseInt(res.data.front_wait_num);
              }
            })


          }
        })
      },
      needReservation() {//用户预约抓娃娃
        roomwaitEdit(this.$route.query.roomId).then(res => {
          if (res && res.code == 1) {
            this.alertContent = res.msg;
            this.showAlertPlugin();
            // this.my_wait_rownum = 2;
            this.sendMsgToIM(5);
            this.reservationRandomNum=Math.random(1000);

            getRoomInfo(this.$route.query.roomId).then(res=>{
              if(res && res.code==1){
                this.front_wait_num = parseInt(res.data.front_wait_num);
              }
            })
          } else {
            this.alertContent = res.msg;
            this.showAlertPlugin();
          }
        })
      },
      ...mapMutations([
        'SAVE_ROOMID',
        'SAVE_NOWUSERID',
      ]),
      repeatAgainGame(data) {
        if (data[1]) {
          this.gameStart();
        } else {
          getRoomInfo(this.$route.query.roomId).then(res=>{
            if(res && res.code==1){
              this.my_wait_rownum = res.data.my_wait_rownum;
            }
          })
        }
      },
      showMsgFromChildSuccess(data) {
        this.showHideOnClickSuccess = data[0];
        this.isBegin = data[1];
        this.timeout = 30;
        this.yx_chenggong.play();
        clearInterval(this.st);
      },
      showMsgFromChildFail(data) {
        this.showHideOnClickFail = data[0];
        this.isBegin = data[1];
        this.timeout = 30;
        this.yx_shibai.play();
        clearInterval(this.st);
      },
      async initData() {
        await getRoomInfo(this.$route.query.roomId).then(res => {
          console.log(res);
          if (res.data.now_user) {
            this.userInfo = res.data.now_user;
          }
          if (res.data && res.code == 1) {
            this.tapItemDetail.push(res.data.img);
            this.spendcoin = res.data.spendcoin;
            this.avChatRoomId = res.data.id;
            this.bgmusic = new Howl({
              src: [res.data.bgmusic],
              preload: true,
              loop: true,
            });
            this.bgmusic.play();
            this.yx_anniu = new Howl({
              src: [res.data.yx_anniu],
              preload: true,
            });
            this.yx_chenggong = new Howl({
              src: [res.data.yx_chenggong],
              preload: true,
            });
            this.yx_daojishi = new Howl({
              src: [res.data.yx_daojishi],
              preload: true,
            });
            this.yx_kaishi = new Howl({
              src: [res.data.yx_kaishi],
              preload: true,
            });
            this.yx_shibai = new Howl({
              src: [res.data.yx_shibai],
              preload: true,
            });
            this.yx_xiazhua = new Howl({
              src: [res.data.yx_xiazhua],
              preload: true,
            });
            this.my_wait_rownum = res.data.my_wait_rownum;
            this.front_wait_num = parseInt(res.data.front_wait_num);
            if (res.data.now_game) {
              console.log(this.userInfo2.id);
              if (this.userInfo2.id == res.data.now_game.user_id) {
                this.isBegin = true;
                this.isGamingMyself = true;
              } else {
                this.isBegin = false;
                this.isGamingMyself = false;
              }
            }
          }
        });

        this.userInfo2 = JSON.parse(getStore('userInfo'));
        await getUserInfo(this.userInfo2.id).then(res => {
          if (res && res.code == 1) {
            this.userCoin = res.data.coin;
          }
        });
        let videoWrapMain = this.$refs.videoWrapMain;
        let videoWrapSub = this.$refs.videoWrapSub;
        getLiveInfo().then(res => {
          console.log(res);
          return getLiveStream();
        }).then(res => {
          new JSMpeg.VideoElement(videoWrapMain, res.cameras.main, {aspectPercent: '100%'});
          new JSMpeg.VideoElement(videoWrapSub, res.cameras.sub, {aspectPercent: '100%'});
        });

        gameAudience(this.$route.query.roomId).then(res => {
          this.totalUserNums = res.data;
        });
        getServiceSwitch().then(res => {
          if (res) {
            this.ServiceSwitch = res.data;
          }
        });

        await roomHistory(this.$route.query.roomId).then(res => {//房间抓中娃娃历史记录
          if (res.data && res.code == 1) {
            this.tapItemDetail.push(res.data);
          } else {
            this.noneRecord = true;
          }
        });

        getQuick().then(res => {//快捷语
          if (res.code == 1) {
            this.quickList = res.data;
          }
        });
        await getKeyword().then(res => {
          if (res) {
            this.filterMessageSrc = res.data;
          }
        });
        this.sendMsgToIM(3);
      },
      async gameStart() {//开始游戏
        this.showHideOnClickFail = false;
        this.showHideOnClickSuccess = false;
        this.$vux.loading.show({
          text: '请稍等...'
        });
        await gameStart(this.$route.query.roomId).then(res => {
          this.$vux.loading.hide();
          if (res.code == 1) {
            this.sendMsgToIM(2);
            this.gameId = res.data.id;//获取游戏ID
            this.userInfo2.coin = parseInt(this.userInfo2.coin) - parseInt(this.spendcoin);
            console.log('游戏开始成功');
            console.log(res);
            this.gameStatus = '游戏中';
            this.startGameUserId = res.data.id;
            this.SAVE_NOWUSERID(res.data.user_id);
            this.yx_kaishi.play();
            this.isBegin = true;
            this.webPort = res.data.webPort;
            this.macno = res.data.fac_id;
            this.sysnum = res.data.ctime;
            this.move_time = res.data.move_time;
            this.top_time = res.data.top_time;
            this.mactype = res.data.mactype;
            this.webSocket = this.initWebSocket;
            this.st = setInterval(function () {
              this.timeout--;
              if (this.timeout == 10) {
                this.yx_daojishi.play();
              }
              if (this.timeout == 0) {
                clearInterval(this.st);
                this.yx_xiazhua.play();
                roomGameCancel(this.roomId).then(res => { //结束游戏
                  if (res.code == 1) {
                  }
                });
              }
            }.bind(this), 1000);
            getUserInfo(this.userInfo2.id).then(res => {
              if (res && res.code == 1) {
                this.userCoin = res.data.coin;
              }
            });
          } else {
            this.yx_shibai.play();
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
      operatorMachine(e) {//操作娃娃机
        this.type = e.target.id;
        this.sign = md5(this.macno + "DLCwawa" + this.type);
        const sendObj = {};
        sendObj.macno = this.macno;
        sendObj.sysnum = this.sysnum;
        sendObj.type = this.type;
        sendObj.move_time = this.move_time;
        sendObj.top_time = this.top_time;
        sendObj.mactype = this.mactype;
        sendObj.sign = this.sign;
        console.log(JSON.stringify(sendObj));
        const ws = this.webSocket;
        console.log(ws);
        ws.send(JSON.stringify(sendObj));
        if(this.type=='grab'){
          this.yx_xiazhua.play();
        }else{
          this.yx_anniu.play();
        }
        ws.onopen = function (event) {
          console.log(event);
        };
        ws.onclose = function (event) {
          console.log(event);
        };
        ws.onmessage = function (event) {
          const data = event.data;
          console.log(data);
        };
      },
      operatorMachineRotate() {//甩抓
        this.type = 'rotate';
        this.sign = md5(this.macno + "DLCwawa" + this.type);
        const sendObj = {};
        sendObj.macno = this.macno;
        sendObj.sysnum = this.sysnum;
        sendObj.type = this.type;
        sendObj.move_time = this.move_time;
        sendObj.top_time = this.top_time;
        sendObj.sign = this.sign;
        console.log(JSON.stringify(sendObj));
        const ws = this.webSocket;
        console.log(ws);
        ws.send(JSON.stringify(sendObj));
        this.yx_anniu.play();
        ws.onopen = function (event) {
          console.log(event);
        };
        ws.onclose = function (event) {
          console.log(event);
        };
        ws.onmessage = function (event) {
          const data = event.data;
          console.log(data);
        };
      },
      initMachine() {
      },
      switchTabItem(index) {
        console.log('on-before-index-change', index);
        this.$vux.loading.show({
          text: 'loading'
        });
        setTimeout(() => {
          this.$vux.loading.hide();
          this.index01 = index
        }, 1000)
      },
      onItemClick(index) {
        console.log('on item click:', index)
      },
      computeSwiperHeight() {
        const swiper = this.$refs.swiper;
        this.$nextTick(function () {
          swiper.xheight = '6rem';
        })
      },
      setFocus() {
        this.$refs.search.focus();
        this.isFocus = true;
      }
    },
    async beforeMount() {
    },
    created() {
      this.initData();
      this.tim_uid = getStore('tim_uid');
      this.tim_sig = getStore('tim_sig');
    },
    computed: {
      initWebSocket: function () {
        return new WebSocket('ws://120.77.72.190:' + this.webPort)
      },
      ...mapState({
        roomId: 'roomId',
      }),
      filterMessage: function () {//过滤关键字
        let filter = this.filterMessageSrc;
        let arrFilter = filter.join('|');
        const _sendMsgText = this.sendMsgText.replace(new RegExp(arrFilter, 'ig'), '*');
        return this.userInfo2.user_nicename + ':' + _sendMsgText;
      }
    },
    watch: {
      quickItem: function () {
        this.sendMsgText = this.quickItem;
        // this.isBeginSendMsg = Math.random(10);
      }
    },
    filters: {
      capitalize: function (value) {
        if (!value) return '';
        value = value.toString();
        return value.charAt(0).toUpperCase() + value.slice(1)
      }
    }
  }

</script>

<style lang="scss" scoped>
  @import '../../style/mixin';

  html, body {
    height: 100%;
    overflow-x: hidden;
    background-color: #eefaff;
  }

  .user_service, .user_share {
    @include px2rem(height, 45);
    @include px2rem(width, 45);
  }

  .shareCtrl {
    display: inline-block;
  }

  .c_top {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    display: flex;
    justify-content: space-between;
    z-index: 10;
    .targetUser {
      display: inline-block;
      .targetUserWrap {
        position: relative;
        font-size: 0;
        @include px2rem(margin-left, 18);
        @include px2rem(margin-top, 5);
        background-color: rgba(0, 0, 0, .7);
        border-radius: 20px;
        display: inline-block;
        @include px2rem(width, 257);
        @include px2rem(padding, 3);
        box-sizing: border-box;
      }
      .targetUserAvator {
        @include px2rem(height, 82);
        @include px2rem(width, 82);
        border-radius: 50%;
      }
      .targetUserName {
        @include px2rem(margin-left, 10);
        display: inline-block;
        vertical-align: top;
        margin-top: 3%;
        span {
          color: white;
          display: block;
          text-align: left;
          @include font-dpr(12px);
          &:nth-child(1) {
            width: 6em;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
        }
      }
    }
    .userInRoom {
      @include px2rem(padding, 10 20);
      @include px2rem(border-top-left-radius, 40);
      @include px2rem(border-bottom-left-radius, 40);
      @include px2rem(margin-top, 10);
      overflow: hidden;
      display: flex;
      background-color: #fefdfc;
      @include px2rem(width, 366);
      align-items: center;
      .userNums {
        display: inline-block;
        flex-shrink: 0;
        flex-grow: 0;
        span {
          display: block;
          text-align: left;
          color: #333;
          &:nth-child(2) {
            color: #999;
          }
        }
      }
      .userAvatorList {
        flex: 1;
        @include px2rem(margin-left, 16);
      }
    }
  }

  .spark {
    display: inline-block;
    position: absolute;
    @include px2rem(right, -4);
    @include px2rem(bottom, -4);
    @include px2rem(height, 40);
    @include px2rem(width, 40);
    background: transparent url("../../images/spark.png") no-repeat center/cover;
  }

  .contentWrap {
    position: relative;
    @include px2rem(padding, 0 12);
    .videoWrapMain, videoWrapSub {
      border-radius: 4px;
      overflow: hidden;
    }
  }

  .static-theme-style__canvas {
    height: 12.37333rem !important;
  }

  .goBack {
    display: inline-block;
    @include px2rem(height, 30);
    @include px2rem(width, 30);
    background: transparent url("../../images/arrowback.png") no-repeat center/cover;
  }

  .linkToService {
    display: inline-block;
    @include px2rem(height, 44);
    @include px2rem(width, 47);
    background: transparent url("../../images/service.png") no-repeat center/contain;
  }

  .linkToShare {
    display: inline-block;
    @include px2rem(height, 42);
    @include px2rem(width, 46);
    background: transparent url("../../images/share.png") no-repeat center/contain;
    @include px2rem(margin-left, 15);
  }

  .viewerPor {
    @include px2rem(height, 60);
    @include px2rem(width, 60);
    border-radius: 50%;
  }

  .wawaCtrl {
    display: flex;
    justify-content: space-between;
    align-items: center;
    @include px2rem(padding, 30);
    /*padding-top: 11rem;*/
    .sendMsg {
      display: inline-block;
      @include px2rem(height, 84);
      @include px2rem(width, 84);
      background: transparent url("../../images/btn_comment_nor.png") no-repeat center/cover;
    }
    .begainWaWa {
      display: inline-block;
      @include px2rem(height, 115);
      @include px2rem(width, 340);
      background: transparent url("../../images/game_begin.png") no-repeat center/cover;
    }
    .needReservation {
      span {
        display: block;
        text-align: center;
        color: white;
        &:nth-child(1) {
          @include font-dpr(17px);
          margin-top: .2rem;
        }
        &:nth-child(2) {
          @include font-dpr(13px);
        }
      }
      color: white;
      display: inline-block;
      @include px2rem(height, 115);
      @include px2rem(width, 340);
      background: transparent url("../../images/btn_begin_nor.png") no-repeat center/cover;
    }
    .cancelReservation {
      span {
        display: block;
        text-align: center;
        color: white;
        &:nth-child(1) {
          @include font-dpr(17px);
          margin-top: .2rem;
        }
        &:nth-child(2) {
          @include font-dpr(13px);
        }
      }
      color: white;
      display: inline-block;
      @include px2rem(height, 115);
      @include px2rem(width, 340);
      background: transparent url("../../images/btn_begin_nor.png") no-repeat center/cover;
    }
    .ctrlInfo {
      display: inline-block;
      span {
        display: block;
        @include font-dpr(14px);
        color: #333;
      }
    }
  }

  .wawaCtrl2 {
    & > div {
      display: inline-block;
    }
    .ctrll {
      @include px2rem(height, 112);
      @include px2rem(width, 112);
      background: transparent url("../../images/btn_rejection_nor.png") no-repeat center/cover;
    }
    .ctrlm {
      @include px2rem(height, 257);
      @include px2rem(width, 346);
      position: relative;
      & > div {
        display: inline-block;
        @include px2rem(height, 112);
        @include px2rem(width, 112);
        background: transparent no-repeat center/cover;
        position: absolute;
      }
      .ctrlm_left {
        background-image: url("../../images/btn_left.png");
        left: 0;
        top: 0;
        bottom: 0;
        margin: auto;
      }
      .ctrlm_right {
        background-image: url("../../images/btn_right.png");
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
      }
      .ctrlm_top {
        background-image: url("../../images/btn_up.png");
        top: 0;
        left: 0;
        right: 0;
        margin: auto;
      }
      .ctrlm_bottom {
        background-image: url("../../images/btn_down.png");
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
      }
    }
    .ctrlr {
      @include px2rem(height, 112);
      @include px2rem(width, 112);
      background: transparent url("../../images/btn_go.png") no-repeat center/cover;
    }
  }

  .rechargeCoin {
    display: inline-block;
    @include px2rem(height, 54);
    @include px2rem(width, 130);
    background: transparent url("../../images/btn_Recharge_nor.png") no-repeat center/cover;
  }

  .tapWrap {
    @include px2rem(margin, 55 12 0);
    border: 1px solid #3eb9ff;
    @include px2rem(border-radius, 10);
    @include px2rem(min-height, 400);
    @include px2rem(padding, 0 15);
  }

  .w100 {
    width: 100%;
    height: auto;
  }

  .mt15 {
    @include px2rem(margin-top, 15);
  }

  .historyItem {
    display: flex;
    justify-content: space-between;
    align-items: center;
    @include px2rem(padding, 20);
    border-bottom: 1px dashed #999;
    .itemL {
      display: inline-block;
      img {
        @include px2rem(height, 70);
        @include px2rem(width, 70);
        border-radius: 50%;
        font-size: 0;
      }
      span {
        display: inline-block;
        @include font-dpr(13px);
        color: #333;
        vertical-align: 70%;
        @include px2rem(margin-left, 10);
      }
    }
  }

  .noneRecord {
    @include px2rem(line-height, 200);
    text-align: center;
    @include font-dpr(14px);
  }

  .vux-swiper-item {
    overflow-y: scroll;
  }

  .h0 {
    height: 0;
  }

  .h2 {
    height: 1rem;
  }

  .commendInner {
    display: flex;
    align-items: center;
    @include px2rem(padding, 10);
    background-color: white;
    @include px2rem(padding-top, 20);
    @include px2rem(margin-top, 20);
    border-top: 1px dashed #e5e5e5;
    input {
      border: 1px solid #e6e6e8;
      @include px2rem(border-radius, 35);
      display: block;
      flex: 1;
      @include px2rem(line-height, 60);
      @include px2rem(padding-left, 15);
    }
    .submitCommendText {
      @include px2rem(margin-left, 15);
      display: inline-block;
      @include px2rem(width, 90);
      background-color: #86d8ff;
      @include px2rem(border-radius, 25);
      color: white;
      text-align: center;
      @include px2rem(line-height, 60);
    }
  }

  .quickTextWrap {
    display: flex;
    flex-wrap: wrap;
    & > div {
      display: inline-block;
      border: 1px solid #86d8ff;
      @include px2rem(border-radius, 20);
      @include px2rem(padding, 8 15);
      @include px2rem(margin-right, 12);
      @include px2rem(margin-top, 12);
      @include font-dpr(14px);
    }
  }

  #commendText {
    @include px2rem(padding, 12 20);
    /*position: fixed;*/
    /*bottom: 0;*/
    /*left: 0;*/
    /*right: 0;*/
    /*z-index: 999;*/
    /*background-color: white;*/
  }

  .totalWrap {
    position: relative;
    border-radius: 3px;
    overflow: hidden;
    min-height: 10rem;
  }

  .Countdown {
    position: absolute;
    @include font-dpr(35px);
    color: white;
    @include px2rem(right, 70);
    z-index: 999999;
    @include px2rem(bottom, 23);
  }

  .changeCam {
    @include px2rem(height, 90);
    @include px2rem(width, 87);
    background: transparent url("../../images/ic_camera@2x.png") no-repeat center/contain;
    position: absolute;
    right: 0;
    top: 3rem;
    z-index: 99;
  }
</style>
