import { getStorage, populateStorage } from "./localStorage";

export default class DataManager {
    constructor() {
        const savedData = getStorage("dataStorage");
        this.dataStorage = savedData ? JSON.parse(savedData) : [];
    }

    saveToDisk() {
        populateStorage("dataStorage", this.dataStorage);
    }

    addList(name) {
        const newList = { id: crypto.randomUUID(), name: name, tasks: [] };
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

    //Need to add list removal button and eventlistener and check to see if this works
    removeList(listId) {
        for (lists of this.dataStorage) {
            const idx = lists.findIndex(list => list.id === listId);
            if(inx !== -1) {
                lists.splice(idx, 1);
                this.saveToDisk();
                return true;
            }
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