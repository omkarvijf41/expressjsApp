const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

/*https://github.com/mafintosh/mongojs*/
const mongojs = require('mongojs');
const db = mongojs('expressapp', ['users']);

/*https://github.com/ctavan/express-validate
https://github.com/express-validator/express-validator*/
const expressValidator = require('express-validator');

const app = express();

//Gobal Vars
app.use((req, res, next)=> {
	res.locals.errors = null;
	next();
});


//View or Template Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded(
	{
		extended : false
	})
);

/*Express Validator Middleware options
This can be copied from express validator middleware*/
app.use(expressValidator({
	errorFormatter: function(param, msg, value) {
		const namespace = param.split['.'],
		root = namespace && namespace.shift(),
		formParam = root;
		while(namespace && namespace.length) {
			formParam += '[' + namespace.shift() + ']';
		}
		return {
			param: formParam,
			msg: msg,
			value: value
		}
	}
}));

const users = [
	{
		"first_name": "Omkar",
		"last_name": "Atluri",
		"id": 1,
		"email": "omkar@gmail.com"
	},
	{
		"first_name": "Vamsi",
		"last_name": "Atluri",
		"id": 2,
		"email": "vamsi@gmail.com"
	},
	{
		"first_name": "om",
		"last_name": "Atluri",
		"id": 3,
		"email": "om@gmail.com"
	}
];

app.get('/', (req, res)=> {
	//res.send(`Home Page path / hit on port 9999`);
	// find everything
	db.mycollection.find(function (err, docs) {
		// docs is an array of all the documents in mycollection
		console.log(`users array coming from db collection:` +docs);
		//will pass the data to template or view renedering engine
		res.render('index', {
			'name': 'Omkar',
			'users': docs.length > 0 ? docs : users /*Above users array object ref*/
		});
	});
});

/*Catch the submitted form POST data*/
app.post('/users/add', (req, res) => {
	var errors, newUser;
		/*Express validator methods or rules before form submission*/
		req.checkBody('first_name', 'First Name is Required').notEmpty();
		req.checkBody('last_name', 'Last Name is Required').notEmpty();
		req.checkBody('email', 'Email is Required').notEmpty();

		errors = req.validationErrors();
		if (errors) {
			console.log(`ERRORS during form submission`);
			res.render('index', {
				'name': 'Omkar',
				'users': users, /*Above users array object ref*/
				'errors': errors
			});
		} else {
			newUser = {
				first_name: req.body.first_name,
				last_name: req.body.last_name,
				email: req.body.email
			}
			console.log(newUser);
		}
});

//Set Static Path
app.use(express.static(path.join(__dirname, 'public')));

app.listen(9999, ()=>{
	console.log(`Express server listen started on Port 9999`);
});