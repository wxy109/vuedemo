const express=require("express")
const router=express.Router();
const pool=require("../pool")

//显示所有
router.get("/",(req,res)=>{
    var sql='select * from lt_title';
    pool.query(sql,[],(err,result)=>{
        if(err) console.log(err);
        res.send(result);
    })
})
module.exports=router;