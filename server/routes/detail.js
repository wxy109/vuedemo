const express=require("express")
const router=express.Router();
const pool=require("../pool")
//显示所有
router.get("/",(req,res)=>{
    var sql='select * from lt_text';
    pool.query(sql,[],(err,result)=>{
        if(err) console.log(err);
        res.send(result);
    })
})
//添加到数据库
router.post('/add',function(req,res){
    var obj=req.body;
    var title=req.body.title;
   var sql1='select * from lt_text where title=?'
    var sql ='insert into lt_text set ?';
    pool.query(sql1,[title],(err,result)=>{
        if(err) throw err;
        if(result.length!==0){
            return res.send({code:0,msg:"该标题已存在"})
        }else{
            pool.query(sql,[obj],function(err,result){
                if(err)throw err;
                if(result.affectedRows>0){
                   return res.send({code:1,msg:'添加成功'});
                } return res.send({code:-1,msg:'添加失败'});
                
            })
        }
    })
    
})
module.exports=router;