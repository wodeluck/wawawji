import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
////上拉加载，下拉刷新
//import scroller from '@/components/scroller'
//个人中心首页
import personal_center from '@/personal_center/personal_center'
//消息中心
import news_center from '@/news_center/news_center'
//消息详情
import news_details from '@/news_details/news_details'
//充值
import recharge from '@/recharge/recharge'
//充值记录
import recharge_record from '@/recharge_record/recharge_record'
//账单详情
import bill_details from '@/bill_details/bill_details'
//娃娃账单
import wawa_bill from '@/wawa_bill/wawa_bill'
//我的娃娃
import my_wawa from '@/my_wawa/my_wawa'
//娃娃详情
import wawa_details from '@/wawa_details/wawa_details'
//选择收货地址
import change_address from '@/change_address/change_address'
//游戏记录
import game_record from '@/game_record/game_record'
//游戏详情
import game_details from '@/game_details/game_details'
//申诉
import complain from '@/complain/complain'
//兑换礼品
import exchange_gift from '@/exchange_gift/exchange_gift'
//兑换记录
import exchange_record from '@/exchange_record/exchange_record'
//礼品详情
import gift_details from '@/gift_details/gift_details'
//我的礼品
import my_gift from '@/my_gift/my_gift'
//所有运单
import all_waybill from '@/all_waybill/all_waybill'
//我的邀请码
import my_code from '@/my_code/my_code'
//娃娃机
import wawa_machine from '@/wawa_machine/wawa_machine'
//意见反馈
import feedback from '@/feedback/feedback'
//收货地址
import address from '@/address/address'
//编辑收货地址
import set_address from '@/set_address/set_address'
//新增收货地址
import add_address from '@/add_address/add_address'
//组件收货地址
import com_address from '@/components/com_address'
//组件省市区三级联动
import address_data from '@/components/address_data'
//设置
import set from '@/set/set'
//关于我们
import about_us from '@/about_us/about_us'
//修改资料
import set_data from '@/set_data/set_data'
//常见问题
import question from '@/question/question'
//用户协议
import protocol from '@/protocol/protocol'
//兑换须知
import notice from '@/notice/notice'
import one from '@/one/one'
import index from '@/index/index'
//const personal_center = () =>
//import('@/personal_center/personal_center')

Vue.use(Router)


const router = new Router({
  routes: [
    {
      path: '/',
      component: HelloWorld
    },
//  {
//    path: '/',
//    component: scroller     // 组件上拉加载，下拉刷新
//  },
    {
      path: '/personal_center',      //个人中心首页
      component: personal_center  
    },
    {
      path: '/one',
      component: one
    },
    {
      path: '/index',
      component: index
    },
    {
      path: '/news_center',         //消息中心
      component: news_center     
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
      path: '/set_data',         //修改资料
      component: set_data
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
    }
  ]
})
export default router;
