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

		</section>
	</div>
</template>

<script>
import {game_record_data} from '../../service/getData';
export default {

  data () {
    return {
    	user_id:"54e3bde9a9c25741acd151dd4b957641",
    	data:[],
    	page:1,
    	size:10
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
					return "20"+year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
			}
	game_record_data(this.page,this.size).then(res => {   //游戏记录
			  console.log(res);
	          if (res.code == 1) {
              for(var i in res.data){
                res.data[i].ctime=formatDate(new Date(Number(res.data[i].ctime)));
              }
              this.data=res.data;

	          } else {
	            console.log(err)
	          }
	        });
//	this.$post('api/mywawa/api',{      //游戏记录
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
		width: 60px;
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
</style>
