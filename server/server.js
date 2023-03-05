const express = require('express');
const app=express();
const cors = require('cors');
app.use(cors('*'))
const bodyParser = require('body-parser')
app.use(bodyParser.json())


const routerUser = require('./routes/user');
const routerAlbum = require('./routes/album');
const routerSong = require('./routes/song');
const routerArtist = require('./routes/artist');

app.use('/user',routerUser);
app.use('/album',routerAlbum);
app.use('/song',routerSong);
app.use('/artist',routerArtist);
app.get('/',(req,res)=>{
    res.send("<h1>hello</h1>")
})
app.use(express.static('uploads'))

app.listen(3000,()=>{
    console.log("server started on port 3000")
})