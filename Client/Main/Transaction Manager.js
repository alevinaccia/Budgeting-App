export class Transaction {
    constructor(typeOf, value, msg, date, category, user) {
        this.typeOf = typeOf;
        this.value = value;
        this.msg = msg;
        this.actualValue = value;
        this.date = date;
        this.category = category;
        this.user = user;
    }
}

export class TransactionManager {
    constructor() {
        this.allTransactions = [];
        this.dayTransactions = [];
        this.weekTransactions = [];
        this.monthTransactions = [];

        this.outings = 0;
        this.entries = 0;
        this.balance = this.entries - this.outings;

        this.date = new Date();

        this.entriesElement = document.querySelector("#entries");
        this.outElement = document.querySelector("#outings");
        this.balanceElement = document.querySelector("#balance");
        this.ul = document.querySelector("#transactionsList");

        this.form = document.querySelector("#transactionForm");

        this.flag = false;
    }

    removeFromBalance(bool, value) {

        if (bool == true) {
            this.entries -= value;
        } else {
            this.outings -= value;
        }
        this.balance = this.entries - this.outings
        this.display();
    }

    resetValues() {
        this.entries = 0;
        this.outings = 0;
        this.balance = 0;
    }

    calculateBalance(arr) {
        if (this.entries != 0 || this.outings != 0) {
            this.resetValues();
        }

        arr.forEach(t => {

            if (t.typeOf == true) {
                this.entries += t.actualValue;
            } else {
                this.outings += t.actualValue;
            }
        });


        this.balance = this.entries - this.outings;

        this.display();

    }

    display() {
        this.entriesElement.innerHTML = `${this.entries}`;
        this.outElement.innerHTML = `${this.outings}`;
        this.balanceElement.innerHTML = `Balance ${this.balance}`;
    }

    addElementToList(t) {
        let c;
        let li = document.createElement("li");
        li.setAttribute("id", `t${t._id}`);
        li.setAttribute("class", "transactionListElement");
        if (t.category == null) {
            li.style.borderColor = "rgb(255, 255, 255)";
        } else {
            li.style.borderColor = t.category.color;
        }

        t.typeOf == true ? (c = "income") : (c = "expense");
        
        li.innerHTML = `${t.msg} <span class=${c}>${t.value}€</span>`;

        this.ul.appendChild(li);

    }

    createList(arr, currentUser) {
        this.ul.innerHTML = "";
        let filteredArr = arr.filter(transaction => transaction.user == currentUser)

        for(let i = filteredArr.length-1; i >= 0; i--){
            this.addElementToList(filteredArr[i]);
        }
        this.calculateBalance(filteredArr);
        this.display();
    }

    deleteTransaction(id) {
        console.log(id);
    }

    swapTransactions(period) {
        switch (period) {
            case "day":
                this.dayTransactions = this.allTransactions.filter(transaction => {
                    return transaction.dayOfCreation == new Date().getDate() && transaction.monthOfCreation == new Date().getMonth() + 1;
                })

                break;

            case "week":
                this.weekTransactions = this.allTransactions.filter(transaction => {
                    return transaction.weekOfCreation == new Date().getWeek();
                })

                console.log(this.allTransactions);

                break;

            case "month":
                this.monthTransactions = this.allTransactions.filter(transaction => {
                    return transaction.monthOfCreation == new Date().getMonth() + 1;
                })

                console.log(this.monthTransactions);

                break;

        }

        this.createList(period);

        this.calculateBalance(period);

    }

}
