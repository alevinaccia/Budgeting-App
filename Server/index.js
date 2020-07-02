const user = require('./user.js');

const express = require('express');
const cors = require('cors');
const app = express();
const monk = require("monk");
const bcrypt = require("bcrypt");

const connectionString = 'mongodb+srv://alevinaccia:alevinaccia@cluster0-lsl8c.gcp.mongodb.net/Budgeting?retryWrites=true&w=majority';
const db = monk(connectionString);


//Temp
let allTransactions = db.get('transactions');
let allCategories = db.get('categories');
let users = db.get('users');
//Temp

app.use(cors());
app.use(express.json());

app.get('/getTransactions', (req, res) => {
    allTransactions.find().then(transactions => res.json(transactions));
})

function isValidTransaction(t) {
    let bool;

    if (t.msg.toString() != "" && t.value > 0 && t.typeOf != null) {
        bool = true;
    } else {
        bool = false;
    }
    return bool;
}

async function login(username, password) {
    await users.findOne({ username: username }).then((foundUser) => {
        if (foundUser != null) {
            bool = bcrypt.compareSync(password, foundUser.password);
        } else {
            bool = false;
        }
    })
    return bool;
}

async function signUp(username, password) {
    await users.findOne({ username: username }).then((foundUser) => {
        if (foundUser == null) {
            let hashPassword = bcrypt.hashSync(password, 2);
            users.insert(new user(username, hashPassword));
            bool = true;
        } else {
            bool = false;
        }
    })
    return bool;
}

app.get('/getCategories', (req, res) => {
    allCategories.find().then(categories => res.json(categories));
})

app.get('/login', (req, res) => {
    login(req.headers.username, req.headers.password).then(result => {

        if(result){
            res.json({'currentUser' : req.headers.username});
        }else{
            res.status(401);
            res.json({'message' : 'wrong credentials!'})
        }
    })
})

app.post('/signup', (req, res) => {
    signUp(req.headers.username, req.headers.password).then(result => {
        if (result) {
            res.json({ 'currentUser': req.headers.username });
        } else {
            res.status(409);
            res.json({ 'message': "User already registred!" })
        }
    })
})

app.post('/addTransaction', (req, res) => {
    if (isValidTransaction(req.body)) {
        allTransactions.insert(req.body);
        allTransactions.find().then(transactions => res.json(transactions));
    }
    else {
        res.status(420);
        res.json(
            "Fields are required"
        )
    }
})

app.post('/addCategory', (req, res) => {
    allCategories.insert(req.body);
    allCategories.find().then(categories => res.json(categories));
})

app.delete('/removeCategory', (req, res) => {
    allCategories.findOne(({ id: Number(req.body.id.substring(3)) }))
        .then(element => allCategories.remove(element))
        .then(() => allCategories.find().then(categories => res.json(categories)))
})

app.delete('/removeTransaction', (req, res) => {
    allTransactions.findOne(({ id: Number(res.body) }))
        .then(element => allTransactions.remove(element))
        .then(() => allTransactions.find().then(transactions => res.json(transactions)))
})

app.listen(5000, () => {
    console.log("Listening on http://localhost:5000");
})  