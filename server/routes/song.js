const express=require('express');
const router=express.Router();
const db = require('../db');
const utils = require('../utils');
const multer = require('multer');
const upload =multer({dest: 'uploads/'})

router.get('/',(req,res)=>{ 
    const query=`select song.id,
    song.title,
    song.duration,
    song.thumbnail,
    song.songFile,
    album.title as albumtitle, 
    artist.firstName as artistFirstName,
    artist.lastName as artistlastName 
    from album,artist,song where song.albumid=album.id and album.artistId=artist.id ;`;
    db.query(query,(error,album)=>{
        res.send(utils.createResult(error,album))
    })
})
router.post('/', upload.single('songFile'),(req,res)=>{
    const {title,artistId,albumId,duration}=req.body;
    //get uploaded filename
    const filename = req.file.filename;
    console.log(filename)
    // data.append('title',title)
    //         data.append('duration',duration)
    //         data.append('artistId',album.artistid)
    //         data.append('songFile',songFile)
    //         data.append('albumId',album.id)
    const query=`insert into song(title,artistId,songFile,duration,albumid) values('${title}','${artistId}', '${filename}', '${duration}','${albumId}')`;
    db.query(query,(error,result)=>{
        console.log(error)
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