const transactionManager = new TransactionManager;
const objManager = new ObjManager;
const sideBarManager = new SideBarManager;
const fixedManager = new FixedManager;
let objIdentifier = 1;


transactionManager.display();

fixedManager.sumFixesToBalance();


const submitTransaction = () => {
    let value = Number(document.querySelector("#value").value);
    let msg = document.querySelector("#msg").value;

    let typeOf = document.querySelector("#earn").checked;
    let bool;

    typeOf === true ? (bool = true) : (bool = false);

    t = new Transaction(bool, value, msg);

    let partToRemove = objManager.calculateProgress(t.value);

    transactionManager.removeFromBalance(true, partToRemove);

    t.actualValue -= partToRemove;

    transactionManager.displayForm();

    transactionManager.clearForm();

    transactionManager.addTransaction(t);

    transactionManager.display();

}

const submitObj = () => {

    let saveValue = Number(document.querySelector("#saveValue").value);
    let percentage = document.querySelector("#percentage").value;
    let reason = document.querySelector("#reason").value;

    let obj = new Objctive(saveValue, reason, percentage, objIdentifier);

    objIdentifier++;

    objManager.totalPercentage += percentage;

    objManager.addObj(obj);

    objManager.displayForm(false);

    objManager.clearForm()

}





