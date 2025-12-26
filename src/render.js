export class ListManager {
    constructor(dataManager, sideBar, container, allTasks) {
        this.dataManager = dataManager;
        this.sideBar = document.querySelector(sideBar);
        this.container = document.querySelector(container);
        this.allTasks = allTasks;
        this.init();
        this.render();
    }

    init() {
        const listItems = this.dataManager.getLists();
        const exists = listItems.some(list => list.name === "All Tasks")
        if(!exists) {
            this.dataManager.addList(this.allTasks);
        } else {
            return
        }
    }

    //render each of the following
    //sidebar with lists and todos(name only)
    //all lists
    //individual lists (includes all todos)

    renderSideBar() {
        const lists = this.dataManager.getLists();
        this.sideBar.replaceChildren();
        lists.forEach(item => {
            const list = document.createElement("div");
            list.classList.add("list-item");
            list.id = item.id;
            list.innerHTML = `
            <h2>${item.name}</h2>`
            
            if(item.tasks.length > 0) {
                list.innerHTML += `<div class="taskListContainer">${item.tasks.map(task => 
                `<div id="${task.id}" class="todo-item">
                <h3 class="title">${task.title}</h3>
                </div>`
            ).join("")}</div>`
            } else {
                list.innerHTML += `No tasks`
            }
            this.sideBar.appendChild(list);
        });
    }

    renderLists() {
        const lists = this.dataManager.getLists();
        this.container.replaceChildren();
        lists.forEach(item => {
            const list = document.createElement("div");
            list.classList.add("list-item");
            list.id = item.id;
            list.innerHTML = `
            <h2>${item.name}</h2>
            <span>${item.tasks.length}</span>`;
            this.container.appendChild(list);
        });
        //Create layout for when a list is clicked
        //List name
        //Todos
        //*The entire container will display the contents, so be sure to update code to fit this specification
    }

    renderListsAndTodos(id) {
        const lists = this.dataManager.getLists();
        this.container.replaceChildren();
        const returnBtn = document.createElement("button");
        returnBtn.classList.add("return");
        returnBtn.textContent = "Return";
        this.container.appendChild(returnBtn);
        lists.forEach(list => {
            if(list.id === id) {
                const listItem = document.createElement("div");
                listItem.classList.add("list-item");
                listItem.id = list.id;
                listItem.innerHTML = `
                <h2>${list.name}</h2>
                <span>${list.tasks.length}</span>`
                if(list.name !== this.allTasks) {
                    listItem.innerHTML += `<button class="remove" data-type="list">Remove</button>`
                }
                
                if(list.tasks.length > 0) {
                    listItem.innerHTML += `<h3>Tasks</h3>
                    <div class="taskListContainer">${list.tasks.map(task => 
                    `<div id="${task.id}" class="todo-item">
                    <div>
                    <h3 class="title">${task.title}</h3>
                    <p class="dueDate">${task.dueDate}</p>
                    <input type="checkbox" checked>
                    <i></i>
                    <div>
                    <p class="description">${task.description}</p>
                    <p class="priority">${task.priority}</p>
                    <p class="notes">${task.notes}</p>
                    </div>
                    </div>
                    <button class="remove" data-type="todo">Remove</button>
                    </div>`
                ).join("")}</div>`
                }
                this.container.appendChild(listItem);
            }
        });
    }

    render() {
        this.renderSideBar();
        this.renderLists();
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