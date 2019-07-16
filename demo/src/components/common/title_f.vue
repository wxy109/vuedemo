<template>

    <div class="my_header">
        <img class="my_img" :src="l_logo" alt="">
        <span class="my_sp">{{text}}</span>
    </div>
    
</template>
<script>
    export default {
        data(){
            return{
                l_logo:"",
                text:''
            }
        },
        created() {
            var url="title";
            this.axios.get(url)
            .then(result=>{
                this.l_logo=require('../../assets/'+result.data[0].t_pic)
                this.text=result.data[0].t_text
                //console.log(result.data[0].t_text)
                //console.log(this.l_logo)
                })
        },
    }
</script>
<style>
*{margin:0;padding:0;}
.my_img{width:4rem;height:4rem;border-radius:50%;}
.my_header{
    background-color:#66B3FF;
    position:relative;
    margin-bottom:0.5rem;
}
.my_sp{
    color:#fff;
    font-size:1.5rem;
    position:absolute;
    top:40%;
    left:20%;
}
</style>