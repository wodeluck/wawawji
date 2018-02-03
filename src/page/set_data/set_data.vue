<template>
  <div class="main">
    <header>
      <a  @click="black_go"><img :src="require('assets/img/header_back.png')"></a>
      <h2>修改资料</h2>
      <div class="header_right">
        <span style="color:#fff;" @click="updateNameSex">保存</span>
      </div>
    </header>
    <section>
      <div class="list">
        <ul>
          <li class="max_height" @click="picture">
            <div class="list_left">
              头像
            </div>
            <div class="list_right">
              <img class="pic" :src="userInfo.avatar">

              <img class="right" :src="require('assets/img/right.png')">
            </div>
          </li>
        </ul>
      </div>
      <div class="list">
        <ul>
          <li @click="name">
            <div class="list_left">
              昵称
            </div>
            <div class="list_right">
              <span>{{userInfo.user_nicename}}</span>
              <img class="right" :src="require('assets/img/right.png')">
            </div>

            <div class="show_hidden" v-show="name_null">昵称不能为空</div>

          </li>
          <li @click="oradio">
            <div class="list_left">
              性别
            </div>
            <div class="list_right">
              <span v-if="userInfo.sex==1">男</span>
              <span v-if="userInfo.sex==2">女</span>
              <span v-if="userInfo.sex==0">保密</span>
              <img class="right" :src="require('assets/img/right.png')">
            </div>
          </li>
        </ul>
      </div>
    </section>
    <!--拍照弹窗-->
    <div class="poto bg_color" v-show="poto_show">
      <div class="poto_bottom">
        <label for="avatar"  @click="pic_picture">从相册选择<input style="position: absolute;z-index: -999;height: 0;width: 0;" id="avatar" type="file" class="profileinfopanel-upload" @change="uploadAvatar"></label>
        <p class="del" @click="picture_del">取消</p>
      </div>
    </div>
    <!--修改昵称弹窗-->
    <div>
      <div class="name bg_color" v-show="name_show" @click="name_del">
      </div>
      <div class="name_input"  v-show="name_show">
        <h3>修改昵称</h3>
        <input type="text" placeholder="请输入新的昵称" v-model="oname" maxlength="12"/>
        <button @click="name_qr">确认</button>
      </div>
    </div>
    <!--性别弹窗-->
    <div class="poto bg_color" v-show="radio_show">
      <div class="poto_bottom">
        <p class="one" @click="radio_nan">{{nex_nan}}</p>
        <p  @click="radio_nv">{{nex_nv}}</p>
        <p class="del" @click="oradio_del">取消</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {getInfo,updateFields,ponson} from '../../service/getData';
  import {mapState} from 'vuex';
  import {getCookie} from "../../config/mUtils";
  import {Loading} from 'vux'

  export default{
    data () {
      return {
        user_id:"54e3bde9a9c25741acd151dd4b957641",
        userInfo:"",
        customizeClass: 'active',
        time:500,
        times:1500,
        name_null:false,
        name_text:"Jack",
        oname:'',
        nex_nan:"男",
        nex_nv:"女",
        nex:"女",
        poto_show:false,
        name_show:false,
        radio_show:false,
        toastContent:'',
        userInfo:'',
      }
    },
    components:{
      Loading,
    },
    created(){
      getInfo().then(res=>{
        if(res && res.code==1){
          this.userInfo=res.data;
        }
      })
      
      ponson().then(res => {   //我的娃娃上面个人信息接口
					console.log(res);
          if (res.code == 1) {
            this.oname=res.data.user_nicename;
          } else {
            console.log(err)
          }
        });
    },
    methods:{
      updateNameSex(){
        let namesex={};
        namesex.user_nicename=this.oname;
        namesex.sex=this.userInfo.sex;
        updateFields(this.userInfo.user_id,JSON.stringify(namesex)).then(res=>{
          this.toastContent=res.msg;
          this.showToastPlugin();
        })
      },
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
      async uploadAvatar(){
        //上传头像
        if (this.userInfo) {
          let input = document.querySelector('.profileinfopanel-upload');
          let namesex={};
          namesex.user_nicename=this.oname;
          namesex.sex=1;
          let data = new FormData();
          data.append('file', input.files[0]);
          data.append('fields',JSON.stringify(namesex));
          data.append('uid',this.userInfo.user_id);
          data.append('token',getCookie('session'));
          try{
            this.$vux.loading.show({
              text: '请稍等...'
            });
            let response = await fetch('/api/public/?service=user.updateAvatar', {
              method: 'POST',
              credentials: 'include',
              body: data
            });
            this.$vux.loading.hide();
            this.poto_show=false;
            let res = await response.json();
            if (res.code == 1) {
              this.toastContent=res.msg;
              this.showToastPlugin();
              this.userInfo.avatar = res.data.avatar;
            }
          }catch (error) {
            this.toastContent = '上传失败';
            this.showToastPlugin();
            throw new Error(error);
          }
        }
      },
      picture(){
        this.poto_show=!this.poto_show;
      },
      picture_del(){
        this.poto_show=!this.poto_show;
      },
      poto_picture(){
//	  		wx.chooseImage({
//			  count: 1, // 默认9
//			  sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
//			  sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
//			  success: function (res) {
//			    // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
//			    var tempFilePaths = res.tempFilePaths
//			  }
//			})
      },
      pic_picture(){

      },
      name(){
        this.name_show=!this.name_show;
      },
      name_qr(){
        if(this.oname==''||this.oname==null){
          var _self=this;

          window.setTimeout(function(){
            _self.name_null=!_self.name_null;
          }, _self.time);
          window.setTimeout(function(){
            _self.name_null=!_self.name_null;
          }, _self.times);
          return false;
        }else{
          this.name_show=!this.name_show;
          this.name_text=this.oname;
        }
        this.userInfo.user_nicename=this.oname;

      },
      name_del(){
        this.name_show=!this.name_show;
      },
      oradio(){
        this.radio_show=!this.radio_show;
      },
      oradio_del(){
        this.radio_show=!this.radio_show;
      },
      radio_nan(){
        this.nex=this.nex_nan;
        this.userInfo.sex=1;
        this.radio_show=!this.radio_show;
      },
      radio_nv(){
        this.nex=this.nex_nv;
        this.userInfo.sex=2;
        this.radio_show=!this.radio_show;
      },
      beforeDestroy() {
        document.getElementsByTagName("body")[0].style.background="#F5F5F5";
      },
      black_go(){
	  		this.$router.go(-1)
	 		}
    },
    computed:{
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../style/mixin';
  section{
    @include px2rem(padding-top, 80);
  }
  .header_right{
    @include px2rem(line-height, 80);
    color: #fff;
    @include px2rem(width, 100);
  }
  .list ul .max_height{
    @include px2rem(height, 140);
    border:none;
  }
  .list ul{
    margin-bottom:0;
  }
  .max_height .list_left{
    @include font-dpr(16px);
    @include px2rem(line-height, 140);
  }
  .max_height .list_right .pic{
   /* @include px2rem(width, 100);*/
  	width:50px;
  	height:50px;
    vertical-align: top;
    @include px2rem(margin-top, 0);
    border-radius: 50%;
  }
  .max_height .list_right .right{
    vertical-align: top;
    /*@include px2rem(margin-top, 60);*/
    @include px2rem(margin-left, 20);
    display: flex;
    align-items: center;
  }
  .list ul li{
    @include font-dpr(16px);
    @include px2rem(height, 100);
    border-bottom:1px solid #eee;
    display: flex;
    justify-content: space-between;
  }
  li .list_left,li .list_right{
    @include px2rem(line-height, 100);
    display: flex;
    align-items: center;
  }
  li .list_right{
    color:#aaa;
  }
  .list_right img{
    vertical-align:top;
    /*@include px2rem(margin-top, 30);*/
    @include px2rem(width, 20);
    @include px2rem(margin-left, 20);
  }
  /*弹窗*/
  .bg_color{
    background:rgba(0,0,0,0.5);
    position:fixed;
    width: 100%;
    height: 100%;
    top:0;
    left:0;
    z-index:999;
  }
  .poto .poto_bottom{
    width:90%;
    position:absolute;
    @include px2rem(bottom, 20);
    @include px2rem(border-radius, 20);
    left:5%;
  }
  .poto .poto_bottom p,label{
    text-align:center;
    @include px2rem(height, 92);
    @include px2rem(line-height, 92);
    background: #fff;
    display: block;
  }
  .poto .poto_bottom p:nth-child(1){
    border-bottom: 1px solid #eee;
    @include px2rem(border-top-left-radius, 20);
    @include px2rem( border-top-right-radius, 20);
  }
  .poto .poto_bottom p:nth-child(2){
    @include px2rem(border-bottom-left-radius, 20);
    @include px2rem(border-bottom-right-radius, 20);
    @include px2rem(margin-bottom, 20);
  }
  .poto .poto_bottom label{
    @include px2rem(border-radius, 20);
    @include px2rem(margin-bottom, 20);
  }
  .poto .poto_bottom p:nth-child(3){
    @include px2rem(border-radius, 20);
    color:#86D8FF;
  }

  /*昵称弹窗*/
  .name_input{
    width: 80%;
    position: absolute;
    @include px2rem(height, 300);
    background: #fff;
    @include px2rem(border-radius, 14);
    top: 50%;
    left: 10%;
    @include px2rem(margin-top, -150);
    z-index:9991;
  }
  .name_input h3{
    text-align: center;
    @include px2rem(height, 80);
    @include px2rem(line-height, 80);
    font-weight: lighter;
    @include font-dpr(18px);
  }
  .name_input input{
    width: 80%;
    margin: 0 10%;
    border: none;
    @include px2rem(height, 70);
    border-bottom: 1px solid #eee;
  }
  .name_input button{
    width: 80%;
    margin: 15px 10%;
    @include px2rem(margin-top, 30);
    @include px2rem(margin-bottom, 30);
    box-sizing: border-box;
    @include px2rem(height, 80);
    border: none;
    color: #fff;
    @include px2rem(border-radius, 40);
    @include font-dpr(16px);
    background: #86D8FF;
    letter-spacing: 2px;
  }


  .show_hidden{
    width:40%;
    @include px2rem(height, 100);
    @include px2rem(border-radius, 20);
    background:rgba(0,0,0,0.8);
    position:fixed;
    top:50%;
    left:30%;
    color:#aaa;
    text-align:center;
    @include px2rem(line-height, 100);
    z-index:9999;
    opacity:1;
  }

</style>
