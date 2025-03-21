const express = require('express');
const router = express.Router();
const db = require('../../db');

// insert into signup
router.post('/insertSignUpWithProfile', (req, res) => {
    const { userName, userEmail, userPassword } = req.body.signUp;

    if (!userName || !userEmail || !userPassword) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Insert user into SignUp table
    const insertUserQuery = 'INSERT INTO SignUp (userName, userEmail, userPassword) VALUES (?, ?, ?)';
    db.query(insertUserQuery, [userName, userEmail, userPassword], (err, result) => {
        if (err) {
            console.error('Error inserting user:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        console.log('User inserted successfully:', result.insertId);

        // Dynamically create a table using the username
        const dynamicTableName = `${userName}`;
        const createTableQuery = `
        CREATE TABLE IF NOT EXISTS ${dynamicTableName} (
            id INT AUTO_INCREMENT PRIMARY KEY,
            userName VARCHAR(255),   
            message VARCHAR(1000),      
            messageDate VARCHAR(255),    
            messageTime VARCHAR(255),    
            senderName VARCHAR(255)      
        )
    `;


        db.query(createTableQuery, (err, createResult) => {
            if (err) {
                console.error('Error creating table:', err);
                return res.status(500).json({ error: 'Error creating user message table' });
            }

            console.log(`Table ${dynamicTableName} created successfully`);
            res.json({ success: true, message: `User registered and table ${dynamicTableName} created.` });
        });
    });
});

router.get('/getAllSignUpDatas', (req, res) => {
    const { userLoginName } = req.query;

    if (!userLoginName) {
        return res.status(400).json({ error: "Missing userLoginName parameter" });
    }

    const sqlQuery = `SELECT * FROM SignUp WHERE userName = ?`;

    db.query(sqlQuery, [userLoginName], (error, result) => {
        if (error) {
            console.error("Database error:", error);
            return res.status(500).json({ error: "Internal server error" });
        }

        console.log(result, "signupresult");

        return res.status(200).json(result.length > 0 ? result[0] : null);
    });
});

module.exports = router;