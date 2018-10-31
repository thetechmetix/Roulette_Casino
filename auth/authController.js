var jwt = require('jsonwebtoken');
var db = require('../config/dbconnection');

let auth = function (req, res) {    
    var Email = req.body.Email;
    var Password = req.body.Password;

    db.query('SELECT * FROM User WHERE Email = ?', [Email], function (err, results, rows) {            
        if (err) {
            res.json({
                success: false,
                message: err
            });
        } else {            
            if (results.length > 0) {
                
                var user = results[0];
                if (user && Password == user.Password) {   
                    const expiresIn = 86400; // expires in 24 hours
                    
                    //Generate Token.
                    var token = jwt.sign({ Email: user.Email, Password : user.Password }, process.env.SECRET_KEY, {
                        expiresIn: expiresIn 
                    });

                    //Update Token in User table.

                    db.query(`UPDATE \`User\` SET 
                                \`TokenNo\` = ?                                
                            WHERE IFNULL(IsDeleted,0) = 0 
                                AND \`UserId\` = ? 
                        `,[
                                token,
                                user.UserId
                        ], function (rq, rp, nt) {

                            debugger;
                            res.json({
                                success: true,
                                access_token: token,
                                expiresIn: expiresIn,
                                userId: user.UserId
                            });
                        });

                   

                } else {
                    res.json({
                        success: false,
                        message: "Invalid email and password"
                    });
                }
            }
            else {
                res.json({
                    success: false,
                    message: "Email does not exits"
                });
            }
        }
    });
}


module.exports = auth;