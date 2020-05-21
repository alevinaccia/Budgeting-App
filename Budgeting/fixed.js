class Fixed {
    constructor(date, ammount, type, flag, msg) {
        this.date = date;
        this.ammount = ammount;
        this.type = type;
        this.flag = flag
        this.msg = msg;
    }


}

class FixedManager {

    constructor() {
        this.ammountInput = document.querySelector("#ammountValue");
        this.entryInput = document.querySelector("#entry");
        this.msgInput = document.querySelector("#fixedMsg")

        this.dayBtn = document.querySelector("#dayBtn");
        this.weekBtn = document.querySelector("#weekBtn");
        this.monthBtn = document.querySelector("#monthBtn");

        this.allFixed = [];

        //flags
        this.dateFlag;
        this.dateType;

        this.date = new Date()

    }

    selectDate(date) {
        switch (date) {
            case "day":

                this.dayBtn.setAttribute("style", "background-color:green");

                this.weekBtn.setAttribute("style", "background-color:#aaa");

                this.monthBtn.setAttribute("style", "background-color:#aaa");

                this.dateType = "Daily";

                this.dateFlag = this.date.getDay();

                break;

            case "week":

                this.dayBtn.setAttribute("style", "background-color:#aaa");

                this.weekBtn.setAttribute("style", "background-color:green");

                this.monthBtn.setAttribute("style", "background-color:#aaa");

                this.dateType = "Weekly";

                this.dateFlag = this.date.getDay();

                break;

            case "month":

                this.dayBtn.setAttribute("style", "background-color:#aaa");

                this.weekBtn.setAttribute("style", "background-color:#aaa");

                this.monthBtn.setAttribute("style", "background-color:green");

                this.dateType = "Monthly";

                this.dateFlag = this.date.getMonth() + 1;

                break;

        }
    }

    convalidate() {
        let msg = this.msgInput.value;
        let ammount = this.ammountInput.value;
        let bool = this.entryInput.checked;
        let type;

        bool == true ? (type = "Entry") : (type = "Exit");

        this.allFixed.push(new Fixed(this.dateType, ammount, type, this.dateFlag, msg));

        this.date = undefined;

        console.log( this.allFixed);
    }

    addFixed() {

        let transactionsToAdd = []

        this.allFixed.forEach((fixed) => {

            let bool;

            switch (fixed.date) {

                case "Daily":
                    if(1 == 1){
                        fixed.type == "Entry" ? (bool = true) : (bool = false);

                        console.log(bool, fixed.ammount, fixed.msg);

                        transactionsToAdd.push(new Transaction(bool, fixed.ammount, fixed.msg));
                    }

                    break;

                case "Weekly":

                    break;

                case "Monthly":

                    break;
            }
        })

        return transactionsToAdd;
    }
}