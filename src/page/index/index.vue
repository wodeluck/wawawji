<template>
	<div id="main">
		<header>
			<a><img :src="require('../assets/img/index_header_personl.png')"></a>
			<h2>LOGO</h2>
			<div class="header_right">
				<img :src="require('../assets/img/index_header_right.png')">
			</div>
		</header>
		<!-- 轮播 -->
		<div class="banner">  
	        <swiper :options="swiperOption"  ref="mySwiper">  
	            <!-- 这部分放你要渲染的那些内容 -->  
	            <swiper-slide>  	            	
	            	<img :src="require('../assets/img/banner.png')">	            
	            </swiper-slide>  
	            <swiper-slide>  
	            	<img :src="require('../assets/img/banner.png')">
	            </swiper-slide>  
	            <swiper-slide>  
	          		<img :src="require('../assets/img/banner.png')">
	            </swiper-slide>  	            
	            <!-- 这是轮播的小圆点 -->  
	            <div class="swiper-pagination" slot="pagination"></div>  
	        </swiper>  	        
	    </div>
	    <!-- 消息栏 -->
	    <div class="news">
	    	<div class="left">
	    		<span>晚8点送币！</span>
	    	</div>
	    	<div class="millde">
	    		<img :src="require('../assets/img/index_header_personl.png')"/>
	    		<span>小艾 抓中了！ </span>
	    	</div>
	    	<div class="right">
	    		<img :src="require('../assets/img/index_header_personl.png')"/>
	    		<span>KEN 送了3个</span>
	    	</div>
	    	<div class="bottom">
	    		<img class="cir" :src="require('../assets/img/cri.png')"/>
	    	</div>	    	
	    </div>
	  <!--  列表-->
	    <div class="list">
	    	<ul>
	    		<li>
	    			<div class="label">
	    				
	    			</div>
	    		</li>
	    	</ul>
	    </div>
	</div>	
</template>
<script>
export default {
	
	
data(){
      return{
        page:1
      }
},
created:function(){	

  }
}
</script>
 
<style>
	#main{background:#EEFAFF;}
	header a{width:50px;}
	header a img,.header_right img{width:26px;margin-top:7px;height:26px;}
	.banner{height:163px;}
	.swiper-wrapper{width:310%;height:163px;}
	.swiper-slide{float:left;overflow:hidden;height:163px;}
	.swiper-slide img{width:100%;margin-top: -2px;height:163px;}
	.news{height: 50px;
    text-align: center;
    background: #86D8FE;
    color: #fff;
    font-size: 15px;
    margin: 3px 0px;position:relative;}
	.news div{display:inline-block;height:50px;vertical-align:top;line-height: 50px;}
	.news div img{width: 30px;vertical-align: top;margin-top:7px;}
	.news .bottom{position:absolute;bottom:0px;left:0;width:100%;height: 20px;}
	.news .bottom img{width: 90%;}
</style>