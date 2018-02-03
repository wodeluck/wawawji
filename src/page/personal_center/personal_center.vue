<template>
	<div>
		<header>
			<a  @click="black_go"><img :src="require('assets/img/header_back.png')"></a>
			<h2>我的</h2>
			<div class="header_right" @click="news">
				<img :src="require('assets/img/ic_news.png')">
				<span>{{onumber}}</span>
			</div>
		</header>
		<div class="user">
			<div class="header_img">
				<div class="out_label">
					<router-link to="/set_data">
						<img class="pic_personl" :src="data_user_name.avatar"/>
					</router-link>
					<div class="in_label" v-if="data_user_name.sex==1" style="background: #86d8ff;">
						<img class="pic_label" :src="require('assets/img/center_pic_label.png')" style="margin-top:2px;"/>
					</div>
					<div class="in_label" v-if="data_user_name.sex==2" style="background: #F47E8C;">
						<img class="pic_label" :src="require('assets/img/key_left.png')" style="margin-top:1px;"/>
					</div>
				</div>
				<div class="user_name">
					<div class="inline_black">
						<span style="color:#fff;">{{data_user_name.user_nicename}}</span>
						<img class="pic_label" :src="require('assets/img/center_name_right.png')"/>
					</div>
				</div>
				<p>ID:{{data_user_name.user_id}}</p>
			</div>
		</div>
		<!--列表-->
		<div class="list">
			<ul>
				<li @click="recharge">
					<div class="list_left">
						<img :src="require('assets/img/center_money.png')">
						<p>我的娃娃币</p>
					</div>
					<div class="list_right">
						<p>余额<span>{{coin}}</span></p>
						<img :src="require('assets/img/right.png')">
					</div>
				</li>
				<li @click="wawa_con">
					<div class="list_left">
						<img :src="require('assets/img/center_list.png')">
						<p>娃娃币帐单</p>
					</div>
					<div class="list_right">
						<p><span>{{wawa_list}}</span></p>
						<img :src="require('assets/img/right.png')">
					</div>
				</li>
				<li @click="my_wawa_router">
					<div class="list_left">
						<img :src="require('assets/img/center_wawa.png')">
						<p>我的娃娃</p>
					</div>
					<div class="list_right">
						<p><span>{{my_wawa}}</span></p>
						<img :src="require('assets/img/right.png')">
					</div>
				</li>
				<li @click="my_gift_next">
					<div class="list_left">
						<img :src="require('assets/img/center_gift.png')">
						<p>我的礼品</p>
					</div>
					<div class="list_right">
						<p><span>{{my_gift}}</span></p>
						<img :src="require('assets/img/right.png')">
					</div>
				</li>
				<li @click="all_waybill">
					<div class="list_left">
						<img :src="require('assets/img/center_waybill.png')">
						<p>所有运单</p>
					</div>
					<div class="list_right">
						<img :src="require('assets/img/right.png')">
					</div>
				</li>
			</ul>
			<ul>
				<li @click="my_code">
					<div class="list_left">
						<img :src="require('assets/img/center_code.png')">
						<p>我的邀请码</p>
					</div>
					<div class="list_right">
						<img :src="require('assets/img/right.png')">
					</div>
				</li>
				<!--<li>
					<div class="list_left">
						<img :src="require('assets/img/center_with_code.png')">
						<p>输入邀请码</p>
					</div>
					<div class="list_right">
						<img :src="require('assets/img/right.png')">
					</div>
				</li>-->
			</ul>
			<ul>
				<li @click="address">
					<div class="list_left">
						<img :src="require('assets/img/center_address.png')">
						<p>收货地址</p>
					</div>
					<div class="list_right">
						<img :src="require('assets/img/right.png')">
					</div>
				</li>
				<li @click="set">
					<div class="list_left">
						<img :src="require('assets/img/center_set.png')">
						<p>设置</p>
					</div>
					<div class="list_right">
						<img :src="require('assets/img/right.png')">
					</div>
				</li>
				<li @click="feedback">
					<div class="list_left">
						<img :src="require('assets/img/center_tick.png')">
						<p>反馈</p>
					</div>
					<div class="list_right">
						<img :src="require('assets/img/right.png')">
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import {ponson,news,coins,wawa_lists,my_wawas,my_gifts} from '../../service/getData';
export default {

  data () {
    return {
     	onumber:"0",
     	coin:"0",
     	wawa_list:"0",
     	my_wawa:"0",
     	my_gift:"0",
     	user_id:"54e3bde9a9c25741acd151dd4b957641",
     	data_user_name:""
    }
  },
  created(){

       news().then(res => {   //消息列表
       	  
          if (res.code == 1) {
            this.onumber=res.data.length;
	        console.log(this.onumber);
          } else {
            console.log(err)
          }
        });


//	this.$post('api/notice/api',{      //消息列表
//			api_name:'get_notice_list',
//			token:this.user_id,
//			page:1
//		}).then((res) => {
//	        console.log(res);
//	        if(res.code==1){
//	        	this.onumber=res.data.length;
//	        	console.log(this.onumber);
//	        }
//	     },err => {
//	        console.log(err)
//	     })
ponson().then(res => {   //我的娃娃上面个人信息接口
			console.log(res);
          if (res.code == 1) {
            this.data_user_name=res.data;
          } else {
            console.log(err)
          }
        });
//	this.$post('api/mywawa/api',{      //我的娃娃上面个人信息接口
//			api_name:'get_info',
//			token:this.user_id,
//		}).then((res) => {
//	        console.log(res);
//	        if(res.code==1){
//	        	this.data_user_name=res.data;
//	        }
//	     },err => {
//	        console.log(err)
//	     })
coins().then(res => {   //娃娃币
		console.log(res);
          if (res.code == 1) {
            this.coin=res.data.coin;
          } else {
            console.log(err)
          }
        });
//	this.$post('index.php?g=Api&m=Record&a=api',{      //娃娃币
//			api_name:'gold',
//			token:this.user_id
//
//		}).then((res) => {
//	        console.log(res);
//	        if(res.code==1){
//	        	this.coin=res.data.coin;
//	        }
//	     },err => {
//	        console.log(err)
//	     })
//
wawa_lists().then(res => {   //娃娃币账单
		console.log(res);
          if (res.code == 1) {
            this.wawa_list=res.data.list.length;
          } else {
            console.log(err)
          }
        });
//	this.$post('index.php?g=Api&m=Record&a=api',{      //娃娃币账单
//			api_name:'bodyBill',
//			token:this.user_id
//		}).then((res) => {
//	        console.log(res);
//	        if(res.code==1){
//	        	this.wawa_list=res.data.list.length;
//	        }
//	     },err => {
//	        console.log(err)
//	    })
//
my_wawas().then(res => {   //我的娃娃
		console.log(res);
          if (res.code == 1) {
            this.my_wawa=res.data.length;
          } else {
            console.log(err)
          }
        });
//	this.$post('api/mywawa/api',{      //我的娃娃
//			api_name:'my',
//			token:this.user_id
//		}).then((res) => {
//	        console.log(res);
//	        if(res.code==1){
//	        	this.my_wawa=res.data.length;
//	        }
//	     },err => {
//	        console.log(err)
//	    })
//
my_gifts().then(res => {   //我的礼品
		console.log(res);
          if (res.code == 1) {
            this.my_gift=res.data.length;
          } else {
            console.log(err)
          }
        });
//	this.$post('index.php?g=Api&m=Record&a=api',{      //我的礼品
//			api_name:'giftList',
//			token:this.user_id
//		}).then((res) => {
//	        console.log(res);
//	        if(res.code==1){
//	        	this.my_gift=res.data.length;
//	        }
//	     },err => {
//	        console.log(err)
//	    })
  },
  methods:{
  	news(){
  		this.$router.push({path:'/news_center'});
  	},
  	recharge(){
  		this.$router.push({path:'/recharge'});
  	},
  	wawa_con(){
  		this.$router.push({path:'/wawa_bill'});
  	},
  	my_wawa_router(){
  		this.$router.push({path:'/my_wawa'});
  	},
  	my_gift_next(){
  		this.$router.push({path:'/my_gift'});
  	},
  	all_waybill(){
  		this.$router.push({path:'/all_waybill'});
  	},
  	my_code(){
  		this.$router.push({path:'/my_code'});
  	},
  	feedback(){
  		this.$router.push({path:'/feedback'});
  	},
  	address(){
  		this.$router.push({path:'/address'});
  	},
  	set(){
  		this.$router.push({path:'/set'});
  	},
  	black_go(){
	  		this.$router.go(-1)
	}
  },
  mounted(){

  }
}
</script>

<style lang="scss" scoped>
  @import '../../style/mixin';
	body{
		background:#F5F5F5;
	}
	/*顶部*/
	header .header_right img{
		  /*width: 20px;*/
      @include px2rem(width, 40);
	    vertical-align: top;
	    /*margin-top: 14px;*/
      @include px2rem(margin-top, 28);
	}
	header .header_right span{
		display: inline-block;
	    position: absolute;
	    color: #fff;
	    /*width: 15px;*/
      @include px2rem(width, 30);
	    /*height: 15px;*/
      @include px2rem(height, 30);
	    background: #F20000;
	    border-radius: 50%;
	    /*font-size: 12px;*/
      @include font-dpr(12px);
	    text-align: center;
	    /*line-height: 15px;*/
      @include px2rem(line-height, 30);
	    /*top: 5px;*/
      @include px2rem(top, 10);
	    /*right: 12px;*/
      @include px2rem(right, 24);
	}
	/*头像区域*/
	.user{
		height: 130px;
    	background: #86D8FE;
    	text-align:center;
    	margin-top:40px;
	}
	.user .header_img .out_label{
		display: inline-block;
   		width: 100px;
   		position:relative;
	}
	.user .header_img .out_label .pic_personl{
		width:66px;
		height:66px;
		border-radius: 50%;
    	border: 2px solid #fff;
	}
	.user .header_img .out_label .in_label{
		display: inline-block;
	    position: absolute;
	    width: 18px;
	    height: 18px;
	    border: 1px solid #fff;
	    border-radius: 50%;
	    text-align: center;
	    top: 46px;
	    right: 15px;
	    background: #86D8FE;
	}
	.user .header_img .out_label .in_label .pic_label{
		width: 12px;
	    vertical-align: top;
	    margin-top: 3px;
	}
	.user_name .inline_black{
		display: inline-block;
	    font-size: 15px;
	    color: #fff;
	    font-weight:bold;
	    padding-left:18px;
	}
	.user_name .inline_black img{
		width: 15px;
    	vertical-align: middle;
	}
	.header_img p{
		font-size: 14px;
    	color: #fff;
	}
	.list ul li{
		height:40px;
	}
	.list ul li .list_left img{
		width:18px;
		vertical-align:top;
		margin-top:10px;
		margin-right:10px;
	}
	.list ul li .list_left{
		line-height:40px;
		/*font-size:16px;*/
    @include font-dpr(16px);
	}
	.list ul li .list_right{

		line-height:40px;
		font-size:16px;
		color:#BDBDBD;
	}
	.list ul li .list_right img{
		vertical-align:center;
		width:8px;
		/*margin-top:13px;*/
		margin-left:10px;
	}
	.list ul li .list_right span{
		padding-left:7px;
	}
</style>
