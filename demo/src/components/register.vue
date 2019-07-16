<template>
<div>
<mt-header title="注册">
  <router-link to="/login" slot="left">
    <mt-button icon="back">返回</mt-button>
  </router-link>
</mt-header>
<div class="my_mt">
<!--注册输入姓名-->
<mt-field @blur.native.capture="my_blur" @focus.native.capture="my_focus0"label="姓名" placeholder="请输入姓名" v-model="lname"></mt-field>
<p v-show="show&&s==0">3-10位数字或者字母</p>
<!--注册输入密码-->
<mt-field @blur.native.capture="my_blur" @focus.native.capture="my_focus1" label="密码" placeholder="请输入密码" type="password"v-model="lpwd" ></mt-field>
<p v-show="show&&s==1">3-8位数字或字母</p>
<!--注册输入邮箱-->
<mt-field @blur.native.capture="my_blur" @focus.native.capture="my_focus2" label="邮箱" placeholder="请输入邮箱" type="email"v-model="email" ></mt-field>
<p v-show="show&&s==2">输入正确的邮箱</p>
<!--注册输入电话-->
<mt-field @blur.native.capture="my_blur" @focus.native.capture="my_focus3" label="电话" placeholder="请输入电话" type="tel" v-model="phone"></mt-field>
<p v-show="show&&s==3">输入正确的电话号码</p>
</div>
<div>
    <mt-button size="large" type="primary"  @click="clickme">
        立即注册</mt-button>
</div>

</div>
<!---->
</template>

<script>
export default{
    data(){
        return{
            s:"",
            show:false,
            lname:'',
            lpwd:'',
            email:'',
            phone:''
        }
    },
   methods:{
       my_blur(){this.show=false;},
       my_focus0(){
           /**blur */
           this.s=0;
          this.show=true;
          // console.log(123)
       },
       my_focus1(){
           this.s=1;this.show=true;
       },
       my_focus2(){
           this.s=2;this.show=true;
       },
       my_focus3(){
           this.s=3;this.show=true;
       },
       clickme(){
           //获取用户名
       var n=this.lname;
        //获取密码
        var p=this.lpwd;
        //获取邮箱
        var e=this.email;
        //获取电话
        var phone=this.phone;
        //创建4个正则表达式
        var nreg=/^[a-zA-Z0-9]{3,10}$/;
        var preg=/^[a-zA-Z0-9]{3,8}$/;
        var ereg=/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
        var phonereg=/^1[3-8]\d{9}$/;
        //判断格式
        if(!nreg.test(n)){
            this.$toast('用户名格式不正确'); return;
        }
        if(!preg.test(p)){
            this.$toast("密码格式不正确");return;
        }
        if(!ereg.test(e)){
            this.$toast("邮箱格式不正确");return;
        }
        if(!phonereg.test(phone)){
            this.$toast("手机号码不正确");return;
        }
        //发送ajax请求
        var url="login/user";
        this.axios.post(url,{lname:n,lpwd:p,email:e,phone:phone})
        .then(result=>{
            console.log(result.data);
            var suu=result.data;
            if(suu.code==0){this.$toast('用户名已存在');return;}else {
                this.lname="";this.lpwd="";this.email="";this.phone="";
                this.$toast("注册成功");
                this.$router.push("/login")
                return;}
            this.msg=result.data.msg;
        }).catch(err=>{console.log('失败')})
         
    }
   },
}
</script>

<style>
p{margin-left:4.5rem;color:	#FF2D2D!important;}
.my_mt{
    margin-top:3rem;
}
/**按钮倒角 */
 .mint-button--primary{
     background: -webkit-linear-gradient(left,#66B3FF,#66B3FF) no-repeat;
     color: #fff;
     border-radius:25px !important;width:75% !important;
     display:block;
     margin:0 auto ;
     }
/**输入框前空白问题 */
.mint-field .mint-cell-title {
    width:3rem !important;
}
.app-container{
    padding-top:0px;
}
/**!important */
.mint-header{
    background-color:#66B3FF !important;
}
</style>