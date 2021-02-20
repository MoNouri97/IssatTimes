import React from 'react';
import { THEME_VALUES, useThemeState } from './useThemeState';

export const ThemeContext = React.createContext<{
	theme: THEME_VALUES | undefined;
	setTheme: React.Dispatch<React.SetStateAction<THEME_VALUES>> | undefined;
}>({
	theme: undefined,
	setTheme: undefined,
});

export const ThemeProvider: React.FC = ({ children }) => {
	const themeValue = useThemeState();

	return (
		<ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>
	);
};
