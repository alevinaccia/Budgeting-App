
class Goal {
    constructor(ammount, reason, percentage, id) {

        this.ammount = ammount;
        this.reason = reason;
        this.percentage = Number(percentage);
        this.actualPercentage = 0;
        this.actualSaving = 0;
        this.id = id;
    }
}

class GoalManager {

    constructor() {
        this.allGoals = [];
        this.valueElement = document.querySelector("#saveValue");
        this.reasonElement = document.querySelector("#reason");
        this.dateElement = document.querySelector("#date");
        this.totalPercentage = 0;

        this.form = document.querySelector("#goalForm");

        this.ul = document.querySelector("#goalList");

        this.flag = false;

    }

    createList(arr) {
        this.allGoals = arr;

        this.ul.innerHTML = "";

        arr.forEach(goal => {
            this.addElementToList(goal);
        })

        this.displayForm();
    }

    addElementToList(goal) {

        let li = document.createElement("li");
        li.setAttribute("class", "goalListElement");
        li.setAttribute("id", `goal${goal.id}`);
        li.innerText = `${goal.reason} ${goal.ammount}€ ${Number(goal.actualPercentage.toFixed(1))}%`;
        let progress = document.createElement("progress");
        progress.setAttribute("max", "100");
        progress.setAttribute("value", `${goal.actualPercentage}`);
        progress.setAttribute("id", `progress${goal.id}`);
        li.appendChild(progress);

        this.ul.appendChild(li);

    }

    calculateProgress(value) {

        let tEntry = Number(value);

        let partToRemove = 0;

        this.allGoals.forEach((goal) => {
            if (goal.actualPercentage < 100) {

                let valueToFill = 100 - goal.actualPercentage;

                let progress = document.querySelector(`#progress${goal.id}`)

                //Calcolo la parte da aggiungere all'obiettivo

                let partToAdd = (tEntry / 100) * goal.percentage;

                //Calcolo l'aggiunta in percentuale

                let percentageToAdd = (100 * partToAdd) / goal.ammount;

                //Aggiungi i dati all'oggetto

                if (percentageToAdd > valueToFill) {

                    goal.actualPercentage = 100;

                    goal.actualSaving = goal.ammount;

                    partToRemove -= (percentageToAdd - valueToFill);

                } else {

                    goal.actualPercentage += percentageToAdd;

                    goal.actualSaving += partToAdd
                }

                //Aggiunta parte da rimuovere

                partToRemove += partToAdd;

                let li = document.querySelector(`#goal${goal.id}`);

                progress.setAttribute("value", `${goal.actualPercentage}`);

                li.innerText = `${goal.reason}   ${goal.ammount}€   ${goal.actualPercentage}%`;
                li.appendChild(progress);
            }

        })

        this.saveArray();

        return partToRemove;

    }


    displayForm() {

        if (this.flag == true) {

            document.querySelector("#goalForm").style.display = ""

            this.flag = !this.flag

        } else {

            document.querySelector("#goalForm").style.display = "none"

            this.form

            this.flag = !this.flag
        }

        this.form.reset();
    }

    saveArray() {
        localStorage.setItem("goalList", JSON.stringify(this.allGoals));
    }

}