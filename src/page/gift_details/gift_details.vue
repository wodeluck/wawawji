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
	                	<img class="details" :src="data.gift_img">
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
		<div class="success" v-show="success_show">
			<div class="del" @click="delce">
				<span>&times;</span>
			</div>			
			<div class="success_img">
				<img class="pass" :src="require('assets/img/gift_success.png')">
				<p>兑换娃娃成功</p>
			</div>
		</div>
		<div class="btn" @click="btn_gift" v-show="!btn_show">立即兑换</div>
		<div class="btn_bg btn" v-show="btn_show">立即兑换</div>
	</div>
</template>

<script>
	import {gift_details_data,gift_details_data_list,gift_details_show} from '../../service/getData';
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
            btn_show:false,
            active:false,
            success_show:false,
            erro_show:false,
            user_id:"54e3bde9a9c25741acd151dd4b957641",
            data:"",
            data_list:[],
            page:1
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
					return "20"+year+"."+month+"."+date+" "+hour+":"+minute+":"+second; 
			} 
		
	gift_details_data(this.$route.query.id).then(res => {   //兑换礼品的详情
			  console.log(res);
	          if (res.code == 1) {
	            	this.data=res.data;
		        	
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
		        	for(var i=0;i<this.data_list.length;i++){
			        		this.data_list[i].ctime=formatDate(new Date(parseInt(res.data[i].ctime)));	
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
    	gift_details_show(this.$route.query.id).then(res => {   //兑换礼品的详情
			  console.log(res);
	          if (res.code == 1) {
	            	this.success_show=!this.success_show;
	        		this.btn_show=!this.btn_show;
	          }else{
	        	this.erro_show=!this.erro_show;
	        	this.btn_show=!this.btn_show;
	          }
	        });
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
	  		this.$router.go(-1)
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
    }
    .cards .tab-card ul li .list_left img{
    	width:60px;
    	border-radius:50%;
    	vertical-align:top;
    }
    .cards .tab-card ul li .list_left span{
    	line-height:60px;
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
</style>