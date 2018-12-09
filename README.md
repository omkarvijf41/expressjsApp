1. npm init will create package.json for the project.

2."body-parser": "*", /*"body-parser": "*", Here * will install latest version of that package*/

3."nodemon": "*" /*Nodemon is a utility that will monitor for any changes in your source and automatically restart your server. Perfect for development. */

4.How to run this app? node  app or app.js 
OR  nodemon if it's installed gloabally

5. how to debug expressJS or nodeJS app?
In the terminal run nodemon --inspect 

6. How to setup mongodb?
a. Download mongodb from https://www.mongodb.com/download-center/community
b.C:\Program Files\MongoDB\Server\4.0\bin\mongo.exe to run mongodb server
c. show dbs
use expressapp

db.createCollection('users') //Creating users collection db

show collections

db.users.insert([
{first_name: "Omkar", last_name: "Atluri", email: "omkar@gmail.com"},
{first_name: "vam", last_name: "At", email: "vam@gmail.com"},
{first_name: "vamsi", last_name: "Atluri", email: "vamsi@gmail.com"}
])

db.users.find() or db.users.findOne()

