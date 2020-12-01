import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import TopBar from './app/components/TopBar';

import Tabs from './app/screens/Tabs';
import TestScreen from './app/screens/TestScreen';
import WebScrap from './app/components/WebScrap';
import { SubjectsContext } from './app/context/Subjects/SubjectsContext';
import { useSubjectsState } from './app/context/Subjects/useSubjectsState';
import AppScreen from './app/components/AppScreen';
import AppText from './app/components/AppText';
import Loading from './app/components/Loading';
import { useGroupState } from './app/context/Group/useGroupState';
import { GroupContext } from './app/context/Group/GroupContext';

export default function App() {
	const value = useSubjectsState();
	const groupValue = useGroupState();

	// return <TestScreen />;
	return (
		<GroupContext.Provider value={groupValue}>
			<SubjectsContext.Provider value={value}>
				<AppScreen>
					<Loading onLoaded={() => console.log('loaded data')} />
					<View style={styles.container}>
						<NavigationContainer>
							<Tabs />
						</NavigationContainer>
					</View>
					{/* <WebScrap onDataLoad={value.setSubjects!} /> */}
				</AppScreen>
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
