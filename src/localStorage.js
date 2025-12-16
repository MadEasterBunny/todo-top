export const populateStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

export const getStorage = key => {
    const data = localStorage.getItem(key);
    return data;
}