var jwt = require('jwt-simple');

var auth = {
    login: function(req,res) {
        var username = req.body.username || '';
        var password = req.body.password || '';
        
        if (username == '' || password == '') {
            res.status(401);
            res.json({
                "status": 401,
                "message": "Invalid credentials"
            });
            return;
        }
        
        var dbUserObj = auth.validate(username, password);
        
        if (!dbUserObj) {
            res.status(401);
            res.json({
                "status": 401,
                "message": "Invalid credentials"
            });
        }
        
        if (dbUserObj) {
            res.json(genToken(dbUserObj));
        }
    },
    
    validate: function(username, password) {
        var dbUserObj = {
            name: 'mikey',
            role: 'admin',
            username: 'meastaff@gmail.com'
        };
        
        return dbUserObj;
    },
    
    validateUser: function(username) {
                var dbUserObj = {
            name: 'mikey',
            role: 'user',
            username: 'meastaff@gmail.com'
        };
        
        return dbUserObj;
    },
}

function genToken(user) {
    var expires = expiresIn(7);
    var token = jwt.encode({
        exp: expires
    }, require('../config/secret')());
    
    return {
        token: token,
        expires: expires,
        user: user
    };
}

function expiresIn(numDays) {
    var dateObj = new Date();
    return dateObj.setDate(dateObj.getDate()+ numDays);
}

module.exports = auth;