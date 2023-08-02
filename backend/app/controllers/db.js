const mysql = require('mysql');

const connexion = mysql.createConnection({ // define database metadata
    host: 'localhost',
    user: 'root',
    password: 'issatm',
    database:'ticket-app-bd'
});

module.exports = {
    connexion,
};