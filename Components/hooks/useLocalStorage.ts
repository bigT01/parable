import { useState, useEffect } from 'react'


export function useLocalStorage<T>(key: string, initialValue?: T | (() => T)) {
    const [value, setValue] = useState<T>(() => {
        if (typeof window !== 'undefined') {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        }
        return initialValue;
    });

    const setLocalStorageValue = (newValue: T) => {
        if (typeof window !== 'undefined') {
            window.localStorage.setItem(key, JSON.stringify(newValue));
        }
        setValue(newValue);
    };


    return [value, setLocalStorageValue] as const;
}
