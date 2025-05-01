const express = require('express');
const router = express.Router();
const db = require('../../db');


router.get('/getAllProfiles', (req, res) => {
    const { userLoginName } = req.query;
    // console.log(userLoginName, "uuuuuuuuuuuuu");

    const sqlQuery = `SELECT * FROM create_profile`;

    db.query(sqlQuery, (error, result) => {
        if (error) {
            console.log(error, "error");
            return res.status(500).json({ error: "Database query failed" });
        }

        const filteredResult = result.filter(row => row.userName !== userLoginName);

        // console.log(filteredResult, "Filtered Result");

        return res.status(200).json(filteredResult);
    });
});


router.post('/insertProfileData', (req, res) => {
    const { profileDetails } = req.body;

    if (!profileDetails) {
        return res.status(400).json({ error: "Profile details are required" });
    }

    const sqlQuery = `INSERT INTO create_profile SET ?`;

    db.query(sqlQuery, profileDetails, (error, result) => {
        if (error) {
            console.error("Database Insert Error:", error);
            return res.status(500).json({ error: "Failed to insert data" });
        }

        return res.status(200).json({ message: "Data inserted successfully", result });
    });
});

router.get('/userLoginProfileData', (req, res) => {
    const { userLoginName } = req.query;

    if (!userLoginName) {
        return res.status(400).json({ error: "Username is required" });
    }

    const sqlQuery = `SELECT * FROM create_profile WHERE userName = ?`;
    db.query(sqlQuery, [userLoginName], (error, result) => {
        if (error) {
            console.logr("Database Error:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json(result);
    });
});


module.exports = router;