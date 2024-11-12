const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    let Token = req.headers['token-key'];
    jwt.verify(Token, "SecretKey123456789", function(err, decode) {
        if (err) {
            res.status(401).json({ status: "Unauthorized" });
        } else {
            // Get username From Decoded Token & Add With Req Header
            let username = decode['data']['UserName'];
            req.headers['UserName'] = username;
            next();
        }
    });
};
