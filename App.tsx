import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import Tabs from './app/screens/Tabs';
import { SubjectsContext } from './app/context/Subjects/SubjectsContext';
import { useSubjectsState } from './app/context/Subjects/useSubjectsState';
import AppScreen from './app/components/AppScreen';
import Loading from './app/components/Loading';
import { useGroupState } from './app/context/Group/useGroupState';
import { GroupContext } from './app/context/Group/GroupContext';
import SelectGroup from './app/screens/SelectGroup';

export default function App() {
	const subjectsValue = useSubjectsState();
	const groupValue = useGroupState();

	console.log(subjectsValue.state.loading);

	// return <sTestScreen />;
	return (
		<GroupContext.Provider value={groupValue}>
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
