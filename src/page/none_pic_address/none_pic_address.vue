<template>
	<div>
		<header>
			<a @click="black_go"><img :src="require('assets/img/header_back.png')"></a>
			<h2>收货地址</h2>
			<div class="header_right" @click="add">
				<img :src="require('assets/img/add_address.png')">
			</div>
		</header>
		<section>
		<ul>
			<li v-for="(item,index) in data">
				<div class="box">
					<div class="width">
						<div class="box_text">
							<p>{{item.addr}}{{item.addr_info}}</p>
							<p class="color"><span>{{item.username}}</span>{{item.mobile}}</p>
						</div>
						<img class="white" :src="require('assets/img/white.png')" @click="set_address(item)">
					</div>
					<div class="del" @click="del(item)">删除</div>
				</div>
			</li>
		</ul>
		</section>
	</div>
</template>

<script>
import {com_address_data,com_address_reload} from '../../service/getData';
export default {
  data () {
    return {
 	 	user_id:"54e3bde9a9c25741acd151dd4b957641",
    	data:[],
    	conts:-1,
    	oid:''
    }
  },
  created(){
  		com_address_data().then(res => {   //收件地址列表
			  console.log(res);
	          if (res.code == 1) {
	            	this.data=res.data;
	          } else {
	            console.log(err)
	          }
	        });
//		this.$post('api/addr/api',{      //收件地址列表
//			api_name:'addr_list',
//			token:this.user_id
//		}).then((res) => {
//	        console.log(res);
//	        if(res.code==1){
//	        	this.data=res.data;
//	        }
//	    },err => {
//	        console.log(err)
//	     })
  },
  methods:{

  	  set_address(item){
  	  	this.$router.push({
  	  		path:'/set_address',
  	  		query:{
  	  			addr_id:item.addr_id,
  	  			name:item.username,
  	  			phone:item.mobile,
  	  			addr:item.addr,
  	  			addr_info:item.addr_info
  	  		}
  	  	});
  	  },
  	  del(item){
  	  	com_address_reload(item.addr_id).then(res => {   //删除收件地址
			  console.log(res);
	          if (res.code == 1) {
    				location.reload()
	          } else {
	            console.log(err)
	          }
	        });
//	  		this.$post('api/addr/api',{      //删除收件地址
//			api_name:'addr_del',
//			token:this.user_id,
//			addr_id:item.addr_id
//			}).then((res) => {
//		        console.log(res);
//		        if(res.code==1){
//		        	 location.reload();
//		        }
//		    },err => {
//		        console.log(err)
//		     })
  	 },
  	 black_go(){
	  	this.$router.push({path:'/personal_center'});
	 },
	 add(){
  	  	this.$router.push({path:'/add_address'});
  	  }
  }
}
</script>

<style  lang="scss" scoped>
  @import '../../style/mixin';
  section{
    @include px2rem(margin-top,80);
	}
	header .header_right img{
    @include px2rem(width,40);
		vertical-align:top;
    @include px2rem(margin-top,18);
	}
	li{
    @include px2rem(margin,0 20);
		border-bottom:1px dashed #eee;
    @include px2rem(padding,20 0);
		width:100%;
		overflow-x: scroll;
	}
	li .box{
		overflow-x:scroll;
		width:125%;
	}
	li .box div{
		display:inline-block;
		vertical-align:top;
	}
	li .box .width{
		width:79%;
	}
	li img{
		vertical-align:top;
    @include px2rem(margin-top,30);
	}
	.box .box_text,.box .del{
		display:inline-block;
	}
	.white{
    @include px2rem(width,40);
	}
	.box .box_text{
		width:80%;
	}
	.box .box_text p{
    @include px2rem(text-indent,20);
    @include font-dpr(16px);
    @include px2rem(line-height,50);
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.box .box_text p.color{
		color:#aaa;
	}
	.box .box_text p.color span{
    @include px2rem(padding-right,20);
	}
	.width{
		width:100%;
	}
	.del{
		width:16%;
		text-align:center;
		height:100%;
		background:#F47E8C;
		color:#fff;
    @include px2rem(line-height,104);
	}
</style>
