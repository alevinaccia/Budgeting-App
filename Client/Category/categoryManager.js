class Category {
    constructor(name, color) {
        this.name = name;
        this.color = color;
    }
}
const URL = "http://localhost:5000"

const div = document.querySelector("#categoriesContainer");
const form = document.querySelector("#categoryform");

fetch(URL + "/getCategories", {
    method: "GET"
}).then(res => res.json())
    .then(all => createList(all))

form.addEventListener('submit', () => {
    event.preventDefault();

    fetch(URL + "/addCategory", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(new Category(form.name.value, form.color.value))
    }).then(response => response.json())
        .then(all => createList(all));

    form.reset();
})

const createList = (arr) => {
    div.innerHTML = "";
    arr.forEach(category => {
        let p = document.createElement("p");
        p.innerText = category.name;
        p.style.borderStyle = "solid";
        p.style.borderColor = category.color;
        p.setAttribute("class", "categories");
        div.appendChild(p);
    })
}