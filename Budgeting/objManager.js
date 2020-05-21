class Objctive {
    constructor(ammount, reason, percentage, id) {

        this.ammount = ammount;
        this.reason = reason;
        this.percentage = Number(percentage);
        this.actualPercentage = 0;
        this.actualSaving = 0;
        this.id = id;
    }
}

class ObjManager {

    constructor() {
        this.allObjectives = [];
        this.valueElement = document.querySelector("#saveValue");
        this.reasonElement = document.querySelector("#reason");
        this.dateElement = document.querySelector("#date");
        this.totalPercentage = 0;
        this.flag = true;

        if (localStorage.getItem("objList") != null) {

            this.allObjectives = JSON.parse(localStorage.getItem("objList"));

            this.createList()

        }
    }

    addObj(obj) {
        this.allObjectives.push(obj);

        this.saveList();

        this.refreshList(obj);
    }

    refreshList(obj) {

        let ul = document.querySelector("#objList");
        let li = document.createElement("li");
        li.setAttribute("class", "objListElement");
        li.setAttribute("id", `obj${this.allObjectives.length}`);
        li.innerText = `${obj.reason} ${obj.ammount}€ ${Number(obj.actualPercentage.toFixed(1))}%`;
        let progress = document.createElement("progress");
        progress.setAttribute("max", "100");
        progress.setAttribute("value", `${obj.actualPercentage}`);
        progress.setAttribute("id", `progress${this.allObjectives.length}`);
        li.appendChild(progress);

        ul.appendChild(li);

    }

    calculateProgress(value) {

        let tEntry = Number(value);

        let partToRemove = 0;

        this.allObjectives.forEach((obj) => {
            if (obj.actualPercentage < 100) {

                let valueToFill = 100 - obj.actualPercentage;

                let progress = document.querySelector(`#progress${obj.id}`)

                //Calcolo la parte da aggiungere all'obiettivo

                let partToAdd = (tEntry / 100) * obj.percentage;

                //Calcolo l'aggiunta in percentuale

                let percentageToAdd = (100 * partToAdd) / obj.ammount;

                //Aggiungi i dati all'oggetto

                if (percentageToAdd > valueToFill) {

                    obj.actualPercentage = 100;

                    obj.actualSaving = obj.ammount;

                    partToRemove -= (percentageToAdd - valueToFill);

                } else {

                    obj.actualPercentage += percentageToAdd;

                    obj.actualSaving += partToAdd
                }

                //Aggiunta parte da rimuovere

                partToRemove += partToAdd;

                let li = document.querySelector(`#obj${obj.id}`);

                progress.setAttribute("value", `${obj.actualPercentage}`);

                li.innerText = `${obj.reason}   ${obj.ammount}€   ${obj.actualPercentage}%`;
                li.appendChild(progress);
            }

        })

        this.saveList();

        return partToRemove;

    }

    createList() {
        this.allObjectives.forEach(obj => {
            this.refreshList(obj);
        })
    }

    displayForm() {

        if (this.flag == true) {

            document.querySelector(".addObj").setAttribute("style", "visibility : visible;")

            this.flag = !this.flag

        } else {

            document.querySelector(".addObj").setAttribute("style", "visibility : hidden;")

            this.clearForm();

            this.flag = !this.flag
        }
    }

    saveList() {
        localStorage.setItem("objList", JSON.stringify(this.allObjectives))
    }

    clearForm() {

        document.querySelector("#saveValue").value = "";
        document.querySelector("#reason").value = "";
        document.querySelector("#percentage").value = "";

    }
}