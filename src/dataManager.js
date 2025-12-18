import { getStorage, populateStorage } from "./localStorage";

class TodoList {
    constructor(name) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.tasks = [];
    }
}

export default class DataManager {
    constructor() {
        const savedData = getStorage("dataStorage");
        this.dataStorage = savedData ? JSON.parse(savedData) : [];
    }

    saveToDisk() {
        populateStorage("dataStorage", this.dataStorage);
    }

    addList(name) {
        const newList = new TodoList(name);
        const listObj = this.dataStorage.find(item => item.name.toLowerCase() === name.toLowerCase());

        if(listObj) {
            console.error("List by that name already exists.");
            //need to add validation check for form
            return;
        } else {
            this.dataStorage.push(newList);
            this.saveToDisk();
        }
    }

    removeList(listId) {
        const idx = this.dataStorage.findIndex(item => item.id === listId);
        if(idx !== -1) {
            this.dataStorage.splice(idx, 1);
            this.saveToDisk();
            return true;
        }
        console.error(`List with id "${listId}" not found.`);
        return false;
    }

    addToList(listName, task) {
        const listObj = this.dataStorage.find(list => list.name.toLowerCase() === listName.toLowerCase());
        if(listObj) {
            listObj.tasks.push(task);
            this.saveToDisk();
            return true;
        } else {
            console.error(`List "${listName}" not found.`);
            return false;
        }
    }

    removeFromList(taskId) {
        for (const list of this.dataStorage) {
            const idx = list.tasks.findIndex(task => task.id === taskId);
            if (idx !== -1) {
            list.tasks.splice(idx, 1);
            this.saveToDisk();
            return true;
            }
        }
        console.error(`Task with id "${taskId}" not found.`);
        return false;
    }

    getLists() {
        return [...this.dataStorage];
    }
}