import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ScheduleScreen from './ScheduleScreen';

import React, { useContext, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import TopBar from '../components/TopBar';
import { NavigationContainer } from '@react-navigation/native';
import AppTabBar from '../components/AppTabBar';
import { keys } from '../config/vars';
import { fetchHtml } from '../utils/fetchIssat';
import { getUpdateDate } from '../utils/getUpdateDate';
import { loadStateFromStorage } from '../utils/ManageAsyncStorage';
import { SubjectsContext } from '../context/Subjects/SubjectsContext';

const checkForUpdate = async () => {
	const html = await fetchHtml(
		'http://www.issatso.rnu.tn/fo/emplois/emploi_groupe.php',
	);
	const lastUpdate = getUpdateDate(html);
	const lastSavedUpdate = await loadStateFromStorage<Date>(keys.LAST_UPDATE);
	console.log({ lastUpdate, lastSavedUpdate });
	if (!lastSavedUpdate || lastUpdate > lastSavedUpdate) {
		// show alert for update
		return true;
	}
	return false;
};

const Tab = createMaterialTopTabNavigator();
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const Tabs: React.FC = ({}) => {
	const subjectState = useContext(SubjectsContext);

	useEffect(() => {
		if (subjectState.state.loading) {
			return;
		}
		checkForUpdate().then(shouldUpdate => {
			if (shouldUpdate) {
				console.log('should update ...');
			} else {
				alert('should not update ...');
				console.log('should not update ...');
			}
		});
	}, [subjectState.state.loading]);

	return (
		<>
			<TopBar />
			<View style={styles.container}>
				<NavigationContainer independent>
					<Tab.Navigator
						backBehavior='none'
						lazy
						lazyPreloadDistance={1}
						// tabBar={AppTabBar}
					>
						{days.map((day, i) => (
							<Tab.Screen
								key={i}
								name={day}
								component={ScheduleScreen}
								initialParams={{ index: i }}
							/>
						))}
					</Tab.Navigator>
				</NavigationContainer>
			</View>
		</>
	);
};
const styles = StyleSheet.create({
	container: {
		width: '100%',
		flex: 1,
		backgroundColor: '#fff',
	},
});
export default Tabs;
