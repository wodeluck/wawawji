<template>
	<div class="main">
		<header>
			<a @click="black_go"><img :src="require('assets/img/header_back.png')"></a>
			<h2>我要申诉</h2>
		</header>
		<section>
			<div class="complain_list">
				<ul>
					<li>
						<div class="complain_left">
							<img class="wawa" :src="pic_img">
							<div class="text">
								<h3>视频证据</h3>
								<span>已有视频</span>
							</div>
						</div>
						<div class="complain_right">
							<img class="play" :src="require('assets/img/play.png')">
						</div>
					</li>
					<li>
						<div class="next">申请理由</div>
					</li>
					<li v-for="(item,index) in data_list" @click="li_btn(item,index)">
						<div class="next">
							<img class="full" :src="require('assets/img/empty.png')" v-if="onumber!=index">
							<img class="full" :src="require('assets/img/full.png')" v-if="onumber==index">
							<span>{{item.text}}</span>
						</div>
					</li>
				</ul>				
			</div>
		</section>
		<div class="show_hidden_text" v-show="change_list">请选择申诉理由</div>
		<div class="btn" @click="btn_pa" v-show="btn_show1">提交申诉</div>
		<div class="btn btn_color" v-show="btn_show2">提交申诉</div>
		<div class="show_hidden" v-show="name_null">{{msg}}</div>
	</div>
</template>

<script>
import {complain_data_list,complain_btn} from '../../service/getData';
	export default { 
   
  data () {
    return {
    	user_id:"54e3bde9a9c25741acd151dd4b957641",
    	data_list:[],
    	data:'',
    	type:'',
    	onumber:-1,
    	time:500,
	 	times:1500,
    	pic_img:'',
    	is_id:'',
    	msg:'',
    	name_null:false,
    	btn_show1:true,
    	btn_show2:false,
    	change_list:false
    }
  },
  created(){
  	this.pic_img=this.$route.query.img;
  	complain_data_list().then(res => {   //申诉内容列表
			  console.log(res);
	          if (res.code == 1) {
	            	this.data_list=res.data; 
	          } else {
	            console.log(err)
	          }
	        });
//	this.$post('api/mywawa/api',{      //申诉内容列表
//			api_name:'appeal_list',
//			token:this.user_id,
//		}).then((res) => {
//	        console.log(res);
//	        if(res.code==1){     
//	        	this.data_list=res.data; 
//	        }        
//	     },err => {
//	        console.log(err)
//	     })
//	

  },
  methods:{
  	 black_go(){
	  		this.$router.go(-1)
	  },
	 btn_pa(){
	 	if(this.is_id==""||this.is_id==null){
	 		var _self=this;
	        window.setTimeout(function(){
              _self.change_list=!_self.change_list;
            }, _self.time);
            window.setTimeout(function(){
              _self.change_list=!_self.change_list;
            }, _self.times);
	 		return false;
	 	}
	     this.btn_show1=!this.btn_show1;
	     this.btn_show2=!this.btn_show2;
	     complain_btn(this.is_id).then(res => {   //  用户申诉添加
			  console.log(res);
	          if (res.code == 1) {
	            	this.msg=res.msg;
	            	var _self=this;
			        window.setTimeout(function(){
		              _self.name_null=!_self.name_null;
		            }, _self.time);
		            window.setTimeout(function(){
		              _self.name_null=!_self.name_null;
		            }, _self.times);
	          } else {
	            console.log(err)
	          }
	        });
//	 	 this.$post('api/mywawa/api',{      //用户申诉添加
//			api_name:'add_appeal',
//			token:this.user_id,
//			hid:this.$route.query.id,
//			appeal_type:this.is_id
//		}).then((res) => {
//	        console.log(res);
//	        this.msg=res.msg;
//	        var _self=this;
//	        window.setTimeout(function(){
//            _self.name_null=!_self.name_null;
//          }, _self.time);
//          window.setTimeout(function(){
//            _self.name_null=!_self.name_null;
//          }, _self.times);
//	     },err => {
//	        console.log(err)
//	     })
	
	 },
	 li_btn(item,index){
	 	 this.is_id=item.id;
		 this.onumber=index;
		 console.log(this.is_id);
		
	 }
  }
     
}
</script>

<style scoped>
	section{		
		margin-top: 40px;
	}
	li{
		margin:0 10px;
		padding:10px 0px;
		border-bottom:1px dashed #eee;
		
	}
	li:nth-child(1){
		height:105px;
	}
	li:nth-child(1),li:nth-child(2){
		border-bottom:1px solid #eee;
	}
	li:nth-child(1) .text{
		vertical-align:top;
		padding-left:10px;
		padding-top:15px;
		box-sizing: border-box;
	}
	.text h3{
		font-size:17px;
	}
	.text span{
		font-size:14px;
		color:#333;
	}
	li div{
		display:inline-block;
	}
	li .complain_left img{
		width:80px;
		border:1px solid #eee;
	}
	.complain_right{
		float: right;
    	height: 100%;
	}
	.complain_right img{
		width: 32px;
	    vertical-align: top;
	    margin-top: 26px;
	}
	.next,.next span{
		
		font-size:18px;	
	}
	.next img{
		vertical-align:top;
		width:25px;
		
		margin-right:10px;
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
	div.btn_color{
		background:#86d8fe9e;
	}
	.show_hidden,.show_hidden_text{
		width:40%;
		height:50px;
		border-radius:10px;
		background:rgba(0,0,0,0.8);
		position:fixed;
		top:50%;
		left:30%;
		color:#aaa;	
		text-align:center;
		line-height: 50px;
		z-index:9999;
		opacity:1;
	}
	
</style>