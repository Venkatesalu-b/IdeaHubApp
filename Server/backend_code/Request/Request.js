const express = require('express');
const router = express.Router();
const db = require("../../db")

router.get("/getRequestStatus", (req, res) => {
    const { userName,loginUser } = req.query;

    if (!userName) {
        return res.status(400).json({ error: "userName is required" });
    }

    const sqlQuery = "SELECT * FROM connect_people WHERE friend_name = ? AND userName = ?";

    db.query(sqlQuery, [ userName,loginUser], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "Database query failed", details: error.message });
        }
        console.log(result, "request status");

        res.status(200).json({ status: "success", data: result });
    });
});


// getting userProfile by userName
router.get('/getUserLoginProfileDetails', (req, res) => {
    const { userName } = req.query;

    if (!userName) {
        return res.status(400).json({ error: 'userName is required' });
    }

    const sqlQuery = `SELECT * FROM create_profile WHERE userName = ?`;

    db.query(sqlQuery, [userName], (error, result) => {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        // console.log('User Profile:', result[0]);

        res.status(200).json(result[0]);
    });
});


// getting userName and connectstatus by userName
router.get("/getUserNameConnectStatus", (req, res) => {
    const { userName } = req.query;
    const sqlQuery = `SELECT * FROM connect_people WHERE userName = ?`;
    db.query(sqlQuery, [userName], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "Database query failed", details: error.message });
        }
        // console.log(result, "request status");

        res.status(200).json({ status: "success", data: result });
    });
})

// create requested
router.post("/sendRequestAPI", (req, res) => {
    const {
        userName,
        userEmail,
        userProfile,
        connect_status,
        request_date,
        friend_name,
        friend_profile,
        friend_email
    } = req.body;
    console.log(userName,
        userEmail,
        userProfile,
        connect_status,
        request_date,
        friend_name,
        friend_profile,
        friend_email, "requestcreationnnnnnnnnnnnnnnnnn");

    const sqlQuery = `
        INSERT INTO connect_people 
        (userName, userEmail, userProfile, connect_status, request_date, friend_name, friend_profile, friend_email) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sqlQuery, [userName, userEmail, userProfile, connect_status, request_date, friend_name, friend_profile, friend_email],
        (err, result) => {
            if (err) {
                console.error("Error inserting data:", err);
                return res.status(500).json({ success: false, message: "Database error", error: err });
            }
            res.status(200).json({ success: true, message: "Request sent successfully", data: result });
        });
});

// request receiver 
router.get("/requestReceiver", (req, res) => {
    const {  userName,friend_name } = req.query;
    // console.log(userName, friend_name, "=============================");

    const sqlQuery = `SELECT * FROM connect_people WHERE userName = ? And friend_name = ? And connect_status = "requested"`;
    db.query(sqlQuery, [ userName,friend_name], (error, result) => {
        if (error) {
            console.log(error, "error");
        }
        console.log(result, "friendd");

        res.status(200).json(result);
    })
})

// accept request
router.post("/acceptRequestAPI", (req, res) => {
    const { acceptUser, requestUser, connectDate, acceptDate, connectStatus } = req.body;
    console.log(acceptUser, requestUser, connectDate, acceptDate, connectStatus, "rrrrrrrrrrrrr");

    const sqlQuery = `UPDATE connect_people 
                      SET connect_date = ?, accept_date = ?, connect_status = ? 
                      WHERE userName = ? AND friend_name = ?`;

    db.query(sqlQuery, [connectDate, acceptDate, connectStatus, acceptUser, requestUser], (err, result) => {
        if (err) {
            console.log("Error updating request:", err);
            return res.status(500).json({ error: "Database update failed" });
        }
        console.log(result, "acceptttt");

        res.json({ message: "Request accepted successfully", result });
    });
});


module.exports = router;