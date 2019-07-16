<template>
    <div class="my_d">
        <titlef class="my_in"></titlef>  
    <!---->
  <mt-tab-container v-model="selected">
  <mt-tab-container-item  id="tab1">
  <!--轮播图-->
    <mt-swipe class="my_lunbo" :auto="4000">
     <mt-swipe-item v-for="(value,key) in lun0" :key="key">
      <img class="my_img1" :src="[require('../assets/'+value)]" alt="">
     </mt-swipe-item>
    </mt-swipe>
    <!--图片-->
    
    <h4 class="my_h">风景</h4>
    <div >
      <img  class="my_img2" v-for="(src,index) in imgSrc" :key="index" :src="[require('../assets/'+src)]" />
    </div>
    <!--人文-->
    <h4 class="my_h">人文</h4>
    <img  class="my_img2" v-for="(src,key) in renSrc" :key="key" :src="[require('../assets/'+src)]" alt="">
    
    <!---->
  </mt-tab-container-item>
  <!--第二部分-->
  <mt-tab-container-item id="tab2">
  <!--输入-->
  <div class="my_t">
    <!--块-->
    <div class="my_divp" v-for="(s,ind) in r_title"  :key="ind">
     <!-- <img class="my_img4" :src="[require('../assets/'+s.r_pic)]" alt="">-->
      <p class="my_p4">{{s.title | contentFilter}}</p>
      <p class="my_p5">{{s.subtitle | contentFilter}}</p>
    </div>
    <mt-field label="标题" placeholder="请输入标题" v-model="title"></mt-field>
    <mt-field label="内容" placeholder="请输入内容.." type="textarea" rows="4" v-model="subtitle"></mt-field>
    <mt-button class="my_btn" type="primary" @click="myclick">提交</mt-button>
    </div>
  </mt-tab-container-item>
  <mt-tab-container-item id="tab3">
    <div class="my_t">
      
      <h1 class="my_newh">{{this.name}}欢迎回来</h1>
        <div>
          <ul>
            <li>
            <mt-cell title="收藏" is-link>
            <img slot="icon" src="../assets/img/icon/sc.png" width="24" height="24">
            </mt-cell>
            </li>
            <li>
            <mt-cell title="表情"  is-link>
            <img slot="icon" src="../assets/img/icon/bq.png" width="24" height="24">
            </mt-cell>
            </li>
            <li>
            <mt-cell title="设置"  is-link>
            <img slot="icon" src="../assets/img/icon/sz.png" width="24" height="24">
            </mt-cell>
            </li>
            <li>
            <mt-button plain class="my_libtn" type="danger" @click='quit'>退出登录</mt-button>
            </li>
          </ul>
        </div>
      
    </div>
  </mt-tab-container-item>
  </mt-tab-container>
    <!--CSDN:图片切换https://blog.csdn.net/buppt/article/details/83662966-->
    <!---->
    <!--tabbar列表-->
    <mt-tabbar class="my_in1" v-model="selected">
  <mt-tab-item  id="tab1">
    <img slot="icon" :src="f">
    主页
  </mt-tab-item>
  <mt-tab-item id="tab2">
    <img slot="icon" :src="t">
    想写
  </mt-tab-item>
  <mt-tab-item id="tab3">
    <img slot="icon" :src="p">
    我的
  </mt-tab-item>
</mt-tabbar>
<!--over-->

<!---->
    </div>
</template>
<script>
//1.引入子组件
import Title1 from './common/title_f.vue'
import Input from './common/input_file.vue'

//3.在模板中调用子组件
export default {

    data(){
        return {
          title:'',
          subtitle:'',
            selected:'tab1',
            p:'',
            t:'',
            f:'',
            lun0:[],
            imgSrc:[],
            r_title:[],
            renSrc:[],
            id:"",
             ex:"",
             name:'',
          
        }
    },
    //2.注册子组件
    components:{
        "titlef":Title1,
        "inputfile":Input
    },
    created() {
      //console.log("?!!!!")
     // console.log(this.id+'~~~~~~~~~~~~~~~~~~~~~~~~')
      this.messagebox();
        this.getTitleData();
        var url='img'
        this.axios.get(url)
            .then(result=>{
              this.f=require("../assets/"+ result.data[0].i_pic);
              this.t=require("../assets/"+ result.data[1].i_pic);
              this.p=require("../assets/"+ result.data[2].i_pic);
               //console.log('../assets/'+result.data[2].i_pic)
              var arr=result.data;
              for(var i=0;i<arr.length;i++){
                this.lun0.push(arr[i].l_pic)
             // console.log(arr[i].l_pic)
             }
             for(var i=0;i<arr.length;i++){
               this.imgSrc.push(arr[i].j_pic)
          
             }
             for(var i=0;i<arr.length;i++){
               this.renSrc.push(arr[i].r_pic)
             }
           
               //console.log(result.data)
               //console.log(this.lun0)
                })
                //console.log(this.$route.params.id)
    },
    filters:{
      contentFilter(oldValue){
        return oldValue.length<=10?oldValue:oldValue.substring(0,20)+"...";
      }
    },
    methods: {
      quit(){
        //移除session中保存的值
          sessionStorage.removeItem("lid")
          sessionStorage.removeItem("name")
        // push(login)
          this.$router.push("/login")
      },
      getTitleData(){
        var url1='detail'
        this.axios.get(url1)
        .then(result=>{
          this.r_title=result.data.reverse(); 
        //  console.log(result.data)
          })
      },
      messagebox(){
       // console.log("session = "+sessionStorage.getItem('lname'))
        this.name=sessionStorage.getItem('lname');
        this.id=sessionStorage.getItem("lid");
        //console.log(this.name)
       // this.id=1
      //  this.id=this.$route.params.id
      //  console.log(this.$route.params.id)
     //console.log(this.id);
        this.ex=this.id
        if(this.ex==0||this.ex==null){
        this.$messagebox({
          title:"温馨提示",
          message:'是否前去登录',
          showConfirmButton:true,
          showCancelButton:true
        }).then(action=>{
          //console.log(action);
          if(action=='confirm'){this.$router.push('/login');}
          });
          }
         // console.log(this.id)
      },
      myclick(){
       // console.log(123)
        var t=this.title;
        var st=this.subtitle;
        if(t==''){
          this.$toast('请输入标题');return;
        }
        if(st==''){
          this.$toast('请输入内容');return;
        }
        var url='detail/add';
        this.axios.post(url,{title:t,subtitle:st}).then(result=>{
          //console.log(result.data)
          var lp=result.data;
          if(lp.code==0){this.$toast("标题已存在");return;}else{
            this.title="";this.subtitle="";
            // location.reload()
            this.getTitleData();
            this.$toast("添加成功");return;
          }
        }).catch(err=>{console.log('失败')})
      }
    },
    mounted() {
      //console.log("????")
     this.messagebox();
    },
}
</script>
<style >
/**自定义按钮 */
.mint-swipe-indicator.is-active{
  background:#66B3FF !important;
  opacity:0.9 !important;
}
.mint-swipe-indicator{
  background:#fff !important;
  opacity:0.4 !important;
}
  .my_img1{width:100%; height:100%;}
    .my_lunbo{height:200px !important; margin-top:5rem;}
.my_img2{width:100% !important;}
.my_d{position:relative;}
.my_in{position:fixed !important;z-index:100; width:100%;}
.my_in1{position:fixed !important;z-index:100;}
.my_h{color:#66b3ff;font-size:1.3rem;background-color:rgba(102,179,255,0.2)}
.my_t{padding-top:4rem;}
/**自定义写 */
.my_p4{
  font-size:1.5rem;
  margin-left:2rem;
  color:#0080FF !important;
}
.my_p5{color:#46A3FF !important;font-size:1.1rem;margin-left:2.8rem;}
.my_img4{width:100%;}
.my_btn{display:block !important;margin:0 auto !important;margin-bottom:2rem !important;}
/**内容加框 */
.mint-field-core{border:1px solid #ccc !important;}
.my_divp{
  margin:1rem 1rem;
  padding:1rem 0;
  border:2px dotted #46A3FF;
  border-radius:9%;
}
.my_newh{
  padding-top:1rem;
  text-align:center;
  color:#46A3FF;
}
li+li{border-top:1px solid #0080ff;}
.my_libtn{
  width:75%;
  display:block !important;
  margin:0 auto;
  border-radius:25px !important;
  margin-top:1rem;
  }

</style>