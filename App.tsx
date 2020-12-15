import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';

import Tabs from './app/screens/Tabs';
import { SubjectsContext } from './app/context/Subjects/SubjectsContext';
import { useSubjectsState } from './app/context/Subjects/useSubjectsState';
import AppScreen from './app/components/AppScreen';
import Loading from './app/components/Loading';
import { useGroupState } from './app/context/Group/useGroupState';
import { GroupContext } from './app/context/Group/GroupContext';
import SelectGroup from './app/screens/SelectGroup';
import { AppLoading } from 'expo';
import { groupInfo, Subject } from './app/types';
import { loadStateFromStorage } from './app/utils/ManageAsyncStorage';
import { keys } from './app/config/vars';
import color from './app/config/color';
import TestScreen from './app/screens/TestScreen';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';

export default function App() {
	const [isReady, setIsReady] = useState(false);

	const subjectsValue = useSubjectsState();
	const groupValue = useGroupState();

	const loadAppState = async () => {
		const [subjectsData, groupData] = await Promise.all([
			loadStateFromStorage<Subject[][]>(keys.SUBJECTS),
			loadStateFromStorage<groupInfo>(keys.GROUP),
		]);
		// console.log({ subjectsData, groupData });

		if (subjectsData) {
			subjectsValue.dispatch({ type: 'UPDATE', payload: subjectsData });
		}

		if (groupData) {
			groupValue.setGroup(groupData);
		}
	};
	if (!isReady) {
		return (
			<AppLoading startAsync={loadAppState} onFinish={() => setIsReady(true)} />
		);
	}

	// return <TestScreen />;
	return (
		<AppScreen style={styles.container}>
			<GroupContext.Provider value={groupValue}>
				<StatusBar backgroundColor={color.bg} barStyle='light-content' />
				<SubjectsContext.Provider value={subjectsValue}>
					{!groupValue.group.id ? (
						<SelectGroup />
					) : (
						<View style={styles.container}>
							{subjectsValue.state.loading ? (
								<Loading onLoaded={() => console.log('loaded')} />
							) : (
								<NavigationContainer theme={DarkTheme}>
									<Tabs />
								</NavigationContainer>
							)}
						</View>
					)}
				</SubjectsContext.Provider>
			</GroupContext.Provider>
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
