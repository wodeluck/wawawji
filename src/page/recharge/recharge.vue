<template>
	<div class="main">
		<header>
			<a @click="black_go"><img :src="require('assets/img/header_back.png')"></a>
			<h2>充值</h2>
			<div class="header_right">
				<router-link to="/recharge_record"></router-link>
				<span>充值记录</span>
			</div>
		</header>
		<section>
			<div class="header">
				<span class="my">我的娃娃币</span>
				<p class="money">{{data.coin}}<span>币</span></p>
				<p class="in_money" v-if="data.firstgive">
					首充<span>{{data.firstgive.money}}</span>元以上，额外得<span>{{data.firstgive.firstgive}}</span>娃娃币
				</p>
			</div>
			<div class="list_small">
				<ul>
					<li v-for="(item,index) in data.charge" @click="bg_color_one(item,index)" :class="{'active':index==current}">
						<h3>{{item.bodycoin}}<span v-if="item.give_coin>0">+{{item.give_coin}}</span><span>币</span></h3>
						<p><span>￥</span>{{item.money}}</p>
					</li>
					<!--<li class="margin">
						<h3>200<span>币</span></h3>
						<p><span>￥</span>20.00</p>
					</li>
					<li>
						<h3>300<span>币</span></h3>
						<p><span>￥</span>30.00</p>
					</li>
					<li>
						<h3>500<span>币</span></h3>
						<p><span>￥</span>50.00</p>
					</li>
					<li class="margin">
						<h3>1000+50<span>币</span></h3>
						<p><span>￥</span>100.00</p>
					</li>				-->
				</ul>
			</div>
			<ul class="list_big">
				<li v-for="(item,index) in data.presenter" @click="bg_color_two(item,index)" :class="{active:index==currents}">
					<div class="left">
						<p class="left_top">{{item.bodyCoin}}<span>币</span></p>
						<p class="left_bottom"><span>￥</span>{{item.money}}</p>
					</div>
					<div class="right">
						<p class="color">立即送</p>
						<div class="image">
							<img :src="item.img"/>
						</div>
						<div class="right_text">
							{{item.name}}
						</div>
					</div>
				</li>
			</ul>
		</section>
		<div class="btn" @click="pay" v-show="pay_pay">充值</div>
		<div class="show_hidden" v-show="name_null">请选择充值金额</div>
		<div class="bg_color" v-show="pay_box">
			<div class="pay">
				<ul>
					<li>
						<img :src="require('assets/img/times.png')" @click="times_hidden" class="del">
						<h2>付款详情</h2>
					</li>
					<li v-for="(item,index) in pay_data" @click="pay_change(item,index)"  v-if="item.id==1">
						<div class="pay_left">
							<img v-if="item.id==1" :src="require('assets/img/weixin.png')">
							<img v-if="item.id==2" :src="require('assets/img/zhifubao.png')">
							<img v-if="item.id==3" :src="require('assets/img/pay.png')" class="pay_img_width">
							<img v-if="item.id==4" :src="require('assets/img/apple.png')">
							<p>{{item.paytype}}</p>
						</div>
						<div class="pay_right">
							<img :src="require('assets/img/empty.png')" v-if="onumber!=index">
							<img :src="require('assets/img/full.png')" v-if="onumber==index">
						</div>
					</li>
				</ul>
				<p class="pay_money">￥{{pay_money}}</p>
				<div class="btn" @click="pay_qr" v-show="pass">确认支付</div>
				<div class="btn" v-show="!pass" style="background: #86d8fe9e;">确认支付</div>
			</div>
		</div>
	</div>
</template>
<script>
import {pay_list,pay_datas,pay_qr} from '../../service/getData';
export default {
  data () {
    return {
      pass:true,
      user_id:"54e3bde9a9c25741acd151dd4b957641",
      is_id:'',
      onumber:-1,
      name_null:false,
      pay_money:0,
      time:500,
	  times:1500,
   	  data:'',
   	  currentActive:-1,
   	  pay_data:[],
   	  current:-1,
   	  currents:-1,
   	  opresenter:[],
   	  ocharge:[],
      pay_pay:true,
      pay_box:false,
      null_show:true,
      full_show:false,
      show:false,
      pay_id:'',
      weixin_pay_data:''
    }
  },
  created(){
  		pay_list().then(res => {   //充值规则列表
  			console.log(res)
          if (res.code == 1) {
            this.data=res.data;
          } else {
            console.log(err)
          }
        });
//		this.$post('index.php?g=Api&m=Record&a=api',{      //充值规则列表
//			api_name:'gold',
//			token:this.user_id,
//		}).then((res) => {
//	        console.log(res);
//	        if(res.code==1){
//	        	this.data=res.data;
//	        }
//	     },err => {
//	        console.log(err)
//	     })
		pay_datas().then(res => {   //获取支付方式列表
			console.log(res)
          if (res.code == 1) {
            this.pay_data=res.data;
          } else {
            console.log(err)
          }
        });
//
//		this.$post('index.php?g=Api&m=Record&a=api',{      //获取支付方式列表
//			api_name:'get_paytype_list',
//			token:this.user_id,
//		}).then((res) => {
//	        console.log(res);
//	        if(res.code==1){
//	        	this.pay_data=res.data;
//	        	console.log(this.pay_data);
//	        }
//	     },err => {
//	        console.log(err)
//	     })
  },
  methods:{
	  	bg_color_one(item,index){
	  		this.pay_money=item.money;
			this.current=index;
			this.currents=-1;
			this.is_id=item.charge_id;
			console.log(this.is_id);
	  	},
	  	bg_color_two(item,index){
	  		this.pay_money=item.money;
			this.currents=index;
			this.current=-1;
			this.is_id=item.charge_id;
			console.log(this.is_id);
	  	},
	  	pay(){
	  		if(this.is_id==''||this.is_id==null){
	  			var _self=this;

		  			window.setTimeout(function(){
		              _self.name_null=!_self.name_null;
		            }, _self.time);
		            window.setTimeout(function(){
		              _self.name_null=!_self.name_null;
		            }, _self.times);
		            return false;
	  		}
	  		this.pay_box=!this.pay_box;
	  		this.pay_pay=!this.pay_pay;
	  	},
	  	times_hidden(){
	  		this.pay_box=!this.pay_box;
	  		this.pay_pay=!this.pay_pay;
	  	},
	  	pay_change(item,index){
			console.log(item.id);
			this.pay_id=item.id;
			console.log(this.pay_id);

		   this.onumber=index;

	  	},
	  	pay_qr(){
	  		this.pass=!this.pass;
	  		pay_qr(this.is_id,this.pay_id).then(res => {   //确认支付
	  			console.log(res)
	          if (res.code == 1) {	          	   
					var jsApiParameters = {};					
					jsApiParameters=res.data;
					callpay();
					function jsApiCall(){
				        WeixinJSBridge.invoke(
				                'getBrandWCPayRequest',
				                jsApiParameters,
				                function(res){
				                    if(res.err_msg == 'get_brand_wcpay_request:ok'){
				                    	location.reload(); 
//				                        alert('充值成功');
				                    }else{
				                        alert('充值取消或失败');
				                    }
				
				                }
				        );
				    }
				    function callpay(){
				        if (typeof WeixinJSBridge == "undefined"){
				            if( document.addEventListener ){
				                document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
				            }else if (document.attachEvent){
				                document.attachEvent('WeixinJSBridgeReady', jsApiCall);
				                document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
				            }
				        }else{
				            jsApiCall();
				        }
				    }
	          } else {
	            console.log(err)
	          }
	        });
//	  		this.$post('index.php?g=Api&m=Record&a=api',{      //确认支付
//			api_name:'recharge',
//			token:this.user_id,
//			coin_id:this.is_id,
//			type:this.pay_id
//			}).then((res) => {
//		        console.log(res);
//		        if(res.code==1){
//
//		        }
//		     },err => {
//		        console.log(err)
//		     })
	  },
	  black_go(){
	  		this.$router.go(-1)
	  }
  	}
}
</script>

<style lang="scss" scoped>
  @import '../../style/mixin';
	section{
		margin-top: 40px;
    padding: 15px 15px 50px;
	}
	.header_right{
		line-height: 40px;
	    padding-right: 15px;
	    color: #fff;
	    width:80px;
	}
	.header_right span{
		color:#fff;
	}
	section .header{
		text-align:center;
	}
	section .header .my{
		font-size: 15px;
	    color: #999;
	    letter-spacing: 1px;
	}
	section .header .money{
		  /*font-size: 28px;*/
      @include font-dpr(28px);
	    font-weight: bold;
	    line-height: 50px;
	    color: #F47988;
	}
	section .header .money span{
		font-size: 16px;
		padding-left: 8px;
	}
	section .header .in_money{
		font-size: 16px;
	    line-height: 36px;
	    font-weight: bold;
	    color: #999;
	    letter-spacing: 1px;
	}
	section .header .in_money span{
		color: #86D8FF;
	}
	div.list_small{
		margin-top: 35px;
		background:#fff;

	}
	ul{display:block;}
	div.list_small ul li{
		display: inline-block;
    	vertical-align: top;
		width:31%;
		text-align:center;
		height:50px;
		border:1px solid #eee;
		border-radius:8px;
		margin-bottom:10px;
	}
	div.list_small ul li.active{
		background: #86D8FE;
		color:#fff;
		border: 1px solid #86D8FE;
	}
	div.list_small ul li.active p,div.list_small ul li.active p span{
		color:#fff;
	}
	div.list_small ul li.active h3{
		font-weight:lighter;
		color:#fff;
	}
	div.list_small ul li.active h3 span{
		color:#fff;
	}
	div.list_small ul li.bg{
		background: #86D8FE;
		color:#fff;

	}
	div.list_small ul li.bg h3{
		font-weight: 500;
	}
	div.list_small ul li.bg p{
		color:#fff;
	}
	div.list_small ul li:nth-child(2),div.list_small ul li:nth-child(5){
		margin:0px 2%;
	}
	div.list_small ul li h3{
		font-size:16px;
		padding-top: 5px;
	}
	div.list_small ul li h3 span{
		margin-left:5px;
	}
	div.list_small ul li p,div.list_small ul li p span{
		font-size:12px;
		color:#aaa;
	}

	.list_big{
		margin-top:15px;
	}
	.list_big li div{
		display:inline-block;
	}
	.list_big li{
		height: 80px;
	    border: 1px solid #86D8FE;
	    border-radius: 8px;
	    margin-bottom: 14px;

	}
	.list_big li.active{
	   background: #86D8FE;
	   color:#fff;
	}
	.list_big li.active .left p,.list_big li.active .left p span{
		color:#fff;
	}
	.list_big li .left{
		width: 30%;
    text-align: center;
    height: 80px;
    padding-top: 20px;
    box-sizing: border-box;
	}
	.list_big li .left .left_top{
		font-size: 16px;
	}
	.list_big li .left .left_bottom,.list_big li .left .left_bottom span{
		font-size: 14px;
		color:#aaa;
	}
	.list_big li .right{
		width: 67%;
    float: right;
    height: 72px;
    background: #fff;
    border-radius: 5px;
    margin: 4px;
	}
	.list_big li .right .image{
		vertical-align: top;
	}
	.list_big li .right .image img{
		width: 49px;
		height: 42px;
	    vertical-align: top;
	    margin-top: 10px;
	}
	.list_big li .right p{
		display:inline-block;
	}
	.list_big li .right .color{
		font-size: 12px;
    height: 100%;
    line-height: 72px;
    color: #F79CA6;
    padding:0px 4px;
	}
	.list_big li .right .right_text{
		font-size: 13px;
    	width: 45%;
    	vertical-align: middle;
        margin-left: 5px;
        color:#000;
	}
	.btn{
		position: fixed;
	    bottom: 0;
	    height: 50px;
	    text-align: center;
	    width: 100%;
	    background: #86D8FE;
	    line-height: 50px;
	    color: #fff;
	    font-size: 16px;
	    letter-spacing: 2px;
	}

	/*支付*/
	.bg_color{
		position:fixed;
		z-index: 999;
		top:0;
		bottom:0;
		background:rgba(0,0,0,0.5);
		width:100%;
		height:100%;
	}
	.bg_color .pay{
		width:100%;
		background:#fff;
		height:340px;
		position:absolute;
		bottom:0;
	}
	.bg_color .pay ul li{
		height:46px;
		border-bottom:1px solid #ccc;
		margin:0px 10px;
	}
	.bg_color .pay ul li .del{
		width:15px;
		vertical-align:top;
		position:absolute;
		left:0;
		top:0;
		margin-top:18px;
	}
	.bg_color .pay ul li:nth-child(1){
		text-align:center;
		position:relative;
	}
	.bg_color .pay ul li h2{
		display: inline-block;
		height:100%;
		font-size:17px;
		font-weight: 500;
		line-height:46px;
	}
	.bg_color .pay ul li .pay_left,.bg_color .pay ul li .pay_right{
		display:inline-block;
	}
	.bg_color .pay ul li .pay_left img{
		width:26px;
		height:28px;
		vertical-align:top;
		margin-top:10px;
		margin-right:40px;
	}
	.bg_color .pay ul li .pay_left img.pay_img_width{
		width:60px;
		height:15px;
		margin-top:17px;
		margin-right:6px;
	}
	.bg_color .pay ul li .pay_left p{
		display:inline-block;
		height:100%;
		line-height:46px;
		font-size:16px;
	}
	.bg_color .pay ul li .pay_right{
		float:right;
		height:100%;
	}
	.bg_color .pay ul li .pay_right img{
		width:20px;
		vertical-align:top;
		margin-top:12px;
	}
	.bg_color .pay .pay_money{
		text-align:center;
		line-height:50px;
		font-size:20px;
		color:#F47E8C;
	}
	.show_hidden{
		width:40%;
		height:50px;
		border-radius:10px;
		background:rgba(0,0,0,0.8);
		position:fixed;
		top:50%;
		left:30%;
		color:#aaa;
		text-align:center;
		line-height: 50px;
		z-index:9999;
		opacity:1;
	}
</style>
