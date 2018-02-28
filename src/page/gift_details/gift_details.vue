<template>
	<div class="main">
		<header>
			<a  @click="black_go"><img :src="require('assets/img/header_back.png')"></a>
			<h2>礼品详情</h2>
		</header>
		<section>
			<div class="banner">
				<img class="wawa" :src="data.gift_img">
			</div>
			<div class="container">
				<h3>{{data.name}}</h3>
				<p>需要娃娃数:{{data.convert_num}}个</p>
				<div class="text">
					可用这些娃娃兑换：{{data.body_name}}
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
	                	<div class="tab_card_text" v-html="data.content"></div>	                	
	                </div>  
	                <div class="tab-card">
	                	<ul>
	                		<li v-for="item in data_list">
	                			<div class="list_left">
	                				<img class="wawa" :src="item.avatar">
	                				<span>{{item.user_nicename}}</span>
	                			</div>
	                			<div class="list_right">{{item.ctime}}</div>
	                		</li>
	                	</ul>
	                	<div class="push_data" v-show="pushData">上拉加载更多</div>
						<div class="push_data" v-show="pushNone">暂无更多</div>
	                </div>  
	                
	            </div>  
	        </div>
		</section>
		<!--失败弹窗-->
		<div class="erro" v-show="erro_show">
			<div class="erro_box">
				<div class="erro_box_header">
					<p>您的公仔数量不足以兑换该礼品，</p>
					<p>快去多抓点回来吧！</p>
				</div>
				<div class="erro_box_bottom">
					<div class="erro_left" @click="down">知道了</div>
					<div class="erro_right" @click="go_wawa">去抓娃娃</div>
				</div>
			</div>
		</div>
		<!--成功弹窗-->
		<!--<div class="success" v-show="success_show">
			<div class="del" @click="delce">
				<span>&times;</span>
			</div>			
			<div class="success_img">
				<img class="pass" :src="require('assets/img/gift_success.png')">
				<p>兑换娃娃成功</p>
			</div>
		</div>-->
		<!--兑换娃娃弹窗-->
		<div class="wawa_window" v-show="change_coin">
			<div class="cont">
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
		<!--<div class="window_show">兑换成功</div>-->
		<div class="btn" @click="btn_gift">立即兑换</div>
		<div class="window_success" v-show="name_null">
			<img :src="require('assets/img/del_hidden.png')" class="window_success_del" @click="success_del">
			<div>
				<img :src="require('assets/img/gift_success.png')">
				<span>兑换成功</span>
			</div>
		</div>
		
	</div>
</template>

<script>
	import {exchange_gift_change_zero,exchange_gift_change,gift_details_data,gift_details_data_list,gift_details_show,gift_details_data_list_scroll} from '../../service/getData';
	export default{  
  data () {
    return {
 	 	tabsName:[{  
                name: "商品详情",  
                isActive: true  
            }, {  
                name: "兑换记录",  
                isActive: false  
            }],
           
            active:false,
            success_show:false,
            erro_show:false,
            user_id:"54e3bde9a9c25741acd151dd4b957641",
            data:"",
            data_list:[],
            page:1,
            num: 10, // 一页显示多少条
	    	pushData:false,
	    	pushNone:false,
	    	onumber:"",
	    	onum:"",
	    	list_body:[],
	    	name_null:false,
    		add_show:true,
    		change_data:"",
    		all_coin:"",
    		change_coin:false,
    		time:500,
    		times:1500
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
		
	gift_details_data(this.$route.query.id).then(res => {   //兑换礼品的详情
			  console.log(res);
	          if (res.code == 1) {
	            	this.data=res.data;
		        	this.onumber=res.data.convert_num;
	          } else {
	            console.log(err)
	          }
	        });
//	this.$post('index.php?g=Api&m=Record&a=api',{      //兑换礼品的详情
//			api_name:'giftDetails',
//			token:this.user_id,
//			gift_id:this.$route.query.id
//		}).then((res) => {
//	        console.log(res);
//	        if(res.code==1){     
//	        	this.data=res.data;	        	
//	        }        
//	     },err => {
//	        console.log(err)
//	     })
    gift_details_data_list(this.$route.query.id,this.page).then(res => {   //同一种礼品兑换的记录列表
			  console.log(res);
	          if (res.code == 1) {
	            	this.data_list=res.data;
	            	if(res.data.length==10){
	            		this.pushData=true;
	            	}
		        	for(var i=0;i<this.data_list.length;i++){
			        		this.data_list[i].ctime=timestampToTime(res.data[i].ctime);	
			        	}
	          } else {
	            console.log(err)
	          }
	        });
//	this.$post('index.php?g=Api&m=Record&a=api',{      //同一种礼品兑换的记录列表
//			api_name:'sameGfitList',
//			token:this.user_id,
//			gift_id:this.$route.query.id,
//			page:this.page,
//			size:10
//		}).then((res) => {
//	        console.log(res);
//	        if(res.code==1){     
//	        	this.data_list=res.data;
//	        	for(var i=0;i<this.data_list.length;i++){
//		        		this.data_list[i].ctime=formatDate(new Date(parseInt(res.data[i].ctime)));	
//		        	}
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
	             	gift_details_data_list_scroll(_self.$route.query.id,_self.page).then(res => {   	             	 	
	             	 	console.log(res);
			          if (res.code == 1) {				          		
			          	    for(var i in res.data){
			          	    	res.data[i].ctime=timestampToTime(res.data[i].ctime);				
			          	    	_self.data_list.push(res.data[i]);
			          	    	
			          	    	console.log(_self.data_list)
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
    btn_gift(){  
    	this.change_coin=!this.change_coin;
    	exchange_gift_change(this.$route.query.id).then(res => {   //兑换礼品的娃娃数量
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
//  	this.onum=this.$route.query.id+":"+this.onumber;
//  	console.log(this.onum);
//  	gift_details_show(this.$route.query.id,this.onum).then(res => {   //礼品兑换
//			  console.log(res);
//	          if (res.code == 1) {
//	            	this.success_show=!this.success_show;
//	        		
//	          }else{
//	        	this.erro_show=!this.erro_show;
//	        	
//	          }
//	        });
//  	this.$post('index.php?g=Api&m=Record&a=api',{      //同一种礼品兑换的记录列表
//			api_name:'giftConvert',
//			token:this.user_id,
//			gift_id:this.$route.query.id,
//			w_list:2
//		}).then((res) => {
//	        console.log(res);
//	        if(res.code==1){     
//	        	this.success_show=!this.success_show;
//	        	this.btn_show=!this.btn_show;
//	        } 
//	        if(res.code==-1){
//	        	this.erro_show=!this.erro_show;
//	        	this.btn_show=!this.btn_show;
//	        }
//	     },err => {
//	        console.log(err)
//	     })
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
   },
   success_del(){
   	 var _self=this;
		  			window.setTimeout(function(){
		              _self.name_null=!_self.name_null;
		            }, _self.time);
		            window.setTimeout(function(){
		              _self.name_null=!_self.name_null;
		            }, _self.times);
   },
   del_wawa(){
		this.change_coin=!this.change_coin;
	},
   down(){
   		this.erro_show=!this.erro_show;
   },
   delce(){
   		this.success_show=!this.success_show;
   },
   go_wawa(){
   	    this.$router.push({path:'/home'});                                       //  跳转去抓娃娃
   },
   black_go(){
	  	this.$router.go(-1);
	 }
  }
}
</script>

<style scoped>
	
	section{
		padding:10px;
		margin-top: 40px;
	}
	.banner img{
		width: 100%;
    border: 1px solid #eee;
    border-radius: 10px;
	}
	.container{
		    padding: 5px;
	}
	.container h3{
		font-size: 22px;
    font-weight: 500;
    line-height: 46px;
	}
	.container p{
		font-size: 18px;
    color: #F8A7B1;
    margin-bottom: 10px;
	}
	.container .text{
		font-size: 15px;
    color: #999;
	}
	/*选项卡*/
	.box{  
        width: 100%;  
		margin: 0 auto;      
    }    
    .tabs li {  
        float: left;  
       	width:50%;
        list-style: none;  
        height:50px;
        text-align:center;
    }          
    .tabs .tab-link {  
        display: block;           
        height: 40px;             
        line-height: 49px;             
        color: #9E9E9E;  
        text-decoration: none;  
        font-size:18px;
    }           
    .tabs .tab-link.active {  
      	font-weight:bold;
        transition: .3s; 
        color:#86D8FE; 
    }  
    .tabs .tab-link{
        height: 40px;  
    }  
    .cards {  
        float: left;  
   
        width:100%;
    }            
    .cards .tab-card {  
        display: none;  
        padding-bottom:46px;
    }  
    .cards .tab-card .details{
    	width:100%;
    }       
    .clearfix:after {  
        content: "";  
        display: block;  
        height: 0;  
        clear: both;  
    } 
    .tab_card_text img{
    	width: 100%;
	    border: 1px solid #eee;
	    border-radius: 10px;
    }
    .clearfix {  
       
        border-bottom:1px solid #eee;
    }  
    .cards .tab-card ul{
    	width:100%;
    }
    .cards .tab-card ul li{
    	border-bottom:1px dashed #eee;
    	padding:10px;
    }
    .cards .tab-card ul li div{
    	display:inline-block;
    	vertical-align:top;
    	height:50px;
    }
    .cards .tab-card ul li .list_left img{
    	width:50px;
    	height:50px;
    	border-radius:50%;
    	vertical-align:top;
    }
    .cards .tab-card ul li .list_left span{
    	line-height:50px;
    }
    .cards .tab-card ul li .list_right{
    	float:right;
    	line-height: 60px;
    	color: #999;
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
	.btn_bg{
		background:#86d8ff9e;
	}
	/*弹窗*/
	.erro,.success{
		position: fixed;
	    width: 100%;
	    height: 100%;
	    z-index: 999;
	    background: rgba(0,0,0,0.5);
	    top: 0;
	    left: 0;
	}
	.erro .erro_box{
		width: 70%;
	    height: 150px;
	    background: #fff;
	    position: absolute;
	    top: 50%;
	    left: 15%;
	    margin-top: -80px;
	    border-radius: 5px;
	    padding-top: 34px;
	    box-sizing: border-box;
	    font-size: 14px;
	}
	.erro .erro_box .erro_box_header{
		text-align: center;
	}
	.erro .erro_box .erro_box_bottom{
		position: absolute;
	    bottom: 0;
	    width: 100%;
	    height: 50px;
	}
	.erro .erro_box .erro_box_bottom div{
		display: inline-block;
	    width: 50%;
	    vertical-align: top;
	    height: 100%;
	    line-height: 50px;
	    color: #fff;   
	    text-align: center;   
	    position: absolute;
	}
	.erro .erro_box .erro_box_bottom div.erro_left{
		background: #ccc;
		left: 0;
	}
	.erro .erro_box .erro_box_bottom div.erro_right{
		background: #86D8FF;
    	right: 0;
	}
	
	.success .success_img{
		position: absolute;
	    text-align: center;
	    top: 50%;
	    margin-top: -110px;
	}
	.success .success_img img{
		width: 80%;
    	height: 220px;
	}
	.success .success_img p{
		font-size: 20px;
	    color: #fff;
	    font-weight: bold;
	    position: absolute;
	    width: 100%;
	    bottom: 15px;
	}
	.success .del{
		display: inline-block;
	    background: #fff;
	    width: 25px;
	    height: 25px;
	    text-align: center;
	    border-radius: 50%;
	    position: absolute;
	    top: 56px;
	    right: 20px;
	}
	.success .del span{
		font-size: 25px;
	    line-height: 22px;
	    color: #666;
	}
	.tab_card_text{
		font-size: 15px;
	    color: #999;
	    line-height: 30px;
	}
	.push_data{
		text-align: center;
		width:100%;
		font-size:20px;
		color:#aaa;
		height:50px;
	}
	 /* 兑换娃娃弹窗*/
    .wawa_window{
    	position:  fixed;
	    background:  rgba(0,0,0,0.5);
	    width:  100%;
	    height:  100%;
	    top: 0;
	    left:  0;
	    z-index:  99;
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
    .wawa_window .window_box,.cont{
    	background:  #fff;
    border-radius:  10px;
   
    box-sizing:  border-box;
    }
    .cont{
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
   .window_success{
   	position: fixed;
   	width:100%;
   	height:100%;
   	background:rgba(0,0,0,0.5);
   	z-index:999;
   	top:0;
   	left:0;
   }
   .window_success .window_success_del{
   		width: 35px;
	    position: absolute;
	    top: 30px;
	    right: 40px;
   }
   .window_success div{
   	  position: absolute;
	    top: 100px;
	    width: 100%;
	    text-align: center;
   }
   .window_success div img{
   	width:100%;
   }
   .window_success div span{
   	font-size: 18px;
    color: #fff;
   }
</style>