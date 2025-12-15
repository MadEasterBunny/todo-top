class TodoItem {
    constructor(title, description, dueDate, priority, notes) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority,
        this.notes = notes;
    }
}

class TodoList {
    constructor(formId, container) {
        this.items = [];
        this.formId = document.querySelector(formId);
        this.container = document.querySelector(container);
        this.formId.addEventListener("submit", this.handleSubmit.bind(this));
        this.render();
    }

    handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        this.addItem(data.title, data.description, data.dueDate, data.priority, data.notes);
        e.target.reset();
    }

    addItem(title, description, dueDate, priority, notes) {
        const todoItem = new TodoItem(title, description, dueDate, priority, notes);
        this.items.push(todoItem);
        this.render();
        console.log(this.items);
    }

    render() {
        this.container.replaceChildren();
        this.items.forEach(item => {
            const card = document.createElement("div");
            card.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <p>${item.dueDate}</p>
            <p>${item.priority}</p>
            <p>${item.notes}</p>`;
            this.container.appendChild(card);
        })
    }
}

const todoManager = new TodoList("#todo-form", "#container");