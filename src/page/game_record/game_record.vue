<template>
	<div class="main">
		<header>
			<a  @click="black_go"><img :src="require('assets/img/header_back.png')"></a>
			<h2>游戏记录</h2>
		</header>
		<section>
			<div class="list">
				<ul>
					<li v-for="item in data" @click="game_details(item)">
						<div class="list_left">
							<img class="wawa" :src="item.img">
							<div class="text">
								<p>{{item.name}}</p>
								<p class="color">{{item.ctime}}</p>
							</div>
						</div>
						<div class="list_right" v-if="item.success==0">
							抓取失败
						</div>
						<div class="list_right" v-if="item.success>0">
							抓取成功
						</div>
					</li>
				</ul>
			</div>
			<div class="push_data" v-show="pushData">上拉加载更多</div>
			<div class="push_data" v-show="pushNone">暂无更多</div>
		</section>
	</div>
</template>

<script>
import {game_record_data,game_record_data_scroll} from '../../service/getData';
export default {

  data () {
    return {
    	user_id:"54e3bde9a9c25741acd151dd4b957641",
    	data:[],
    	page:1,
    	size:10,
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
	game_record_data(this.page,this.size).then(res => {   //游戏记录
			  console.log(res);
	          if (res.code == 1) {
              for(var i in res.data){
                res.data[i].ctime=timestampToTime(res.data[i].ctime);
              }
              this.data=res.data;
			 if(this.data.length==10){
	            		this.pushData=true;
	            	}
	          } else {
	            console.log(err)
	          }
	        });
//	this.$post('api/mywawa/api',{      //游戏记录                                                                         1517036569      1517579397
//			api_name:'game_history',
//			token:this.user_id,
//			page:this.page,
//			size:this.size
//		}).then((res) => {
//	        console.log(res);
//	        if(res.code==1){
//	        	this.data=res.data;
//	        	console.log(this.data);
//	        	for(var i=0;i<this.data.length;i++){
//	        		this.data[i].ctime=formatDate(new Date(parseInt(res.data[i].ctime)));
//	        	}
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
	             	game_record_data_scroll(_self.page,_self.size).then(res => {   	             	 	
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
  	game_details(item){
//		this.$router.push({
//			path:'/game_details',
//			query:{
//				id:item.hid
//			}
//		})
  	},
	black_go(){
	  		this.$router.push({path:'/my_wawa'});
	 }
  }

}
</script>

<style scoped>
	section{
		margin-top: 40px;
	}
	section div.list{padding-top:0;}
	.list ul li{
		padding: 10px 0;
	}
	.list ul li .list_left{
		width:77%;
	}
	.wawa{
		width: 60px;
		height:55px;
    	border: 1px solid #eee;
	}
	.list_left .text{
		width: 70%;
	    vertical-align: top;
	    padding: 10px;
	    box-sizing: border-box;
	}
	.list_left .text p:nth-child(1){
		font-size: 16px;
	    font-weight: bold;
	    display: block;
	}
	.list_left .text p:nth-child(2){
		font-size: 14px;
    	color: #9e9e9e;
	}
	.list ul li .list_right{
		height:100%;
		line-height: 70px;
		color: #9e9e9e;
	}
	.push_data{
		text-align: center;
		width:100%;
		font-size:20px;
		color:#aaa;
		height:50px;
	}
</style>
