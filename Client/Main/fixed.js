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

        //Entire form
        this.form = document.querySelector("#fixedForm")

        this.ammountInput = document.querySelector("#ammountValue");
        this.entryInput = document.querySelector("#entry");
        this.exitInput = document.querySelector("#exit");
        this.msgInput = document.querySelector("#fixedMsg")

        this.dayBtn = document.querySelector("#dayBtn");
        this.weekBtn = document.querySelector("#weekBtn");
        this.monthBtn = document.querySelector("#monthBtn");

        this.allFixed = [];

        //flags
        this.dateFlag;
        this.dateType;
        this.flag = false;

        this.date = new Date();
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

    addFixed() {
        let msg = this.msgInput.value;
        let ammount = Number(this.ammountInput.value);
        let bool = this.entryInput.checked;
        let type;

        bool == true ? (type = "Entry") : (type = "Exit");

        this.allFixed.unshift(new Fixed(this.dateType, ammount, type, this.dateFlag, msg));

        this.date = undefined;

        this.saveArray();
        this.clearForm();
    }

    sumFixesToBalance() {

        let transactionsToAdd = []

        this.allFixed.forEach((fixed) => {

            let bool;

            switch (fixed.date) {

                case "Daily":
                    if (this.date.getDay() > fixed.flag) {
                        fixed.type == "Entry" ? (bool = true) : (bool = false);

                        transactionsToAdd.push(new Transaction(bool, fixed.ammount, fixed.msg));

                        fixed.flag++;
                    }

                    break;

                case "Weekly":

                    if (this.date.getDay() - fixed.flag >= 7) {
                        fixed.type == "Entry" ? (bool = true) : (bool = false);

                        transactionsToAdd.push(new Transaction(bool, Number(fixed.ammount), fixed.msg));

                        fixed.flag += 7;
                    }

                    break;

                case "Monthly":

                    if (this.date.getMonth() + 1 > fixed.flag) {
                        fixed.type == "Entry" ? (bool = true) : (bool = false);

                        transactionsToAdd.push(new Transaction(bool, fixed.ammount, fixed.msg));

                        fixed.flag++;
                    }

                    break;
            }

        })

        return transactionsToAdd;
    }

    clearForm() {
        this.ammountInput.value = "";
        this.entryInput.checked = false;
        this.exitInput.checked = false;
        this.msgInput.value = "";

        this.dayBtn.setAttribute("style", "background-color:#aaa");
        this.weekBtn.setAttribute("style", "background-color:#aaa");
        this.monthBtn.setAttribute("style", "background-color:#aaa");
    }

    displayForm() {
        if (this.flag == true) {

            this.form.setAttribute("style", "visibility: hidden");

            this.flag = !this.flag;
        }

        else {

            this.form.setAttribute("style", "visibility: visible");

            this.flag = !this.flag;
        }
    }
}