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

export default function App() {
	console.log('app started ......');
	const [isReady, setIsReady] = useState(false);

	const subjectsValue = useSubjectsState();
	const groupValue = useGroupState();

	const loadAppState = async () => {
		const [subjectsData, groupData] = await Promise.all([
			loadStateFromStorage<Subject[][]>('subjects'),
			loadStateFromStorage<groupInfo>('group'),
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
	// return <sTestScreen />;
	return (
		<GroupContext.Provider value={groupValue}>
			<StatusBar backgroundColor='#fff' barStyle='dark-content' />
			<SubjectsContext.Provider value={subjectsValue}>
				{!groupValue.group.id ? (
					<SelectGroup />
				) : (
					<AppScreen>
						<View style={styles.container}>
							<NavigationContainer>
								<Tabs />
							</NavigationContainer>
							{subjectsValue.state.loading && (
								<Loading onLoaded={() => console.log('loaded')} />
							)}
						</View>
					</AppScreen>
				)}
			</SubjectsContext.Provider>
		</GroupContext.Provider>
	);
}
const styles = StyleSheet.create({
	container: {
		width: '100%',
		flex: 1,
		backgroundColor: '#fff',
	},
});
