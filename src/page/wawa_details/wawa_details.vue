<template>
	<div class="main">
		<header>
			<a  @click="black_go"><img :src="require('assets/img/header_back.png')"></a>
			<h2>娃娃详情</h2>
		</header>
		<section>
			<ul>
				<li>
					<div class="list_left">
						<img class="wawa" :src="data.gifticon">
						<div class="name">
							<h3>{{data.giftname}}</h3>
							<p>{{data.ctime}}</p>
						</div>
					</div>
					<div class="list_right">
						<span v-if="data.is_receive==1">赠</span>
					</div>
				</li>
				<li>
					<div class="list_left">
						数量
					</div>
					<div class="list_right">
						{{data.nums}}
					</div>
				</li>
				<li>
					<div class="list_left">
						编号
					</div>
					<div class="list_right">
						{{data.ori_id}}
					</div>
				</li>
				<li>
					<div class="list_left">
						娃娃来源
					</div>
					<div class="list_right position" v-if="data.is_receive>0">
						<img :src="data.source.avatar_thumb">
						<h3>{{data.source.user_nicename}}</h3>
						<span>(ID:{{data.source.uid}})</span>
					</div>
					<div class="list_right position" v-else>
						我抓的
					</div>
				</li>
				<li>
					<div class="list_left">
						转赠留言
					</div>
					<div class="list_right">
						{{data.msg}}
					</div>
				</li>
				<li>
					<div class="list_left">
						状态
					</div>
					<div class="list_right" v-if="data.status==0" style="color:#F2AFCD;">
						寄存中
					</div>
					<div class="list_right" v-if="data.status==1" style="color:#F2AFCD;">
						待邮寄
					</div>
					<div class="list_right" v-if="data.status==2" style="color:#F5CF96;">
						已发货
					</div>
					<div class="list_right" v-if="data.status==3" style="color:#BDBDBD;">
						已转赠
					</div>
					<div class="list_right" v-if="data.status==4" style="color:#BDBDBD;">
						获赠
					</div>
					<div class="list_right" v-if="data.status==5" style="color:#BDBDBD;">
						已确认
					</div>
				</li>
				<li v-if="data.status==1 || data.status==2">
					<div class="list_left">
						邮寄备注
					</div>
					<div class="list_right">
						{{data.remarks}}
					</div>
				</li>
				<li  v-if="data.status==2">
					<div class="list_left">
						快递公司
					</div>
					<div class="list_right">
						{{data.express}}
					</div>
				</li>
				<li v-if="data.status==2">
					<div class="list_left">
						运单编号
					</div>
					<div class="list_right">
						{{data.ex_num}}
					</div>
				</li>
			</ul>
		<!--	<div class="btn">运单详情</div>-->
		</section>
	</div>
</template>

<script>
	import {wawa_details_data} from '../../service/getData';
	export default {

  data () {
    return {
    	user_id:"54e3bde9a9c25741acd151dd4b957641",
    	data:'',
    	data_user_name:'',
    	status:''
    }
  },
  created(){
  	this.status=this.$route.query.status;
  	function formatDate(now) {
					var year=now.getYear();
					var month=now.getMonth()+1;
					var date=now.getDate();
					var hour=now.getHours();
					var minute=now.getMinutes();
					var second=now.getSeconds();
					return "20"+year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
			}
	wawa_details_data(this.$route.query.id).then(res => {   //我的娃娃列表
			  console.log(res);
	          if (res.code == 1) {
	            	this.data=res.data;
	        		this.data.ctime=formatDate(new Date(parseInt(res.data.ctime)));
	          } else {
	            console.log(err)
	          }
	        });
//	this.$post('api/mywawa/api',{      //娃娃详情
//			api_name:'wawa_detail',
//			token:this.user_id,
//			wawa_id:this.$route.query.id
//		}).then((res) => {
//	        console.log(res);
//	        if(res.code==1){
//	        	this.data=res.data;
//	        	this.data.ctime=formatDate(new Date(parseInt(res.data.ctime)));
//	        }
//	     },err => {
//	        console.log(err)
//	     })
//	this.$post('api/mywawa/api',{      //我的娃娃上面个人信息接口
//			api_name:'get_info',
//			token:this.user_id,
//		}).then((res) => {
//	        console.log(res);
//	        if(res.code==1){
//	        	this.data_user_name=res.data;
//	        }
//	     },err => {
//	        console.log(err)
//	     })

  },
  methods:{
  	  black_go(){
	  		this.$router.push({path:'/my_wawa'});
	  }

  }

}
</script>

<style scoped>
	section{
		margin-top:40px;
	}
	ul li{
		margin:0 10px;
		border-bottom:1px dashed #eee;
		padding:10px 0px;
		position:relative;
	}
	ul li div{
		display:inline-block;
		vertical-align:top;
		height:100%;
	}

	ul li div.list_right{
		float:right;
	}
	.list_left .wawa{
		width:70px;
		height: 60px;
		border:1px solid #eee;
	}
	.list_left .name{
		padding-top:10px;
		box-sizing: border-box;
		margin-left:10px;
	}
	.list_left .name h3{
		font-size:19px;
	}
	.list_left .name p{
		font-size:14px;
		color:#666;
	}
	ul li:nth-child(1) .list_right span{
		color:#F47E8C;
		font-size:16px;
		border:1px solid #F47E8C;
		padding:2px;
		border-radius:5px;
		line-height:70px;
	}
	.list_right h3{
		display:inline-block;
		vertical-align:middle;
		font-size:17px;
	}
	.list_right img{
		width:36px;
		vertical-align: middle;
    	margin-top: 3px;
	}
	ul li div.position{
		position:absolute;
		top:0;
		right:0;
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
