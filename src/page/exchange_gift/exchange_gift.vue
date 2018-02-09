<template>
	<div class="main">
		<header>
			<a @click="black_go"><img :src="require('assets/img/header_back.png')"></a>
			<h2>兑换礼品</h2>
			<div class="header_right">				
				<span @click="record">兑换记录</span>
			</div>
		</header>
		<section>
			<div class="exchange_banner" @click="notice">
				<img :src="require('assets/img/exchange_banner.png')">
			</div>
			<ul v-if="data.length>0">
				<li class="list" v-for="item in data">
					<div class="list_left">
						<img class="wawa" :src="item.img">
					</div>
					<div class="list_right">
						<h3>{{item.name}}</h3>
						<p><span class="number">{{item.convert_num}}个</span><span class="gift">娃娃可换</span></p>
						<p class="graw">库存：{{item.quantity}}个</p>
						<button class="one" @click="record_details(item)">详情</button>
						<button class="two" @click="change(item)">换</button>
					</div>
				</li>
			</ul>
			<div class="push_data" v-show="pushData">上拉加载更多</div>
			<div class="push_data" v-show="pushNone">暂无更多</div>
		</section>
		<!--兑换娃娃弹窗-->
		<div class="wawa_window" v-show="change_coin">
			<div class="container">
				<img class="del_del" :src="require('assets/img/del_hidden.png')" @click="del_wawa">
				<div class="window_box">
					<div class="window_box_header">
						<img :src="change_data.gfit_img"/>
						<div class="window_box_header_right">
							<h3>{{change_data.gfit_name}}</h3>
							<p><span>{{change_data.convert_num}}个</span>普通娃娃</p>
						</div>
					</div>
					<div class="window_header">你现有可兑换的娃娃：</div>
					<ul v-if="list_body.length>0">
						<li v-for="(item,index) in change_data.body">
							<div class="box_left">								
								<img class="list_pic" :src="item.body_img">																
								<div class="middle">
									<h3>{{item.body_name}}</h3>
									<span>我还有{{item.count}}个</span>
								</div>
							</div>
							<div class="box_right">
								<img class="remove_img" :src="require('assets/img/remove.png')" @click="wawa_remove(item,index)">
								<!--<span class="number">{{item.onumber}}</span>-->
								<input type="number" v-model="item.onumber"/>
								<img class="add_img" :src="require('assets/img/add.png')" @click="wawa_add(item,index)" v-show="add_show">
								<img class="add_img" :src="require('assets/img/add.png')"  v-show="!add_show">
							</div>
						</li>
					</ul>
					<div v-else class="pos_wawa">-- 暂无可兑换娃娃  --</div>
					<div class="box_bottom">
						<p>还差<span>{{all_coin}}</span>个</p>
						<div class="box_btn" @click="change_zero">我决定要换</div>
					</div>
				</div>
			</div>
		</div>
		<div class="window_show" v-show="name_null">兑换成功</div>
	</div>
</template>

<script>
import {exchange_gift_data,exchange_gift_change,exchange_gift_change_zero,exchange_gift_data_scroll} from '../../service/getData';
	export default {   
  data () {
    return {
    	list_body:[],
    	name_null:false,
    	add_show:true,
    	user_id:"54e3bde9a9c25741acd151dd4b957641",
    	data:[],
    	change_data:"",
    	all_coin:"",
    	page:1,
    	change_coin:false,
    	time:500,
    	times:1500,
    	num: 10, // 一页显示多少条
    	pushData:false,
    	pushNone:false,
    }
  },
  created(){
  	exchange_gift_data(this.page).then(res => {   //礼品兑换的列表
			  console.log(res);
	          if (res.code == 1) {
	             this.data=res.data;
	             if(res.data.length==10){
	            		this.pushData=true;
	            	}
	          } else {
	             console.log(err)
	          }
	        });
//	this.$post('index.php?g=Api&m=Record&a=api',{      //礼品兑换的列表
//			api_name:'giftConverList',
//			token:this.user_id,
//			page:this.page,
//			size:10
//		}).then((res) => {
//	        console.log(res);
//	        if(res.code==1){     
//	        	this.data=res.data;
//	        	
//	        }        
//	     },err => {
//	        console.log(err)
//	     })
	      var _self=this;
  		//获取滚动条当前的位置 
          function getScrollTop() {
              var scrollTop = 0;
              if(document.documentElement && document.documentElement.scrollTop) {
                  scrollTop = document.documentElement.scrollTop;
              } else if(document.body) {
                  scrollTop = document.body.scrollTop;
              }
             return scrollTop;
         }
 
         //获取当前可视范围的高度 
         function getClientHeight() {
             var clientHeight = 0;
             if(document.body.clientHeight && document.documentElement.clientHeight) {
                 clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
             } else {
                 clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
             }
             return clientHeight;
         }
 
         //获取文档完整的高度 
         function getScrollHeight() {
             return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
         }
  		         //滚动事件触发
         var tur=true;
         if(tur==true){
         window.onscroll = function() {            	
             if(getScrollTop() + getClientHeight() == getScrollHeight()){
             	 setTimeout(function(){
             		_self.pushData=false;
	             	_self.pushDown=true;
	             	_self.page++;
	             	exchange_gift_data_scroll(_self.page).then(res => {   	             	 	
	             	 	console.log(res);
			          if (res.code == 1) {				          		
			          	    for(var i in res.data){
			          	    	res.data[i].ctime=timestampToTime(res.data[i].ctime);				
			          	    	_self.data.push(res.data[i]);
			          	    	
			          	    	console.log(_self.data)
			          	    	_self.pushData=true;
	             				_self.pushDown=false;
			          	    	if(res.data.length<_self.num){			          	    		
									_self.pushNone=true;
									_self.pushData=false;          					
									getScrollTop() + getClientHeight() != getScrollHeight();
									tur=false;
								}
			          	    }
			          	    
			          } else {
			            console.log(err)
			          }
			        });  
			     },500) 
             }
         }
       }
  },
  methods:{
  	black_go(){
	  		this.$router.push({path:'/personal_center'});
	  },
  	record(){
  		this.$router.push({path:'/exchange_record'});
  	},
  	record_details(item){         //  详情
  		this.$router.push({
  			path:'/gift_details',
  			query:{
  				id:item.id
  			}
  		});
  	},
	notice(){
		this.$router.push({path:'/notice'});
	},
	del_wawa(){
		this.change_coin=!this.change_coin;
	},
	change(item){
		this.change_coin=!this.change_coin;
		exchange_gift_change(item.id).then(res => {   //兑换礼品的娃娃数量
			  console.log(res);
	          if (res.code == 1) {
	             this.change_data=res.data;
	           	 this.list_body=this.change_data.body
	             for(var i=0;i<this.change_data.body.length;i++){
	        		this.change_data.body[i].onumber=0;
	        	}
	             this.all_coin=this.change_data.convert_num;
	             this.change_coin=false;
	             this.change_coin=true;
	            console.log(this.change_data); 
	          } else {
	             console.log(err)
	          }
	        });
	},
	wawa_remove(item,index){
		item.onumber--;
    	if(item.onumber<=0){
    		 item.onumber=0;
    	}
      	this.change_data.body[index].onumber = item.onumber;
      	
      	this.set_mail_wawa();
      	if(this.all_coin>=1){
      		this.add_show=true;
      	}
      	this.change_coin=false;
      	this.change_coin=true;
	},
	wawa_add(item,index){
			item.onumber++;
    	if(item.onumber>=parseInt(item.count)){
    		item.onumber=item.count;
    	}
      	this.change_data.body[index].onumber = item.onumber;
      	
      	this.set_mail_wawa();
      	if(this.all_coin==0){
      		this.add_show=false;
      	}
      	if(this.all_coin>=1){
      		this.add_show=true;
      	}
      	this.change_coin=false;
      	this.change_coin=true;
	},
	set_mail_wawa(){
    	var all_coin = 0;
      for(var i in this.change_data.body){
        console.log(this.change_data.body[i].onumber);
        if(this.change_data.body[i].onumber != 0){
          console.log(this.change_data.body[i].onumber);
          console.log(this.change_data.body[i].needcoin);
          all_coin += parseInt(this.change_data.body[i].onumber);
        }
      }   
      this.all_coin =this.change_data.convert_num-all_coin;
      if(this.all_coin<=0){
      	this.all_coin=0;
      }
   },
   change_zero(){
   	 if(this.all_coin==0){
   	 	 var set_coin = [];
	      for(var i in this.change_data.body){
	        if(this.change_data.body[i].onumber != 0){
	          set_coin.push(this.change_data.body[i].body_id +':'+this.change_data.body[i].onumber);
	        }
	      }
	    exchange_gift_change_zero(set_coin,this.change_data.gfit_id).then(res => {  
          console.log(res);
        if (res.code == 1) {
			var _self=this;
		  			window.setTimeout(function(){
		              _self.name_null=!_self.name_null;
		            }, _self.time);
		            window.setTimeout(function(){
		              _self.name_null=!_self.name_null;
		            }, _self.times);
		           this.change_coin=!this.change_coin;
		           for(var j in this.change_data.body){
		           	  this.change_data.body[j].onumber=0;
		           }
		           this.all_coin=this.change_data.convert_num;
        } else {
          console.log(err)
        }
      });
   	 }
   }
  }
     
}
</script>

<style scoped>
	section{
		margin-top:50px;
	}
	.header_right{
		width: 90px;
	}
	.header_right span{
		line-height:40px;
		color:#fff;
	}
	/*banner*/
	.exchange_banner img{
		width:100%;
		height:100px;
	}
	li{
		background:#fff;
		margin: 0 10px;
	    border-bottom: 1px dashed #eee;
	    padding: 10px 0;
	}
	li div{
		display:inline-block;
		vertical-align:top;
	}
	li .list_left img{
		border: 1px solid #eee;
	    width: 90px;
	    height:76px;
	    margin-right: 5px;
	}
	li .list_right h3{
		font-size: 16px;
    	color: #000000d4;
	}
	li .list_right p .number{
		font-size: 16px;
	    font-weight: bold;
	    color: #F47E8C;
	    padding-right: 5px;
	}
	li .list_right p .gift{
		font-size: 14px;
    	color: #86D8FF;
	}
	li .list_right p.graw{
		font-size: 15px;
    	color: #aaa;
	}
	button{
		border: none;
	    color: #fff;	   
	    font-size: 14px;
	    width:62px;
	    height:26px;
	    border-radius: 20px;
	    margin-top:5px;
	}
	.list_right button.one{
		 background: #86D8ff;
		 margin-right:5px;
	}
	.list_right button.two{
		 background:#F47E8C;
	}
	 /* 兑换娃娃弹窗*/
    .wawa_window{
    	position:  fixed;
	    background:  rgba(0,0,0,0.5);
	    width:  100%;
	    height:  100%;
	    top: 0;
	    left:  0;
	    z-index:  999;
    }
    .wawa_window .window_box .window_box_header{
    	border-bottom: 1px solid #ccc;
	    padding: 5px 0;
	    margin-bottom: 5px;
    }
    .wawa_window .window_box .window_box_header img{
    	width: 74px;
    }
    .wawa_window .window_box .window_box_header .window_box_header_right{
    	display: inline-block;
	    vertical-align: top;
	    padding-top: 10px;
	    padding-left: 5px;
    }
    .wawa_window .window_box .window_box_header .window_box_header_right h3{
    	font-size: 15px;
    font-weight: bold;
    }
    .wawa_window .window_box .window_box_header .window_box_header_right p{
    	font-size: 13px;
	    line-height: 22px;
	    color: #F6909B;
    }
    .wawa_window .window_box .window_box_header .window_box_header_right span{
    	color: #f3293f;
	    padding-right: 5px;
	    font-size: 16px;
    }
    .wawa_window .window_box,.container{
    	background:  #fff;
    border-radius:  10px;
   
    box-sizing:  border-box;
    }
    .container{
    	width: 90%;
    	position:  absolute;
    top: 50%;
    left:  5%;
    height: 400px;
    margin-top: -200px;
    }
    .wawa_window .window_box{
    	overflow:  hidden;
    	 padding: 10px;
    	 width:100%;
    }
    .del_del{
    	position: absolute;
    top: -40px;
    left: -3px;
    width: 24px;
    }
    .wawa_window .window_box .window_header{
    	font-size: 14px;
    font-weight: bold;
    }
    .wawa_window .window_box ul{
    	height: 270px;
    overflow-y: scroll;
    }
    .wawa_window .window_box ul li{
    	position: relative;
    height: 80px;
    border-bottom: 1px dashed #eee;
    padding: 8px;
    box-sizing: border-box;
    }
    .wawa_window .window_box ul li .box_left{
    	position: absolute;
    width: 70%;
    left: 0;
    }
    .wawa_window .window_box ul li .box_left .list_pic{
    	width: 64px;
    }
    .wawa_window .window_box ul li .box_left .middle{
    	display: inline-block;
    vertical-align: top;
    margin-left: 5px;
    margin-top: 12px;
    }
    .wawa_window .window_box ul li .box_left .middle h3{
    	font-size: 16px;
    font-weight: lighter;
    }
    .wawa_window .window_box ul li .box_left .middle span{
    	font-size: 13px;
    color: #ff000082;
    }
    .wawa_window .window_box ul li .box_right{
    	position: absolute;
    right: 0;
    height: 64px;
        padding-top: 20px;
    box-sizing: border-box;
    }
    .wawa_window .window_box ul li .box_right input{
    	width: 35px;
    text-align: center;
    height: 25px;
    vertical-align: top;
    font-size: 20px;
    }
    .wawa_window .window_box ul li .box_right span{
    	display: inline-block;
    font-size: 24px;
    vertical-align: bottom;
    margin: 0 5px;
        color: #000000c7;
    }
    .wawa_window .window_box ul li .box_right img{
    	width:25px;
    }
    .wawa_window .window_box .box_bottom{
    	text-align: right;
    height: 50px;
    line-height: 50px;
    }
    .wawa_window .window_box .box_bottom p{
    	display: inline-block;
    font-size: 14px;
    margin-right: 15px;
    }
    .wawa_window .window_box .box_bottom p span{
    	font-size: 22px;
    color: #ff0000a3;
    padding: 5px;
    }
    .wawa_window .window_box .box_bottom .box_btn{
    	display: inline-block;
    width: 110px;
    text-align: center;
    font-size: 16px;
    background: #86D8FF;
    color: #fff;
    font-weight: bold;
    letter-spacing: 1px;
    border-radius: 20px;
    line-height: 35px;
    height: 35px;
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
    .pos_wawa{
    text-align: center;
    color: #ccc;
    font-size: 18px;
    line-height: 100px;
    height: 260px;
   }
   .push_data{
		text-align: center;
		width:100%;
		font-size:20px;
		color:#aaa;
		height:50px;
	}
</style>