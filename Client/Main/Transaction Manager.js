class Transaction {
    constructor(typeOf, value, msg, date, category) {
        this.typeOf = typeOf;
        this.value = value;
        this.msg = msg;
        this.actualValue = value;
        this.date = date;
        this.category = category;
    }
}

class TransactionManager {
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
        let li = document.createElement("li");
        li.setAttribute("id", `tra${this.allTransactions.length}`);
        li.setAttribute("class", "tListElement");
        li.style.borderColor = t.category.color;
        li.innerText = `${t.msg} ${t.value}€`;

        this.ul.appendChild(li);

    }

    createList(arr) {
        this.ul.innerHTML = "";

        arr.forEach((transaction) => {
            this.addElementToList(transaction);
        })
        this.calculateBalance(arr);

        this.display();

        this.displayForm();
    }

    displayForm() {

        if (this.flag == true) {

            document.querySelector("#transactionForm").style.display = ""

            this.flag = !this.flag

        } else {

            document.querySelector(".addForm").style.display = "none"

            this.flag = !this.flag
        }

        this.form.reset();
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
