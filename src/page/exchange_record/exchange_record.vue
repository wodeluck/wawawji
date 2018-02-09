<template>
	<div class="main">
		<header>
			<a @click="black_go"><img :src="require('assets/img/header_back.png')"></a>
			<h2>兑换记录</h2>
		</header>
		<section>
			<div class="cent">
				<ul v-if="data.length>0">
					<li v-for="item in data">
						<div class="list_header">
							<div class="list_header_left">
								<img class="wawa" :src="item.img">
							</div>
							<div class="list_header_right">
								<h3>{{item.name}}x{{item.number}}</h3>
								<p>{{item.ctime}}</p>
							</div>
						</div>
						<div class="list_bottom">
							<p v-for="item_next in item.body">{{item_next.body_name}}x{{item_next.body_num}}</p>
						</div>
					</li>
				</ul>
				<div v-else class="null_data">--   暂无记录      --</div>
			</div>
			<div class="push_data" v-show="pushData">上拉加载更多</div>
			<div class="push_data" v-show="pushNone">暂无更多</div>
		</section>
	</div>
</template>

<script>
import {exchange_record_data} from '../../service/getData';
export default {
  data () {
    return {
    	user_id:"54e3bde9a9c25741acd151dd4b957641",
    	data:[],
    	page:1,
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
	exchange_record_data(this.page).then(res => {   //礼品兑换记录列表
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
//	this.$post('index.php?g=Api&m=Record&a=api',{      //礼品兑换记录列表
//			api_name:'convertList',
//			token:this.user_id,
//			page:this.page,
//			size:10
//		}).then((res) => {
//	        console.log(res);
//	        if(res.code==1){
//	        	this.data=res.data;
//	        	for(var i=0;i<this.data.length;i++){
//		        		this.data[i].ctime=formatDate(new Date(parseInt(res.data[i].ctime)));
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
	             	exchange_record_data_scroll(_self.page).then(res => {   	             	 	
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
	  		this.$router.push({path:'/exchange_gift'});
	  },
  }

}
</script>

<style scoped>
	section{
		margin-top:40px;
	}
	.cent{
		background: #F5F5F5;
	}
	li{
		background:#fff;
		padding:0 10px;
		margin-bottom:10px;
	}
	li .list_header div{
		display:inline-block;
		vertical-align:top;
	}
	li .list_header{
		border-bottom: 1px dashed #eee;
    	padding: 10px 0px;
	}
	li .list_header .list_header_left img{
		width: 70px;
		height:55px;
	    border: 1px solid #eee;
	    vertical-align: top;
	}
	li .list_header .list_header_right{
		float: right;
    text-align: right;
    height: 100%;
	}
	li .list_header .list_header_right h3{
		font-size: 16px;
    line-height: 24px;
    padding-top: 10px;
    font-weight: 500;
	}
	li .list_header .list_header_right p{
		font-size: 15px;
    color: #999;
    line-height: 30px;
	}
	li .list_bottom{
		height: 50px;
    font-size: 15px;
    line-height: 50px;
	}
	.null_data{
		text-align: center;
		font-size:18px;
		line-height: 60px;
		color:#ccc;
		background: #fff;
	}
	.push_data{
		text-align: center;
		width:100%;
		font-size:20px;
		color:#aaa;
		height:50px;
	}
</style>
