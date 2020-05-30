
const express = require('express');

const cors = require('cors');

const app = express();

//Temp
let allTransactions = [];
let allGoals = [];
//Temp

app.use(cors());
app.use(express.json());

app.get('/getTransactions', (req, res) => {
    res.json(allTransactions);
})

app.get('/getGoals', (req, res) => {
    res.json(allGoals);
})


app.post('/addTransaction', (req, res) => {
    allTransactions.unshift(req.body);
    res.json(allTransactions);
})

app.post('/addGoal', (req, res) => {
    allGoals.unshift(req.body);
    res.json(allGoals);
})

app.listen(5000, () => {
    console.log("Listening on http://localhost:5000");
})  