const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    let Token = req.headers['token-key'];
    jwt.verify(Token, "SecretKey123456789", function(err, decode) {
        if (err) {
            res.status(401).json({ status: "Unauthorized" });
        } else {
            let username = decode?.data?.UserName; // Optional chaining ব্যবহার
            if (username) {
                req.headers['username'] = username; // Ensure lower-case 'username'
                next();
            } else {
                res.status(400).json({ status: "Fail", message: "UserName not found in token" });
            }
        }
    });
};
