import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import React, { useContext, useEffect, useMemo } from 'react';
import { Dimensions, StyleSheet, View, Animated } from 'react-native';
import TopBar from '../components/TopBar';
import { keys } from '../config/vars';
import { fetchHtml } from '../utils/fetchIssat';
import { getUpdateDate } from '../utils/getUpdateDate';
import { loadStateFromStorage } from '../utils/ManageAsyncStorage';
import { SubjectsContext } from '../context/Subjects/SubjectsContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamList } from '../types';
import ScheduleAlt from './ScheduleAlt';
import TabHeader from '../components/AppTabBar/TabHeader';
import AppText from '../components/AppText';

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

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface props {
	navigation: StackNavigationProp<ParamList, 'Main'>;
}
const Tabs: React.FC<props> = ({ navigation }) => {
	const subjectState = useContext(SubjectsContext);
	const scrollX = React.useRef(new Animated.Value(0)).current;

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

	useEffect(() => {
		console.log({ scrollX });
	}, []);

	return (
		<>
			<TopBar onConfigPress={() => navigation.navigate('Settings')} />
			<View style={styles.container}>
				<TabHeader labels={dayTabs} scrollX={scrollX} />
				<Animated.FlatList
					keyExtractor={(_, i) => i + ''}
					horizontal
					decelerationRate={0.9}
					snapToAlignment='center'
					snapToInterval={Dimensions.get('window').width}
					data={dayTabs}
					renderItem={day => <ScheduleAlt dayIndex={day.index} />}
					onScroll={Animated.event(
						[{ nativeEvent: { contentOffset: { x: scrollX } } }],
						{
							useNativeDriver: false,
						},
					)}
					// scrollEventThrottle={16}
				/>
				{/* <NavigationContainer independent theme={MyTheme}>
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
				</NavigationContainer>*/}
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
