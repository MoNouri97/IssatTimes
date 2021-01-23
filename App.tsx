import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import {
	useFonts,
	Lato_400Regular,
	Lato_300Light,
	Lato_900Black,
} from '@expo-google-fonts/lato';

import Tabs from './app/screens/Tabs';
import { SubjectsContext } from './app/context/Subjects/SubjectsContext';
import { useSubjectsState } from './app/context/Subjects/useSubjectsState';
import AppScreen from './app/components/AppScreen';
import Loading from './app/components/Loading';
import { useGroupState } from './app/context/Group/useGroupState';
import { GroupProvider } from './app/context/Group/GroupContext';
import { TodosProvider } from './app/context/Todos/TodosContext';
import SelectGroup from './app/screens/SelectGroup';
import { AppLoading } from 'expo';
import { groupInfo, Subject } from './app/types';
import { loadStateFromStorage } from './app/utils/ManageAsyncStorage';
import { keys, MyTheme } from './app/config/vars';
import color from './app/config/color';
import {
	createStackNavigator,
	TransitionPresets,
} from '@react-navigation/stack';
import settingsScreen from './app/screens/settingsScreen';
import MainScreen from './app/screens/MainScreen';

const Stack = createStackNavigator();

export default function App() {
	const [isReady, setIsReady] = useState(false);

	const subjectsValue = useSubjectsState();
	const groupValue = useGroupState();

	let [fontsLoaded] = useFonts({
		Lato_300Light,
		Lato_400Regular,
		Lato_900Black,
	});
	const loadAppState = async () => {
		const [subjectsData] = await Promise.all([
			loadStateFromStorage<Subject[][]>(keys.SUBJECTS),
		]);
		// console.log({ subjectsData, groupData });

		if (subjectsData) {
			subjectsValue.dispatch({ type: 'UPDATE', payload: subjectsData });
		}
	};

	if (!isReady || !fontsLoaded) {
		return (
			<AppLoading startAsync={loadAppState} onFinish={() => setIsReady(true)} />
		);
	}

	// return <TestScreen />;
	return (
		<AppScreen style={styles.container}>
			<StatusBar backgroundColor={color.bg} barStyle='light-content' />
			<GroupProvider>
				<SubjectsContext.Provider value={subjectsValue}>
					<TodosProvider>
						{!groupValue.group.id ? (
							<SelectGroup />
						) : (
							<View style={styles.container}>
								{subjectsValue.state.loading ? (
									<Loading onLoaded={() => console.log('loaded')} />
								) : (
									<NavigationContainer theme={MyTheme}>
										<Stack.Navigator
											headerMode='screen'
											screenOptions={{ ...TransitionPresets.SlideFromRightIOS }}
										>
											<Stack.Screen
												name='Main'
												component={MainScreen}
												options={{ headerShown: false }}
											/>
											<Stack.Screen
												name='Settings'
												component={settingsScreen}
											/>
											<Stack.Screen
												name='SelectGroup'
												component={SelectGroup}
												options={{ title: 'Change Group' }}
											/>
										</Stack.Navigator>
									</NavigationContainer>
								)}
							</View>
						)}
					</TodosProvider>
				</SubjectsContext.Provider>
			</GroupProvider>
		</AppScreen>
	);
}
const styles = StyleSheet.create({
	container: {
		width: '100%',
		flexGrow: 1,
		backgroundColor: color.bg,
	},
});
