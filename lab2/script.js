"use strict";

const list = ["Zrobić dodawanie do TODO"];
const Todo_list = {
    "PILNE":["Zrobić dodawanie do TODO"]
};
let trashBin = null;
let selected = null;
function addToList() {
    const todo_value = document.getElementById("todo-text-value").value;
    const todo_type = document.getElementById("todo-text-type").value;
    if (todo_value === "" || todo_type === "") {

    }
    else {
        if (!Todo_list.hasOwnProperty(todo_type)) {
            Todo_list[todo_type] = [];
        };
        Todo_list[todo_type].push(todo_value);
        addListItem(todo_value, todo_type);
        document.getElementById("todo-text-value").value = ""
    };
};

function addListItem(value, type) {
    const ul = document.getElementById("todo-list");
    const btn = document.createElement("button");
    const paragraph1 = document.createElement("p");
    const div = document.createElement("div");
    const span = document.createElement("span");
    const del_btn = document.createElement("button");
    const paragraph = document.createElement("p");
    div.classList.add("todo-list-item");
    paragraph1.textContent = value;
    paragraph.textContent = '[' + type + ']';
    btn.classList.add("todo-button");

    btn.appendChild(paragraph);
    btn.appendChild(paragraph1);
    del_btn.classList.add("del-button");
    del_btn.textContent = "x";
    del_btn.onclick = function () {
        document.getElementById("modal-text")
            .textContent = 'czy na pewno chcesz usunąć: ' + value + '?';
        document.getElementById("modal-container").style.display = "flex";
        selected = div
    };

    btn.onclick = function () {
        btn.classList.toggle("done");
        if (btn.classList.contains("done")) {
            const time = new Date().toLocaleString();
            span.textContent = time;
        }
        else {
            span.textContent = "";
        }
    };
    div.appendChild(del_btn);
    div.appendChild(btn);
    div.appendChild(span);
    ul.appendChild(div);
};

function confirm() {
    trashBin = selected;
    selected.remove();
    document.getElementById("modal-container").style.display = "none"
}

function render() {
    Object.entries(Todo_list).forEach(([type, values]) => {
        values.forEach(value => {
            addListItem(value, type);
        });
    });
};

function undo() {
    if (trashBin) {
        document.getElementById("todo-list").appendChild(trashBin);
        trashBin=null;
    }
}