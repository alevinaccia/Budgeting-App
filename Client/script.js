const transactionManager = new TransactionManager;
const goalManager = new GoalManager;
const sideBarManager = new SideBarManager;
const fixedManager = new FixedManager;
const date = new Date();

const transactionForm = document.querySelector("#transactionForm");
const goalForm = document.querySelector("#goalForm");

const URL = 'http://localhost:5000';

fetch(URL + '/getTransactions', {
    method: 'GET',
}).then(response => response.json())
    .then(allTransactions => {
        console.log(allTransactions);
        transactionManager.createList(allTransactions);
    })

fetch(URL + '/getGoals', {
    method: 'GET',
}).then(response => response.json())
    .then(allGoals => {
        console.log(allGoals);
        goalManager.createList(allGoals);
    })


let goalID = 1;

transactionManager.display();

fixedManager.sumFixesToBalance();

transactionForm.addEventListener('submit', () => {

    event.preventDefault();

    let value = Number(transactionForm.ammount.value);

    let msg = transactionForm.msg.value;

    let typeOf = transactionForm.type.value;

    switch (typeOf) {
        case (""):
            typeOf = undefined;
            break;

        case ("true"):
            typeOf = true;
            break;

        case ("false"):
            typeOf = false;
            break;
    }

    t = new Transaction(typeOf, value, msg, date);

    let partToRemove = goalManager.calculateProgress(t.value);

    transactionManager.removeFromBalance(true, partToRemove);

    t.actualValue -= partToRemove;

    fetch(URL + '/addTransaction', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(t)
    }).then(response => response.json())
        .then(transactions => {
            transactionManager.createList(transactions);
        })
});

goalForm.addEventListener('submit', () => {

    event.preventDefault();

    let saveValue = Number(document.querySelector("#saveValue").value);
    let percentage = document.querySelector("#percentage").value;
    let reason = document.querySelector("#reason").value;

    let goal = new Goal(saveValue, reason, percentage, goalID);

    goalID++;

    goalManager.totalPercentage += percentage;

    fetch(URL + '/addGoal', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(goal)
    }).then(response => response.json())
        .then(Goals => {
            goalManager.createList(Goals);
        })
})



