import "./styles.css";
import DataManager from "./dataManager";
import { FormHandler, DialogHandler } from "./formHandler";
import { ListManager, DialogRenderer } from "./render";

const events = {
    lists: {
        dialog: "#list-dialog",
        showDialogBtn: "#show-lists-dialog",
        closeDialogBtn: "#close-lists-dialog",
    },
    todos: {
        dialog: "#todos-dialog",
        showDialogBtn: "#show-todos-dialog",
        closeDialogBtn: "#close-todos-dialog",
    }
}

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
    constructor(formId, listDialog, todoDialog, dataManager, listManager) {
        super(formId);
        this.listDialog = document.querySelector(listDialog);
        this.todoDialog = document.querySelector(todoDialog);
        this.dataManager = dataManager;
        this.listManager = listManager;
    }

    processData(data) {
        this.dataManager.addList(data.name);
        this.listManager.render();
        dialogRenderer.closeDialog(this.listDialog);
        dialogRenderer.openDialog(this.todoDialog);
    }
}

class TodoItemCreationHandler extends FormHandler {
    constructor(formId, listDialog, todoDialog, dataManager, listManager) {
        super(formId);
        this.listDialog = document.querySelector(listDialog);
        this.todoDialog = document.querySelector(todoDialog);
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
        dialogRenderer.closeDialog(this.todoDialog);
        this.listManager.render();
    }
}

const dataManager = new DataManager();
const listManager = new ListManager(dataManager, "#lists-container");
const listsDialogHandler = new DialogHandler(events.lists.showDialogBtn, events.lists.dialog, events.lists.closeDialogBtn);
const todosDialogHandler = new DialogHandler(events.todos.showDialogBtn, events.todos.dialog, events.todos.closeDialogBtn);
const dialogRenderer = new DialogRenderer();
const listFormHandler = new ListCreationHandler("#todo-list-form", events.lists.dialog, events.todos.dialog, dataManager, listManager);
const TodoFormHandler = new TodoItemCreationHandler("#todo-form", events.lists.dialog, events.todos.dialog, dataManager, listManager);