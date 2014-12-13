var mysql   = require('mysql');


/* DATABASE CONFIGURATION */
var connection = mysql.createConnection({
    host: 'cwolf.cs.sonoma.edu',
    user: 'bcaloz',
    password: '003854453'
    //user: 'your_username',
    //password: 'your_password'
});

var dbToUse = 'bcaloz';

//use the database for any queries run
var useDatabaseQry = 'USE ' + dbToUse;

//create the User table if it does not exist
connection.query(useDatabaseQry, function (err) {
    if (err) throw err;

    var createTableQry = 'CREATE TABLE IF NOT EXISTS Account('
        + 'AccountID INT AUTO_INCREMENT PRIMARY KEY'
        + ',Username VARCHAR(50) UNIQUE'
        + ',Email VARCHAR(255) UNIQUE'
        + ',Password VARCHAR(50)'
        + ',Post VARCHAR(255)'
        + ')';
    connection.query(createTableQry, function (err) {
        if (err) throw err;
    });
});

exports.GetAll = function(callback) {
    connection.query('select AccountID, Username, Email, Post from Account',
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}

exports.GetAllView = function(callback) {
    connection.query('select * from Account',
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}

exports.GetAccountID = function(AccountID, callback) {

	var query = 'select AccountID, Username, Email, Password, Post from Account WHERE AccountID =' + AccountID;
	console.log(query);
    connection.query('select AccountID, Username, Email, Password, Post from Account WHERE AccountID =' + AccountID,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}

exports.GetByID = function(userInfo, callback) {
    var query = 'select * from Account WHERE AccountID =' + userInfo.AccountID + ';';
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}

exports.Insert = function(userInfo, callback) {
    console.log(userInfo);
  
    var query = 'INSERT INTO Account(Username,Email, Password, Post) VALUES (\'' + userInfo.username + '\', \'' + userInfo.email + '\', \'' + userInfo.password + '\', \'' + userInfo.post + '\');';
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return
            }
			            callback(false, result);
        }
    );
}
