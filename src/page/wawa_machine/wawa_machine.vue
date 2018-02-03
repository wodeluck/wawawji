<template>
	<div class="main">
		<header>
			<a @click="black_go"><img :src="require('assets/img/header_back.png')"></a>
			<h2>娃娃机</h2>
		</header>
		<section>
			<img class="machine_img" :src="require('assets/img/machine_bg_color.png')">
			<div class="position">
				<div class="pos_logo">
					<img class="logo" :src="require('assets/img/logo.png')">
					<div class="wawa_machine">
						<img class="wawa_w" :src="require('assets/img/wawa_machine.png')">
						<img class="wawa_play" :src="require('assets/img/wawa_machine_play.png')">
					</div>
				</div>
				<div class="code">
					<img class="code_code" :src="require('assets/img/code.png')">
					<p class="gift_code">
						<img :src="require('assets/img/code_cir.png')">
						<span class="pos_code">我的邀请码 <span>452123</span></span>
					</p>
					<div class="machine_news">
						<p>
							<img class="machine_person" :src="require('assets/img/machine_person.png')">
							邀请好友，您和好友各得30娃娃币
						</p>
						<p>
							<img style="width:21px" class="machine_cony" :src="require('assets/img/machine_cony.png')">
							每天登录就送10娃娃币
						</p>
						<p>
							<img style="width:20px" class="machine_mile" :src="require('assets/img/machine_mile.png')">
							超值爆款网红娃娃，萌又多，上新快
						</p>
						<p>
							<img style="width:18px" class="machine_clock" :src="require('assets/img/machine_clock.png')">
							呼朋唤友，围观吐槽，乐趣多
						</p>
					</div>
				</div>
				<div class="btn">
					<img :src="require('assets/img/machine_btn.png')">
					<p>立即下载</p>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
export default{  
	data () {
	    return {
	 	 	customizeClass: 'active'
	    }
	  },
	  created(){
	  	document.getElementsByTagName("body")[0].style.background="#9EDFFF";
	  },
	  methods:{
	  	  black_go(){
	  		this.$router.go(-1)
	  	  }
	  	 
	  },
	  beforeDestroy() {
        document.getElementsByTagName("body")[0].style.background="#9EDFFF";
    }
}
</script>
</script>

<style scoped>
	section{margin-top:40px;}
	section{
		position: relative;
	}
	section .machine_img{
		width: 100%;
    height: 100%;
	}
	.position{
		position: absolute;
    top: 0;
    left: 0;
    padding: 10px;
    text-align: center;
    background:#9EDFFF;
	}
	.position .pos_logo .logo{
		    width: 75px;
    margin: 20px 0px 10px;
	}
	.position .pos_logo .wawa_machine{
		width: 80%;
    background: #fff;
    margin: 0 10%;
    padding: 8px;
    box-sizing: border-box;
    border-radius: 10px;
    position: relative;
	}
	.position .pos_logo .wawa_machine .wawa_w{
		    width: 100%;
	}
	.position .pos_logo .wawa_machine .wawa_play{
		position: absolute;
    width: 40px;
    bottom: 20px;
    right: 30px;
	}
	.position .code{
		background: rgba(255,255,255,0.7);
    margin: 15px 0px;
    border-radius: 8px;
	}
	.position .code .code_code{
		width: 86px;
    margin: 15px 0px;
	}
	.position .code .gift_code{
		text-align: center;
    position: relative;
	}
	.position .code .gift_code img{
		width:60%;
	}
	.position .code .gift_code .pos_code{
		position: absolute;
    width: 100%;
    color: #fff;
    left: 0;
    line-height: 40px;
    font-size: 15px;
	}
	.position .code .gift_code .pos_code span{
		font-size: 17px;
    padding-left: 10px;
	}
	.code .machine_news{
		width: 80%;
    margin: 20px 10%;
    padding-bottom:10px;
	}
	.code .machine_news p{
		font-size: 14px;
    color: #666;
    text-align: left;
    line-height: 25px;
	}
	.code .machine_news p img{
		width: 22px;
    vertical-align: middle;
    margin-right:10px;
	}
	.btn{
		width:100%;
		position: relative;	
	}
	.btn img{
		width:80%;
	}
	.btn p{
		color: #fff;
    position: absolute;
    width: 100%;
    top: 0;
    font-family: cursive;
    font-size: 22px;
    line-height: 40px;
	}
</style>