<template>
	<div class="main">
		<header>
			<a  @click="black_go"><img :src="require('assets/img/header_back.png')"></a>
			<h2>消息详情</h2>
		</header>
		<section class="container">
			<h2>{{data.title}}</h2>
			<p>{{data.ctime}}</p>
			<!--<img :src="require('assets/img/banner.png')">-->
			<div class="text" v-html="data.content">
				
				<!--<ul>
					<li>
						又到阳春三月，习近平等党和国家领导人与来自各地的全国人大代表和全国政协委员，将在人民大会堂济济一堂，共商国是。
					</li>
					<li>
						又到阳春三月，习近平等党和国家领导人与来自各地的全国人大代表和全国政协委员，将在人民大会堂济济一堂，共商国是。
					</li>
				</ul>				      -->
			</div>
		</section>
	</div>
</template>
<script>
	import {news_details_data} from '../../service/getData';
export default {

  data () {
    return {
    	user_id:"54e3bde9a9c25741acd151dd4b957641",
    	data:''
    }
  },
  created(){
  	console.log(22)
  	console.log(this.$route.query.id);
  	function formatDate(now) {
					var year=now.getYear();
					var month=now.getMonth()+1;
					var date=now.getDate();
					var hour=now.getHours();
					var minute=now.getMinutes();
					var second=now.getSeconds();
					return "20"+year+"."+month+"."+date+" "+hour+":"+minute+":"+second;
			}
//	this.$post('api/notice/api',{      //消息详情
//			api_name:'get_notice_info',
//			token:this.user_id,
//			id:this.$route.query.id
//		}).then((res) => {
//	        console.log(res);
//	        if(res.code==1){
//	        	this.data=res.data;
//	        	this.data.ctime=formatDate(new Date(parseInt(res.data.ctime)));
//	        }
//	     },err => {
//	        console.log(err)
//	     })
		news_details_data(this.$route.query.id).then(res => {   //我的娃娃列表
			  console.log(res);
	          if (res.code == 1) {
	            	this.data=res.data;
		        	this.data.ctime=formatDate(new Date(parseInt(res.data.ctime)));
	          } else {
	            console.log(err)
	          }
	          })

  },
  methods:{
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
	.container{
		padding:10px;
	}
	.container h2{
		font-size:15px;
	}
	.container p{
		font-size:13px;
		color:#ccc;
		line-height:40px;
	}
	.container img{
		width:100%;
		margin-bottom:7px;
	}
	.container .text ul li{
		color:#666;
		font-size:14px;
		text-indent:24px;
		line-height:20px;
		margin-bottom:15px;
	}
</style>
