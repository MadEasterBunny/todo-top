export class PageLayoutHandler {
    constructor() {

    }

    handleClick(e) {
        //Change display of container to show individual list and tasks page
        //** Will need to create methods that display the main page and individual pages as well as a return button
    }

    render() {

    }
}

export class FormHandler {
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

export class DialogHandler {
    constructor(displayBtn, dialog, dialogRenderer, formId) {
        this.displayBtn = document.querySelector(displayBtn);
        this.dialog = document.querySelector(dialog);
        this.dialogRenderer = dialogRenderer;
        this.form = document.querySelector(formId);
        this.closeBtn = document.querySelectorAll(".close");
        this.displayBtn?.addEventListener("click", () => this.open());
        this.closeBtn?.forEach(btn => {
            btn.addEventListener("click", this.close.bind(this));
        })
    }

    open() {
        this.dialogRenderer.openDialog(this.dialog);
    }

    close() {
        this.form.reset();
        this.dialogRenderer.closeDialog(this.dialog);
    }
}

export class TaskHandler {
    constructor(dataManager, listManager) {
        this.dataManager = dataManager;
        this.listManager = listManager;
        
        document.addEventListener("click", (e) => {
            if(e.target.matches(".remove")) {
                this.remove(e);
            }
        })
    }

    remove(e) {
        const type = e.target.dataset.type;
        const listId = e.target.closest(".list-item").id;
        
        if(type === "list") {
            this.dataManager.removeList(listId);
        } else {
            const todoId = e.target.closest(".todo-item").id;
            this.dataManager.removeFromList(todoId);
        }
        this.listManager.render();
    }
}