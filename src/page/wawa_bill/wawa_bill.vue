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
			 	<!--<load-more :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :bottomPullText='bottomText'
    				:auto-fill="false" @bottom-status-change="handleBottomChange" ref="loadmore">-->
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
			 	<!--</load-more>-->
			 </div>
		</section>
		<!--<div v-show="loading" slot="bottom" class="loading"></div>-->
	</div>
</template>

<script>
//import pull_refresh from '../components/pull_refresh';  //组件上拉加载。。。

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
        //  上拉加载数据
                scrollHeight: 0,
                scrollTop: 0,
                containerHeight: 0,
                loading: false,
                allLoaded: false,
                bottomText: '上拉加载更多...',
                bottomStatus: '',
                pageNo: 1,
                totalCount: '',
    }
  },
  created(){
  	console.log(11%2?2:1)
  	var _self=this;
//	document.getElementsByTagName("body")[0].style.background="#F5F5F5";
  	function formatDate(now) { 
					var year=now.getYear(); 
					var month=now.getMonth()+1; 
					var date=now.getDate(); 
					var hour=now.getHours(); 
					var minute=now.getMinutes(); 
					var second=now.getSeconds(); 
					return "20"+year+"."+month+"."+date+" "+hour+":"+minute+":"+second; 
			} 
		wawa_bills(this.page).then(res => {   //充值记录详情
			console.log(res)
          if (res.code == 1) {
            	this.data=res.data;
	        	for(var i=0;i<this.data.list.length;i++){
	        		this.data.list[i].addtime=formatDate(new Date(parseInt(res.data.list[i].addtime)));	
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
	
  },
  methods:{
  	  /* 下拉加载 */
        _scroll: function(ev) {
            ev = ev || event;
            this.scrollHeight = this.$refs.innerScroll.scrollHeight;
            this.scrollTop = this.$refs.innerScroll.scrollTop;
            this.containerHeight = this.$refs.innerScroll.offsetHeight;
        },
        loadBottom: function() {
            this.loading = true;
            this.page += 1;   // 每次更迭加载的页数
            if (this.page == this.totalGetCount) {
                // 当allLoaded = true时上拉加载停止
                this.loading = false;
                this.allLoaded = true;
            }
           // api.commonApi(后台接口，请求参数) 这个api是封装的axios有不懂的可以看vue2+vuex+axios那篇文章
           wawa_bills_scroll(this.page).then(res => {   //充值记录详情
           	  console.log(res)
	          if (res.code == 1) {
	          	 this.page++;
	          	 setTimeout(() => {
	            	this.data=res.data;
		        	this.$nextTick(() => {
	                  	this.loading = false;
	         	  	})
		        }, 1000)
	          } else {
	            console.log(err)
	          }
	       
//                  .then(res => {
//              setTimeout(() => {
// 	         // 要使用的后台返回的数据写在setTimeout里面
//                this.$nextTick(() => {
//                  this.loading = false;
//          	  })
//          }, 1000)
         });
        },
        handleBottomChange(status) {
            this.bottomStatus = status;
        },
        black_go(){
	  		this.$router.go(-1)
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
</style>