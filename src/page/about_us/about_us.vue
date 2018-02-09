<template>
	<div class="main">
		<header>
			<a @click="black_go"><img :src="require('assets/img/header_back.png')"></a>
			<h2>关于我们</h2>
		</header>
		<section>
			<div class="logo">
				<div class="logo_img">
					<img :src="require('assets/img/logo.png')">
				</div>
				
				<p>娃娃机</p>
				<span>V1.0.0</span>
			</div>
			<div class="list">
				<ul>
					<li @click="qusion">
						<div class="list_left">常见问题</div>
						<div class="list_right"><img :src="require('assets/img/right.png')"></div>
					</li>
					<li @click="contract">
						<div class="list_left">用户协议</div>
						<div class="list_right"><img :src="require('assets/img/right.png')"></div>
					</li>
				</ul>
			</div>
		</section>
		<div class="bottom">
			<p>{{data.company_name}}</p>
			<p>{{data.company_name_en}}</p>
		</div>
	</div>
</template>

<script>
	import {about_us_data} from '../../service/getData';
	export default{  
	data () {
	    return {
	 	 	customizeClass: 'active',
	 	 	user_id:"54e3bde9a9c25741acd151dd4b957641",
	 	 	data:""
	    }
	  },
	  created(){
//		this.$post('api/set/api',{      //关于我们
//			api_name:'get_about',
//			token:this.user_id,
//			
//			}).then((res) => {
//		        console.log(res);
//		        if(res.code==1){     
//		        	
//		        }        
//		     },err => {
//		        console.log(err)
//		     })
about_us_data().then(res => {   //获取我的邀请码
			  console.log(res);
	          if (res.code == 1) {
	            	this.data=res.data;		        	
	          } else {
	            console.log(err)
	          }
	        });
//		this.$post('api/set/api',{      //获取公司名称
//			api_name:'get_company_name',
//			token:this.user_id,
//			
//			}).then((res) => {
//		        console.log(res);
//		        if(res.code==1){     
//		        	this.data=res.data;
//		        }        
//		     },err => {
//		        console.log(err)
//		     })
	  },
	  methods:{
	  	qusion(){
	  		this.$router.push({path:'/question'}); 	
	  	},
	  	contract(){
	  		this.$router.push({path:'/protocol'}); 	
	  	},
	  	black_go(){
	  		this.$router.push({path:'/set'})
	  	}
	  },
	  beforeDestroy() {

    }
}
</script>

<style scoped>
	section{
		margin-top:40px;
	}
	.logo{
		text-align: center;
    	padding: 30px 0 20px 0;
	}
	.logo .logo_img{
		display: inline-block;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 10px;
	}
	.logo .logo_img img{
		width: 110px;
    height: 100px;
	}
	.logo .logo_img p{
		    margin: 10px 0 5px 0;
    font-size: 20px;
	}
	.logo .logo_img span{
		font-size: 15px;
    color: #aaa;
	}
	.list ul li{
		height:50px;
		border-bottom: 1px solid #eee;
	}
	.list ul li .list_left{
		line-height:50px;
	}
	.list ul li .list_right img{
		margin-top: 17px;
    width: 10px;
	}
	.bottom{
		text-align:center;
		font-size:15px;
		color: #aaa;
		position:fixed;
		bottom:0;
		left:0;
		width: 100%;
		padding-bottom:20px;
	}
	.bottom p{
		line-height:20px;
		font-size:13px;
	}
</style>