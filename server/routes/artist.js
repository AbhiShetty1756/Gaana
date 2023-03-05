const express=require('express');
const router=express.Router();
const db = require('../db');
const utils = require('../utils');
const multer = require('multer');
const upload =multer({dest: 'uploads/'})

router.get('/',(req,res)=>{ 
    const query=`select * from artist ;`;
    db.query(query,(error,artists)=>{
        res.send(utils.createResult(error,artists))
    })
})
router.post('/', upload.single('thumbnail'),(req,res)=>{
    const {firstName,lastName}=req.body;
    //get uploaded filename
    const filename = req.file.filename;
    console.log(filename)
    const query=`insert into artist(firstName,lastName,thumbnail) values('${firstName}','${lastName}', '${filename}')`;
    db.query(query,(error,result)=>{
        res.send(utils.createResult(error,result))
    })

})  
router.get('/:id',(req,res)=>{ 
    const id = req.params.id;
    // const query=`select album.*,artist.firstName as artistFirstName,artist.lastName as artistlastName from album,artist where album.artistId=artist.id and album.id=${id};`;
    const query=`select song.id,
    song.title,
    song.duration,
    song.songFile,
    artist.firstName as artistFirstName,
    artist.lastName as artistlastName ,
    album.thumbnail as thumbnail
    from artist,song,album where song.artistId=artist.id and song.albumId=album.id and artist.id = ${id};`;
    db.query(query,(error,album)=>{
        res.send(utils.createResult(error,album))
    })
})
router.delete('/:id',(req,res)=>{
    const {id} = req.params;
    const query=`delete from artist where id = '${id}' ;`;
    db.query(query,(error,result)=>{
        
        res.send(utils.createResult(error,result))
    })

})


module.exports=router; 