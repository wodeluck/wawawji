import App from '../App'

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home');
const room = r => require.ensure([], () => r(require('../page/room/room')), 'room');
const login = r => require.ensure([], () => r(require('../page/login/login')), 'login');
const register = r => require.ensure([], () => r(require('../page/register/register')), 'register');
const gameService = r => require.ensure([], () => r(require('../page/gameService/gameService')), 'gameService');
const userList = r => require.ensure([], () => r(require('../page/userList/userList')), 'userList');
const forgetPass = r => require.ensure([], () => r(require('../page/forgetPass/forgetPass')), 'forgetPass');
const showConFromBanner = r => require.ensure([], () => r(require('../page/showConFromBanner/showConFromBanner')), 'showConFromBanner');
const userDetailInfo = r => require.ensure([], () => r(require('../page/userList/children/userDetailInfo')), 'userDetailInfo');






const wawa_change_address = r => require.ensure([], () => r(require('../page/wawa_change_address/wawa_change_address')), 'wawa_change_address');
const news_center = r => require.ensure([], () => r(require('../page/news_center/news_center')), 'news_center');
const personal_center = r => require.ensure([], () => r(require('../page/personal_center/personal_center')), 'personal_center');
const news_details = r => require.ensure([], () => r(require('../page/news_details/news_details')), 'news_details');
const recharge = r => require.ensure([], () => r(require('../page/recharge/recharge')), 'recharge');
const recharge_record = r => require.ensure([], () => r(require('../page/recharge_record/recharge_record')), 'recharge_record');
const bill_details = r => require.ensure([], () => r(require('../page/bill_details/bill_details')), 'bill_details');
const wawa_bill = r => require.ensure([], () => r(require('../page/wawa_bill/wawa_bill')), 'wawa_bill');
const my_wawa = r => require.ensure([], () => r(require('../page/my_wawa/my_wawa')), 'my_wawa');
const wawa_details = r => require.ensure([], () => r(require('../page/wawa_details/wawa_details')), 'wawa_details');
const change_address = r => require.ensure([], () => r(require('../page/change_address/change_address')), 'change_address');
const game_record = r => require.ensure([], () => r(require('../page/game_record/game_record')), 'game_record');
const game_details = r => require.ensure([], () => r(require('../page/game_details/game_details')), 'game_details');
const complain = r => require.ensure([], () => r(require('../page/complain/complain')), 'complain');
const exchange_gift = r => require.ensure([], () => r(require('../page/exchange_gift/exchange_gift')), 'exchange_gift');
const exchange_record = r => require.ensure([], () => r(require('../page/exchange_record/exchange_record')), 'exchange_record');
const gift_details = r => require.ensure([], () => r(require('../page/gift_details/gift_details')), 'gift_details');
const my_gift = r => require.ensure([], () => r(require('../page/my_gift/my_gift')), 'my_gift');
const all_waybill = r => require.ensure([], () => r(require('../page/all_waybill/all_waybill')), 'all_waybill');
const my_code = r => require.ensure([], () => r(require('../page/my_code/my_code')), 'my_code');
const wawa_machine = r => require.ensure([], () => r(require('../page/wawa_machine/wawa_machine')), 'wawa_machine');
const feedback = r => require.ensure([], () => r(require('../page/feedback/feedback')), 'feedback');
const address = r => require.ensure([], () => r(require('../page/address/address')), 'address');
const set_address = r => require.ensure([], () => r(require('../page/set_address/set_address')), 'set_address');
const add_address = r => require.ensure([], () => r(require('../page/add_address/add_address')), 'add_address');
const com_address = r => require.ensure([], () => r(require('../page/components/com_address')), 'com_address');
const address_data = r => require.ensure([], () => r(require('../page/components/address_data')), 'address_data');
const pull_refresh = r => require.ensure([], () => r(require('../page/components/pull_refresh')), 'pull_refresh');       //  上拉加载....
const set = r => require.ensure([], () => r(require('../page/set/set')), 'set');
const about_us = r => require.ensure([], () => r(require('../page/about_us/about_us')), 'about_us');
const set_data = r => require.ensure([], () => r(require('../page/set_data/set_data')), 'set_data');
const question = r => require.ensure([], () => r(require('../page/question/question')), 'question');
const protocol = r => require.ensure([], () => r(require('../page/protocol/protocol')), 'protocol');
const notice = r => require.ensure([], () => r(require('../page/notice/notice')), 'notice');

export default [{
  path: '/',
  component: App, //顶层路由，对应index.html
  children: [ //二级路由。对应App.vue
    {
      path: '',
      redirect: '/home'
    },
    {
      path: '/home',
      component: home,
      meta: {
        auth: true // 如果此路由需要微信授权请设置为true,默认为false
      }
    },
    {
      path: '/room',
      component: room,
      meta: { keepAlive: true },
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/reg',
      component: register
    },
    {
      path: '/gameService',
      component: gameService
    },
    {
      path: '/userList',
      component: userList,
      children:[
        {
          path: 'userDetailInfo',
          component: userDetailInfo,
        }
      ]
    },
    {
      path: '/forgetPass',
      component: forgetPass
    },
    {
      path: '/showConFromBanner',
      component: showConFromBanner
    },
    {
      path: '/personal_center',
      component: personal_center
    },
    {
      path: '/news_center',         //消息中心
      component: news_center
    },
    {
      path: '/set_data',         //修改资料
      component: set_data
    },
    {
      path: '/news_details',         //消息详情
      component: news_details
    },
    {
      path: '/recharge',         //充值
      component: recharge
    },
    {
      path: '/recharge_record',         //充值记录
      component: recharge_record
    },
    {
      path: '/bill_details',         //账单详情
      component: bill_details
    },
    {
      path: '/wawa_bill',         //娃娃账单
      component: wawa_bill
    },
    {
      path: '/my_wawa',         //我的娃娃
      component: my_wawa
    },
    {
      path: '/wawa_details',         //娃娃详情
      component: wawa_details
    },
    {
      path: '/change_address',         //选择收货地址
      component: change_address
    },
    {
      path: '/game_record',         //游戏记录
      component: game_record
    },
    {
      path: '/game_details',         //游戏详情
      component: game_details
    },
    {
      path: '/complain',         //申诉
      component: complain
    },
    {
      path: '/exchange_gift',         //兑换礼品
      component: exchange_gift
    },
    {
      path: '/exchange_record',         //兑换记录
      component: exchange_record
    },
    {
      path: '/gift_details',         //礼品详情
      component: gift_details
    },
    {
      path: '/my_gift',         //我的礼品
      component: my_gift
    },
    {
      path: '/all_waybill',         //所有运单
      component: all_waybill
    },
    {
      path: '/my_code',         //我的邀请码
      component: my_code
    },
    {
      path: '/wawa_machine',         //娃娃机
      component: wawa_machine
    },
    {
      path: '/feedback',         //意见反馈
      component: feedback
    },
    {
      path: '/address',         //收货地址
      component: address
    },
    {
      path: '/com_address',         //组件收货地址
      component: com_address
    },
    {
      path: '/address_data',         //组件省市区三级联动
      component: address_data
    },
    {
      path: '/add_address',         //新增收货地址
      component: add_address
    },
    {
      path: '/set_address',         //编辑收货地址
      component: set_address
    },
    {
      path: '/set',         //设置
      component: set
    },
    {
      path: '/about_us',         //关于我们
      component: about_us
    },
    {
      path: '/question',         //常见问题
      component: question
    },
    {
      path: '/protocol',         //用户协议
      component: protocol
    },
    {
      path: '/notice',         //兑换须知
      component: notice
    },
    {
      path: '/wawa_change_address',         //娃娃邮寄
      component: wawa_change_address
    },
    {
      path: '/pull_refresh',         //上拉加载....
      component: pull_refresh
    }
  ]
}]
