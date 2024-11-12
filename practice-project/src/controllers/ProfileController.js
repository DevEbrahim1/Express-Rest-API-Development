const ProfileModel = require('../models/ProfileModel');
const jwt = require('jsonwebtoken');

//User Registration
exports.CreateProfile = async (req, res) => {
    try {
        let reqBody = req.body;
        let data = await ProfileModel.create(reqBody);
        res.status(200).json({ status: "success", data: data });
    } catch (err) {
        res.status(400).json({ status: "Fail", data: err });
    }
};
// User Login


exports.UserLogin = async (req, res) => {
    try {
        let UserName = req.body['UserName'];
        let Password = req.body['Password'];

        // Use await with .findOne() for single user search
        let user = await ProfileModel.findOne({ UserName: UserName, Password: Password });

        if (user) {
            // Create AUTH Web Token
            let payload = {
                exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60),
                data: user
            };
            let token = jwt.sign(payload, 'SecretKey123456789');
            res.status(200).json({ status: "success", token: token, data: user });
        } else {
            res.status(401).json({ status: "fail", message: "Invalid username or password" });
        }
    } catch (err) {
        res.status(500).json({ status: "error", message: err.message });
    }
};

// User Read
exports.SelectProfile = async (req, res) => {
    try {
        let UserName = req.headers['UserName']; // Use username from headers set by middleware
        
        // Mongoose async-await এর সাথে ব্যবহার
        let data = await ProfileModel.find({ UserName: UserName });
        
        res.status(200).json({ status: "success", data: data });
    } catch (err) {
        res.status(400).json({ status: "fail", data: err.message });
    }
};








