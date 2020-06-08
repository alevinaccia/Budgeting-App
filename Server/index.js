
const express = require('express');

const cors = require('cors');

const app = express();

//Temp
let allTransactions = [];
let allGoals = [];
let allCategories = []
//Temp

app.use(cors());
app.use(express.json());

app.get('/getTransactions', (req, res) => {
    res.json(allTransactions);
})

function isValidTransaction(t) {
    let bool;

    if(t.msg.toString() != "" && t.value > 0 && t.typeOf != null){
        bool = true;
    }else{
        bool = false;
    }
    return bool;
}

app.get('/getGoals', (req, res) => {
    res.json(allGoals);
})

app.get('/getCategories', (req, res) => {
    res.json(allCategories);
})

app.post('/updateGoals', (req, res) => {
    let temp = req.body;

    for (let i = 0; i < temp.length; i++) {
        for (let z = 0; z < allGoals.length; z++) {
            if (temp[i].id == allGoals[z].id) {
                allGoals[z].actualPercentage = temp[i].newPercentage;
            }
        }
    }
})

app.post('/addTransaction', (req, res) => {
    if (isValidTransaction(req.body)) {
        allTransactions.unshift(req.body);
        res.json(allTransactions);
    }
    else {
        res.statusCode = 420;
        res.json(
            "Fields are required"
        )
    }
})

app.post('/addCategory', (req , res) => {
    allCategories.unshift(req.body);
    res.json(allCategories);
})

app.post('/addGoal', (req, res) => {
    allGoals.unshift(req.body);
    res.json(allGoals);
})

app.listen(5000, () => {
    console.log("Listening on http://localhost:5000");
})  