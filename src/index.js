import "./styles.css";

class TodoItem {
    constructor(title, description, dueDate, priority, notes) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority,
        this.notes = notes;
    }
}

class ListManager {
    constructor(container) {
        this.dataStorage = [];
        this.container = document.querySelector(container);
        this.addList = this.addList.bind(this);
        this.addToList = this.addToList.bind(this);
        this.init();
        this.render();
    }

    init() {
        this.addList("Default");
        console.log(this.dataStorage);
    }

    addList(name) {
        const newList = { name: name, tasks: [] };
        this.dataStorage.push(newList);
        this.render()
    }

    addToList(listName, task) {
        const listObj = this.dataStorage.find(item => item.name.toLowerCase() === listName.toLowerCase());
        if(listObj) {
            listObj.tasks.push(task);
            this.render();
        } else {
            console.error(`List "${listName}" not found.`);
        }
    }

    render() {
        this.container.replaceChildren();
        this.dataStorage.forEach(item => {
            const list = document.createElement("div");
            list.classList.add("list-item");
            list.innerHTML = `
            <h2>${item.name}</h2>`
            
            if(item.tasks.length > 0) {
                list.innerHTML += `<h3>Tasks</h3>
                <ul class="taskListContainer">${item.tasks.map(task => 
                `<li id="${task.id}">
                <h3 class="title">${task.title}</h3>
                <p class="description">${task.description}</p>
                <p class="dueDate">${task.dueDate}</p>
                <p class="priority">${task.priority}</p>
                <p class="notes">${task.notes}</p>
                </li>`
            ).join("")}</ul>`
            }
            this.container.appendChild(list);
        })
    }
}

class FormHandler {
    constructor(formId) {
        this.form = document.querySelector(formId);
        this.form.addEventListener("submit", this.handleSubmit.bind(this));
    }

    processData(data) {
        throw new Error("processData must be implemented by a subclass.");
    }

    handleSubmit(e) {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target).entries());
        this.processData(data);
        e.target.reset();
    }
}

class ListCreationHandler extends FormHandler{
    processData(data) {
        listManager.addList(data.name);
    }
}

class TodoItemCreationHandler extends FormHandler {
    processData(data) {
        const todoItem = new TodoItem(
            data.title,
            data.description,
            data.dueDate,
            data.priority,
            data.notes
        )
        console.log(todoItem);
        listManager.addToList(data.listName, todoItem);
    }
}

const listManager = new ListManager("#lists-container");
const listFormHandler = new ListCreationHandler("#todo-list-form");
const TodoFormHandler = new TodoItemCreationHandler("#todo-form");