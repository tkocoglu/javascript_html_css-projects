const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clearButton");
const filterInput = document.querySelector("#todoSearch");

let todos = [];

runEvents();

function runEvents() {
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", pageLoaded);
    secondCardBody.addEventListener("click", removeTodoToUI);
    clearButton.addEventListener("click", allTodoEverywhere);
    filterInput.addEventListener("keyup", filter);
}

function pageLoaded() {
    checkTodosFromStorage();
    todos.forEach(function(todo) {
        addTodoUI(todo);
    });
}

function filter(e) {
    const filterValue = e.target.value.toLowerCase().trim();
    const todoListesi = document.querySelectorAll(".list-group-item");

    if (todoListesi.length > 0) {
        todoListesi.forEach(function(todo) {
            if (todo.textContent.toLowerCase().trim().includes(filterValue)) {
                todo.style.display = "block";
            } else {
                todo.style.display = "none";
            }
        });
    } else {
        showAlert("warning", "Filtreleme yapmak için en az bir todoya ihtiyaç vardır.");
    }
}

function allTodoEverywhere() {
    const todoListesi = document.querySelectorAll(".list-group-item");
    if (todoListesi.length > 0) {
        // Ekrandan silme
        todoListesi.forEach(function(todo) {
            todo.remove();
        });

        // LocalStorage'den silme
        todos = [];
        localStorage.setItem("todos", JSON.stringify(todos));
        showAlert("success", "Başarılı bir şekilde silindi.");
    } else {
        showAlert("warning", "Silmek için en az bir todo gereklidir.");
    }
}

function removeTodoToUI(e) {
    if (e.target.className === "fa fa-remove") {
        // Ekrandan silme
        const todo = e.target.parentElement.parentElement;
        todo.remove();

        // LocalStorage'den silme
        removeTodoToStorage(todo.textContent);
        showAlert("success", "Todo başarıyla silindi.");
    }
}

function removeTodoToStorage(removeTodo) {
    checkTodosFromStorage();
    todos.forEach(function(todo, index) {
        if (removeTodo === todo) {
            todos.splice(index, 1);
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodo(e) {
    e.preventDefault(); // Form gönderimini durdurur

    const inputText = addInput.value.trim();

    if (inputText === "") {
        showAlert("warning", "Lütfen boş bırakmayınız.");
    } else {
        // Arayüze ekleme
        addTodoUI(inputText);
        addTodoStorage(inputText);
        showAlert("success", "Todo eklendi.");
    }
}

function addTodoUI(newTodo) {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between";
    li.textContent = newTodo;

    const a = document.createElement("a");
    a.href = "#";
    a.className = "delete-item";

    const i = document.createElement("i");
    i.className = "fa fa-remove";

    a.appendChild(i);
    li.appendChild(a);
    todoList.appendChild(li);

    addInput.value = "";
}

function addTodoStorage(newTodo) {
    checkTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function checkTodosFromStorage() {
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}

function showAlert(type, message) {
    const div = document.createElement("div");
    div.className = "alert alert-" + type;
    div.textContent = message;

    firstCardBody.appendChild(div);

    setTimeout(function() {
        div.remove();
    }, 2500);
}
