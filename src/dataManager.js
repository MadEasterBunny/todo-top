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
        if(!name) {
            console.error("Cannot add a list without a name.");
            return;
        }

        const listObj = this.dataStorage.find(item => item.name.toLowerCase() === name.toLowerCase());

        if(listObj) {
            console.error("List by that name already exists.");
            //need to add validation check for form
            return;
        }

        this.dataStorage = [...this.dataStorage, new TodoList(name)];
        this.saveToDisk();
    }

    removeList(listId) {
        const updatedStorage = this.dataStorage.filter(item => item.id !== listId);
        if(updatedStorage.length === this.dataStorage.length) {
            console.error(`List with id "${listId}" not found.`);
            return false;
        }
        this.dataStorage = updatedStorage;
        this.saveToDisk();
        return true;
    }

    addToList(listName, task) {
        let found = false;
        this.dataStorage = this.dataStorage.map(list => {
            if(list.name.toLowerCase() === listName.toLowerCase()) {
                found = true;
                return { ...list, tasks: [...(list.tasks || []), task] };
            }
            return list;
        });

        if(found) {
            this.saveToDisk();
            return found;
        }
    }

    removeFromList(taskId) {
        let found = false;
        this.dataStorage = this.dataStorage.map(list => {
            const taskExists = list.tasks.some(tasks => tasks.id === taskId);

            if(taskExists) {
                found = true;
                return { ...list, tasks: list.tasks.filter(task => task.id !== taskId) };
            }
            return list;
        });

        if(found) {
            this.saveToDisk();
            return found;
        }
    }

    getLists() {
        return [...this.dataStorage];
    }
}