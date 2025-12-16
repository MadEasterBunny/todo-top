export default class FormHandler {
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