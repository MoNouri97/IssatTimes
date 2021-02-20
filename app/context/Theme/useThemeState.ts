import { useCallback, useEffect, useState } from 'react';
import { Appearance, useColorScheme } from 'react-native';
import { keys } from '../../config/vars';
import {
	loadStateFromStorage,
	saveStateToStorage,
} from '../../utils/ManageAsyncStorage';

export type THEME_VALUES = 'light' | 'dark' | 'auto';
export const useThemeState = () => {
	const [theme, setTheme] = useState<THEME_VALUES>(() => {
		loadStateFromStorage<THEME_VALUES>(keys.THEME).then(val =>
			val ? setTheme(val) : null,
		);

		return 'dark';
	});
	const _handleAppearanceChange = useCallback(
		preferences => {
			if (theme !== 'auto') return;

			console.log({ preferences });

			const { colorScheme } = preferences;
			setTheme(colorScheme);
		},
		[setTheme],
	);
	useEffect(() => {
		saveStateToStorage(theme, keys.THEME);
	}, [theme]);

	useEffect(() => {
		Appearance.addChangeListener(_handleAppearanceChange);
		return () => {
			Appearance.removeChangeListener(_handleAppearanceChange);
		};
	}, []);

	return {
		theme,
		setTheme,
	};
};
