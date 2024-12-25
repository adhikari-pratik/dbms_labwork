// Load environment variables
require("dotenv").config();
console.log("Environment Variables:");
console.log(`PORT: ${process.env.PORT}`);
console.log(`HOST: ${process.env.HOST}`);
console.log(`USER: ${process.env.USER}`);
console.log(`SQL_PORT: ${process.env.SQL_PORT}`);

const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");


const saltRounds = 10;

const app = express();
const port = process.env.PORT || 5000;

// admin key
const adminKeyOriginal = process.env.ADMIN_KEY;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PASSWORD,
	port: process.env.SQL_PORT,
});

db.connect((err) => {
	if (err) {
		console.error("Database connection failed:", err.stack);
		return;
	}
	console.log("Connected to MySQL database.");

	// create a database
	const dbName = "form_db";
	db.query(`create database if not exists ${dbName}`, (err, result) => {
		if (err) {
			console.log("error creating the database", err);
			return;
		}
		console.log(`Database ${dbName} created successfully.`);

		// use the database query
		const useDB = `use ${dbName}`;
		db.query(useDB, (err, result) => {
			if (err) {
				console.log("error using the database", err);
				return;
			}
			console.log(`Selected ${dbName} database.`);

			// creating new table query
			const createTableUsers = `
            create table if not exists users(
            id int not null auto_increment ,
            name varchar(255) not null ,
            username varchar(20) not null unique ,
            role varchar(10) not null,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
            );`;

			const createTableForm = `
            create table if not exists form_info(
            form_id int not null auto_increment,
            user_id int not null unique,            
            email varchar(255) not null unique ,
            password varchar(100) not null,
            phone varchar(15) ,
            address varchar(255) not null ,
            university varchar(255),
            department varchar(15),
            rollno varchar(15),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (form_id),
            FOREIGN KEY (user_id) REFERENCES users(id)
            );`;

			db.query(createTableUsers, (err, result) => {
				if (err) {
					console.log("Erro creating table", err);
					return;
				}
				console.log("Table users created successfully");

				db.query(createTableForm, (err, result) => {
					if (err) {
						console.log("Error creating table", err);
						return;
					}
					console.log("Table form_info created successfully");

					// setting the auto_increment of form_id from 1000
					db.query(
						"ALTER TABLE form_info AUTO_INCREMENT = 1000",
						(err, result) => {
							if (err) {
								console.log("Error setting auto_increment", err);
								return;
							}
							console.log("Auto_increment set successfully");
						}
					);
				});
			});
		});
	});
});

// api to post information from form
app.post("/submit-user", async (req, res) => {
	const {
		fName,
		mName,
		lName,
		address,
		email,
		phone,
		username,
		password,
		university,
		faculty,
		rollno,
		adminKey,
	} = req.body;
	const fullName = `${fName} ${mName} ${lName}`;

	// inserting the form input into the database
	const insertUser = "insert into users(name,username, role) value (?,?,?)";
	const insertForm =
		"insert into form_info(user_id, email,password , phone, address, university, department, rollno) value ((select last_insert_id()),?,?,?,?,?,?,?)";

	let role = "member";
	if (adminKey == adminKeyOriginal) {
		role = "admin";
	}

	db.query(insertUser, [fullName, username, role], async (err, result) => {
		if (err) {
			console.log("Error inserting user", err);
			res.status(500).json({
				message: "Error inserting user",
				success: false,
				error: err.message,
			});
		}
		console.log("inserted into users successfully.");
		const hash = await bcrypt.hash(password, saltRounds);
		console.log(hash);
		db.query(
			insertForm,
			[email, hash, phone, address, university, faculty, rollno],
			(err, result) => {
				if (err) {
					console.log("Error inserting Form_info", err);
					res.status(500).json({
						message: "Error inserting form_info",
						success: false,
						error: err.message,
					});
				}
				console.log("inserted into form_info successfully.");
				res.status(200).json({
					success: true,
					message: "Data inserted sccessfully.",
					error: "No error occured.",
				});
			}
		);
	});
});

// login using the data
app.post("/authenticate", (req, res) => {
	const { username, password } = req.body;
	const findUsername =
		"SELECT users.username,form_info.password as password FROM users inner join form_info on users.id = form_info.user_id WHERE username = ?";
	const findhashedPassword = "SELECT password FROM users WHERE username = ?";

	db.query(findUsername, [username], (err, result) => {
		if (err) {
			console.log("Error finding username", err);
			res.status(500).json({
				message: "Coundn't find the username",
				success: false,
				error: err.message,
			});
		}
		// if (result.length === 0) {
		// 	return res.status(404).json({
		// 		success: false,
		// 		message: "User not found",
		// 	});
		// }
		console.log("username Found.", result);

		const hashedPassword = result[0].password;
		console.log(hashedPassword, password);
		bcrypt.compare(password, hashedPassword, (err, result) => {
			if (err) {
				console.error("Error verifying password:", err);
			} else if (result) {
				res.status(200).json({
					success: true,
					message: "Login successful",
					username: username,
				});
				console.log("Password matches!");
			} else {
				console.log("Password does not match");
				res.status(401).json({
					success: false,
					message: "Invalid credentials",
				});
			}
		});
	});
});

// get your info
app.get("/user/:username", (req, res) => {
	const username = req.params.username;
	console.log(username);
	const query =
		"SELECT * FROM users inner join form_info on users.id = form_info.user_id WHERE username = ?";

	db.query(query, [username], (err, result) => {
		if (err) {
			console.log("Error finding user info", err);
			res.status(500).json({
				message: "Could not find user info",
				error: err,
				success: false,
			});
		}
		console.log("\nFound the user and showing all of its info \n", result);
		res.status(200).json({
			message: "User information found",
			data: result[0],
			success: true,
		});
	});
});

//get all info
app.get("/viewall/:username", async (req, res) => {
	console.log("\n\nThis go hit......\n\n");
	const username = req.params.username;
	console.log(username);
	const knowRole = "SELECT role FROM users where username = ?";
	const query =
		"SELECT * FROM users inner join form_info on users.id = form_info.user_id where users.role != 'admin'";

	db.query(knowRole, [username], (err, result) => {
		if (err) {
			console.log("Unable to fetch");
			res.status(500).json({
				message: "unable to fetch",
				error: err,
				success: false,
			});
		}
		const isAdminRole = result[0].role;
		console.log(isAdminRole);
		if (isAdminRole.toLowerCase() == "admin") {
			db.query(query, [username], (err, result) => {
				if (err) {
					console.log("Error finding users info", err);
					res.status(500).json({
						message: "Could not find users info",
						error: err,
						success: false,
					});
				}
				console.log("\nFound the users and showing all  \n", result);
				res.status(200).json({
					message: "all users found",
					data: result,
					success: true,
				});
			});
		} else {
			console.log("User is not admin");
			res.status(500).json({
				message: "user is not admin",
				error: err,
				success: false,
			});
		}
	});
});

// basic get page
app.get("/", (req, res) => {
	res.send("Welcome to the Backend");
});

// app listening on port
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
