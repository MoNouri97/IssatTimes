import { NavigationContainer } from '@react-navigation/native';
import {
	createStackNavigator,
	TransitionPresets,
} from '@react-navigation/stack';
import React, { useContext, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { theme } from '../config/color';
import { ThemeContext } from '../context/Theme/ThemeContext';
import MainScreen from '../screens/MainScreen';
import SelectGroup from '../screens/SelectGroup';
import settingsScreen from '../screens/settingsScreen';

const Stack = createStackNavigator();
const MainNavContainer: React.FC = () => {
	const themeCon = useContext(ThemeContext);
	const MyTheme = useMemo(() => {
		const color = themeCon.theme == 'dark' ? theme.darkTheme : theme.lightTheme;
		return {
			dark: themeCon.theme == 'dark',
			colors: {
				primary: color.primary,
				background: color.bg,
				card: color.bg,
				text: color.fg,
				border: color.bg,
				notification: color.primary,
			},
		};
	}, [themeCon]);

	return (
		<NavigationContainer theme={MyTheme}>
			<Stack.Navigator
				headerMode='screen'
				screenOptions={{
					...TransitionPresets.SlideFromRightIOS,
					gestureEnabled: true,
					gestureResponseDistance: { horizontal: 999 },
					cardOverlayEnabled: true,
				}}
			>
				<Stack.Screen
					name='Main'
					component={MainScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen name='Settings' component={settingsScreen} />
				<Stack.Screen
					name='SelectGroup'
					component={SelectGroup}
					options={{ title: 'Change Group' }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};
const styles = StyleSheet.create({});
export default MainNavContainer;
