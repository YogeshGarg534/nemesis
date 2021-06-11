const express = require('express');
const bodyParser = require('body-parser');
const ejs = require("ejs");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/nemesisDB', { useNewUrlParser: true });


const infoSchema = new mongoose.Schema({
    username: String,
    Mobile: Number,
    email: String,
    address: String
});

const user = mongoose.model("user", infoSchema);


app.get("/", function(req, res) {

    res.render("login");
});

app.get("/add", function(req, res) {
    res.render("add");
})

app.get("/database", function(req, res) {
    user.find({}, function(err, Info) {
        if (err) {
            console.log(err);
        } else {
            res.render("database", { users: Info })


        }
    })

})

app.get("/delete/:id", function(req, res) {
    var id = req.params.id;
    user.findByIdAndDelete(id, function(err) {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/database');
        }
    })
})

app.post("/", function(req, res) {
    var adminEmail = "admin@namasys.co";
    var adminPassword = "admin123"

    if (req.body.email === adminEmail && req.body.password === adminPassword) {
        console.log(req.body.email);
        res.redirect("/add")
    }
})

app.post("/add", function(req, res) {
    const newUser = new user({
        username: req.body.username,
        Mobile: req.body.mobile,
        email: req.body.email,
        address: req.body.address

    });
    newUser.save();
    res.redirect("/add");
})





app.listen(3000, function() {
    console.log("Server is running on PORT 3000");
})