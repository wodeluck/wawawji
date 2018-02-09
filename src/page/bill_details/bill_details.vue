<template>
	<div class="main">
		<header>
			<a  @click="black_go"><img :src="require('assets/img/header_back.png')"></a>
			<h2>账单详情</h2>
		</header>
		<section>
			<div class="money">
				<p>-{{data.money}}元</p>
				<span v-if="data.status==1">支付成功</span>
				<span v-if="data.status==0">支付失败</span>
			</div>
			<div class="pay_pattern">
				<ul>
					<li>
						<div>付款方式</div>
						<p v-if="data.type==1">微信支付</p>
						<p v-if="data.type==2">支付宝支付</p>
						<p v-if="data.type==3">PayPal支付</p>
						<p v-if="data.type==4">ApplePay支付</p>
					</li>
					<li>
						<div>商品说明</div>
						<p>{{data.log}}</p>
					</li>
					<li>
						<div>订单编号</div>
						<p>{{data.oid}}</p>
					</li>
					<li>
						<div>创建时间</div>
						<p>{{data.ctime}}</p>
					</li>
				</ul>
			</div>
		</section>
	</div>
</template>

<script>
import {bill_details_data} from '../../service/getData';
export default { 
   
  data () {
    return {
    	user_id:"54e3bde9a9c25741acd151dd4b957641",
    	data:''
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
	bill_details_data(this.$route.query.id).then(res => {   //充值记录详情
			  console.log(res);
	          if (res.code == 1) {
	            	this.data=res.data;
		        	this.data.ctime=timestampToTime(res.data.ctime);	
	          } else {
	            console.log(err)
	          }
	        });
//	this.$post('index.php?g=Api&m=Record&a=api',{      //充值记录详情
//			api_name:'recordDetails',
//			token:this.user_id,
//			o_id:this.$route.query.id
//		}).then((res) => {
//	        console.log(res);
//	        if(res.code==1){     
//	        	this.data=res.data;
//	        	this.data.ctime=formatDate(new Date(parseInt(res.data.ctime)));	
//	        }        
//	     },err => {
//	        console.log(err)
//	     })
	
  },
  methods:{
  	  black_go(){
	  		this.$router.push({path:'/recharge_record'});
	  }

  }
     
}
</script>

<style scoped>
	section{
		margin-top: 80px;
	}
	.money{
		text-align: center;
    	margin: 40px 0;
	}
	.money p{
		font-size: 30px;
	    color: #000000c4;
	    line-height: 46px;
	}
	.money span{
		font-size: 14px;
    	color: #00000061;
	}
	.pay_pattern ul li{
		height:35px;
		line-height:35px;
		margin:0 10px;
	}
	.pay_pattern ul li div,.pay_pattern ul li p{
		display: inline-block;
		vertical-align:top;
	}
	.pay_pattern ul li p{
		float:right;
		text-align:right;
		color:#00000061;
	}
	.pay_pattern ul li:last-child{
		border-top:1px solid #cccccc59;
		padding-top:10px;
		margin-top:5px;
	}
</style>