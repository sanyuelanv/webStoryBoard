create database node_test character set utf8;
use node_test;
CREATE TABLE test_tables(
    id INT(11)  NOT NULL AUTO_INCREMENT,
    content TEXT,
    str VARCHAR(45),
    num INT(11),
    PRIMARY KEY(id)
) DEFAULT CHARSET=utf8;
insert into test_tables(content,str,num) values("哈哈哈哈哈哈","哈哈哈哈哈哈",123);
