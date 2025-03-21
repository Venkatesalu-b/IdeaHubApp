const mysql = require("mysql");
// Create a connection pool
const db = mysql.createConnection({
    host: 'localhost',        
    user: 'root',             
    password: '',             
    database: 'idea_up',
    port: 3306,               
    waitForConnections: true,
    connectionLimit: 10,      
    queueLimit: 0,            
});

db.connect((err) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      return;
    }
    console.log("Connected to database");
  });

// Export the connection pool
module.exports = db