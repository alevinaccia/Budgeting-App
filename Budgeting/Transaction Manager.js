class Transaction {
    constructor(typeOf, value, msg, d, w, m) {
        this.typeOf = typeOf;
        this.value = value;
        this.msg = msg;
        this.actualValue = value;



        // this.dayOfCreation = new Date().getDate();
        // this.monthOfCreation = new Date().getUTCMonth() + 1;
        // this.weekOfCreation = new Date().getWeek();

        this.dayOfCreation = d;
        this.monthOfCreation = m;
        this.weekOfCreation = w;
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

        this.flag = true;

        // if (localStorage.getItem("tList") != null) {

        //     this.allTransactions = JSON.parse(localStorage.getItem("tList"));

        //     this.createList()

        //     this.calculateBalance();

        // }

        //ONLY FOR TEST

        for (let i = 1; i < 10; i++) {
            let bool = Math.random() > 0.5;
            let value = Math.floor(Math.random() * 100);

            let d, w, m;

            if (Math.random() > 0.8) {
                d = new Date().getDate();
                w = new Date().getWeek();
                m = new Date().getMonth() + 1;
            } else {
                d = Math.floor(Math.random() * 30);
                w = Math.floor(Math.random() * 52);
                m = Math.floor(Math.random() * 12);
            }

            this.allTransactions.push(new Transaction(bool, value, `T${i}`, d, w, m));
        }

        this.createList();
        this.calculateBalance();



    }

    addTransaction(Transaction) {
        this.allTransactions.unshift(Transaction);

        this.createList(Transaction);

        this.calculateBalance();

        this.saveList();
    }

    removeFromBalance(bool, value) {

        if (bool == true) {

            this.entries -= value;

        } else {

            this.outings -= value;

        }

        this.balance = this.entries - this.outings

        this.display();

        this.saveList();

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

        switch (arr) {

            case "day":

                console.log("Im here")

                this.dayTransactions.forEach(t => {

                    if (t.typeOf == true) {
                        this.entries += t.actualValue;
                    } else {
                        this.outings += t.actualValue;
                    }
                });


                break;

            case "week":

                this.weekTransactions.forEach(t => {
                    if (t.typeOf == true) {
                        this.entries += t.actualValue;
                    } else {
                        this.outings += t.actualValue;
                    }
                });

                break;

            case "month":

                this.monthTransactions.forEach(t => {
                    if (t.typeOf == true) {
                        this.entries += t.actualValue;
                    } else {
                        this.outings += t.actualValue;
                    }
                });

                break;

            default:

                this.allTransactions.forEach(t => {
                    if (t.typeOf == true) {
                        this.entries += t.actualValue;
                    } else {
                        this.outings += t.actualValue;
                    }
                });

                break;


        }


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
        li.innerText = `${t.msg} ${t.value}€`;

        this.ul.appendChild(li);

    }

    createList(arr) {
        this.ul.innerHTML = "";

        switch (arr) {

            case "day":

                this.dayTransactions.forEach(t => {
                    this.addElementToList(t);
                })

                break;

            case "week":

                this.weekTransactions.forEach(t => {
                    this.addElementToList(t);
                })

                break;

            case "month":

                this.monthTransactions.forEach(t => {
                    this.addElementToList(t);
                })

                break;

            default:

                this.allTransactions.forEach(t => {
                    this.addElementToList(t);
                })

        }

    }

    saveList() {
        localStorage.setItem("tList", JSON.stringify(this.allTransactions))
    }

    displayForm() {

        if (this.flag == true) {

            document.querySelector(".addForm").setAttribute("style", "visibility : visible;")

            this.flag = !this.flag

        } else {

            document.querySelector(".addForm").setAttribute("style", "visibility : hidden;")

            this.clearForm();

            this.flag = !this.flag
        }
    }
    clearForm() {

        document.querySelector("#value").value = "";
        document.querySelector("#msg").value = "";
        document.querySelector("#earn").checked = false;
        document.querySelector("#out").checked = false;

    }

    swapTransactions(period) {
        switch (period) {
            case "day":
                this.dayTransactions = this.allTransactions.filter(transaction => {
                    return transaction.dayOfCreation == new Date().getDate() && transaction.monthOfCreation == new Date().getMonth() + 1;
                })

                console.log(this.dayTransactions);

                break;

            case "week":
                this.weekTransactions = this.allTransactions.filter(transaction => {
                    return transaction.weekOfCreation == new Date().getWeek();
                })

                console.log(this.weekTransactions);

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