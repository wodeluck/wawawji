<template>
	<div class="main">
		<header>
			<a  @click="black_go"><img :src="require('assets/img/header_back.png')"></a>
			<h2>设置</h2>
		</header>
		<section>
			<div class="list">
				<!--<ul>-->
					<!--<li>-->
						<!--<div class="list_left">-->
							<!--语言切换-->
						<!--</div>-->
						<!--<div class="list_right">-->
							<!--<div class="lang">-->
								<!--<span>简体</span>-->
								<!--<img :src="require('assets/img/lang.png')">-->
							<!--</div>-->
							<!--<div class="lang_wit">繁体</div>-->
						<!--</div>-->
					<!--</li>-->
					<!--<li>-->
						<!--<div class="list_left">-->
							<!--背景音乐开关-->
						<!--</div>-->
						<!--<div class="list_right">-->
							<!--<img class="top" :src="require('assets/img/off.png')">-->
						<!--</div>-->
					<!--</li>-->
					<!--<li>-->
						<!--<div class="list_left">-->
							<!--音效开关-->
						<!--</div>-->
						<!--<div class="list_right">-->
							<!--<img class="top" :src="require('assets/img/on.png')">-->
						<!--</div>-->
					<!--</li>-->
					<!---->
				<!--</ul>-->
				<ul class="margin_top">
					<li @click="us">
						<div class="list_left">
							关于我们
						</div>
						<div class="list_right">
							<img class="width_img" :src="require('assets/img/right.png')">
						</div>
					</li>
				</ul>
			</div>
		</section>
		<div class="exit" @click="logOut">退出登录</div>

	</div>
</template>

<script>
  import {mapMutations} from 'vuex';
  import {delCookie,removeStore} from '../../config/mUtils';
export default{
	data () {
	    return {
	 	 	customizeClass: 'active'
	    }
	  },
	  created(){
//	  	document.getElementsByTagName("body")[0].style.background="#F5F5F5";
	  },
	  methods:{
      showToastPlugin() {
        this.$vux.toast.show({
          text: this.toastContent,
          width: '20em',
          type: 'text',
          position: 'middle',
          onShow() {

          },
          onHide() {
          }
        })
      },
      logOut(){
          delCookie("session");
          removeStore('token');
          removeStore('userInfo2');
          this.toastContent='退出登录成功';
          this.showToastPlugin();
          setTimeout(()=>{
            this.$router.push({path: '/login'});
            },1500);
      },
	  	us(){
	  		this.$router.push({path:'/about_us'});
	  	},
		black_go(){
	  		this.$router.go(-1)
	 	}
	  },
	  beforeDestroy() {
//      document.getElementsByTagName("body")[0].style.background="#F5F5F5";
    }
}
</script>

<style scoped>
	section{
		/*margin-top:40px;*/
    padding-top: 40px;
	}
  .list ul{
    margin-bottom: 0;
    background: transparent;
    padding-bottom: 10px;
  }
	.list li{
		height:50px;
    background: #fff;
		/*border-bottom:1px solid #eee;*/
	}
  .list ul li{
    margin: 0;
    padding: 0 10px;
  }
	.list ul li:last-child{
		/*border-bottom:1px solid #eee;*/
	}
	.list ul li:nth-child(3){
		border-bottom:none;
	}
	.list li .list_left{
		line-height:50px;
		font-size:15px;
	}
	.list li .list_right img{
		width:66px;
		height:32px;
		vertical-align: top;
	}
	.lang{
		position: relative;
    vertical-align: top;
    text-align: center;
    margin-right: 20px;
	}
	.lang span{
		position: absolute;
    display: inline-block;
    width: 40px;
    height: 20px;
    color: #fff;
    top: 15px;
    left: 12px;
	}
	.lang img{
		margin-top: 10px;
	}
	.lang_wit{
		width: 66px;
    text-align: center;
    height: 32px;
    border: 1px solid #ddd;
    border-radius: 24px;
    line-height: 32px;
    margin-top: 10px;
    color: #aaa;
	}
	.list li .list_right img.top{
		margin-top:10px;
	}
	.list li .list_right img.width_img{
		width: 12px;
    height: 20px;
    margin-top: 15px;
	}
	.exit{
		text-align: center;
    height: 52px;
    background:#9e9e9e1c;
    line-height: 52px;
    color: #86D8FE;
    font-size: 18px;
    margin-top: 50px;
	}
</style>
