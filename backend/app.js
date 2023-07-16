const mysql = require('mysql');

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'issatm',
    database:"ticket-app-bd"
});

connection.connect((err) =>{
    if(err){
        console.error("Error",err);
        return;
    }
    console.log('Connected');
});