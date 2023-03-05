const express=require('express');
const router=express.Router();
const db = require('../db')
const utils = require('../utils')
const cryptoJs = require('crypto-js')


router.get('/profile/:id',(req,res)=>{
    const {id} = req.params;
    const query=`select id,firstName,lastName,isActiveint from user where id = '${id}' ;`;
    db.query(query,(error,result)=>{
        if(error){
            res.send(utils.createerror(error));
        }
        else if(result.length==0){
            res.send(utils.createerror("invalid username or password"))
        }else{
        res.send(utils.createResult(error,result[0]))
        }
    })
})
router.post('/signup',(req,res)=>{
    const {firstName,lastName, email,password}=req.body;
    const encryptedPassword = cryptoJs.MD5(password);
    const query=`insert into user(firstName,lastName,email,password) values('${firstName}','${lastName}', '${email}','${encryptedPassword}')`;
    db.query(query,(error,result)=>{
        res.send(utils.createResult(error,result))
    })

})

router.post('/signin',(req,res)=>{
    const {email,password}=req.body;
    //encrypting password
    const encryptedPassword = cryptoJs.MD5(password);
    const query=`select * from user where email = '${email}' and password = '${encryptedPassword}';`;
    db.query(query,(error,result)=>{
        //handling sql statement error
        if(error){
            res.send(utils.createerror(error));
        }
        //
        else if(result.length==0){
            res.send(utils.createerror("invalid username or password"))
        }else{
        res.send(utils.createResult(error,result[0]))
        }
    })

})

router.delete('/profile/:id',(req,res)=>{
    const {id} = req.params;
    const query=`delete from user where id = '${id}' ;`;
    db.query(query,(error,result)=>{
        
        res.send(utils.createResult(error,result))
    })

})


module.exports=router; 