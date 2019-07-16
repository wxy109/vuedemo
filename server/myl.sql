set names utf8;
drop database if exists lt;
create database lt charset=utf8;
use lt;
create table lt_user(
    lid int primary key not null AUTO_INCREMENT,
    lname VARCHAR(32),
    lpwd VARCHAR(32),
    email VARCHAR(64),
    phone VARCHAR(16) NOT NULL UNIQUE,
    gender INT
);
insert into lt_user values(null,'xiaoxiao','123456','13456711@qq.com','13245678978',0);
create table lt_text(
    tid int primary key not null AUTO_INCREMENT,
    j_pic VARCHAR(128),
    r_pic VARCHAR(128),
    title VARCHAR(128),
    subtitle VARCHAR(128)
);
insert into lt_text values(null,"img/jing/j_1.jpg","img/ren/r_1.jpg","途中所看所知","世间人情冷暖，从北到南，谁不曾历尽沧桑！阅尽繁华！");
insert into lt_text values(null,"img/jing/j_2.jpg","img/ren/r_2.jpg","南方姑娘对雪的幻想","北海道的铁路站，简直漫画一般！");
insert into lt_text values(null,"img/jing/j_3.jpg","img/ren/r_3.jpg","姗姗来迟的云南之行","彩云之南，一直是心中向往之地");
insert into lt_text values(null,"img/jing/j_4.jpg","img/ren/r_4.jpg","探秘杭州","西湖美景，世界展览，美不胜收");
create table lt_img(
    id int primary key not null AUTO_INCREMENT,
    l_pic VARCHAR(128),
    j_pic VARCHAR(128),
    r_pic VARCHAR(128),
    i_pic VARCHAR(128)
);
insert into lt_img values(null,"img/lun/l_1.jpg","img/jing/j_1.jpg","img/ren/r_1.jpg","img/icon/icon_f.png");
insert into lt_img values(null,"img/lun/l_2.jpg","img/jing/j_2.jpg","img/ren/r_2.jpg","img/icon/icon_t.png");
insert into lt_img values(null,"img/lun/l_3.jpg","img/jing/j_3.jpg","img/ren/r_3.jpg","img/icon/icon_p.png");
insert into lt_img values(null,"img/lun/l_4.jpg","img/jing/j_4.jpg","img/ren/r_4.jpg",null);

create table lt_title(
    id int primary key not null AUTO_INCREMENT,
    t_pic VARCHAR(128),
    t_text VARCHAR(128)
);
insert into lt_title values(null,"img/logo/logo.jpg","旅拍");