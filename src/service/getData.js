import fetch from '../config/fetch';
import {getCookie, getStore} from '../config/mUtils';

/**
 * 获取首页娃娃机列表
 */

export const wawaList = () => fetch('api/mywawa/api', {
  api_name: 'index',
  token: getCookie('token'),
  page: 1,
  size: 999
}, 'POST');

/**
 * 获取首页娃娃机轮播图
 */

export const wawaBanner = () => fetch('api/public/?service=Home.getHot', {});


/**
 * 获取当前房间状态
 */

export const gameStart = (room_id) => fetch('api/room/api', {
  api_name: 'room_game_start',
  room_id,
  token: getCookie('token')
}, 'POST');


/**
 * 获取当前房间状态
 */

export const getRoomInfo = (room_id) => fetch('api/room/api', {
  token: getCookie('token'),
  api_name: 'room_info',
  room_id,
}, 'POST');


/**
 * 获取用户信息
 */

export const getUserInfo = (uid) => fetch('api/public/?service=User.getBaseInfo', {
  token: getCookie('token'),
  uid,
}, 'POST');


/**
 * 获取live状态信息
 */

export const getLiveInfo = () => fetch('geth5gw/jsonp', {
  key: 'a1ce39779b1643c5a11e506da0abf9f4',
  cname: 'ggggg',
}, 'POST');


/**
 * 获取live流
 */
export const getLiveStream = () => fetch('v1/machine', {
  appid: '9f8d836d2e1d4f8baf368219c822f479',
  channel: 'ggggg',
  uid1: 1
}, 'POST');


/**
 * 房间观众列表
 */
export const gameAudience = (room_id) => fetch('api/mywawa/api', {
  api_name:'game_audience',
  token:getCookie('token'),
  room_id,
  page:1,
  size:9999
}, 'POST');


/**
 * 登陆
 */
export const loginByPhone = (user_login,user_pass,sys) => fetch('api/public/?service=Login.userLogin', {
  user_login:user_login,
  user_pass:user_pass,
  sys:1,
}, 'POST');


/**
 * 注册账号
 */
export const regByEmail = (user_login,user_pass,code) => fetch('api/public/?service=Login.userLogin', {
  user_login,
  user_pass,
  code,
}, 'POST');


/**
 * 获取短信验证码
 */
export const mobileCode = (mobile) => fetch('api/public/?service=Login.getCode', {
  mobile
}, 'POST');


/**
 * 注册
 */
export const mobileReg = (user_login,user_pass,code) => fetch('api/public/?service=Login.userMobileReg', {
  user_login,
  user_pass,
  code,
}, 'POST');


/**
 * 首页最新公告
 */
export const 	getNewNotice = () => fetch('api/notice/api', {
  api_name:'get_new_notice',
  token:getCookie('token'),
}, 'POST');





/**
 * 获取聊天快捷短语
 */
export const 	getQuick = () => fetch('api/set/api', {
  api_name:'get_quick',
  token:getCookie('token'),
}, 'POST');


/**
 * 游戏结束时取消继续玩
 */
export const 	roomGameCancel = (room_id) => fetch('api/room/api', {
  api_name:'room_game_cancel',
  token:getCookie('token'),
  room_id,
}, 'POST');


/**
 * 新增预约抓娃娃
 */
export const 	roomwaitEdit = (room_id) => fetch('api/room/api', {
  api_name:'roomwait_edit',
  token:getCookie('token'),
  room_id,
}, 'POST');


/**
 * 人工服务文档列表
 */
export const 	roomServiceText = () => fetch('api/room/api', {
  api_name:'room_service_text',
  token:getCookie('token'),
}, 'POST');


/**
 * 人工服务
 */
export const 	roomGameService = (room_id,service_text_id) => fetch('api/room/api', {
  api_name:'room_game_service',
  token:getCookie('token'),
  room_id,
  service_text_id
}, 'POST');


/**
 * 退出房间
 */
export const 	exitRoom = (room_id) => fetch('api/room/api', {
  api_name:'exit_room',
  token:getCookie('token'),
  room_id,
}, 'POST');


/**
 * 最近抓中记录
 */
export const 	roomHistory = (room_id) => fetch('api/room/api', {
  api_name:'room_history',
  token:getCookie('token'),
  room_id,
  page:1,
  size:9999
}, 'POST');


/**
 * 手机忘记密码
 */
export const userMobileFindPass = (user_login,user_pass,code) => fetch('api/public/?service=Login.userMobileFindPass', {
  user_login,
  user_pass,
  code,
}, 'POST');



/**
 * 我的娃娃上面个人信息
 */
export const getInfo = () => fetch('api/mywawa/api', {
  api_name:'get_info',
  token:getCookie('token'),
}, 'POST');


/**
 * 获取自己可转赠的娃娃
 */
export const myDonationwawa = () => fetch('api/mywawa/api', {
  api_name:'my_donation_wawa',
  token:getCookie('token'),
}, 'POST');


/**
 * 转赠娃娃
 */
export const donationwawa = (w_list,to_user_id,msg) => fetch('api/mywawa/api', {
  api_name:'donation_wawa',
  token:getCookie('token'),
  w_list,
  to_user_id,
  msg,
}, 'POST');


/**
 * 获取ticket
 */
export const getTicket = () => fetch('/api/set/api', {
  api_name:'get_someting',
  token:getCookie('token'),
}, 'POST');


/**
 * 获取人工服务开关
 */
export const getServiceSwitch = () => fetch('/api/room/api', {
  api_name:'get_service_switch',
  token:getCookie('token'),
}, 'POST');


/**
 * 获取聊天屏蔽关键字
 */
export const getKeyword = () => fetch('/api/set/api', {
  api_name:'get_keyword',
  token:getCookie('token'),
}, 'POST');


/**
 * 微信公众号登录
 */
export const weixinLogin = (code) => fetch('api/public/?service=Login.weixinLogin', {
  code,
}, 'POST');



/**
 * 观众个人信息
 */
export const audienceDetail = (user_id) => fetch('api/mywawa/api', {
  api_name:'audience_detail',
  token:getCookie('token'),
  user_id,
}, 'POST');



// personal_center  消息列表
export const 	news = () => fetch('api/notice/api', {
  api_name:'get_notice_list',
  token:getCookie('token'),
  page:1
}, 'POST');

// news_details  消息详情

export const 	news_details_data = (id) => fetch('api/notice/api', {
  api_name:'get_notice_info',
  token:getCookie('token'),
  id,
}, 'POST');

// personal_center  我的娃娃上面个人信息接口
export const 	ponson = () => fetch('api/mywawa/api', {
  api_name:'get_info',
  token:getCookie('token'),
}, 'POST');

// personal_center  娃娃币
export const 	coins = () => fetch('index.php?g=Api&m=Record&a=api', {
  api_name:'gold',
  token:getCookie('token'),
}, 'POST');

// personal_center  娃娃币账单
export const 	wawa_lists = () => fetch('index.php?g=Api&m=Record&a=api', {
  api_name:'bodyBill',
  token:getCookie('token'),
}, 'POST');

// recharge_record  充值记录
export const 	recharge_record_list = (page) => fetch('index.php?g=Api&m=Record&a=api', {
  api_name:'recordList',
  token:getCookie('token'),
  page,
}, 'POST');

// bill_details  账单详情
export const 	bill_details_data = (id) => fetch('index.php?g=Api&m=Record&a=api', {
  api_name:'recordDetails',
  token:getCookie('token'),
  o_id:id,
}, 'POST');

// personal_center  我的娃娃
export const 	my_wawas = () => fetch('api/mywawa/api', {
  api_name:'my',
  token:getCookie('token'),
}, 'POST');

// personal_center  我的礼品
export const 	my_gifts = () => fetch('index.php?g=Api&m=Record&a=api', {
  api_name:'giftList',
  token:getCookie('token'),
}, 'POST');
// personal_center  消息列表
export const 	news_data = () => fetch('api/notice/api', {
  api_name:'get_notice_list',
  token:getCookie('token'),
  page:1
}, 'POST');

//// personal_center  获取个人信息
//export const 	personal_pub = (user_id) => fetch('api/public/?service=User.getBaseInfo', {
//token:getCookie('token'),
//uid:user_id
//}, 'POST');

// personal_center  我的娃娃上面个人信息接口
export const 	data_user_names = () => fetch('api/mywawa/api', {
  api_name:'get_info',
  token:getCookie('token'),
  page:1
}, 'POST');

// recharge  充值规则列表
export const 	pay_list = () => fetch('index.php?g=Api&m=Record&a=api', {
  api_name:'gold',
  token:getCookie('token'),
}, 'POST');

// recharge  获取支付方式列表
export const 	pay_datas = () => fetch('index.php?g=Api&m=Record&a=api', {
  api_name:'get_paytype_list',
  token:getCookie('token'),
}, 'POST');

// recharge  确认支付
export const 	pay_qr = (is_id,pay_id) => fetch('index.php?g=Api&m=Record&a=api', {
  api_name:'recharge',
  token:getCookie('token'),
  coin_id:is_id,
  type:pay_id,
  trade_type:"JSAPI"
}, 'POST');

// wawa_bill  充值记录详情
export const 	wawa_bills = (page) => fetch('index.php?g=Api&m=Record&a=api', {
  api_name:'bodyBill',
  token:getCookie('token'),
  page:page
}, 'POST');

// wawa_bill  充值记录详情----上拉加载
export const 	wawa_bills_scroll = (page) => fetch('index.php?g=Api&m=Record&a=api', {
  api_name:'bodyBill',
  token:getCookie('session'),
  page:page+1,
  size:10
}, 'POST');

// my_wawa  我的娃娃上面个人信息接口
export const 	use_name = () => fetch('api/mywawa/api', {
  api_name:'get_info',
  token:getCookie('token')
}, 'POST');

// my_wawa  我的娃娃列表
export const 	all_list = (page) => fetch('api/mywawa/api', {
  api_name:'my',
  token:getCookie('token'),
  page:page
}, 'POST');

// my_wawa  获取娃娃(用于换币)
export const 	wawa_coins = () => fetch('api/mywawa/api', {
  api_name:'get_wawa_list',
  token:getCookie('token'),
  type:1
}, 'POST');

// my_wawa  我决定要换币
export const 	my_wawa_change_coin = (set_coin) => fetch('api/mywawa/api', {
  api_name:'set_coin',
  token:getCookie('token'),
  w_list:set_coin
}, 'POST');

// my_wawa  获取娃娃(用于邮寄)
export const 	wawa_mails = () => fetch('api/mywawa/api', {
  api_name:'get_wawa_list',
  token:getCookie('token'),
  type:2
}, 'POST');

// my_wawa  我决定邮寄
export const 	my_wawa_mail = (set_coin) => fetch('api/mywawa/api', {
  api_name:'mail',
  token:getCookie('token'),
  w_list:set_coin
}, 'POST');

// my_wawa  我的娃娃列表
export const 	all_list_two = (page) => fetch('api/mywawa/api', {
  api_name:'my',
  token:getCookie('token'),
  page:page,
  status:0
}, 'POST');

// my_wawa  我的娃娃列表
export const 	all_list_three = (page) => fetch('api/mywawa/api', {
  api_name:'my',
  token:getCookie('token'),
  page:page,
  status:1
}, 'POST');

// my_wawa  我的娃娃列表
export const 	all_list_four = (page) => fetch('api/mywawa/api', {
  api_name:'my',
  token:getCookie('token'),
  page:page,
  status:2
}, 'POST');

// my_wawa  我的娃娃列表
export const 	all_list_five = (page) => fetch('api/mywawa/api', {
  api_name:'my',
  token:getCookie('token'),
  page:page,
  status:3
}, 'POST');

// my_wawa  我的娃娃列表
export const 	all_list_six = (page) => fetch('api/mywawa/api', {
  api_name:'my',
  token:getCookie('token'),
  page:page,
  status:4
}, 'POST');

// game_record  游戏记录
export const 	game_record_data = (page,size) => fetch('api/mywawa/api', {
  api_name:'game_history',
  token:getCookie('token'),
  page:page,
  size,
}, 'POST');

// game_details  游戏记录详情
export const 	game_details_data = (id) => fetch('api/mywawa/api', {
  api_name:'game_detail',
  token:getCookie('token'),
  hid:id,
}, 'POST');

// complain  我要申诉
export const 	complain_data_list = (id) => fetch('api/mywawa/api', {
  api_name:'appeal_list',
  token:getCookie('token'),
}, 'POST');

// complain  提交申诉
export const 	complain_btn = (id,is_id) => fetch('api/mywawa/api', {
  api_name:'add_appeal',
  token:getCookie('token'),
  hid:id,
  appeal_type:is_id
}, 'POST');

// my_gift  用户礼品兑换次数
export const 	my_gift_number = () => fetch('index.php?g=Api&m=Record&a=api', {
  api_name:'convertNum',
  token:getCookie('token'),
}, 'POST');

// my_gift  我的礼品列表  全部
export const 	my_gift_data_all = (page) => fetch('index.php?g=Api&m=Record&a=api', {
  api_name:'giftList',
  token:getCookie('token'),
  page,
  size:10
}, 'POST');

// my_gift  我的礼品列表  寄存中
export const 	my_gift_data_one = (page) => fetch('index.php?g=Api&m=Record&a=api', {
  api_name:'giftList',
  token:getCookie('token'),
  type:1,
  page,
  size:10
}, 'POST');

// my_gift  我的礼品列表  待邮寄
export const 	my_gift_data_two = (page) => fetch('index.php?g=Api&m=Record&a=api', {
  api_name:'giftList',
  token:getCookie('token'),
  type:2,
  page,
  size:10
}, 'POST');

// my_gift  我的礼品列表  已发货
export const 	my_gift_data_three = (page) => fetch('index.php?g=Api&m=Record&a=api', {
  api_name:'giftList',
  token:getCookie('token'),
  type:3,
  page,
  size:10
}, 'POST');

// exchange_gift  礼品兑换的列表
export const 	exchange_gift_data = (page) => fetch('index.php?g=Api&m=Record&a=api', {
  api_name:'giftConverList',
  token:getCookie('token'),
  page,
  size:10
}, 'POST');

// exchange_gift  礼品兑换
export const 	exchange_gift_change_zero = (set_coin,gfit_id) => fetch('index.php?g=Api&m=Record&a=api', {
  api_name:'giftConvert',
  token:getCookie('token'),
  gift_id:gfit_id,
  w_list:set_coin
}, 'POST');

// exchange_record  礼品兑换记录列表
export const 	exchange_record_data = (page) => fetch('index.php?g=Api&m=Record&a=api', {
  api_name:'convertList',
  token:getCookie('token'),
  page,
  size:10
}, 'POST');

// gift_details  兑换礼品的详情
export const 	gift_details_data = (id) => fetch('index.php?g=Api&m=Record&a=api', {
  api_name:'giftDetails',
  token:getCookie('token'),
  gift_id:id
}, 'POST');

// gift_details  兑换礼品的娃娃数量
export const 	exchange_gift_change = (id) => fetch('index.php?g=Api&m=Record&a=api', {
  api_name:'bodyNum',
  token:getCookie('token'),
  gift_id:id
}, 'POST');

// gift_details  同一种礼品兑换的记录列表
export const 	gift_details_data_list = (id,page) => fetch('index.php?g=Api&m=Record&a=api', {
  api_name:'sameGfitList',
  token:getCookie('token'),
  gift_id:id,
  page,
  size:10
}, 'POST');

// gift_details  同一种礼品兑换的记录列表
export const 	gift_details_show = (id) => fetch('index.php?g=Api&m=Record&a=api', {
  api_name:'giftConvert',
  token:getCookie('token'),
  gift_id:id,
  w_list:2
}, 'POST');

// all_waybill  获取所有运单列表
export const 	all_waybill_data = (page,pagesize) => fetch('api/waybill/api', {
  api_name:'waybill_list',
  token:getCookie('token'),
  page,
  pagesize
}, 'POST');

// all_waybill  确认收货
export const 	all_waybill_qr = (waybillno) => fetch('api/waybill/api', {
  api_name:'confirm',
  token:getCookie('token'),
  waybillno:waybillno
}, 'POST');

// my_code  获取我的邀请码
export const 	my_code_data = () => fetch('api/usercode/api', {
  api_name:'get_code',
  token:getCookie('token'),
}, 'POST');

// my_code  获取填写邀请码规则信息
export const 	my_rule_data = () => fetch('api/usercode/api', {
  api_name:'get_code_config',
}, 'POST');

// com_address  收件地址列表
export const 	com_address_data = () => fetch('api/addr/api', {
  api_name:'addr_list',
  token:getCookie('token'),
}, 'POST');

// com_address 删除收件地址
export const 	com_address_reload = (addr_id) => fetch('api/addr/api', {
  api_name:'addr_del',
  token:getCookie('token'),
  addr_id:addr_id
}, 'POST');

// add_address 删除收件地址
export const 	add_address_list = (oname,phone,oaddr,address_text) => fetch('api/addr/api', {
  api_name:'addr_add',
  token:getCookie('token'),
  username:oname,
  mobile:phone,
  addr:oaddr,
  addr_info:address_text
}, 'POST');

// about_us 关于我们
export const 	about_us_data = () => fetch('api/set/api', {
  api_name:'get_company_name',
  token:getCookie('token'),
}, 'POST');

// question 获取常见问题
export const 	question_data = () => fetch('api/set/api', {
  api_name:'get_faq',
  token:getCookie('token'),
}, 'POST');

// protocol 获取常见问题
export const 	protocol_data = () => fetch('api/set/api', {
  api_name:'get_user_agreement'
}, 'POST');

// notice 获取兑换须知
export const 	notice_data = () => fetch('api/set/api', {
  api_name:'get_know',
  token:getCookie('token'),
}, 'POST');

// wawa_details 娃娃详情
export const 	wawa_details_data = (id) => fetch('api/mywawa/api', {
  api_name:'wawa_detail',
  token:getCookie('token'),
  wawa_id:id
}, 'POST');

// set_address 编辑收件地址
export const 	set_address_btn = (oname,phone,myAddressProvince,myAddressCity,myAddresscounty,address_text,is_id) => fetch('api/addr/api', {
  api_name:'addr_update',
  token:getCookie('token'),
  addr_id:is_id,
  username:oname,
  mobile:phone,
  addr:myAddressProvince+myAddressCity+myAddresscounty,
  addr_info:address_text
}, 'POST');


// updateAvatar 修改个人资料
export const 	updateAvatar = (uid,file,fields) => fetch('api/public/?service=user.updateAvatar', {
  token:getCookie('token'),
  uid,
  file,
  fields,
}, 'POST');


// 修改昵称，性别
export const 	updateFields = (uid,fields) => fetch('api/public/?service=user.updateFields', {
  token:getCookie('token'),
  uid,
  fields,
}, 'POST');


// feedback 提交问题反馈2018.1.25.czy
export const 	feedback_btn = (content,contact) => fetch('api/feedback/api', {
  api_name:'feedback',
  token:getCookie('token'),
  content,
  contact
}, 'POST');
// convert_code 兑换邀请码2018.1.25.czy
export const 	convert_code = (code) => fetch('api/usercode/api', {
  api_name:'convert_code',
  token:getCookie('token'),
  code
}, 'POST');

// change_address 礼品邮寄
export const 	change_address_gift = (id,address_id,otext) => fetch('index.php?g=Api&m=Record&a=api', {
  api_name:'mailGift',
  token:getCookie('token'),
  address_id:address_id,
  gift_id:id,
  remark:otext
}, 'POST');

// wawa_change_address 娃娃邮寄
export const 	wawa_change_address_gift = (id,address_id,otext) => fetch('api/mywawa/api', {
  api_name:'set_mail',
  token:getCookie('token'),
  addr_id:address_id,
  w_list:id,
  remark:otext
}, 'POST');
