"use strict";

const list = ["Zrobić dodawanie do TODO"];
let trashBin = null;
let selected = null;
function addToList() {
    const todo_value = document.getElementById("todo-text-value").value;
    if (todo_value === "") {

    }
    else {
        addListItem(todo_value);
        document.getElementById("todo-text-value").value = ""
    };
};

function addListItem(text) {
    const ul = document.getElementById("todo-list");
    const btn = document.createElement("button");
    const div = document.createElement("div");
    const span = document.createElement("span");
    const del_btn = document.createElement("button");
    div.classList.add("todo-list-item");

    btn.textContent = text;
    btn.classList.add("todo-button");
    del_btn.classList.add("del-button");
    del_btn.textContent = "x";
    del_btn.onclick = function () {
        document.getElementById("modal-text")
            .textContent = 'czy na pewno chcesz usunąć: ' + text + '?';
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
    list.forEach(addListItem);
};

function undo() {
    if (trashBin) {
        document.getElementById("todo-list").appendChild(trashBin);
        trashBin=null;
    }
}