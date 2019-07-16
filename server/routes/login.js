//引入express
const express=require('express');
//引入连接池模块
const pool =require('../pool.js');
//创建路由器对象
var router=express.Router();
//添加路由
//用户注册路由
router.post('/user',function(req,res){
    var lname=req.body.lname;
    var lpwd=req.body.lpwd;
    var email=req.body.email;
    var phone=req.body.phone;
    //获取数据
    console.log(req.body);
    //查询语句
    var select ='select * from lt_user where lname =?';
    //把数据插入到数据库中
    //执行sql语句
    var sql="INSERT INTO lt_user SET ?";
    pool.query(select,[lname],(err,result)=>{
        if(err)throw err;
        //console.log(result.length);
        if(result.length!==0){
           return res.send({code:0,msg:"该用户已经存在"})
        }else{
            pool.query(sql,[req.body],function(err,result){
                if(err)throw err;
                if(result.affectedRows>0){
                   return res.send({code:1,msg:"注册成功"});
                } return res.send({code:-1,msg:"注册失败"});
            });
        }
    })
    
});
//查询用户
router.get('/inquire',function(req,res){
    var lid=req.query[0];
    var sql='select * from lt_user where lid=?';
    pool.query(sql,[lid],function(err,result){
        if(err)throw err;
      // console.log(lid)
       if(result.length>0){
         //  console.log(result[0])
        req.session.name=result[0].lname
        res.send({code:1,msg:'查询成功',user:req.session.name})
       }else{res.send({code:-1,msg:'失败'});}
       
    })
})
//用户登录
//http://127.0.0.1:3000/login/user_list?lname=xiaoxiao&lpwd=123456
router.get('/user_list',function(req,res){
   var lname=req.query.lname;
   var lpwd=req.query.lpass;
    //执行sql语句
    //查询数据中是否含有用户名和密码相匹配的数据
    var sql='SELECT lid FROM lt_user WHERE lname=? AND lpwd=?';
    pool.query(sql,[lname,lpwd],function(err,result){
        if(err) throw err;
        //如果数组中有元素说明成功，没有元素失败
        if(result.length>0){
            //result [{lid:1}]
            req.session.lid = result[0].lid 
            //req.session = result[0]
            res.send({code:1,msg:'登录成功',sion:req.session.lid});
            //console.log( req.session.lid);
        }else{res.send({code:-1,msg:'用户名或密码错误'});}
    });
})
//删除用户
router.get('/user_del',function(req,res){
    //获取数据
    console.log(req.query);
    //验证数据是否为空
    if(!req.query.lid){
        res.send({code:401,msg:'lid required'});
        return;
    }
    //执行sql语句
    var sql='DELETE FROM lt_user WHERE lid=?';
    pool.query(sql,[req.query.lid],function(err,result){
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:200,msg:'delete suc'});
        }else{res.send({code:301,msg:'delete err'});}
    });
});
//显示用户
router.get('/',function(req,res){
    var sql ='select * from lt_user';
    pool.query(sql,[],function(err,result){
        if(err)throw err;
        res.send(result);
    })

})
//导出路由器
module.exports=router;