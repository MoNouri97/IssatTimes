import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ScheduleScreen from './ScheduleScreen';

import React from 'react';
import { StyleSheet, View } from 'react-native';
import TopBar from '../components/TopBar';
import AppScreen from '../components/AppScreen';
import TestScreen from './TestScreen';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const Tabs: React.FC = ({}) => {
	return (
		<AppScreen>
			<TopBar />
			<View style={styles.container}>
				<NavigationContainer independent>
					<Tab.Navigator backBehavior='none' lazy lazyPreloadDistance={1}>
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
		</AppScreen>
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
