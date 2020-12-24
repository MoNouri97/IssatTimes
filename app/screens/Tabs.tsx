import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ScheduleScreen from './ScheduleScreen';

import React, { useContext, useEffect, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import TopBar from '../components/TopBar';
import { NavigationContainer } from '@react-navigation/native';
import { keys } from '../config/vars';
import { fetchHtml } from '../utils/fetchIssat';
import { getUpdateDate } from '../utils/getUpdateDate';
import { loadStateFromStorage } from '../utils/ManageAsyncStorage';
import { SubjectsContext } from '../context/Subjects/SubjectsContext';
import color from '../config/color';
import AppTabBar from '../components/AppTabBar';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamList } from '../types';

const checkForUpdate = async () => {
	const html = await fetchHtml(
		'http://www.issatso.rnu.tn/fo/emplois/emploi_groupe.php',
	);
	const lastUpdate = getUpdateDate(html);
	const lastSavedUpdate = await loadStateFromStorage<Date>(keys.LAST_UPDATE);
	if (!lastSavedUpdate || lastUpdate > lastSavedUpdate) {
		// show alert for update
		return true;
	}
	return false;
};
const MyTheme = {
	dark: true,
	colors: {
		primary: color.primary,
		background: color.bg,
		card: color.bg,
		text: color.fg,
		border: color.bg,
		notification: color.primary,
	},
};
const Tab = createMaterialTopTabNavigator();
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface props {
	navigation: StackNavigationProp<ParamList, 'Main'>;
}
const Tabs: React.FC<props> = ({ navigation }) => {
	const subjectState = useContext(SubjectsContext);

	useEffect(() => {
		if (subjectState.state.loading) {
			return;
		}
		checkForUpdate().then(shouldUpdate => {
			if (shouldUpdate) {
				alert('should update ...');
				console.log('should update ...');
			} else {
				console.log('should not update ...');
			}
		});
	}, [subjectState.state.loading]);

	const dayTabs = useMemo(() => {
		const d = new Date();
		const today = d.getDay() - 1;
		const todayDate = d.getDate();

		return days.map((day, i) => {
			const date = todayDate + (i + 1 - today);
			return `${day}\n${date}`;
		});
	}, []);

	return (
		<>
			<TopBar onConfigPress={() => navigation.navigate('Settings')} />
			<View style={styles.container}>
				<NavigationContainer independent theme={MyTheme}>
					<Tab.Navigator
						style={{ backgroundColor: color.bg }}
						// backBehavior='none'
						lazy
						lazyPreloadDistance={3}
						// tabBar={props => <AppTabBar {...props} />}
					>
						{dayTabs.map((day, i) => (
							<Tab.Screen
								key={day}
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
	},
});
export default Tabs;
