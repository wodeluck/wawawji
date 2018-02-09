<template>
	<div class="main">
		<header>
			<a  @click="black_go"><img :src="require('assets/img/header_back.png')"></a>
			<h2>所有运单</h2>
		</header>
		<section>
			<div class="bill">
				<ul>
					<li v-for="item in data">
						<div class="header">
							<div class="bill_left">
								<span>订单编号</span>
								{{item.waybillno}}
							</div>
							<div class="bill_right">
								<span class="color" v-if="item.status==1">待邮寄</span>
							</div>
							<div class="bill_right">
								<span class="color" v-if="item.status==2">已发货</span>
							</div>
							<div class="bill_right">
								<span class="color" v-if="item.status==3">已确认</span>
							</div>
						</div>
						<div class="middle">
							<div class="bill_left">
								<p>
									<img :src="require('assets/img/personer.png')">
									<span>{{item.uname}}</span>
									{{item.phone}}
								</p>
								<p>
									<img :src="require('assets/img/pos.png')">
									<span class="bill_left_address">{{item.addr}}{{item.addr_info}}</span>
								</p>
								<p class="three" v-if="item.kdno">
									快递单号
									<span>{{item.kdno}}</span>
									<span>{{item.kdname}}</span>
								</p>
								<p class="three" v-else>
									快递单号     暂无
								</p>
							</div>
							<div class="bill_right">
								{{item.ctime}}
							</div>
						</div>
						<div class="bottom">
							<p v-for="item_next in item.goods"><span>{{item_next.name}}</span><span class="p_right">x{{item_next.num}}</span></p>
						</div>
						<div class="bill_btn" v-if="item.status==2" @click="btn(item)">
							<button>确认收货</button>
						</div>
					</li>
				</ul>
			</div>
			<div class="push_data" v-show="pushData">上拉加载更多</div>
			<div class="push_data" v-show="pushNone">暂无更多</div>
		</section>
		<div class="show_hidden" v-show="name_null">{{msg}}</div>
	</div>
</template>

<script>
	import {all_waybill_data,all_waybill_qr,all_waybill_data_scroll} from '../../service/getData';
export default {  
  data () {
    return {
            user_id:"54e3bde9a9c25741acd151dd4b957641",
            data:[],
            page:1,
            time:500,
	 		times:1500,
            pagesize:20,
            name_null:false,
            msg:'',
            data_sur:'',
             num: 10, // 一页显示多少条
	    	pushData:false,
	    	pushNone:false,
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
	all_waybill_data(this.page,this.pagesize).then(res => {   //获取所有运单列表
			  console.log(res);
	          if (res.code == 1) {
	            	this.data=res.data;
	            	if(res.data.length==10){
	            		this.pushData=true;
	            	}
		        	for(var i=0;i<this.data.length;i++){
		        		this.data[i].ctime=timestampToTime(res.data[i].ctime);	
		        	}
	          } else {
	            console.log(err)
	          }
	        });
//   this.$post('api/waybill/api',{      //获取所有运单列表
//			api_name:'waybill_list',
//			token:this.user_id,
//			page:this.page,
//			pagesize:this.pagesize
//		}).then((res) => {
//	        console.log(res);
//	        if(res.code==1){
//	        	this.data=res.data;
//	        	for(var i=0;i<this.data.length;i++){
//	        		this.data[i].ctime=formatDate(new Date(parseInt(res.data[i].ctime)));	
//	        	}
//	        }        
//	     },err => {
//	        console.log(err)
//	    })
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
	             	all_waybill_data_scroll(_self.page,_self.pagesize).then(res => {   	             	 	
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
  	 btn(item){
  	 	all_waybill_qr(item.waybillno).then(res => {   //确认收货
			  console.log(res);
	          if (res.code == 1) {
	          		this.data_sur=res.data;
	            	this.msg=res.msg;
		        	var _self=this;
			        window.setTimeout(function(){
		              _self.name_null=!_self.name_null;
		            }, _self.time);
		            window.setTimeout(function(){
		              _self.name_null=!_self.name_null;
		            }, _self.times);
		            location.reload(); 
	          } else {
	            console.log(err)
	          }
	        });
//  	 this.$post('api/waybill/api',{      //确认收货
//			api_name:'confirm',
//			token:this.user_id,
//			waybillno:item.waybillno
//		}).then((res) => {
//	        console.log(res);
//	        if(res.code==1){
//	        	this.msg=res.msg;
//	        	var _self=this;
//		        window.setTimeout(function(){
//	              _self.name_null=!_self.name_null;
//	            }, _self.time);
//	            window.setTimeout(function(){
//	              _self.name_null=!_self.name_null;
//	            }, _self.times);
//	        }        
//	     },err => {
//	        console.log(err)
//	    })
  	},
  	black_go(){
	  		this.$router.push({path:'/personal_center'})
	}
  }
}
</script>

<style scoped>
	section{
		background: #F5F5F5;
    	margin-top: 40px;
	}
	li{
		background: #fff;
	    padding: 0 10px;
	    margin-bottom:12px;
	}
	li .header{
		height: 50px;
	    border-bottom: 1px solid #eee;
	    position: relative;
	}
	li .header .bill_left{
		display: inline-block;
    	height: 100%;
    	line-height: 50px;
    	font-size: 16px;
	}
	li .header .bill_left span{
		color: #aaa;
    	padding-right: 10px;
	}
	li .header .bill_right{
		display: inline-block;
    	position: absolute;
    	right: 0;
	}
	li .header .bill_right span{
		line-height: 50px;
    	font-size: 17px;
    	color: #F47E8C;
	}
	li .middle{
		padding: 10px 0;
    	border-bottom: 1px solid #eee;
	}
	li .middle .bill_left{
		display: inline-block;
		width:70%;
	}
	li .middle .bill_left p{
		font-size: 14px;
		line-height: 30px;
	}
	li .middle .bill_left p span.bill_left_address{
		display: inline-block;
    	vertical-align: top;
    	width: 80%;
	}
	li .middle .bill_left p.three{
		padding-left: 30px;
	}
	li .middle .bill_left p img{
		width: 15px;
	    vertical-align: middle;
	    margin-right: 10px;
	}
	li .middle .bill_left p.three span{
		padding: 0 5px;
	}
	li .middle .bill_right{
		display: inline-block;
	    vertical-align: top;
	    width: 90px;
	    text-align: right;
	    float: right;
	    color: #aaa;
	    padding-top: 15px;
	}
	li .bottom{
  
	    padding: 10px 0px 10px 30px;
	    line-height: 28px;
	    font-size: 15px;
	}
	li .bottom p{
		position:relative;
		height:28px;
	}
	li .bottom p span.p_right{
		position:absolute;
		right:0;
		color: #aaa;
	}
	li .bill_btn{
		border-top:1px solid #eee;
		height:55px;
		position: relative;
	}
	li .bill_btn button{
		width: 100px;
	    height: 36px;
	    border: none;
	    color: #fff;
	    font-size: 16px;
	    background: #9DDFFF;
	    border-radius: 20px;
	    position: absolute;
	    top: 10px;
	    right: 0;
	}
	.show_hidden,.show_hidden_text{
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
	.push_data{
		text-align: center;
		width:100%;
		font-size:20px;
		color:#aaa;
		height:50px;
	}
</style>