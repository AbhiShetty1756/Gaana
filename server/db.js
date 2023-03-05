const mysql = require('mysql2');

//create a pool of connections
const pool=mysql.createPool({
    host:'localhost',
    user:'root2',
    password:'root123',
    database:'gaana',
    waitForConnections:true,
    connectionLimit: 10,
    queueLimit:0
})

module.exports=pool