const express=require('express');
const router=express.Router();
const db = require('../db');
const utils = require('../utils');
const multer = require('multer');
const upload =multer({dest: 'uploads/'})

router.get('/',(req,res)=>{ 
    const query=`select album.*,artist.firstName as artistFirstName,artist.lastName as artistlastName from album,artist where album.artistId=artist.id ;`;
    db.query(query,(error,album)=>{
        res.send(utils.createResult(error,album))
    })
})
router.get('/:id',(req,res)=>{ 
    const id = req.params.id;
    // const query=`select album.*,artist.firstName as artistFirstName,artist.lastName as artistlastName from album,artist where album.artistId=artist.id and album.id=${id};`;
    const query=`select song.id,
    song.title,
    song.duration,
    artist.firstName as artistFirstName,
    artist.lastName as artistlastName 
    from album,artist,song where song.albumid=album.id and album.artistId=artist.id and album.id = ${id};`;
    db.query(query,(error,album)=>{
        res.send(utils.createResult(error,album))
    })
})
router.post('/', upload.single('thumbnail'),(req,res)=>{
    const {title,artistId,duration}=req.body;
    //get uploaded filename
    const filename = req.file.filename;
    console.log(filename)
    const query=`insert into album(title,artistId,thumbnail,duration) values('${title}','${artistId}', '${filename}', '${duration}')`;
    db.query(query,(error,result)=>{
        res.send(utils.createResult(error,result))
    })

})  

router.delete('/:id',(req,res)=>{
    const {id} = req.params;
    const query=`delete from album where id = '${id}' ;`;
    db.query(query,(error,result)=>{
        
        res.send(utils.createResult(error,result))
    })

})


module.exports=router; 