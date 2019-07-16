//创建web服务器
const express = require('express');
const bodyParser = require('body-parser');
const cors=require('cors');
const session = require('express-session')

const login=require('./routes/login');
const img=require('./routes/img');
const detail=require('./routes/detail');
const title=require('./routes/title');
/*http://localhost:3000/img*/ 
/** http://localhost:3000/login*/
var server =express();
 server.listen(3000);
//解决跨域问题
server.use(cors({
    credentials:true,
    origin:["http://127.0.0.1:8080","http://localhost:8080"]
}));

server.use(session({
    secret:'128位字符串',
    resave:true,
    saveUninitialized:true
}));

server.use(express.static('public'))
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended:false}));
server.use("/login",login);
server.use('/img',img);
server.use('/detail',detail);
server.use('/title',title)