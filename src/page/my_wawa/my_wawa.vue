<template>
	<div class="main">
		<header>
			<a @click="black_go"><img :src="require('assets/img/header_back.png')"></a>
			<h2>我的娃娃</h2>
			<div class="header_right">
				<router-link to="/game_record"></router-link>
				<span>游戏记录</span>
			</div>
		</header>
		<section>
			<!--banner 信息部分-->
			<div class="banner">
				<img class="banner_img" :src="require('assets/img/my_wawa_banner.png')">
				<div class="banner_left">
					<div class="banner_left_img">
						<img class="pic" :src="data_user_name.avatar">
						<div class="key"   v-if="data_user_name.sex==1" style="background:#86d8ff;">
							<img :src="require('assets/img/center_pic_label.png')">
						</div>
						<div class="key"  v-if="data_user_name.sex==2"  style="background: #F47E8C;">
							<img :src="require('assets/img/key_left.png')">
						</div>
					</div>
					<div class="banner_left_id">
						<h3>{{data_user_name.user_nicename}}</h3>
						<p>(ID:{{data_user_name.user_id}})</p>
					</div>
				</div>
				<div class="banner_right">
					<p class="banner_right_one">抓中<span>{{data_user_name.total}}</span>次</p>
					<p class="banner_right_two">转赠<span>{{data_user_name.ztotal}}</span>个</p>
					<p class="banner_right_three">获赠<span>{{data_user_name.gtotal}}</span>个</p>
				</div>
			</div>
			<!--选项卡 内容 -->
			 <div id="app" class="box">
	            <ul class="tabs clearfix">
	                <li v-for="(tab,index) in tabsName">
	                    <a href="#" class="tab-link" @click="tabsSwitch(index)" v-bind:class="{active:tab.isActive}">{{tab.name}}</a>
	                </li>
	            </ul>
	            <div class="cards">
	            	<!--全部-->
	                <div class="tab-card" style="display: block;" id="card_one">
	                	<ul v-if="data_all_list.length>0">
	                		<li v-for="item in data_all_list" @click="all(item)">
	                			<div class="list_top">
	                				<label class="in" v-if="item.status==0">寄存中</label>
	                				<label class="in_one" v-if="item.status==1">待邮寄</label>
	                				<label class="in_two" v-if="item.status==2">已发货</label>
	                				<label class="in_three" v-if="item.status==3">已转赠</label>
	                				<label class="in_three" v-if="item.status==4">获赠</label>
	                				<label class="in_three" v-if="item.status==5">已确认</label>
	                				<img  class="wawa" :src="item.gifticon">
	                				<!--<img  class="wawa" :src="require('assets/img/face.png')">-->
	                				<!--<video width="26" height="22" :style="note">
	                					<source :src="item.video" type="video/mp4"></source>
	                				</video>-->
	                				<!--<img class="video" :src="require('assets/img/video.png')">-->
	                				<div class="present" v-if="item.is_receive>0">赠</div>
	                			</div>
	                			<div class="list_bottom">
	                				<h3>{{item.giftname}}</h3>
	                				<p>{{item.ctime}}</p>
	                				<p v-if="item.conv==1 && item.status==(0||4)">可兑换游戏币：{{item.needcoin}}</p>
	                				<p v-if="item.conv==0 && item.status==(1||2||3)" class="del">不可兑换游戏币：{{item.needcoin}}</p>
	                			</div>
	                		</li>
	                	</ul>
	                	<div v-else class="null_data">--暂无娃娃--</div>	                	
	                </div>
	                <div class="tab-card" id="card_two">
	                	<ul v-if="data_all_list_two.length>0">
	                		<li v-for="item_one in data_all_list_two" @click="one(item_one)">
	                			<div class="list_top">
	                				<label class="in" v-if="item_one.status==0">寄存中</label>
	                				<img class="wawa" :src="item_one.gifticon">
	                				<!--<img class="video" :src="require('assets/img/video.png')">-->
	                				<div class="present" v-if="item_one.is_receive>0">赠</div>
	                			</div>
	                			<div class="list_bottom">
	                				<h3>{{item_one.giftname}}</h3>
	                				<p>{{item_one.ctime}}</p>
	                				<p v-if="item_one.conv==1 && item_one.status==(0||4)">可兑换游戏币：{{item_one.needcoin}}</p>
	                				<!--<p v-if="item_one.conv==0" class="del">不可兑换游戏币：{{item_one.needcoin}}</p>-->
	                			</div>
	                		</li>
	                	</ul>
	                	<div v-else class="null_data">--暂无娃娃--</div>
	                	
	                </div>
	                <div class="tab-card" id="card_three">
	                	<ul v-if="data_all_list_three.length>0">
	                		<li v-for="item_two in data_all_list_three" @click="two(item_two)">
	                			<div class="list_top">

	                				<label class="in_one" v-if="item_two.status==1">待邮寄</label>

	                				<img class="wawa" :src="item_two.gifticon">
	                				<!--<img class="video" :src="require('assets/img/video.png')">-->
	                				<div class="present" v-if="item_two.is_receive>0">赠</div>
	                			</div>
	                			<div class="list_bottom">
	                				<h3>{{item_two.giftname}}</h3>
	                				<p>{{item_two.ctime}}</p>
	                				<!--<p v-if="item_two.conv==1">可兑换游戏币：{{item_two.needcoin}}</p>-->
	                				<p v-if="item_two.conv==0 && item_two.status==1" class="del">不可兑换游戏币：{{item_two.needcoin}}</p>
	                			</div>
	                		</li>
	                	</ul>
	                	<div v-else class="null_data">--暂无娃娃--</div>
	                	
	                </div>
	                <div class="tab-card" id="card_four">
	                	<ul v-if="data_all_list_four.length>0">
	                		<li v-for="item_four in data_all_list_four" @click="four(item_four)">
	                			<div class="list_top">

	                				<label class="in_two" v-if="item_four.status==2">已发货</label>

	                				<img class="wawa" :src="item_four.gifticon">
	                				<!--<img class="video" :src="require('assets/img/video.png')">-->
	                				<div class="present" v-if="item_four.is_receive>0">赠</div>
	                			</div>
	                			<div class="list_bottom">
	                				<h3>{{item_four.giftname}}</h3>
	                				<p>{{item_four.ctime}}</p>
	                				<!--<p v-if="item_four.conv==1">可兑换游戏币：{{item_four.needcoin}}</p>-->
	                				<p v-if="item_four.conv==0 && item_four.status==2" class="del">不可兑换游戏币：{{item_four.needcoin}}</p>
	                			</div>
	                		</li>
	                	</ul>
	                	<div v-else class="null_data">--暂无娃娃--</div>
	                	
	                </div>
	                <div class="tab-card" id="card_five">
	                	<ul v-if="data_all_list_five.length>0">
	                		<li v-for="item_five in data_all_list_five" @click="five(item_five)">
	                			<div class="list_top">
	                				<label class="in_three" v-if="item_five.status==3">已转赠</label>
	                				<img class="wawa" :src="item_five.gifticon">
	                				<!--<img class="video" :src="require('assets/img/video.png')">-->
	                				<div class="present"  v-if="item_five.is_receive>0">赠</div>
	                			</div>
	                			<div class="list_bottom">
	                				<h3>{{item_five.giftname}}</h3>
	                				<p>{{item_five.ctime}}</p>
	                				<!--<p v-if="item_five.conv==1">可兑换游戏币：{{item_five.needcoin}}</p>-->
	                				<p v-if="item_five.conv==0 && item_five.status==3" class="del">不可兑换游戏币：{{item_five.needcoin}}</p>
	                			</div>
	                		</li>
	                	</ul>
	                	<div v-else class="null_data">--暂无娃娃--</div>
	                	
	                </div>
	                <div class="tab-card" id="card_six">
	                	<ul v-if="data_all_list_six.length>0">
	                		<li v-for="item_six in data_all_list_six" @click="six(item_six)"  v-if="item_six.is_receive>0">
	                			<div class="list_top">
	                				<label class="in" v-if="item_six.status==0">寄存中</label>
	                				<img class="wawa" :src="item_six.gifticon">
	                				<!--<img class="video" :src="require('assets/img/video.png')">-->
	                				<div class="present"  v-if="item_six.is_receive>0">赠</div>
	                			</div>
	                			<div class="list_bottom">
	                				<h3>{{item_six.giftname}}</h3>
	                				<p>{{item_six.ctime}}</p>
	                				<p v-if="item_six.conv==1 && item_six.status==(0||4)">可兑换游戏币：{{item_six.needcoin}}</p>
	                				<!--<p v-if="item_six.conv==0" class="del">不可兑换游戏币：{{item_six.needcoin}}</p>-->
	                			</div>
	                		</li>
	                	</ul>
	                	<div v-else class="null_data">--暂无娃娃--</div>
	                	
	                </div>
	            </div>
	        </div>
			<!--底部按钮-->
			<div class="btn_bottom">
				<button @click="chang_coin">换币</button>
				<button @click="mile">邮寄</button>
				<button @click="chang_lift">换礼品</button>
			</div>
		</section>
		<!--兑换娃娃弹窗-->
		<div class="wawa_window" v-show="change_coin">
			<div class="container">
				<img class="del_del" :src="require('assets/img/del_hidden.png')" @click="del_del">
				<div class="window_box">
					<div class="window_header">你现有可兑换的娃娃：</div>
					<ul v-if="wawa_coin.length>0">
						<li v-for="(item,index) in wawa_coin">
							<div class="box_left">
								<img class="list_pic" :src="item.gifticon">
								<div class="middle">
									<h3>{{item.giftname}}</h3>
									<span>我还有{{item.total}}个</span>
								</div>
							</div>
							<div class="box_right">
								<img class="remove_img" :src="require('assets/img/remove.png')" @click="wawa_remove(item,index)">
								<!--<span class="number">{{item.onumber}}</span>-->
								<input type="number" v-model="item.onumber"/>
								<img class="add_img" :src="require('assets/img/add.png')" @click="wawa_add(item,index)">
							</div>
						</li>
					</ul>
					<div class="pos_wawa" v-else>--  暂无可兑换的娃娃  --</div>
					<div class="box_bottom">
						<p>可兑换娃娃币<span>{{all_coin}}</span>个</p>
						<div class="box_btn" @click="my_change">我决定要换</div>
					</div>
				</div>
			</div>
		</div>
		<!--邮寄娃娃弹窗-->
		<div class="wawa_window" v-show="mail">
			<div class="container">
				<img class="del_del" :src="require('assets/img/del_hidden.png')" @click="del_del">
				<div class="window_box">
					<div class="window_header">你现有可邮寄的娃娃：</div>
					<ul v-if="wawa_mail.length>0">
						<li v-for="(item,index) in wawa_mail">
							<div class="box_left">
								<img class="list_pic" :src="item.gifticon">
								<div class="middle">
									<h3>{{item.giftname}}</h3>
									<span>我还有{{item.total}}个</span>
								</div>
							</div>
							<div class="box_right">
								<img class="remove_img" :src="require('assets/img/remove.png')" @click="mail_wawa_remove(item,index)">
								<input type="number" v-model="item.onumber"/>
								<img class="add_img" :src="require('assets/img/add.png')" @click="mail_wawa_add(item,index)">
							</div>
						</li>
					</ul>
					<div class="pos_wawa" v-else>--  暂无可邮寄的娃娃  --</div>
					<div class="box_bottom">
						<p>可邮寄的娃娃<span>{{all_wawa_pla}}</span>个</p>
						<div class="box_btn" @click="mail_wawa">我决定邮寄</div>
					</div>
				</div>
			</div>
		</div>
		<div class="window_show" v-show="name_null">换币成功</div>
		<div class="window_show" v-show="mail_null">添加邮寄成功</div>
	</div>
</template>


<script>
import {all_list_six_scroll,all_list_five_scroll,all_list_four_scroll,all_list_three_scroll,all_list_two_scroll,all_list_scroll,my_wawa_mail,my_wawa_change_coin,use_name,all_list,wawa_coins,wawa_mails,all_list_two,all_list_three,all_list_four,all_list_five,all_list_six} from '../../service/getData';
export default {
  data () {
    return {
 	 	tabsName:[{
                name: "全部",
                isActive: true
            }, {
                name: "寄存中",
                isActive: false
            }, {
                name: "待邮寄",
                isActive: false
            }, {
                name: "已发货",
                isActive: false
            }, {
                name: "已转增",
                isActive: false
            }, {
                name: "获增",
                isActive: false
            }],
            active: false,
            user_id:"54e3bde9a9c25741acd151dd4b957641",
	    	data_user_name:'',
	    	page:1,
	    	list_one:[],
	    	list_two:[],
	    	list_three:[],
	    	list_four:[],
	    	list_five:[],
	    	list_six:[],
	    	data_all_list:[],
	    	data_all_list_two:[],
	    	data_all_list_three:[],
	    	data_all_list_four:[],
	    	data_all_list_five:[],
	    	data_all_list_six:[],
	    	mail:false,
	    	change_coin:false,
	    	all_coin:0,     //  兑换娃娃币数量
	    	wawa_coin :[],
	    	wawa_mail:[],
	    	note:{
	    		backgroundImage: "url(" + require("assets/img/video.png") + ")",
	    	},
//	    	onumber:[],
	    	name_null:false,
	    	mail_null:false,
	    	time:500,
	    	times:1500,
	    	all_wawa_pla:0,
	    	num: 10, // 一页显示多少条
    }
  },
  created(){
	function timestampToTime(timestamp) {
        var date = new Date(timestamp * 1000),//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        Y = date.getFullYear() + '-',
        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-',
        D = date.getDate() + ' ',
        h = date.getHours() + ':',
        m = date.getMinutes() + ':',
        s = date.getSeconds();
        return Y+M+D+h+m+s;
   }
		use_name().then(res => {   //我的娃娃上面个人信息接口
			
          if (res.code == 1) {
            this.data_user_name=res.data;
          } else {
            console.log(err)
          }
        });
//			var _self=this;
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
	all_list(this.page).then(res => {   //我的娃娃列表
		  console.log(res);
		  console.log(1)
          if (res.code == 1) {
            this.data_all_list=res.data;
	        	for(var i=0;i<this.data_all_list.length;i++){
	        		this.data_all_list[i].ctime=timestampToTime(res.data[i].ctime);
	        	}	        	
          } else {
            console.log(err)
          }
        });
//	this.$post('api/mywawa/api',{      //我的娃娃列表
//			api_name:'my',
//			token:this.user_id,
//			page:this.page
//		}).then((res) => {
//	        console.log(res);
//	        if(res.code==1){
//	        	this.data_all_list=res.data;
//	        	for(var i=0;i<this.data_all_list.length;i++){
//	        		this.data_all_list[i].ctime=formatDate(new Date(parseInt(res.data[i].ctime)));
//	        	}
//	        }
//	     },err => {
//	        console.log(err)
//	     })
wawa_coins().then(res => {   //获取娃娃(用于换币)
		  
          if (res.code == 1){
          		this.wawa_coin=res.data;
	        	for(var i=0;i<this.wawa_coin.length;i++){
	        		this.wawa_coin[i].onumber=0;
	        	}

	        	console.log(this.wawa_coin)
          } else {
            console.log(err)
          }
        });
//	this.$post('api/mywawa/api',{      //获取娃娃(用于换币)
//			api_name:'get_wawa_list',
//			token:this.user_id,
//			type:1
//		}).then((res) => {
//	        console.log(res);
//	        if(res.code==1){
//	         this.wawa_coin=res.data;
//	        	 for(var i=0;i<this.wawa_coin.length;i++){
//	        		this.wawa_coin[i].onumber=0;
//	        	}
//	        	console.log(this.wawa_coin);
//	        }
//	     },err => {
//	        console.log(err)
//	     })
wawa_mails().then(res => {   //获取娃娃(用于邮寄)
		  
          if (res.code == 1){
            this.wawa_mail=res.data;
            for(var i=0;i<this.wawa_mail.length;i++){
	        		this.wawa_mail[i].onumber=0;
	        	}
            console.log(this.wawa_mail);
          } else {
            console.log(err)
          }
        });
//	this.$post('api/mywawa/api',{      //获取娃娃(用于邮寄)
//			api_name:'get_wawa_list',
//			token:this.user_id,
//			type:2
//		}).then((res) => {
//	        console.log(res);
//	        if(res.code==1){
//	        	this.wawa_mail=res.data;
//	        }
//	     },err => {
//	        console.log(err)
//	     })
//		all_list(this.page).then(res => {   //我的娃娃列表--全部
//			  console.log(res);
//	          if (res.code == 1) {
//	            this.data_all_list=res.data;
//		        	for(var i=0;i<this.data_all_list.length;i++){
//		        		this.data_all_list[i].ctime=formatDate(new Date(parseInt(res.data[i].ctime)));
//		        	}
//	          } else {
//	            console.log(err)
//	          }
//	        });
	    all_list_two(this.page).then(res => {   //我的娃娃列表--寄存中
			  console.log(res);
			  console.log(2)
	          if (res.code == 1) {
	            this.data_all_list_two=res.data;
		        	for(var i=0;i<this.data_all_list_two.length;i++){
		        		this.data_all_list_two[i].ctime=timestampToTime(res.data[i].ctime);
		        	}		     
	          } else {
	            console.log(err)
	          }
	        });
	    all_list_three(this.page).then(res => {   //我的娃娃列表--待邮寄
			  console.log(res);
			    console.log(3)
	          if (res.code == 1) {
	            	this.data_all_list_three=res.data;
		        	for(var i=0;i<this.data_all_list_three.length;i++){
		        		this.data_all_list_three[i].ctime=timestampToTime(res.data[i].ctime);
		        	}
	          } else {
	            console.log(err)
	          }
	        });
	    all_list_four(this.page).then(res => {   //我的娃娃列表--已发货
			  console.log(res);
			    console.log(4)
	          if (res.code == 1) {
	            	this.data_all_list_four=res.data;
		        	for(var i=0;i<this.data_all_list_four.length;i++){
		        		this.data_all_list_four[i].ctime=timestampToTime(res.data[i].ctime);
		        	}
	          } else {
	            console.log(err)
	          }
	        });
	    all_list_five(this.page).then(res => {   //我的娃娃列表--已转赠
			  console.log(res);
			    console.log(5)
	          if (res.code == 1) {
	            	this.data_all_list_five=res.data;
		        	for(var i=0;i<this.data_all_list_five.length;i++){
		        		this.data_all_list_five[i].ctime=timestampToTime(res.data[i].ctime);
		        	}
	          } else {
	            console.log(err)
	          }
	        });
	    all_list_six(this.page).then(res => {   //我的娃娃列表--获赠
			  console.log(res);
			    console.log(6)
	          if (res.code == 1) {
	            	this.data_all_list_six=res.data;
		        	for(var i=0;i<this.data_all_list_six.length;i++){
		        		this.data_all_list_six[i].ctime=timestampToTime(res.data[i].ctime);
		        	}
	          } else {
	            console.log(err)
	          }
	        });
	      
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
	             	_self.page++;
	             	all_list_scroll(_self.page).then(res => {     // 全部	             	 	
	             	 	console.log(res);
			          if (res.code == 1) {				          		
			          	    for(var i in res.data){
			          	    	res.data[i].ctime=timestampToTime(res.data[i].ctime);				
			          	    	_self.data_all_list.push(res.data[i]);			          	    	
			          	    	console.log(_self.data_all_list)
			          	    	if(res.data.length<_self.num){			          	    						
									getScrollTop() + getClientHeight() != getScrollHeight();
									tur=false;
								}
			          	    }
			          	    
			          } else {
			            console.log(err)
			          }
			        }); 
			        
			       all_list_two_scroll(_self.page).then(res => {   	     //  寄存中        	 	
	             	 	console.log(res);
			          if (res.code == 1) {				          		
			          	    for(var i in res.data){
			          	    	res.data[i].ctime=timestampToTime(res.data[i].ctime);				
			          	    	_self.data_all_list_two.push(res.data[i]);			          	    	
			          	    	console.log(_self.data_all_list_two)			          	    	
			          	    }
			          	    
			          } else {
			            console.log(err)
			          }
			        }); 
			        
			        all_list_three_scroll(_self.page).then(res => {   	     //  待邮寄        	 	
	             	 	console.log(res);
			          if (res.code == 1) {				          		
			          	    for(var i in res.data){
			          	    	res.data[i].ctime=timestampToTime(res.data[i].ctime);				
			          	    	_self.data_all_list_three.push(res.data[i]);			          	    	
			          	    	console.log(_self.data_all_list_three)			          	    	
			          	    }
			          	    
			          } else {
			            console.log(err)
			          }
			        });  
			        
			        all_list_four_scroll(_self.page).then(res => {   	     //  已发货       	 	
	             	 	console.log(res);
			          if (res.code == 1) {				          		
			          	    for(var i in res.data){
			          	    	res.data[i].ctime=timestampToTime(res.data[i].ctime);				
			          	    	_self.data_all_list_four.push(res.data[i]);			          	    	
			          	    	console.log(_self.data_all_list_four)			          	    	
			          	    }
			          	    
			          } else {
			            console.log(err)
			          }
			        });  
			        
			         all_list_five_scroll(_self.page).then(res => {   	     //  已转赠	
	             	 	console.log(res);
			          if (res.code == 1) {				          		
			          	    for(var i in res.data){
			          	    	res.data[i].ctime=timestampToTime(res.data[i].ctime);				
			          	    	_self.data_all_list_five.push(res.data[i]);			          	    	
			          	    	console.log(_self.data_all_list_five)			          	    	
			          	    }
			          	    
			          } else {
			            console.log(err)
			          }
			        });  
			        
			         all_list_six_scroll(_self.page).then(res => {   	     //  获赠	
	             	 	console.log(res);
			          if (res.code == 1) {				          		
			          	    for(var i in res.data){
			          	    	res.data[i].ctime=timestampToTime(res.data[i].ctime);				
			          	    	_self.data_all_list_six.push(res.data[i]);			          	    	
			          	    	console.log(_self.data_all_list_six)			          	    	
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
  	tabsSwitch: function(tabIndex) {
  		console.log(tabIndex)
        var tabCardCollection = document.querySelectorAll(".tab-card"),
                        len = tabCardCollection.length;

                    for(var i = 0; i < len; i++) {
                        tabCardCollection[i].style.display = "none";
            this.tabsName[i].isActive = false;
        }
        this.tabsName[tabIndex].isActive = true;
        tabCardCollection[tabIndex].style.display = "block";
   },
    all(item){
    	this.$router.push({
    		path:'/wawa_details',
    		query:{
    			id:item.w_id,
    			status:item.status
    		}
    	})
    },
    one(item_one){
    	this.$router.push({
    		path:'/wawa_details',
    		query:{
    			id:item_one.w_id,
    			status:item_one.status
    		}
    	})
    },
    two(item_two){
    	this.$router.push({
    		path:'/wawa_details',
    		query:{
    			id:item_two.w_id,
    			status:item_two.status
    		}
    	})
    },
    four(item_four){
    	this.$router.push({
    		path:'/wawa_details',
    		query:{
    			id:item_four.w_id,
    			status:item_four.status
    		}
    	})
    },
    five(item_five){
    	this.$router.push({
    		path:'/wawa_details',
    		query:{
    			id:item_five.w_id,
    			status:item_five.status
    		}
    	})
    },
    six(item_six){
    	this.$router.push({
    		path:'/wawa_details',
    		query:{
    			id:item_six.w_id,
    			status:item_six.status
    		}
    	})
    },
    wawa_remove(item,index){
    	item.onumber--;
    	if(item.onumber<=0){
    		 item.onumber=0;
    	}
      this.wawa_coin[index].onumber = item.onumber;
      this.set_coin();
    },
    wawa_add(item,index){
    		item.onumber++;
    	if(item.onumber>=parseInt(item.total)){
    		item.onumber=item.total;
    	}
      this.wawa_coin[index].onumber = item.onumber;
    	console.log(item);
    	console.log(this.wawa_coin);
      this.set_coin();
    },
    chang_coin(){
    	this.change_coin=!this.change_coin;
    },
    del_del(){
      this.change_coin = false;
      this.mail= false;
    },
    mile(){
      this.mail=!this.mail;
    },
    chang_lift(){
		this.$router.push({path:'/exchange_gift'})
    },
    black_go(){
	  		this.$router.push({path:'/personal_center'})
	},
    set_coin(){
      console.log(this.wawa_coin);
      var all_coin = 0;
      for(var i in this.wawa_coin){
        console.log(this.wawa_coin[i].onumber);
        if(this.wawa_coin[i].onumber != 0){
          console.log(this.wawa_coin[i].onumber);
          console.log(this.wawa_coin[i].needcoin);
          all_coin += this.wawa_coin[i].onumber * this.wawa_coin[i].needcoin;
        }
      }
      console.log(all_coin);
      this.all_coin = all_coin;
    },
    my_change(){
      if(this.all_coin==0){
      	return false;
      }
      var set_coin = [];
      for(var i in this.wawa_coin){
        if(this.wawa_coin[i].onumber != 0){
          set_coin.push(this.wawa_coin[i].wawa_id +':'+this.wawa_coin[i].onumber);
        }
      }
      console.log(set_coin.join(','));
        my_wawa_change_coin(set_coin).then(res => {
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
		           for(var j in this.wawa_coin){
		           	  this.wawa_coin[j].onumber=0;
		           }
		           this.all_coin=0;
        } else {
          console.log(err)
        }
      });
    },
    mail_wawa_remove(item,index){
    	item.onumber--;
    	if(item.onumber<=0){
    		 item.onumber=0;
    	}
      	this.wawa_mail[index].onumber = item.onumber;
      	this.mail=false;
      	this.mail=true;
      	console.log(item.onumber);
      	this.set_mail_wawa()
    },
    mail_wawa_add(item,index){
    		item.onumber++;
    	if(item.onumber>=parseInt(item.total)){
    		item.onumber=item.total;
    	}
      	this.wawa_mail[index].onumber = item.onumber;
      	this.mail=false;
      	this.mail=true;
      	console.log(item.onumber);
      	this.set_mail_wawa()
    },
    mail_wawa(){
    	if(this.all_wawa_pla==0){
    		return false;
    	}
    	 var set_coin = "";
      for(var i in this.wawa_mail){
        if(this.wawa_mail[i].onumber != 0){
          set_coin+=this.wawa_mail[i].wawa_id +':'+this.wawa_mail[i].onumber+',';
//        set_coin=substr(0, set_coin.length - 1);

        }
      }
      console.log(set_coin.substr(set_coin.length-1,1));
      if(set_coin.substr(set_coin.length-1,1)==","){
    	 set_coin=set_coin.slice(0,set_coin.length-1);
      }
      console.log(set_coin);
//      my_wawa_mail(set_coin).then(res => {
//        console.log(res);
//      if (res.code == 1) {
//			var _self=this;
//		  			window.setTimeout(function(){
//		              _self.mail_null=!_self.mail_null;
//		            }, _self.time);
//		            window.setTimeout(function(){
//		              _self.mail_null=!_self.mail_null;
//		            }, _self.times);
//		           this.mail=!this.mail;
//		           for(var j in this.wawa_mail){
//		           	  this.wawa_mail[j].onumber=0;
//		           }
//		           this.all_coin=0;
			this.$router.push({
				path:'/wawa_change_address',
				query:{
					id:set_coin
				}
			})
//      } else {
//        console.log(err)
//      }
//    });
    },
    set_mail_wawa(){
    	var all_wawa_pla = 0;
      for(var i in this.wawa_mail){
        console.log(this.wawa_mail[i].onumber);
        if(this.wawa_mail[i].onumber != 0){
          console.log(this.wawa_mail[i].onumber);
          console.log(this.wawa_mail[i].needcoin);
          all_wawa_pla += parseInt(this.wawa_mail[i].onumber);
        }
      }
      this.all_wawa_pla = all_wawa_pla;
    }
   
  }
}
</script>

<style scoped>
	video{
		background-size:100% 100%;
	}
	.null_data{
		text-align: center;
	    margin-top: 40px;
	    color: #aaa;
	}
	body{
		overflow: initial;
	}
	header .header_right{
		width:70px;
		padding-right:15px;
		color:#fff;
		line-height:40px;
	}
	header .header_right span{

		color:#fff;

	}
	section{
		margin-top:48px;
	}
	/* banner栏	*/
	.banner{
		position:relative;
		height: 90px;
	}
	.banner img.banner_img{
		width:100%;
		height: 100%;
	}
	.banner .banner_left,.banner .banner_right{
		position:absolute;
		top:0;
		z-index:99;
		height:100%;
	}
	.banner .banner_left{
		width:56%;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.banner .banner_right{
		right:0;
		width:42%;
		font-size: 15px;
	    line-height: 22px;
	    text-indent: 10px;
	    padding-top: 10px;
	    box-sizing: border-box;
	}
	.banner .banner_left .banner_left_img{
		height:100%;
		position:relative;
		width: 40%;
    	padding-left: 10px;
	}
	.banner .banner_left .banner_left_img .key{
		display: inline-block;
	    position: absolute;
	    width: 20px;
	    height: 20px;
	    background: #F47E8C;
	    border: 1px solid #fff;
	    border-radius: 50%;
	    text-align: center;
	    top: 52px;
	    left: 58px;
	}
	.banner .banner_left .banner_left_img .key img{
		width: 10px;
	    vertical-align: top;
	    margin-top: 3px;
	}
	.banner .banner_left .banner_left_id,.banner .banner_left .banner_left_img{
		display:inline-block;
		vertical-align:top;
	}
	.banner .banner_left .banner_left_img .pic{
		width: 58px;
		height:58px;
	    vertical-align: top;
	    margin-top: 15px;
    	border-radius: 50%;
    	border: 1px solid #fff;
	}
	.banner .banner_left .banner_left_id{
		margin-top: 23px;
    	padding-left: 6px;
	}
	.banner .banner_left .banner_left_id h3{
		font-size: 17px;
	}
	.banner .banner_left .banner_left_id p{
		font-size: 14px;
	}
	.banner .banner_right p span{
		font-weight:bold;
		padding:0px 3px;
	}
	.banner .banner_right p:nth-child(2) span{
		color:#86D8FE;
	}
	.banner .banner_right p:nth-child(3) span{
		color:#F47E8C;
	}
	/*选项卡*/
	.box{
        width: 100%;
		margin: 0 auto;
    }
    .tabs li {
        float: left;
       	width:16.6%;
        list-style: none;
        height:40px;
        text-align:center;
    }
    .tabs .tab-link {
        display: block;
        height: 40px;
        line-height: 49px;
        color: #9E9E9E;
        text-decoration: none;
    }
    .tabs .tab-link.active {
        border-bottom: 2px solid #86D8FE;
        transition: .3s;
        color:#86D8FE;
    }
    .tabs .tab-link{
        height: 40px;
    }
    .cards {
        float: left;
        margin-top:15px;
        width:100%;
        padding-bottom: 50px;
    }
    .cards .tab-card {
        display: none;
    }
    .clearfix:after {
        content: "";
        display: block;
        height: 0;
        clear: both;
    }
    .clearfix {
        zoom: 1;
        padding-left:10px;
        box-sizing: border-box;
    }
    .cards .tab-card ul{
    	width:100%;
    }
    .cards .tab-card ul li{
    	width:50%;
    	float:left;
    	padding:0px 8px;
    	box-sizing: border-box;
    	margin-bottom:25px;
    	height: 230px;
    }
    .cards .tab-card ul li .list_top{
    	width:100%;
    	position:relative;
    }
    .cards .tab-card ul li .list_top label{
    	position:absolute;
    	top:0;
    	right:0;
    	font-size:15px;
    	width:60px;
    	height:30px;
    	line-height:30px;
    	text-align:center;
    	color:#fff;
    }
    .cards .tab-card ul li .list_top label.in{
    	background:#86D8FF;
    }
    .cards .tab-card ul li .list_top label.in_one{
    	background:#F47E8C;
    }
    .cards .tab-card ul li .list_top label.in_two{
    	background:#F47E8C;
    }
    .cards .tab-card ul li .list_top label.in_three{
    	background:#C689FF;
    }
    .cards .tab-card ul li .list_top label.wiat{
    	background:#F47E8C;
    }
    .cards .tab-card ul li .list_top label.change{
    	background:#C689FF;
    }
    .cards .tab-card ul li .list_top .wawa{
    	width:100%;
    	border:1px solid #eee;
    	height:170px;
    }
    .cards .tab-card ul li .list_top .video{
    	position:absolute;
    	width:26px;
    	height:22px;
    	bottom:10px;
    	left:10px;
    }
    .cards .tab-card ul li .list_top .present{
    	position:absolute;
    	width:20px;
    	height:20px;
    	bottom:10px;
    	left:46px;
    	border:1px solid #F47E8C;
    	border-radius:5px;
    	color:#F47E8C;
    	text-align:center;
    	font-size:15px;
    }
    .cards .tab-card ul li .list_bottom{
    	margin-top:10px;
    }
    .cards .tab-card ul li .list_bottom h3{
    	font-size:18px;
    }
    .cards .tab-card ul li .list_bottom p{
    	font-size:14px;
    	color:#333;
    }
   /* 底部按钮*/
    .btn_bottom{
    	width:100%;
    	position:fixed;
    	bottom:0;
    	left:0;
    	height:50px;
    	background:rgba(255,255,255,0.7);
    	text-align:right;
    }
    .btn_bottom button{
    	width:80px;
    	color:#fff;
    	background:#86D8FF;
    	height:32px;
    	border:none;
    	border-radius:20px;
    	margin-right:5px;
    }
    .del{
    	text-decoration: line-through;
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
    	height: 310px;
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
    	text-align:center;
    	color:#ccc;
    	font-size:18px;
    	line-height: 100px;
    	height:310px;
    }
    .push_data{
		text-align: center;
		width:100%;
		font-size:20px;
		color:#aaa;
		height:50px;
	}
</style>
