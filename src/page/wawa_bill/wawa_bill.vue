<template>
	<div class="main">
		<header>
			<a  @click="black_go"><img :src="require('assets/img/header_back.png')"></a>
			<h2>娃娃币账单</h2>
		</header>
		<section>
			 <div class="center">
			 	<span class="center_color">帐户余额</span>
			 	<p>{{data.coin}}<span>币</span></p>
			 </div>
			 <div class="list">			 	
				 	<ul>
				 		<li v-for="item in data.list">
				 			<div class="list_left">
						 		<h3>{{item.actiontitle}}</h3>
						 		<p>{{item.addtime}}</p>
						 	</div>
						 	<div class="list_right">
						 		<span class="remove" v-if="item.type=='expend'">-{{item.totalcoin}}</span>
						 		<span class="add" v-if="item.type=='income'">+{{item.totalcoin}}</span>
						 	</div>
				 		</li>
				 	</ul>
			 </div>
		</section>
		<div class="push_data" v-show="pushData">上拉加载更多</div>
		<div class="push_data" v-show="pushNone">暂无更多</div>
		<!--<div class="push_data" v-show="pushDown">正在加载中....</div>-->
	</div>
</template>

<script>


import {wawa_bills,wawa_bills_scroll} from '../../service/getData';
export default { 
  components:{
  	name: 'FinancialGroup',
  },
  data () {
    return {
    	user_id:"54e3bde9a9c25741acd151dd4b957641",
    	data:'',
    	page:1,  //当前页
    	num: 10, // 一页显示多少条
    	pushData:false,
    	pushNone:false,
    	pushDown:false
    }
  },
  created(){
  	var _self=this;
//	document.getElementsByTagName("body")[0].style.background="#F5F5F5";
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
		wawa_bills(this.page).then(res => {   //充值记录详情
			console.log(res)
          if (res.code == 1) {
            	this.data=res.data;
            	if(this.data.list.length==10){
	            		this.pushData=true;
	            	}
	        	for(var i=0;i<this.data.list.length;i++){
	        		this.data.list[i].addtime=timestampToTime(res.data.list[i].addtime);	
	        	}
          } else {
            console.log(err)
          }
        });
//	this.$post('index.php?g=Api&m=Record&a=api',{      //充值记录详情
//			api_name:'bodyBill',
//			token:this.user_id,
//			page:this.page
//		}).then((res) => {
//	        console.log(res);
//	        if(res.code==1){     
//	        	this.data=res.data;
//	        	for(var i=0;i<this.data.list.length;i++){
//	        		this.data.list[i].addtime=formatDate(new Date(parseInt(res.data.list[i].addtime)));	
//	        	}
//	        }        
//	     },err => {
//	        console.log(err)
//	     })
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
	             	 wawa_bills_scroll(_self.page).then(res => {   	             	 	
	             	 	console.log(res);
			          if (res.code == 1) {				          		
			          	    for(var i in res.data.list){
			          	    	res.data.list[i].addtime=timestampToTime(res.data.list[i].addtime);	
			          	    	_self.data.list.push(res.data.list[i]);		          	    	
			          	    	console.log(_self.data.list)
			          	    	_self.pushData=true;
	             				_self.pushDown=false;	             				
			          	    	if(res.data.list.length<_self.num){			          	    		
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
	   }
  }
}
</script>
<style scoped>
	.center{
		text-align: center;
    	margin: 80px 0 40px;
	}
	.center .center_color{
		color:#00000061;
		font-size:15px;
	}
	.center p{
		color: #F47E8C;
	    font-size: 44px;
	    font-weight: bold;
	}
	.center p span{
		font-size: 16px;
    	padding-left: 9px;
	}
	.list{
		background:#fff;
	}
	.list ul li{
		height:70px;
		border-bottom:1px solid #F5F5F5;
		
	}
	.list ul li:last-child{border-bottom:none;}
	.list ul li .list_left h3{
		font-size:18px;
		font-weight:500;
		line-height:40px;
	}
	.list ul li .list_left p{
		color:#00000061;
		font-size:15px;
	}
	.list ul li .list_right{
		line-height:70px;
	}
	.list ul li .list_right .remove{
		color: #F47E8C;
	}
	.list ul li .list_right .add{
		color:#86D8FE;
	}
	.push_data{
		text-align: center;
		width:100%;
		font-size:20px;
		color:#aaa;
		height:50px;
	}
</style>