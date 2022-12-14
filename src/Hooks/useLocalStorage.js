import { useState, useEffect, useCallback } from 'react';
export const useLocalStorage = (key, defaultValue) => {
	const [value, setValue] = useState(() => {
		const jsonValue = localStorage.getItem(key);
		if (jsonValue != null) return JSON.parse(jsonValue);
		return defaultValue;
	});
	useEffect(() => {
		if (value === undefined) return localStorage.removeItem(key);
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	const remove = useCallback(() => {
		setValue(undefined);
	}, []);

	return [value, setValue, remove];
};
