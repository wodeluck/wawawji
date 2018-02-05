<template>
	<div class="main">
		<header>
			<a @click="black_go"><img :src="require('assets/img/header_back.png')"></a>
			<h2>我的礼品</h2>
			<div class="header_right">
				<!--<router-link to="/recharge_record"></router-link>-->
				<span @click="change">兑换</span>
			</div>
		</header>
		<section>
			<!--banner 信息部分-->
			<div class="banner">
				<img class="banner_img" :src="require('assets/img/my_wawa_banner.png')">
				<div class="banner_left">
					<div class="banner_left_img">
						<img class="pic" :src="data_user_name.avatar">
						<div class="key" v-if="data_user_name.sex==1" style="background: #86d8ff;">
							<img class="pic_label" :src="require('assets/img/center_pic_label.png')" style="margin-top:2px;"/>
						</div>
						<div class="key" v-if="data_user_name.sex==2" style="background: #F47E8C;">
							<img class="pic_label" :src="require('assets/img/key_left.png')" style="margin-top:1px;"/>
						</div>
						<!--<div class="key">
							<img :src="require('assets/img/key_left.png')">
						</div>						-->
					</div>
					<div class="banner_left_id">
						<h3>{{data_user_name.name}}</h3>
					</div>		
				</div>
				<div class="banner_right">
					<p class="banner_right_one">兑换<span>{{data_user_name.number}}</span>次</p>
					<p class="banner_right_two">用了<span>{{data_user_name.body_num}}</span>个娃娃</p>					
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
	                <div class="tab-card" style="display: block;">
	                	<ul v-if="data_all.length>0">
	                		<li v-for="(item,index) in data_all">
	                			<div class="list_top">
	                				<label class="in" v-if="item.type==1">寄存中</label>
	                				<label class="wiat" v-if="item.type==2">待邮寄</label>
	                				<label class="wiat" v-if="item.type==3">已发货</label>
	                				<label class="wiat" v-if="item.type==4">已确认</label>
	                				<img class="wawa" :src="item.img">
	                			</div>
	                			<div class="list_bottom">
	                				<h3>{{item.name}}</h3>
	                				<p>{{item.ctime}}
	                				   <input type="checkbox" @change="all_data(item,index,$event)" v-model="item.checked" v-if="item.type==1||item.type==2"/>
	                				</p>	                				
	                			</div>
	                		</li>
	                	</ul>
	                	<div v-else class="null_data">--暂无娃娃--</div>
	                	<!-- 底部-->
					    <div class="bottom_mail">
					    	<div class="bottom_mail_right">
					    		<p>已选择<span>{{onumber}}</span>个</p>
					    		<button @click="mail_one">邮寄</button>
					    	</div>
					    </div>
	                </div>  
	                <div class="tab-card">
	                	<ul v-if="data_one.length>0">
	                		<li v-for="(item_one,index) in data_one">
	                			<div class="list_top">
	                				<label class="in" v-if="item_one.type==1">寄存中</label>
	                				<img class="wawa" :src="item_one.img">
	                			</div>
	                			<div class="list_bottom">
	                				<h3>{{item_one.name}}</h3>
	                				<p>{{item_one.ctime}}
	                					<input type="checkbox" @change="all_data_two(item_one,index,$event)"  v-model="item_one.checked"/>
	                				   <!--<img v-show="!empty_show" class="video" :src="require('assets/img/full_checkbox.png')">
	                				   <img v-show="empty_show" class="video" :src="require('assets/img/empty_checkbox.png')">-->
	                				</p>
	                				
	                			</div>
	                		</li>
	                	</ul>
	                	<div v-else class="null_data">--暂无娃娃--</div>
	                	<!-- 底部-->
					    <div class="bottom_mail">
					    	<div class="bottom_mail_right">
					    		<p>已选择<span>{{onumber_two}}</span>个</p>
					    		<button @click="mail_two">邮寄</button>
					    	</div>
					    </div>
	                </div>  
	                <div class="tab-card">
	                	<ul v-if="data_two.length>0">
	                		<li v-for="(item_two,index) in data_two">
	                			<div class="list_top">
	                				<label class="wiat" v-if="item_two.type==2">待邮寄</label>
	                				<img class="wawa" :src="item_two.img">
	                			</div>
	                			<div class="list_bottom">
	                				<h3>{{item_two.name}}</h3>
	                				<p>{{item_two.ctime}}
	                				   <!--<img v-show="!empty_show" class="video" :src="require('assets/img/full_checkbox.png')">
	                				   <img v-show="empty_show" class="video" :src="require('assets/img/empty_checkbox.png')">-->
	                				   <!--	<input type="checkbox" @change="all_data_three(item_two,index,$event)"  v-model="item_two.checked"/>-->
	                				</p>
	                				
	                			</div>
	                		</li>
	                	</ul>
	                	<div v-else class="null_data">--暂无娃娃--</div>
	                	<!-- 底部-->
					    <div class="bottom_mail">
					    	<div class="bottom_mail_right">
					    		<p>已选择<span>{{onumber_three}}</span>个</p>
					    		<button @click="mail_three">邮寄</button>
					    	</div>
					    </div>
	                </div>  
	                <div class="tab-card">
	                	<ul v-if="data_three.length>0">
	                		<li v-for="item_three in data_three">
	                			<div class="list_top">
	                				<label class="wiat" v-if="item_three.type==3">已发货</label>
	                				<img class="wawa" :src="item_three.img">
	                			</div>
	                			<div class="list_bottom">
	                				<h3>{{item_three.name}}</h3>
	                				<p>{{item_three.ctime}}
	                				   <!--<img v-show="!empty_show" class="video" :src="require('assets/img/full_checkbox.png')">
	                				   <img v-show="empty_show" class="video" :src="require('assets/img/empty_checkbox.png')">-->
	                				</p>
	                				
	                			</div>
	                		</li>
	                	</ul>
	                	<div v-else class="null_data">--暂无娃娃--</div>
	                </div>  	                
	            </div>  
	        </div>
	    </section>
	    <div class="window_show" v-show="name_null">请选择礼品</div>
	</div>
</template>

<script>
import {my_gift_number,my_gift_data_all,my_gift_data_one,my_gift_data_two,my_gift_data_three} from '../../service/getData';
	export default {  
  data () {
    return {
    	name_null:false,
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
            }],
            active: false,
            empty_show:true,
            user_id:"54e3bde9a9c25741acd151dd4b957641",
            data_user_name:"",
            data_all:[],
            data_one:[],
            data_two:[],
            data_three:[],
            page:1,
            onumber:0,
            list_one:[],
            list_two:[],
            list_three:[],
            onumber_three:0,
            onumber_two:0,
            time:500,
            times:1500
    }
  },
  created(){
  	function formatDate(now) { 
					var year=now.getYear(); 
					var month=now.getMonth()+1; 
					var date=now.getDate(); 
					var hour=now.getHours(); 
					var minute=now.getMinutes(); 
					var second=now.getSeconds(); 
					return "20"+year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second; 
			} 
	my_gift_number().then(res => {   //用户礼品兑换次数
			  console.log(res);
	          if (res.code == 1) {
	             this.data_user_name=res.data;
	          } else {
	             console.log(err)
	          }
	        });
//   this.$post('index.php?g=Api&m=Record&a=api',{      //用户礼品兑换次数
//			api_name:'convertNum',
//			token:this.user_id		
//		}).then((res) => {
//	        console.log(res);
//	        if(res.code==1){
//	        	this.data_user_name=res.data;
//	        }        
//	     },err => {
//	        console.log(err)
//	    })
    my_gift_data_all(this.page).then(res => {   //我的礼品列表  全部
			  console.log(res);
	          if (res.code == 1) {
	             this.data_all=res.data;
	        	for(var i=0;i<this.data_all.length;i++){
	        		this.data_all[i].ctime=formatDate(new Date(parseInt(res.data[i].ctime)));	
	        	}
	          } else {
	             console.log(err)
	          }
	        });
//	this.$post('index.php?g=Api&m=Record&a=api',{      //我的礼品列表  全部
//			api_name:'giftList',
//			token:this.user_id,
//			page:this.page,
//			size:10
//		}).then((res) => {
//	        console.log(res);
//	        if(res.code==1){
//	        	this.data_all=res.data;
//	        	for(var i=0;i<this.data_all.length;i++){
//	        		this.data_all[i].ctime=formatDate(new Date(parseInt(res.data[i].ctime)));	
//	        	}
//	        }        
//	     },err => {
//	        console.log(err)
//	    })
my_gift_data_one(this.page).then(res => {   //我的礼品列表  寄存中
			  console.log(res);
	          if (res.code == 1) {
	             this.data_one=res.data;
	        	for(var i=0;i<this.data_one.length;i++){
	        		this.data_one[i].ctime=formatDate(new Date(parseInt(res.data[i].ctime)));	
	        	}
	          } else {
	             console.log(err)
	          }
	        });
//	this.$post('index.php?g=Api&m=Record&a=api',{      //我的礼品列表    寄存中
//			api_name:'giftList',
//			token:this.user_id,
//			type:1,
//			page:this.page,
//			size:10
//		}).then((res) => {
//	        console.log(res);
//	        if(res.code==1){
//	        	this.data_one=res.data;
//	        	for(var i=0;i<this.data_one.length;i++){
//	        		this.data_one[i].ctime=formatDate(new Date(parseInt(res.data[i].ctime)));	
//	        	}
//	        }        
//	     },err => {
//	        console.log(err)
//	    })
my_gift_data_two(this.page).then(res => {   //我的礼品列表  待邮寄
			  console.log(res);
	          if (res.code == 1) {
	             this.data_two=res.data;
	        	for(var i=0;i<this.data_two.length;i++){
	        		this.data_two[i].ctime=formatDate(new Date(parseInt(res.data[i].ctime)));	
	        	}
	          } else {
	             console.log(err)
	          }
	        });
//	this.$post('index.php?g=Api&m=Record&a=api',{      //我的礼品列表    待邮寄
//			api_name:'giftList',
//			token:this.user_id,
//			type:2,
//			page:this.page,
//			size:10
//		}).then((res) => {
//	        console.log(res);
//	        if(res.code==1){
//	        	this.data_two=res.data;
//	        	for(var i=0;i<this.data_two.length;i++){
//	        		this.data_two[i].ctime=formatDate(new Date(parseInt(res.data[i].ctime)));	
//	        	}
//	        }        
//	     },err => {
//	        console.log(err)
//	    })
my_gift_data_three(this.page).then(res => {   //我的礼品列表  已发货
			  console.log(res);
	          if (res.code == 1) {
	             this.data_three=res.data;
	        	for(var i=0;i<this.data_three.length;i++){
	        		this.data_three[i].ctime=formatDate(new Date(parseInt(res.data[i].ctime)));	
	        	}
	          } else {
	             console.log(err)
	          }
	        });
//	this.$post('index.php?g=Api&m=Record&a=api',{      //我的礼品列表    已发货
//			api_name:'giftList',
//			token:this.user_id,
//			type:3,
//			page:this.page,
//			size:10
//		}).then((res) => {
//	        console.log(res);
//	        if(res.code==1){
//	        	this.data_three=res.data;
//	        	for(var i=0;i<this.data_three.length;i++){
//	        		this.data_three[i].ctime=formatDate(new Date(parseInt(res.data[i].ctime)));	
//	        	}
//	        }        
//	     },err => {
//	        console.log(err)
//	    })
  },
  methods:{
  	  tabsSwitch: function(tabIndex) {  
  	  	
        var tabCardCollection = document.querySelectorAll(".tab-card"),  
                        len = tabCardCollection.length;  
  
                    for(var i = 0; i < len; i++) {  
                        tabCardCollection[i].style.display = "none";  
            this.tabsName[i].isActive = false;  
        }  
        this.tabsName[tabIndex].isActive = true;  
        tabCardCollection[tabIndex].style.display = "block";  
    },
    change(){
    	this.$router.push({path:'/exchange_gift'});
    },
//  list(onu,olist){
//  	if(item.checked==undefined||item.checked==false){
//  		this.onu+=1;
//  		this.olist.push(parseInt(item.id));
//  	}
//  	if(item.checked==true){
//  		this.onu-=1;
//  		for(var i in this.olist){
//  			if(item.id==this.olist[i]){
//  				console.log(i);
// 	  				this.olist.splice(i,1);
//  			}
//  		}
//  	}
//  },
    all_data(item,index,e){
    	
    	
    	console.log(item);
    	console.log(e)
    	
    	if(item.checked==true){
    		
    		this.onumber+=1;
    		this.list_one.push(parseInt(item.id));
    	}
    	if(item.checked==false){
    		this.onumber-=1;
    		for(var i in this.list_one){
    			if(item.id==this.list_one[i]){
    				console.log(i);
   	  				this.list_one.splice(i,1);
    			}
    		}
    	}
    	console.log(this.list_one);
    },
    all_data_two(item_one,index,$event){
    	if(item_one.checked==true){
    		this.onumber_two+=1;
    		this.list_two.push(parseInt(item_one.id));
    	}
    	if(item_one.checked==false){
    		this.onumber_two-=1;
    		for(var i in this.list_two){
    			if(item_one.id==this.list_two[i]){
    				console.log(i);
   	  				this.list_two.splice(i,1);
    			}
    		}
    	}
    	console.log(this.list_two);
//  	this.list(onumber_two,list_two);
    },
//  all_data_three(item_two,index,$event){
//  	if(item_two.checked==true){
//  		this.onumber_three+=1;
//  		this.list_three.push(parseInt(item_two.id));
//  	}
//  	if(item_two.checked==false){
//  		this.onumber_three-=1;
//  		for(var i in this.list_three){
//  			if(item_two.id==this.list_three[i]){
//  				console.log(i);
// 	  				this.list_three.splice(i,1);
//  			}
//  		}
//  	}
//  	console.log(this.list_three);
////  	this.list(onumber_three,list_three);
//  },
    mail_one(){
    	if(this.onumber==0){
    		var _self=this;
  			window.setTimeout(function(){
              _self.name_null=!_self.name_null;
            }, _self.time);
            window.setTimeout(function(){
              _self.name_null=!_self.name_null;
            }, _self.times);
    		return false;
    	}
    	console.log(this.list_one.toString());
    	this.$router.push({
    		path:"/change_address",
    		query:{
    			id:this.list_one.toString()
    		}
    	})
    },
    mail_two(){
    	if(this.onumber_two==0){
    		var _self=this;
  			window.setTimeout(function(){
              _self.name_null=!_self.name_null;
            }, _self.time);
            window.setTimeout(function(){
              _self.name_null=!_self.name_null;
            }, _self.times);
    		return false;
    	}
    	this.$router.push({
    		path:"/change_address",
    		query:{
    			id:this.list_two.toString()
    		}
    	})
    },
    mail_three(){
    	if(this.onumber_three==0){
    		var _self=this;
  			window.setTimeout(function(){
              _self.name_null=!_self.name_null;
            }, _self.time);
            window.setTimeout(function(){
              _self.name_null=!_self.name_null;
            }, _self.times);
    		return false;
    	}
    	this.$router.push({
    		path:"/change_address",
    		query:{
    			id:this.list_three.toString()
    		}
    	})
    },
     black_go(){
	  		this.$router.go(-1)
	 }
  }
}
</script>

<style scoped>
	section{
		margin-top:50px;
	}
	header .header_right{
		width:70px;
	}
	header .header_right span{
		line-height:40px;
		color:#fff;
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
	    padding-top: 24px;
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
	}
	.banner .banner_left .banner_left_id{
		margin-top: 35px;
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
    	height: 210px;
    	float:left;
    	padding:0px 8px;  
    	box-sizing: border-box; 
    	margin-bottom:25px; 	
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
    .cards .tab-card ul li .list_top label.wiat{
    	background:#F47E8C;
    }
    .cards .tab-card ul li .list_top label.change{
    	background:#C689FF;
    }
    .cards .tab-card ul li .list_top .wawa{
    	width:100%;
    	border:1px solid #eee;
    	height: 170px;
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
    	font-size:16px;
    }
    .cards .tab-card ul li .list_bottom p{
    	font-size:13px;
    	color:#333333d6;
    }
    .cards .tab-card ul li .list_bottom p input{
    	width: 20px;
    height: 20px;
    float: right;
    
    }
    .cards .tab-card ul li .list_bottom p img{
    	width:20px;
    	float:right;
    	vertical-align:middle;
    }
   /* 底部*/
    .bottom_mail{
    	width: 100%;
	    height: 60px;
	    position: fixed;
	    bottom: 0;
	    left: 0;
	    background: rgba(255,255,255,0.7);
    }
    .bottom_mail .bottom_mail_right{
    	position: absolute;
	    right: 0;
	    margin-top: 10px;
	    box-sizing: border-box;
    }
    .bottom_mail .bottom_mail_right p{
    	display: inline-block;
    	font-size: 16px;
    }
    .bottom_mail .bottom_mail_right p span{
    	font-size: 22px;
	    padding: 0 5px;
	    color: #f00;
    }
    .bottom_mail .bottom_mail_right button{
    	width: 100px;
	    height: 40px;
	    border: none;
	    border-radius: 20px;
	    color: #fff;
	    background: #86D8FF;
	    font-size: 18px;
	    margin: 0 10px;
    }
    .null_data{
		text-align: center;
	    margin-top: 40px;
	    color: #aaa;
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