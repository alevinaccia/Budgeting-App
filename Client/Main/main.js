import { URL } from '../noname.js'
import { Transaction, TransactionManager } from './Transaction Manager.js'

const transactionManager = new TransactionManager;
//const goalManager = new GoalManager;

fetch(URL + '/getTransactions', {
    method: 'GET',
}).then(response => response.json())
    .then(allTransactions => {
        transactionManager.createList(allTransactions);
    });

// fetch(URL + '/getGoals', {
//     method: 'GET',
// }).then(response => response.json())
//     .then(allGoals => {
//         goalManager.createList(allGoals);
//     })

//let goalID = 1;

// goalForm.addEventListener('submit', () => {

//     event.preventDefault();

//     let saveValue = Number(document.querySelector("#saveValue").value);
//     let percentage = document.querySelector("#percentage").value;
//     let reason = document.querySelector("#reason").value;

//     let goal = new Goal(saveValue, reason, percentage, goalID);

//     goalID++;

//     goalManager.totalPercentage += percentage;

//     fetch(URL + '/addGoal', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(goal)
//     }).then(response => response.json())
//         .then(Goals => {
//             goalManager.createList(Goals);
//         })
// })