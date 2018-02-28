<template>
	<div>
		<header>
			<a   @click="black_go"><img :src="require('assets/img/header_back.png')"></a>
			<h2>收货地址</h2>
			<div class="header_right" @click="add">
				<img :src="require('assets/img/add_address.png')">
			</div>
		</header>
		<section>
			<my-address>

			</my-address>

		</section>
	</div>
</template>

<script>
	//组件收货地址
import com_address from '../components/com_address';
export default {
  components:{
  	"myAddress":com_address
  },
  data () {
    return {

    }
  },
  created(){

  },
  methods:{
  	  add(){
  	  	this.$router.push({path:'/add_address'});
  	  },
  	  black_go(){
	  	this.$router.push({path:'/personal_center'});
	  }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../style/mixin';
	section{
    @include px2rem(margin-top,80);
	}
	header .header_right img{
    @include px2rem(width,40);
		vertical-align:top;
    @include px2rem(margin-top,18);
	}
</style>
