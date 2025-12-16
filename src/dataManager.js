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
        const newList = { name: name, tasks: [] };
        this.dataStorage.push(newList);
        this.saveToDisk();
        console.log(this.dataStorage);
    }

    addToList(listName, task) {
        const listObj = this.dataStorage.find(item => item.name.toLowerCase() === listName.toLowerCase());
        if(listObj) {
            listObj.tasks.push(task);
            this.saveToDisk();
            console.log(this.dataStorage);
            return true;
        } else {
            console.error(`List "${listName}" not found.`);
            return false;
        }
    }

    getLists() {
        return [...this.dataStorage];
    }
}