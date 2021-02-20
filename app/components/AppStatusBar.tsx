import React, { useContext, useMemo } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { theme } from '../config/color';
import { ThemeContext } from '../context/Theme/ThemeContext';

const AppStatusBar: React.FC = () => {
	const themeCon = useContext(ThemeContext);
	const prop = useMemo(
		() =>
			themeCon.theme == 'dark'
				? ({
						backgroundColor: theme.darkTheme.bg,
						barStyle: 'light-content',
				  } as const)
				: ({
						backgroundColor: theme.lightTheme.bg,
						barStyle: 'dark-content',
				  } as const),
		[themeCon],
	);
	return <StatusBar {...prop} />;
};
const styles = StyleSheet.create({});
export default AppStatusBar;
