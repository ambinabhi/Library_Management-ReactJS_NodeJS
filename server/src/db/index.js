var mysql = require('mysql2');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'librarydb'
  });
  
  
  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return process.exit(22); //consistently exit so the Docker container will restart until it connects to the sql db
    }
    console.log('connected as id ' + connection.threadId);
  });

module.exports = connection;