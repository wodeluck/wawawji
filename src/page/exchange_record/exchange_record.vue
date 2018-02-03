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
    	page:1
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
	exchange_record_data(this.page).then(res => {   //礼品兑换记录列表
			  console.log(res);
	          if (res.code == 1) {
	             this.data=res.data;
	        	for(var i=0;i<this.data.length;i++){
		        		this.data[i].ctime=formatDate(new Date(parseInt(res.data[i].ctime)));
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

  },
  methods:{
		black_go(){
	  		this.$router.go(-1)
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
</style>
