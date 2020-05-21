class Transaction {
    constructor(typeOf, value, msg) {
        this.typeOf = typeOf;
        this.value = value;
        this.msg = msg;
        this.actualValue = value;
    }
}

class TransactionManager {
    constructor() {
        this.allTransactions = [];
        this.outings = 0;
        this.entries = 0;
        this.balance = this.entries - this.outings;

        this.entriesElement = document.querySelector("#entries");
        this.outElement = document.querySelector("#outings");
        this.balanceElement = document.querySelector("#balance");
        this.ul = document.querySelector("#transactionsList");

        this.flag = true;

        if(localStorage.getItem("tList") !=  null){

            this.allTransactions = JSON.parse(localStorage.getItem("tList"));

            this.createList()

            this.calculateBalance();

        }
    }

    addTransaction(Transaction) {
        this.allTransactions.push(Transaction);

        this.refreshList(Transaction);

        this.calculateBalance();

        this.saveList();
    }

    removeFromBalance(bool, value){

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

    calculateBalance() {
        if (this.entries != 0 || this.outings != 0) {
            this.resetValues();
        }

        this.allTransactions.forEach(t => {
            if (t.typeOf == true) {
                this.entries += t.actualValue;
            } else {
                this.outings += t.actualValue;
            }
        });

        this.balance = this.entries - this.outings;

    }

    display() {

        this.entriesElement.innerHTML = `${this.entries}`;
        this.outElement.innerHTML = `${this.outings}`;
        this.balanceElement.innerHTML = `Balance ${this.balance}`;

    }

    refreshList(t) {

        let li = document.createElement("li");
        li.setAttribute("id", `tra${this.allTransactions.length}`);
        li.setAttribute("class", "tListElement");
        li.innerText = `${t.msg} ${t.value}€`;

        this.ul.appendChild(li);

    }
    
    createList(){
        this.allTransactions.forEach(t => {
            this.refreshList(t);
        })
    }

    saveList(){
        localStorage.setItem("tList",JSON.stringify(this.allTransactions))
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


}