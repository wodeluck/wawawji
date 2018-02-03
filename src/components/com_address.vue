<template>
	<div style="overflow: hidden;">
		<ul>
			<li v-for="(item,index) in data">
				<div class="box">
					<div class="width">
						<img class="full" :src="require('../assets/img/full.png')" v-show="conts==index" @click="pic(item,index)">
						<img class="full" :src="require('../assets/img/empty.png')" v-show="conts!=index" @click="pic(item,index)">
						<div class="box_text">
							<p>{{item.addr}}{{item.addr_info}}</p>
							<p class="color"><span>{{item.username}}</span>{{item.mobile}}</p>
						</div>
						<img class="white" :src="require('../assets/img/white.png')" @click="set_address(item)">
					</div>
					<div class="del" @click="del(item)">删除</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
export default {  
  data () {
    return {
 	 	user_id:"54e3bde9a9c25741acd151dd4b957641",
    	data:[],
    	conts:-1
    }
  },
  created(){
		this.$post('api/addr/api',{      //收件地址列表
			api_name:'addr_list',
			token:this.user_id
		}).then((res) => {
	        console.log(res);
	        if(res.code==1){     
	        	this.data=res.data;	        	
	        }        
	    },err => {
	        console.log(err)
	     })
  },
  methods:{
  	  set_address(item){
  	  	this.$router.push({
  	  		path:'/set_address',
  	  		query:{
  	  			addr_id:item.addr_id,
  	  			name:item.username,
  	  			phone:item.mobile
  	  		}
  	  	});
  	  },
  	  pic(item,index){
  	  	this.conts=index;
  	  },
  	  del(item){
  	  		this.$post('api/addr/api',{      //删除收件地址
			api_name:'addr_del',
			token:this.user_id,
			addr_id:item.addr_id
			}).then((res) => {
		        console.log(res);
		        if(res.code==1){     
		        	 location.reload(); 
		        }        
		    },err => {
		        console.log(err)
		     })
  	  }
  }
}
</script>

<style scoped>
	li{
		margin:0px 10px;
		border-bottom:1px dashed #eee;
		padding:15px 0px;	
		width:100%;	
		overflow-x: scroll;
		height: 52px;
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
		margin-top:15px;
	}
	.full{
		width:25px;
	}
	.box .box_text,.box .del{
		display:inline-block;
	}	
	.white{
		width:20px;
	}
	.box .box_text{
		width:80%;
	}
	.box .box_text p{
		text-indent:10px;
		font-size:16px;
		line-height: 25px;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.box .box_text p.color{
		color:#aaa;
	}
	.box .box_text p.color span{
		padding-right:10px;
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
		line-height:52px;
	}
</style>