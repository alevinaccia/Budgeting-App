import { URL } from "../noname.js";
import { Transaction } from "../Main/Transaction Manager.js"

const transactionForm = document.querySelector("#transactionForm");
let allCat;
let date = new Date();

let succesParagraph = document.querySelector("#succesfullMessage");
let failParagraph = document.querySelector("#failMessage");


//Poter inviare dati per aggiungere transizioni*
transactionForm.addEventListener('submit', () => {
        event.preventDefault();
        let value = Number(transactionForm.ammount.value);
        let msg = transactionForm.msg.value;
        let typeOf = transactionForm.type.value;
        let name = transactionForm.category.value;
        let cat = allCat.find(e => e.name == name) || null;
    
        switch (typeOf) {
            case (""):
                typeOf = null;
                break;
    
            case ("true"):
                typeOf = true;
                break;
    
            case ("false"):
                typeOf = false;
                break;
        }
    
        let t = new Transaction(typeOf, value, msg, date, cat);
    
        // let partToRemove = goalManager.calculateProgress(t.value);
    
        // transactionManager.removeFromBalance(true, partToRemove);
    
        // t.actualValue -= partToRemove;
    
        fetch(URL + '/addTransaction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(t)
        }).then(response => response.json())
            .then(transactions => {
                if (transactions != "Fields are required") {
                    failParagraph.style.display = "none";
                    succesParagraph.style.display = "";
                    transactionForm.reset();
                } else {
                    failParagraph.style.display = "";
                    succesParagraph.style.display = "none";
                }
            })
    });

//Richiedere categorie

fetch(URL + '/getCategories', {
    method: 'GET',
}).then(res => res.json())
    .then(cat => {
        allCat = cat;
        cat.forEach(category => {
            let option = document.createElement("option");
            option.setAttribute("value", category.name);
            option.innerHTML = category.name;
            option.appendChild
            transactionForm.category.appendChild(option)
        });
    })