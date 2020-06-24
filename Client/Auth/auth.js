const url = 'http://localhost:5000'
let form = document.querySelector("#form");

function showLogin() {
    document.querySelector("#login").style.display = "";
    document.querySelector("#signup").style.display = "none";

    document.querySelector("#signupbtn").style.display = "";
    document.querySelector("#loginbtn").style.display = "none";
}

function showSignup() {
    document.querySelector("#signup").style.display = "";
    document.querySelector("#login").style.display = "none";

    document.querySelector("#signupbtn").style.display = "none";
    document.querySelector("#loginbtn").style.display = "";
}

function loginfunc() {
    let username = form.username.value;
    let password = form.password.value;

    fetch(url + '/login', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'username': username,
            'password': password
        },
    }).then(data => {
        if (data.status != 401) {
            document.location = "http://127.0.0.1:5500/Client/Main/budget.html";
            localStorage.setItem('currentUser' , username);
        } else {
            console.log("Wrong credentials!");
        }
    })
}

function signupfunc(){
    let username = form.username.value;
    let password = form.password.value;

    fetch(url + '/signup', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'username': username,
            'password': password
        },
    }).then(data => {
        if (data.status != 409) {
            localStorage.setItem('currentUser' , username);
            document.location = "http://127.0.0.1:5500/Client/Main/budget.html";
        } else {
            console.log("Username already taken!");
        }
    })
}