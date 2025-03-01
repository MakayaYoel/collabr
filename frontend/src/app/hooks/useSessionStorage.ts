export function useSessionStorage() {
    if(!window || !window.sessionStorage) throw new Error("Could not load session storage.");

    const sessionStorage = window.sessionStorage;

    const getItem = (key: string) => sessionStorage.getItem(key);
    const setItem = (key: string, value: string) => sessionStorage.setItem(key, value);
    const removeItem = (key: string) => sessionStorage.removeItem(key);
    const clear = () => sessionStorage.clear();

    return { getItem, setItem, removeItem, clear };
}