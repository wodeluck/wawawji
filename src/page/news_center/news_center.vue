<template>
	<div>
		<header>
			<a  @click="black_go"><img :src="require('assets/img/header_back.png')"></a>
			<h2>消息中心</h2>
		</header>
		<section class="list" v-if="data.length>0">
			
				<ul>
					<li @click="details(item)" v-for="item in data" :message="item">
						<div class="list_left">
							<h2>{{item.title}}</h2>
							<p>{{item.desc}}</p>
						</div>
						<div class="list_right">						
							{{item.ctime}}
						</div>
					</li>
				</ul>		
		</section>
		<div v-else class="no_news">-- 暂无消息 --</div>
		<div class="push_data" v-show="pushData">上拉加载更多</div>
		<div class="push_data" v-show="pushNone">暂无更多</div>
	</div>
</template>

<script>
import {news_data,news_data_scroll} from '../../service/getData';
export default { 
   
  data () {
    return {
    	data:[],
    	user_id:"54e3bde9a9c25741acd151dd4b957641",
    	creatime:[],
    	page:1,  //当前页
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
//	this.$post('api/notice/api',{      //消息列表
//			api_name:'get_notice_list',
//			token:this.user_id,
//			page:1
//		}).then((res) => {
//	        console.log(res);
//	        if(res.code==1){     
//	        	this.data=res.data;	
//				for (var i=0;i<res.data.length;i++) {	
//					this.data[i].ctime=formatDate(new Date(parseInt(res.data[i].ctime)));									
//				}	
//				console.log(this.data);
//	        }        
//	     },err => {
//	        console.log(err)
//	     })
		news_data().then(res => {   //消息列表
			console.log(res)
          if (res.code == 1) {
            this.data=res.data;	
            if(this.data.length==10){
	            		this.pushData=true;
	            	}
				for (var i=0;i<res.data.length;i++) {	
					this.data[i].ctime=timestampToTime(res.data[i].ctime);									
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
             		_self.pushData=false;
	             	_self.pushDown=true;
	             	_self.page++;
	             	 news_data_scroll(_self.page).then(res => {   	             	 	
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
  	details(item){
		this.$router.push({
			path:'/news_details',
			query:{
				id:item.notice_id
			}
		});
  	},
	 black_go(){
	  		this.$router.push({path:'/personal_center'});
	 }
  },
  updated(){
  		
  } 
}
</script>

<style lang="scss" scoped>
	section{
		margin-top: 40px;
	}
	body{
		background:#F5F5F5;
	}
	.list ul li{
		height:50px;
		padding:5px 0px;
		border-bottom:1px solid #eee;
	}
	.list ul li:last-child{
		border-bottom:none;
	}
	.list ul li h2{
		font-size:16px;
		line-height:24px;
		color:#202020;
		font-weight:600;
	}
	.list ul li .list_left p,.list ul li .list_right{
		font-size:12px;
		color:#B0B0B0;
	}
	.list ul li .list_right{
		line-height:50px;
	}
	.push_data{
		text-align: center;
		width:100%;
		font-size:20px;
		color:#aaa;
		height:50px;
	}
</style>