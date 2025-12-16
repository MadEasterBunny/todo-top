import { DialogRenderer } from "./render";

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
    constructor(displayBtn, dialog, closeBtn) {
        this.displayBtn = document.querySelector(displayBtn);
        this.dialog = document.querySelector(dialog);
        this.closeBtn = document.querySelector(closeBtn);
        this.displayBtn?.addEventListener("click", () => this.open());
        this.closeBtn?.addEventListener("click", () => this.close());
    }

    open() {
        dialogRenderer.openDialog(this.dialog);
    }

    close() {
        dialogRenderer.closeDialog(this.dialog);
    }
}

const dialogRenderer = new DialogRenderer();