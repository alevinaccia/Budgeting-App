const url = 'http://localhost:5000'
let form = document.querySelector("#form");

function showLogin() {
    document.querySelector("#failMessage").style.display = "none";
    document.querySelector("#failMessage2").style.display = "none";
    document.querySelector("#login").style.display = "";
    document.querySelector("#signup").style.display = "none";

    document.querySelector("#signupbtn").style.display = "";
    document.querySelector("#loginbtn").style.display = "none";
    form.reset();
}

function showSignup() {
    document.querySelector("#failMessage").style.display = "none";
    document.querySelector("#failMessage2").style.display = "none";
    document.querySelector("#signup").style.display = "";
    document.querySelector("#login").style.display = "none";

    document.querySelector("#signupbtn").style.display = "none";
    document.querySelector("#loginbtn").style.display = "";
    form.reset();
}

function loginfunc() {
    let username = form.username.value;
    let password = form.password.value;

    if(username != "" && password != ""){
        fetch(url + '/login', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'username': username,
                'password': password
            },
        }).then(data => {
            if (data.status != 401) {
                document.location = 'http://127.0.0.1:5500/Client/Main/budget.html';
                localStorage.setItem('currentUser' , username);
            } else {
                document.querySelector("#failMessage").style.display = "";
            }
        })
    }else{
        document.querySelector("#failMessage").style.display = "";
    }
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
            document.querySelector("#failMessage2").style.display = "";
        }
    })
}