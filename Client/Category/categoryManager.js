class Category {
    constructor(name, color, id) {
        this.name = name;
        this.color = color;
        this.id = id;
    }
}


const createList = (arr) => {
    div.innerHTML = "";
    arr.forEach(category => {
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
        body: JSON.stringify(new Category(form.name.value, form.color.value, idIndex))
    }).then(response => response.json())
        .then(all => createList(all));

    idIndex++;
    form.reset();
})

const remove = (id) => {
    console.log(id.id)
    fetch(URL + "/removeCategory", {
        method : "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({id : id.id})
    }).then(response => response.json())
    .then(arr => createList(arr));
}