<template>
	<div class="main">
		<header>
			<a  @click="black_go"><img :src="require('assets/img/header_back.png')"></a>
			<h2>选择收货地址</h2>
			<div class="header_right"  @click="add">
				<img :src="require('assets/img/add_address.png')">
			</div>
		</header>
		<section>
			<myAddress v-on:pico="pic_change"></myAddress>
			<div class="speack">
				<textarea placeholder="请留下你的备注哟" v-model="otext"></textarea>
			</div>
		</section>
		<div class="window_show" v-show="mail_null">邮寄订单申请成功</div>
		<div class="window_show" v-show="full_null">该产品已申请邮寄</div>
		<div class="window_show" v-show="address_null">请选择收货地址</div>
		<div class="btn" @click="btn_gift" v-show="btn_show">确定</div>
		<div class="btn" style="background:#86d8fea3;"  v-show="!btn_show">确定</div>
	</div>
</template>

<script>
import {wawa_change_address_gift} from '../../service/getData';
//组件收货地址
import com_address from '../components/com_address';
export default {  
  components:{
  	"myAddress":com_address
  },
  data () {
    return {
 	 	address_id:'',
 	 	otext:'',
 	 	mail_null:false,
 	 	time:500,
 	 	times:1500,
 	 	btn_show:true,
 	 	full_null:false,
 	 	address_null:false
    }
  },
  created(){
	console.log(this.$route.query.id)	
  },
  methods:{
  	  pic_change(data){
  	  	
  	  	this.address_id=data;
  	  	console.log(this.address_id);
  	  },
  	  btn_gift(){
  	  		if(this.address_id==""){
  	  			var _self=this;
		  			window.setTimeout(function(){
		              _self.address_null=!_self.address_null;
		            }, _self.time);
		            window.setTimeout(function(){
		              _self.address_null=!_self.address_null;
		            }, _self.times);
		            return false;
  	  		}
  	  		wawa_change_address_gift(this.$route.query.id,this.address_id,this.otext).then(res => {   //礼品邮寄
			  console.log(res);
	          if (res.code == 1){
	          		this.btn_show=!this.btn_show;
	            	var _self=this;
		  			window.setTimeout(function(){
		              _self.mail_null=!_self.mail_null;
		            }, _self.time);
		            window.setTimeout(function(){
		              _self.mail_null=!_self.mail_null;
		            }, _self.times);
		            this.otext="";
	          } else {
	            var _self=this;
		  			window.setTimeout(function(){
		              _self.full_null=!_self.full_null;
		            }, _self.time);
		            window.setTimeout(function(){
		              _self.full_null=!_self.full_null;
		            }, _self.times);
	          }
	        });
  	  },
  	  black_go(){
	  		this.$router.go(-1)
	  },
	  add(){
  	  	this.$router.push({path:'/add_address'});
  	  }
  }
}
</script>

<style scoped>
	section{
		margin-top:40px;
	}
	header .header_right img{
		width:20px;
		vertical-align:top;
		margin-top:9px;
	}	
	.speack{
		padding: 0 10px;
	    margin-top: 40px;
	    width: 100%;
	    box-sizing: border-box;
	}
	textarea{
		width: 100%;
	    height: 100px;
	    border: 1px solid #86D8FE;
	    border-radius: 8px;
	    text-indent: 5px;
	    font-size: 15px;
	    line-height: 20px;
	}
	.btn{
		width: 90%;
	    background: #86D8FE;
	    color: #fff;
	    margin: 50px 5%;
	    text-align: center;
	    height: 50px;
	    line-height: 50px;
	    font-size: 18px;
	    border-radius: 30px;
	}
	.window_show{
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