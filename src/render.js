export default class ListManager {
    constructor(dataManager, container) {
        this.dataManager = dataManager;
        this.container = document.querySelector(container);
        this.init();
        this.render();
    }

    init() {
        this.dataManager.addList("Default");
    }

    render() {
        const lists = this.dataManager.getLists();
        this.container.replaceChildren();
        lists.forEach(item => {
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

//Create class for rendering forms (Create List && Add Task)

//Change the appearance of lists to each individual list when list is clicked
//Display a list of the tasks assigned to that list

//Display list details on click
//Display edit screen on click of edit button (need to add logic for editing tasks in other modules)