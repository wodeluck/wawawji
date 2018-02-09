<template>
	<div class="main">
		<header>
			<a  @click="black_go"><img :src="require('assets/img/header_back.png')"></a>
			<h2>充值记录</h2>
		</header>
		<section>
			<ul>
				<li v-for="item in data" @click="bill_details(item)">
					<div class="pay_list_left">
						<div class="pay_left_date">
							{{item.ctime}}
						</div>
						<img v-if="item.type==1" :src="require('assets/img/weixin.png')">
						<img v-if="item.type==2" :src="require('assets/img/zhifubao.png')">
						<img v-if="item.type==3" :src="require('assets/img/pay.png')" class="pay_img_width">
						<img v-if="item.type==4" :src="require('assets/img/apple.png')">
						<div class="pay_left_text">
							<h3>-{{item.money}}元</h3>
							<span>获得娃娃币</span>
							{{item.coin}}
						</div>
					</div>
					<div class="pay_list_right" v-if="item.status==1">
						充值成功
					</div>
					<div class="pay_list_right pay_erro" v-if="item.status==0">
						充值失败
					</div>
				</li>
			</ul>
			<div class="push_data" v-show="pushData">上拉加载更多</div>
			<div class="push_data" v-show="pushNone">暂无更多</div>
		</section>
	</div>
</template>

<script>
import {recharge_record_list,recharge_record_list_scroll} from '../../service/getData';
	export default { 
   
  data () {
    return {
    	user_id:"54e3bde9a9c25741acd151dd4b957641",
    	data:[],
    	page:1,
    	is_id:'',
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
	recharge_record_list(this.page).then(res => {   //充值记录
			  console.log(res);
	          if (res.code == 1) {
	            	this.data=res.data;
	            	if(this.data.length==10){
	            		this.pushData=true;
	            	}
		        	for(var i=0;i<this.data.length;i++){
		        		this.data[i].ctime=timestampToTime(res.data[i].ctime);	
		        	}
	          } else {
	            console.log(err)
	          }
	        });
//	this.$post('index.php?g=Api&m=Record&a=api',{      //充值记录
//			api_name:'recordList',
//			token:this.user_id,
//			page:this.page
//		}).then((res) => {
//	        console.log(res);
//	        if(res.code==1){     
//	        	this.data=res.data;
//	        	for(var i=0;i<this.data.length;i++){
//	        		this.data[i].ctime=formatDate(new Date(parseInt(res.data[i].ctime)));	
//	        	}
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
	             	recharge_record_list_scroll(_self.page).then(res => {   	             	 	
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
  	 bill_details(item){
  	 	this.is_id=item.oid;
  	 	console.log(this.is_id);
  	 	this.$router.push({
  	 		path:'/bill_details',
  	 		query:{
  	 			id:item.oid
  	 		}
  	 	})
  	 },
	black_go(){
	  		this.$router.push({path:'/recharge'});
	  }
  }
     
}
</script>

<style lang="scss" scoped>
	section{
		margin-top: 40px;
	}
	li{
		height:60px;
		margin:0 10px;
		border-bottom:1px solid #cccccc70;
		padding:5px 0px;
		
	}
	li:last-child{
		border-bottom:none;
	}
	li div{
		display:inline-block;
		height:100%;
		vertical-align:top;
	}
	li .pay_list_left .pay_left_date{
		width:84px;
		text-align:center;
		color:#aaa;
		font-size:14px;
		padding: 5px 0px;
	    box-sizing: border-box;
	    line-height: 18px;
	}
	li .pay_list_left img{
		width:26px;
		vertical-align:top;
		margin-top:10px;
		margin-right:10px;
	}
	li .pay_list_left img.pay_img_width{
		width:60px;
		height:15px;
	}
	li .pay_list_left .pay_left_text{
		font-size:14px;
		color:#666;
		/*padding: 2px 0px;*/
	    box-sizing: border-box;
	}
	li .pay_list_left .pay_left_text h3{
		font-size:16px;
		color:#000;
		line-height: 22px;
	}
	li .pay_list_right{
		font-size:14px;
		color:#00C801;
		line-height:50px;
		float:right;
	}
	li .pay_erro{
		color:#f00;
	}
	.push_data{
		text-align: center;
		width:100%;
		font-size:20px;
		color:#aaa;
		height:50px;
	}
</style>