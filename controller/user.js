var express = require('express');
var router  = express.Router();
var db   = require('../models/db');


/* View all users in a <table> */
router.get('/all', function (req, res) {
    db.GetAll(function (err, result) {
            if (err) throw err;
            res.render('displayUserTable.ejs', {rs: result});
        }
    );
});

/* Create a User */

// Create User Form
router.get('/create', function(req, res){
    res.render('simpleform.ejs', {action: '/user/create'});
});

router.get('/About', function(req, res){
    res.render('About.ejs');
});

// Save User to the Database
router.post('/create', function (req, res) {
    db.Insert( req.body, function (err, result) {
            if (err) throw err;

            if(result.AccountID != 'undefined') {
                var placeHolderValues = {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    post: req.body.post
                };
                res.render('displayFormData.ejs', placeHolderValues);
            }
            else {
                res.send('User was not inserted.');
            }
        }
    );
});
router.post('/singleuser', function (req, res) {
    db.Insert( req.body, function (err, result) {
            if (err) throw err;

            if(result.AccountID != 'undefined') {
                var placeHolderValues = {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    post: req.body.post
                };
                res.render('displayUserInfo.ejs', placeHolderValues);
            }
            else {
                res.send('User was not inserted.');
            }
        }
    );
});


/* View all users in a <table> */
router.get('/dropdown', function (req, res) {
    db.GetAllView(function (err, result) {
            if (err) throw err;
            res.render('displayUserDropDown.ejs', {rs: result});
        }
    );
});

router.post('/view', function (req, res) {
    db.GetByID( req.body, function (err, result) {
            if (err) {
                throw err;
            }
            else if(typeof result[0].AccountID === 'undefined'){
               res.send('No user exists for that UserID.');
            }
            else {
                var placeHolderValues = {
                    username: result[0].Username,
                    email: result[0].Email,
                    password: result[0].Password, 
                    post: result[0].Post
                };
                res.render('displayFormData.ejs', placeHolderValues);
            }
        }
    );
});

/* View a single user's information */
/* INCOMPLETE */
router.get('/', function (req, res) {

console.log(req.query)


   
	db.GetAccountID(req.query.AccountID,
	function(err, result)
	{
	
	if(err)
	{
	throw err;
	}
	console.log(result);
	res.render('displayUserInfo.ejs', {rs: result});
 	}
	);
	
});




module.exports = router;

