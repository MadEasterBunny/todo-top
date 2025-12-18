import "./styles.css";
import DataManager from "./dataManager";
import { FormHandler, DialogHandler, TaskHandler } from "./formHandler";
import { ListManager, DialogRenderer } from "./render";

const events = {
    lists: {
        container: "#lists-container",
        dialog: "#list-dialog",
        showDialogBtn: "#show-lists-dialog",
        form: "#todo-list-form",
    },
    todos: {
        dialog: "#todos-dialog",
        showDialogBtn: "#show-todos-dialog",
        form: "#todo-form",
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
const listManager = new ListManager(dataManager, "aside", events.lists.container, "All Tasks");
const dialogRenderer = new DialogRenderer();

const listsDialogHandler = new DialogHandler(events.lists.showDialogBtn, events.lists.dialog, dialogRenderer, events.lists.form);
const todosDialogHandler = new DialogHandler(events.todos.showDialogBtn, events.todos.dialog, dialogRenderer, events.todos.form);
const taskHandler = new TaskHandler(dataManager, listManager);
const listFormHandler = new ListCreationHandler(events.lists.form, events.lists.dialog, events.todos.dialog, dataManager, listManager);
const TodoFormHandler = new TodoItemCreationHandler(events.todos.form, events.lists.dialog, events.todos.dialog, dataManager, listManager);