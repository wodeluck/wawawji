<template>
	<div class="main">
		<header>
			<a  @click="black_go"><img :src="require('assets/img/header_back.png')"></a>
			<h2>充值记录</h2>
		</header>
		<section>
			<ul>
				<li v-for="item in data" @click="bill_details(item)">
					<div class="pay_list_left">
						<div class="pay_left_date">
							{{item.ctime}}
						</div>
						<img v-if="item.type==1" :src="require('assets/img/weixin.png')">
						<img v-if="item.type==2" :src="require('assets/img/zhifubao.png')">
						<img v-if="item.type==3" :src="require('assets/img/pay.png')" class="pay_img_width">
						<img v-if="item.type==4" :src="require('assets/img/apple.png')">
						<div class="pay_left_text">
							<h3>-{{item.money}}元</h3>
							<span>获得娃娃币</span>
							{{item.coin}}
						</div>
					</div>
					<div class="pay_list_right" v-if="item.status==1">
						充值成功
					</div>
					<div class="pay_list_right pay_erro" v-if="item.status==0">
						充值失败
					</div>
				</li>
			</ul>
		</section>
	</div>
</template>

<script>
import {recharge_record_list} from '../../service/getData';
	export default { 
   
  data () {
    return {
    	user_id:"54e3bde9a9c25741acd151dd4b957641",
    	data:[],
    	page:1,
    	is_id:''
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
	recharge_record_list(this.page).then(res => {   //充值记录
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
//	this.$post('index.php?g=Api&m=Record&a=api',{      //充值记录
//			api_name:'recordList',
//			token:this.user_id,
//			page:this.page
//		}).then((res) => {
//	        console.log(res);
//	        if(res.code==1){     
//	        	this.data=res.data;
//	        	for(var i=0;i<this.data.length;i++){
//	        		this.data[i].ctime=formatDate(new Date(parseInt(res.data[i].ctime)));	
//	        	}
//	        	
//	        }        
//	     },err => {
//	        console.log(err)
//	     })
	
  },
  methods:{
  	 bill_details(item){
  	 	this.is_id=item.oid;
  	 	console.log(this.is_id);
  	 	this.$router.push({
  	 		path:'/bill_details',
  	 		query:{
  	 			id:item.oid
  	 		}
  	 	})
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
	li{
		height:60px;
		margin:0 10px;
		border-bottom:1px solid #cccccc70;
		padding:5px 0px;
		
	}
	li:last-child{
		border-bottom:none;
	}
	li div{
		display:inline-block;
		height:100%;
		vertical-align:top;
	}
	li .pay_list_left .pay_left_date{
		width:84px;
		text-align:center;
		color:#aaa;
		font-size:14px;
		padding: 5px 0px;
	    box-sizing: border-box;
	    line-height: 18px;
	}
	li .pay_list_left img{
		width:26px;
		vertical-align:top;
		margin-top:10px;
		margin-right:10px;
	}
	li .pay_list_left img.pay_img_width{
		width:60px;
		height:15px;
	}
	li .pay_list_left .pay_left_text{
		font-size:14px;
		color:#666;
		/*padding: 2px 0px;*/
	    box-sizing: border-box;
	}
	li .pay_list_left .pay_left_text h3{
		font-size:16px;
		color:#000;
		line-height: 22px;
	}
	li .pay_list_right{
		font-size:14px;
		color:#00C801;
		line-height:50px;
		float:right;
	}
	li .pay_erro{
		color:#f00;
	}
</style>