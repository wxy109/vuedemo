
<template>
  <div class="container" >
  <mt-header title="登录" v-if="dx>100">
  <router-link to="/" slot="left">
    <mt-button icon="back">返回</mt-button>
  </router-link>
</mt-header>
  <!--01登录提示文字-->
  <div class="tipslogin"  v-else>
    <span >你需要登录才能继续仿问</span>
    <span class="closeSpan" @click="my_s">关闭</span>
  </div>
  <!--02淘宝logo图片-->
  <div class="imgDiv">
    <img :src='l_logo' class="logo"/>
  </div>
  <!--操作区域-->
    <div class="operateDiv">
      <!--账号-->
      <mt-field  :placeholder="accountPlaceholder" v-model="lname"></mt-field>
      <!--密码-->
      <mt-field  placeholder="请输入密码" type="password" v-model="lpass" class="myinput"></mt-field>
      <div class="my_d">
        <span class="my_s1">忘记密码</span>
        <span class="my_s2" @click="jump">用户注册</span>
      </div>
      <!--短信验证码-->
      <!--免费注册-->
      <!--登录和切换登录的方式-->
      <div>
        <mt-button size="large" class="mybutton" @click="login">
        登录</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
        data(){
            return{
                dx:100,
                accountPlaceholder:"请输入用户名",
                lname:'',
                lpass:'',
                l_logo:'',
                name:'',
                lid:'',
            }
        },
        /**	#66B3FF */
        created(){
            var url="title";
            this.axios.get(url)
            .then(result=>{
                this.l_logo=require('../assets/'+result.data[0].t_pic)
               // console.log(result.data[0].t_pic)
                //console.log(this.l_logo)
                })
        },
        methods:{
            login(){
                var n=this.lname;
                var p=this.lpass;
               var nreg=/^[a-zA-Z0-9]{3,10}$/;
               var preg=/^[a-zA-Z0-9]{3,8}$/;
               if(!nreg.test(n)){
                    this.$toast("用户名格式不正确");
                    return;
                }
                //5.判断密码格式不正确   提示出错
               if(!preg.test(p)){
                    this.$toast("密码格式不正确");
                    return;
                }
                //6.将用户名和密码发送ajax请求
               var url="login/user_list";
               var obj ={lname:n,lpass:p};
               //7.并且获取服务器返回结果
               this.axios.get(url,{params:obj})
               .then(result=>{
                 //result对象 服务器返回结果
                 //console.log(result.data.sion);
                 //console.log(result.data.msg);
                 if(result.data.code==1){
                   this.lid=result.data.sion;
                   var url2='login/inquire';
                   var id=this.lid;
                    this.axios.get(url2,{params:id}).then(result=>{
                     // console.log(result.data)
                      this.name=result.data.user
                      sessionStorage.setItem("lname",this.name);
                      sessionStorage.setItem("lid",this.lid);
                    //  console.log(sessionStorage.getItem("lname")+"   ------")
                      this.$router.push({
                          name:'home',
                          params:{id:this.lid},//,user:this.user_name
                        })
                    // console.log(this.name)       
                    })   
                   // console.log(this.lid)
                   //location.reload()
                    //
                    // sessionStorage.removeItem("lid")
                    // push(login)
                   //跳转指定的组件
                   
                 }else{
                   this.$messagebox("提示",result.data.msg);
                 }
               });
            },
            jump(){
                this.$router.push('/register')
            },
            my_s(){
                this.dx=200
            }
            /** */
        },
    }
</script>
<style scoped>
/**自定义 */
.my_d{
    margin-top:10px;
    margin-bottom:10px;
    display:flex;
    justify-content:space-between;
}
.my_s1{color:#66B3FF;}
.my_s2{ color:#66B3FF;}
   
    /* 你需要登录才能继续仿问的布局样式 */
    .tipslogin {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 52px;
      background: rgb(238, 238, 238);
      padding-left: 20px;
      padding-right: 20px;
    }
    /* 半闭样式 */
    .closeSpan {
      color: rgb(153, 153, 153)
    }
    /* 图片 logo 根样式 */
    .imgDiv {
      display: flex;
      justify-content: center;
    }
    /* 图片样式 */
    .logo{
      width: 80px;
      height: 80px;
      border-radius:50%;
    }
    /* 上面的线隐藏 */
    .mint-cell-wrapper  {
      background-image: linear-gradient(180deg, #fff, #fff 0%, transparent 0%);
    }
   /* 输入框底边框样式 */
    .mint-cell-wrapper  {
      border-bottom: 1px solid #ff5000;
    }

    /* 修改按钮按钮下的默认颜色 */
    .mint-button::after {
      background-color: transparent;
    }
    /* 操作区域的样式*/
    .operateDiv {
      padding-left: 20px;
      padding-right: 20px;
    }
    /* 输入框边距 */
    .myinput {
      margin-top: 30px;
    }
    
    
    /* 修改默认 button 的样式 达到和淘宝登录一样 */
    .mint-button--default {
      background: -webkit-linear-gradient(left,#66B3FF,#66B3FF) no-repeat;
      border-radius:25px;
      color: #fff;
     /* height: 48px;*/
    }
    /* 同上 */
    .mint-button--primary {
      border-radius: 25px;
      height: 48px;
      background-color: transparent;
      border: 1px solid #ff5000;
      color: #ff5000
    }
    /* 修改默认弹框的样式，达到基本和淘宝的效果一样 */
    .mint-msgbox{
      border-radius: 8px;
      width: 70%
    }
    /* 弹出框内容样式 */
    .mint-msgbox-content {
      min-height: 50px;
      font-size: 18px;
    }
    /* 弹出内容居中 */
    .mint-msgbox-message{
      line-height: 50px;
    }
    /* 弹出框确定按钮样式 */
    .mint-msgbox-btns{
      height: 60px;
    }
    /* 弹出框确定按钮字体 */
    .mint-msgbox-confirm {
      color: #f40;
    }
</style>