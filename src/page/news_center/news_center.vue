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
	</div>
</template>

<script>
import {news_data} from '../../service/getData';
export default { 
   
  data () {
    return {
    	data:[],
    	user_id:"54e3bde9a9c25741acd151dd4b957641",
    	creatime:[],
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
				for (var i=0;i<res.data.length;i++) {	
					this.data[i].ctime=formatDate(new Date(parseInt(res.data[i].ctime)));									
				}	
          } else {
            console.log(err)
          }
        });
	
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
	  		this.$router.go(-1)
	 }
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
</style>