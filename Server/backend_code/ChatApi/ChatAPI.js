const express = require('express');
const router = express.Router();
const db = require('../../db'); // Import MySQL database connection

// Save a chat message
router.post('/chat/send', (req, res) => {
    const { userName, message, messageDate, messageTime, senderName } = req.body;
console.log(userName, message, messageDate, messageTime, senderName,"chatttttttttt");

    if (!userName || !message || !messageDate || !messageTime || !senderName) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Validate table name to prevent SQL injection
    if (!/^[a-zA-Z0-9_]+$/.test(userName)) {
        return res.status(400).json({ error: 'Invalid table name' });
    }

    const sql = `INSERT INTO ?? (userName, message, messageDate, messageTime, senderName) VALUES (?, ?, ?, ?, ?)`;

    db.query(sql, [userName, userName, message, messageDate, messageTime, senderName], (err, result) => {
        if (err) {
            console.log(err,"error");
            
        }

        res.status(201).json({
            id: result.insertId,
            userName,
            message,
            messageDate,
            messageTime,
            senderName
        });
    });
});


// Retrieve chat history between two users
router.get('/chat/history/:user1/:user2/:userName/:senderName', (req, res) => {
    const { user1, user2, userName, senderName } = req.params;
    console.log(user1,user2,userName,senderName,"cccccccccccccccc");
    

    // Validate table names to prevent SQL injection
    if (!/^[a-zA-Z0-9_]+$/.test(user1) || !/^[a-zA-Z0-9_]+$/.test(user2)) {
        return res.status(400).json({ error: "Invalid table name" });
    }

    // Query for user1's table
    const sql1 = `
        SELECT * FROM ?? 
        WHERE userName = ? AND senderName = ?
        ORDER BY messageTime ASC
    `;

    db.query(sql1, [user1, userName, senderName], (err1, results1) => {
        if (err1) return res.status(500).json({ error: err1.message });

        // Query for user2's table
        const sql2 = `
            SELECT * FROM ?? 
            WHERE userName = ? AND senderName = ?
            ORDER BY messageTime ASC
        `;

        db.query(sql2, [user2,senderName, userName], (err2, results2) => {
            if (err2) return res.status(500).json({ error: err2.message });

            // Return separate results for both tables
            res.json({
                user1Messages: results1,
                user2Messages: results2
            });
        });
    });
});




module.exports = router;
