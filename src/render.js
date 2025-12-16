export class ListManager {
    constructor(dataManager, container) {
        this.dataManager = dataManager;
        this.container = document.querySelector(container);
        this.init();
        this.render();
    }

    init() {
        const listItems = this.dataManager.getLists();
        const exists = listItems.some(list => list.name === "All Tasks")
        if(!exists) {
            this.dataManager.addList("All Tasks");
        } else {
            return
        }
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
                <p class="dueDate">${task.dueDate}</p>
                <input type="checkbox" checked>
                <i></i>
                <div>
                <p class="description">${task.description}</p>
                <p class="priority">${task.priority}</p>
                <p class="notes">${task.notes}</p>
                </div>
                </li>`
            ).join("")}</ul>`
            }
            this.container.appendChild(list);
        })
    }
}

export class DialogRenderer {
    openDialog(dialog) {
        dialog.showModal();
    }

    closeDialog(dialog) {
        dialog.close();
    }
}


//Change the appearance of lists to each individual list when list is clicked
//Display a list of the tasks assigned to that list

//Display list details on click
//Display edit screen on click of edit button (need to add logic for editing tasks in other modules)