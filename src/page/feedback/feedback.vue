<template>
	<div class="main">
		<header>
			<a  @click="black_go"><img :src="require('assets/img/header_back.png')"></a>
			<h2>意见反馈</h2>
		</header>
		<section>
			<div class="text_header">您的反馈内容</div>
			<textarea class="text_text" placeholder="请输入您的反馈内容.." v-model="otext"></textarea>
			<div class="text_header">您的联系方式</div>
			<input type="tel" class="text_phone" placeholder="留下手机号，方便我们联系您" v-model="phone"></input>
		</section>
		<div class="btn" @click="btn" v-show="btn_hidden">提交反馈</div>
		<div class="btn" v-show="!btn_hidden" style="background:#86d8fe82;">提交反馈</div>
		<div class="text_window" v-show="text_text">内容不能为空</div>
		<div class="text_window" v-show="text_phone">手机号不能为空</div>
		<div class="text_window" v-show="text_phone_err">请输入正确的手机号</div>
		<div class="text_window" v-show="success">{{data}}</div>
	</div>
</template>

<script>
	import {feedback_btn} from '../../service/getData';
export default{  
  data () {
    return {
 	 	otext:"",
 	 	phone:"",
 	 	user_id:"54e3bde9a9c25741acd151dd4b957641",
 	 	text_text:false,
 	 	text_phone:false,
 	 	text_phone_err:false,
 	 	time:500,
 	 	data:"",
 	 	success:false,
 	 	btn_hidden:true
    }
  },
  created(){
  
  },
  methods:{
  	black_go(){
	  		this.$router.push({path:'/personal_center'})
	  },
  	btn(){
  		console.log(1);
  		if(this.otext==""||this.otext==null){
  			var _self=this;	  		  			
  			window.setTimeout(function(){
              _self.text_text=!_self.text_text;
            }, _self.time);
            window.setTimeout(function(){
              _self.text_text=!_self.text_text;
            }, _self.times);
            return false;
  		}
  		if(this.phone==""||this.phone==null){
  			var _self=this;	  		  			
  			window.setTimeout(function(){
              _self.text_phone=!_self.text_phone;
            }, _self.time);
            window.setTimeout(function(){
              _self.text_phone=!_self.text_phone;
            }, _self.times);
  			return false;
  		}
  		var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;  
          if (!myreg.test(this.phone)){
          	var _self=this;	  		  			
  			window.setTimeout(function(){
              _self.text_phone_err=!_self.text_phone_err;
            }, _self.time);
            window.setTimeout(function(){
              _self.text_phone_err=!_self.text_phone_err;
            }, _self.times);
  			return false;
          }
         feedback_btn(this.otext,this.phone).then(res => {   //提交问题反馈
         	console.log(res)
         	var _self=this;	
          if (res.code == 1) {
          	this.btn_hidden=!this.btn_hidden;
           	this.otext="";
           	this.phone="";
           	this.data=res.msg;
           	window.setTimeout(function(){
              _self.success=!_self.success;
            }, _self.time);
            window.setTimeout(function(){
              _self.success=!_self.success;
            }, _self.times);
            
          } else {
            console.log(err)
          }
        });
//		this.$post('api/feedback/api',{      //提交问题反馈
//			api_name:'feedback',
//			token:this.user_id,
//			content:this.otext,
//			contact:this.phone,			
//		}).then((res) => {
//	        console.log(res);
//	        if(res.code==1){     
//	        	
//	        	
//	        }        
//	     },err => {
//	        console.log(err)
//	     })
  	}
  }
}
</script>

<style scoped>
	.text_header{
		height: 50px;
    background: #F5F5F5;
    line-height: 50px;
    padding: 0 10px;
    color: #aaa;
    font-size: 16px;
	}
	.text_text{
		padding: 10px;
    width: 100%;
    height: 180px;
    border: none;
    box-sizing: border-box;
    font-size: 16px;
	}
	.text_phone{
		width: 100%;
    border: none;
    box-sizing: border-box;
    height: 60px;
    font-size: 16px;
    line-height: 60px;
    text-indent: 10px;
    border-bottom: 1px solid #eee;
	}	
	 .btn{
		width:90%;
	    height: 50px;
	    text-align: center;
	   margin:40px 5%;
	   border-radius: 50px;
	    background: #86D8FE;
	    line-height: 50px;
	    color: #fff;
	    font-size: 18px;
	    letter-spacing: 2px;
	}
	.text_window{
		width: 40%;
    height: 50px;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.8);
    position: fixed;
    top: 50%;
    left: 30%;
    color: #aaa;
    text-align: center;
    line-height: 50px;
    z-index: 9999;
    opacity: 1;
	}
</style>