import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Screen from './app/components/Screen';
import TopBar from './app/components/TopBar';

import Tabs from './app/screens/Tabs';
import { SubjectsContext } from './app/context/SubjectsContext';
import { useSubjectsState } from './app/context/useSubjectsState';
import TestScreen from './app/screens/TestScreen';
import WebScrap from './app/components/WebScrap';

export default function App() {
	const value = useSubjectsState();

	// return <TestScreen />;
	return (
		<SubjectsContext.Provider value={value}>
			<Screen>
				<TopBar />
				<View style={styles.container}>
					<NavigationContainer>
						<Tabs />
					</NavigationContainer>
				</View>
				<WebScrap onDataLoad={value.setSubjects!} />
			</Screen>
		</SubjectsContext.Provider>
	);
}
const styles = StyleSheet.create({
	container: {
		width: '100%',
		flex: 1,
		backgroundColor: '#fff',
	},
});
