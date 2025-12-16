export default class DataManager {
    constructor() {
        this.dataStorage = [];
    }

    addList(name) {
        const newList = { name: name, tasks: [] };
        this.dataStorage.push(newList);
        console.log(this.dataStorage);
    }

    addToList(listName, task) {
        const listObj = this.dataStorage.find(item => item.name.toLowerCase() === listName.toLowerCase());
        if(listObj) {
            listObj.tasks.push(task);
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