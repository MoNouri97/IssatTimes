import AsyncStorage from '@react-native-async-storage/async-storage';
import { Subject } from '../types';

export const loadStateFromStorage = async <T>(key: string) => {
	const loaded = await AsyncStorage.getItem(key);
	console.log(`Loaded ${key}`);

	return loaded ? (JSON.parse(loaded) as T) : null;
};
export const saveStateToStorage = (toSave: any | null, key: string) => {
	AsyncStorage.setItem(key, JSON.stringify(toSave));
	console.log(`Saved ${key}`);
};
