import "./styles.css";
import DataManager from "./dataManager";
import FormHandler from "./formHandler";
import ListManager from "./render";

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

class ListCreationHandler extends FormHandler{
    constructor(formId, dataManager, listManager) {
        super(formId);
        this.dataManager = dataManager;
        this.listManager = listManager;
    }

    processData(data) {
        this.dataManager.addList(data.name);
        this.listManager.render();
    }
}

class TodoItemCreationHandler extends FormHandler {
    constructor(formId, dataManager, listManager) {
        super(formId);
        this.dataManager = dataManager;
        this.listManager = listManager;
    }

    processData(data) {
        const todoItem = new TodoItem(
            data.title,
            data.description,
            data.dueDate,
            data.priority,
            data.notes
        )
        this.dataManager.addToList(data.listName, todoItem);
        this.listManager.render();
    }
}

const dataManager = new DataManager();
const listManager = new ListManager(dataManager, "#lists-container");
const listFormHandler = new ListCreationHandler("#todo-list-form", dataManager, listManager);
const TodoFormHandler = new TodoItemCreationHandler("#todo-form", dataManager, listManager);