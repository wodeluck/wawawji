<template>
	<div class="main">
		<header>
			<a  @click="black_go"><img :src="require('assets/img/header_back.png')"></a>
			<h2>编辑收货地址</h2>
		</header>
		<section>
			<ul>
				<li>
					<p>收货人</p>
					<input type="text" placeholder="请输入收货人姓名" v-model="oname" maxlength="5"/>
				</li>
				<li>
					<p>联系方式</p>
					<input type="tel" placeholder="请输入联系方式" v-model="phone"  maxlength="11"/>
					<div class="windon_show" v-show="text_phone">请输入联系方式</div>
					<div class="windon_show" v-show="text_phone_tel">请输入正确手机号</div>
				</li>
				<li v-show="oddr" @click="city">
					<p>省/市/区/县</p>
					<div class="input_right">{{addr}}<img :src="require('assets/img/right.png')"></div>
				</li>
				<li @click="city"  v-show="!oddr">
					<p>省/市/区/县</p>
					<div class="input_right" style="font-size:14px;">
						{{myAddressProvince}} {{myAddressCity}} {{myAddresscounty}}
						<img :src="require('assets/img/right.png')">
					</div>
				</li>
				<li>
					<p>详细地址</p>
					<input type="text" placeholder="请输入收货人详细地址" v-model="address_text"/>
					<div class="windon_show" v-show="text_text">请输入详细地址</div>
				</li>
			</ul>
		</section>
		<div class="btn" @click="text_btn">保存</div>
		<!--弹窗-->
		<div class="open" v-show="address_window">
			<div class="open_box">
				<p>选择地址</p>
				<mt-picker :slots="myAddressSlots" @change="onMyAddressChange"></mt-picker>
				<div class="btn_city" @click="window_qr">确认</div>
				<p class="line_top"></p>
			    <p class="line_bottom"></p>
			</div>
		</div>
		<!--<p>地址3级联动：{{myAddressProvince}} {{myAddressCity}} {{myAddresscounty}}</p>-->
		<!--<div id='cityResult3' class="ui-alert">{{otext}}</div>-->
	</div>
</template>

<script>
import {set_address_btn} from '../../service/getData';
import { Picker } from 'mint-ui';
import myaddress from 'assets/js/address3.json'     //引入省市区数据
  export default {
    name: '',
    components: {
      'mt-picker':Picker
    },
    props: {},
    data () {
      return {
       myAddressSlots: [
          {
            flex: 1,
            defaultIndex: 1,
            values: Object.keys(myaddress),  //省份数组
            className: 'slot1',
            textAlign: 'center'
          }, {
            divider: true,
            content: '-',
            className: 'slot2'
          }, {
            flex: 1,
            values: [],
            className: 'slot3',
            textAlign: 'center'
          },
          {
            divider: true,
            content: '-',
            className: 'slot4'
          },
          {
            flex: 1,
            values: [],
            className: 'slot5',
            textAlign: 'center'
          }
        ],
        myAddressProvince:'省',
        myAddressCity:'市',
        myAddresscounty:'区/县',
        oname:"",
        phone:"",
        address_text:"",
        is_id:"",
        address_window:false,
        text_text:false,
        text_phone:false,
        text_name:false,
        times:1000,
        text_phone_tel:false,
        user_id:"54e3bde9a9c25741acd151dd4b957641",
        addr:"",
        oddr:true
      }
    },
    created(){
 		 this.oname=this.$route.query.name;
 		 this.phone=this.$route.query.phone;
 		 this.is_id=this.$route.query.addr_id;
 		 this.addr=this.$route.query.addr;
    },
    methods: {
     onMyAddressChange(picker, values) {
     	console.log(1);
       if(myaddress[values[0]]){  //这个判断类似于v-if的效果（可以不加，但是vue会报错，很不爽）
          picker.setSlotValues(1,Object.keys(myaddress[values[0]])); // Object.keys()会返回一个数组，当前省的数组
          picker.setSlotValues(2,myaddress[values[0]][values[1]]); // 区/县数据就是一个数组
          this.myAddressProvince = values[0];
          this.myAddressCity = values[1];
          this.myAddresscounty = values[2];
        }
      },
      window_qr(){
      	this.address_window=!this.address_window;
      },
      city(){
      	this.oddr=!this.oddr;
      	this.address_window=!this.address_window;
      },
      black_go(){
	  		this.$router.go(-1)
	  },
      text_btn(){
      	var _self=this;
      	if(this.oname==""||this.oname==null){
	  			window.setTimeout(function(){
	              _self.text_name=!_self.text_name;
	            }, _self.time);
	            window.setTimeout(function(){
	              _self.text_name=!_self.text_name;
	            }, _self.times);
	  			return false;
      	}
      	if(this.phone==""||this.phone==null){
      		window.setTimeout(function(){
	              _self.text_phone=!_self.text_phone;
	            }, _self.time);
	            window.setTimeout(function(){
	              _self.text_phone=!_self.text_phone;
	            }, _self.times);
	  			return false;
      	}
      	if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.phone))){
		    	window.setTimeout(function(){
	              _self.text_phone_tel=!_self.text_phone_tel;
	            }, _self.time);
	            window.setTimeout(function(){
	              _self.text_phone_tel=!_self.text_phone_tel;
	            }, _self.times);
		        return false;
		    }
      	if(this.address_text==""||this.address_text==null){
      		window.setTimeout(function(){
	              _self.text_text=!_self.text_text;
	            }, _self.time);
	            window.setTimeout(function(){
	              _self.text_text=!_self.text_text;
	            }, _self.times);
	  			return false;
      	}
      	set_address_btn(this.oname,this.phone,this.myAddressProvince,this.myAddressCity,this.myAddresscounty,this.address_text,this.is_id).then(res => {   //编辑收件地址
			  console.log(res);
	          if (res.code == 1) {
	             this.$router.push({path:'/address'});
	          } else {
	             console.log(err)
	          }
	        });
//    	this.$post('api/addr/api',{      //     编辑收件地址
//			api_name:'addr_update',
//			token:this.user_id,
//			username:this.oname,
//			mobile:this.phone,
//			addr:this.myAddressProvince+this.myAddressCity+this.myAddresscounty,
//			addr_info:this.address_text
//		}).then((res) => {
//	        console.log(res);
//	        if(res.code==1){
//	        	 this.$router.push({path:'/address'});
//	        }
//	    },err => {
//	        console.log(err)
//	     })
      }
    },
    mounted(){
      this.$nextTick(() => { //vue里面全部加载好了再执行的函数  （类似于setTimeout）
        this.myAddressSlots[0].defaultIndex = 0
        // 这里的值需要和 data里面 defaultIndex 的值不一样才能够初始化
        //因为我没有看过源码（我猜测是因为数据没有改变，不会触发更新）
      });
      	var oline_top=document.querySelector(".open .open_box .line_top");
      	var oline_bottom=document.querySelector(".open .open_box .line_bottom");
      	var obox=document.querySelector(".picker");
      	var oleft=document.querySelector(".picker-items .slot1");
      	var omiddle=document.querySelector(".picker-items .slot3");
      	var oright=document.querySelector(".picker-items .slot5");
      	var oslot2=document.querySelector(".picker-items .slot2");
      	var oslot4=document.querySelector(".picker-items .slot4");
      	oline_top.style.cssText="position:absolute;width:100%;height:1px;border-top:1px solid #86D8FE;left:0;top:122px;"
        oline_bottom.style.cssText="position:absolute;width:100%;height:1px;border-top:1px solid #86D8FE;left:0;top:160px;"
        obox.style.cssText="position:relative;"
        oleft.style.cssText="position:absolute;top:0;width:31%;left:0;text-align: center;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;"
        omiddle.style.cssText="position:absolute;top:0;width:31%;left:33%;text-align: center;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;"
        oright.style.cssText="position:absolute;top:0;width:31%;left:66%;text-align: center;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;"
        oslot2.style.cssText="position:absolute;top:78px;left:32%;display:inline-block;"
        oslot4.style.cssText="position:absolute;top:78px;left:63%;display:inline-block;"
    }
  }

</script>

<style lang="scss" scoped>
  @import '../../style/mixin';
	/*.picker-slot{
		display:inline-block;
		width:100px;
		vertical-align:top;
	}*/
	section{
		/*padding:0 10px;*/
		/*margin-top:40px;*/
    @include px2rem(padding,0 20);
    @include px2rem(margin-top,80);
	}
	li{
		/*font-size:16px;*/
		border-bottom:1px dashed #eee;
		/*height:50px;*/
		/*line-height:50px;*/
		position:relative;
    @include px2rem(height,100);
    @include px2rem(line-height,100);
    @include font-dpr(16px);
	}
	li p,li div{
		display:inline-block;
		vertical-align:top;
	}
	li input{
		position:absolute;
		/*height:48px;*/
		top: 0;
		/*left:86px;*/
		border:none;
		width:72%;
    @include px2rem(height,96);
    @include px2rem(left,172);
	}
	li .input_right{
		float:right;
	}
	li .input_right img{
		/*width: 8px;*/
    /*margin-left: 5px;*/
    @include px2rem(width,16);
    @include px2rem(margin-left,10);
	}
	.btn{
		width: 84%;
    margin: 50px 8%;
    background: #86D8FE;
    /*height: 50px;*/
    text-align: center;
    /*line-height: 50px;*/
    color: #fff;
    /*font-size: 18px;*/
    letter-spacing: 2px;
    border-radius: 30px;
    @include font-dpr(18px);
    @include px2rem(height,100);
    @include px2rem(line-height,100);
  }
	.open{
		position: fixed;
		width:100%;
		height:100%;
		background:rgba(0,0,0,0.5);
		top:0;
		left:0;
		z-index:999;
	}
	.open .open_box{
		width: 80%;
	    /*height: 300px;*/
	    background: #fff;
	    position: absolute;
	    top: 50%;
	    left: 10%;
	    /*margin-top: -150px;*/
	    border-radius: 8px;
	    /*padding: 0 10px;*/
    box-sizing: border-box;
    @include px2rem(height,600);
    @include px2rem(margin-top,-300);
    @include px2rem(padding,0 20);
	}
	.open .open_box p{
		text-align: center;
    /*font-size: 18px;*/
    @include font-dpr(18px);
    @include px2rem(height,100);
    @include px2rem(line-height,100);
    /*height: 50px;*/
    /*line-height: 50px;*/
	}
	.open .open_box .btn_city{
		position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
    /*height: 50px;*/
    /*line-height: 50px;*/
    background: #86D8FE;
    left: 0;
    color: #fff;
    /*font-size: 18px;*/
    letter-spacing: 2px;
    @include px2rem(height,100);
    @include px2rem(line-height,100);
    @include font-dpr(18px);
	}
	.open .open_box .picker{
		/*height: 185px;*/
    overflow: hidden;
    border-bottom: 1px solid #ddd;
    border-top: 1px solid #ddd;
    @include px2rem(height,370);

	}
	.open .open_box .picker .picker-items{
		position:relative;
		/*height:200px;*/
    @include px2rem(height,400);
	}
	.open .open_box .picker .picker-items .picker-slot{
		position:absolute;
		top:0;
		/*width:100px;*/
    @include px2rem(width,200);
	}
	.windon_show{
		width:40%;
		/*height:50px;*/
		border-radius:10px;
		background:rgba(0,0,0,0.8);
		position:fixed;
		top:50%;
		left:30%;
		color:#aaa;
		text-align:center;
		/*line-height: 50px;*/
		z-index:9999;
		opacity:1;
    @include px2rem(height,100);
    @include px2rem(line-height,100);
	}
</style>
