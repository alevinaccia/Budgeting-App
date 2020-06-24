const currentUser = localStorage.getItem('currentUser');

class Category {
    constructor(name, color, id, user) {
        this.name = name;
        this.color = color;
        this.id = id;
        this.user = user
    }
}


const createList = (arr) => {
    let filteredArr = arr.filter(user => user.user == currentUser)
    div.innerHTML = "";

    filteredArr.forEach(category => {
        let p = document.createElement("p");
        p.innerText = category.name;
        p.style.borderStyle = "solid";
        p.style.borderColor = category.color;
        p.setAttribute("class", "categories");
        p.setAttribute("id", `cat${category.id}`);
        let button = document.createElement("button");
        button.setAttribute("onclick", `remove(${p.id})`);
        button.innerText = "delete";
        p.appendChild(button);
        div.appendChild(p);
    })
}

const URL = "http://localhost:5000"
const div = document.querySelector("#categoriesContainer");
const form = document.querySelector("#categoryForm");

let idIndex = 0;

fetch(URL + "/getCategories", {
    method: "GET"
}).then(res => res.json())
    .then(all => {
        createList(all);
        idIndex = all.length;
    })

form.addEventListener('submit', () => {
    event.preventDefault();

    fetch(URL + "/addCategory", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(new Category(form.name.value, form.color.value, idIndex, currentUser))
    }).then(response => response.json())
        .then(arr => createList(arr, currentUser));

    idIndex++;
    form.reset();
})

const remove = (id) => {
    fetch(URL + "/removeCategory", {
        method : "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({id : id.id})
    }).then(response => response.json())
    .then(arr => createList(arr));
}