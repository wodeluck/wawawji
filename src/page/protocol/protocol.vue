<template>
	<div class="main">
		<header>
			<a @click="black_go"><img :src="require('assets/img/header_back.png')"></a>
			<h2>用户协议</h2>
		</header>
		<section v-html="data">
		</section>
	</div>
</template>

<script>
	import {protocol_data} from '../../service/getData';
	export default{
	data () {
	    return {

	 	 	user_id:"54e3bde9a9c25741acd151dd4b957641",
	 	 	data:""
	    }
	  },
	  created(){
	  	protocol_data().then(res => {   //获取用户协议
			  console.log(res);
	          if (res.code == 1) {
	            	this.data=res.data;
	          } else {
	            console.log(err)
	          }
	        });
//		this.$post('api/set/api',{      //获取用户协议
//			api_name:'get_user_agreement',
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
			black_go(){
	  		this.$router.go(-1)
			}
	  },
	  beforeDestroy() {

    }
}
</script>

<style scoped>
	section{
		overflow:hidden;
		padding:10px;
		font-size:14px;
		text-indent:20px;
		margin-top:40px;
	}
</style>
