import { useEffect, useState } from 'react';
import { keys } from '../../config/vars';
import { saveStateToStorage } from '../../utils/ManageAsyncStorage';

export type THEME_VALUES = 'light' | 'dark' | 'auto';
export const useThemeState = () => {
	const [theme, setTheme] = useState<THEME_VALUES>('light');

	useEffect(() => {
		saveStateToStorage(theme, keys.THEME);
	}, [theme]);

	return {
		theme,
		setTheme,
	};
};
