<template>
	<div class="main">
		<header>
			<a  @click="black_go"><img :src="require('assets/img/header_back.png')"></a>
			<h2>游戏详情</h2>
		</header>
		<section>
			<div class="list">
				<ul>
					<li>
						<div class="list_left">
							<img class="wawa" :src="data.img">
							<div class="text">
								<p>{{data.name}}</p>
								<p class="color">{{data.ctime}}</p>
								<span v-if="data.success==0">抓取失败</span>
								<span v-if="data.success>0">抓取成功</span>
							</div>
						</div>
						<div class="list_right">
							<img class="play" :src="require('assets/img/play.png')">
						</div>
					</li>
					<li style="border-bottom:1px dashed #eee;">
						<div class="list_left" style="width:30%;">
							游戏编号
						</div>
						<div class="list_right" style="line-height: normal;">
							{{data.hid}}
						</div>
					</li>
				</ul>
			</div>
		</section>
		<div class="btn" @click="btn">申诉</div>
	</div>
</template>

<script>
import {game_details_data} from '../../service/getData';
	export default { 
   
  data () {
    return {
    	user_id:"54e3bde9a9c25741acd151dd4b957641",
    	data:'',
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
	game_details_data(this.$route.query.id).then(res => {   //兑换礼品的详情
			  console.log(res);
	          if (res.code == 1) {
	            	this.data=res.data;
		        	this.data.ctime=timestampToTime(res.data.ctime);		 
	          } else {
	            console.log(err)
	          }
	        });
//	this.$post('api/mywawa/api',{      //游戏记录详情
//			api_name:'game_detail',
//			token:this.user_id,
//			hid:this.$route.query.id
//		}).then((res) => {
//	        console.log(res);
//	        if(res.code==1){     
//	        	this.data=res.data;
//	        	console.log(this.data);	        	
//	        		this.data.ctime=formatDate(new Date(parseInt(res.data.ctime)));		        
//	        }        
//	     },err => {
//	        console.log(err)
//	     })
	
  },
  methods:{
	 btn(){
	 	this.$router.push({
  			path:'/complain',
  			query:{
  				id:this.$route.query.id,
  				img:this.data.img
  			}
  		})
	 },
	 black_go(){
	  		this.$router.go(-1)
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
		width: 70px;
		height:75px;
    	border: 1px solid #eee;
	}
	.list_left .text{
		width: 70%;
    vertical-align: top;
        padding-left: 10px;
    box-sizing: border-box;
	}
	.list_left .text p{
		display:block;
	}
	.list_left .text p:nth-child(1){
		font-size: 17px;
    font-weight: bold;
	}
	.list_left .text p:nth-child(2){
		font-size: 14px;
    color: #9e9e9e;
        margin-bottom: 20px;
	}
	.list_left .text span{
		font-size:15px;
		color:#F47E8C
	}
	.list ul li .list_right{
		height:100%;
		line-height: 70px;
	}
	.list ul li .list_right img{
		width:30px;
		vertical-align: top;
   		margin-top: 25px;
	}
	.btn{
		width: 90%;
	    background: #86D8FE;
	    color: #fff;
	    margin: 50px 5%;
	    text-align: center;
	    height: 50px;
	    line-height: 50px;
	    font-size: 18px;
	    border-radius: 30px;
	}
</style>