import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ScheduleScreen from './ScheduleScreen';
import TestScreen from './TestScreen';

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Tab = createMaterialTopTabNavigator();
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const Tabs: React.FC = ({}) => {
	return (
		<Tab.Navigator>
			{days.map((day, i) => (
				<Tab.Screen
					key={i}
					name={day}
					component={ScheduleScreen}
					initialParams={{ index: i }}
				/>
			))}
			{/* <Tab.Screen
				name='1'
				options={{ title: 'Mon' }}
				component={ScheduleScreen}
				initialParams={{ index: 1 }}
			/>
			<Tab.Screen name='Tue' component={ScheduleScreen} />
			<Tab.Screen name='Wed' component={ScheduleScreen} />
			<Tab.Screen name='Thu' component={ScheduleScreen} />
			<Tab.Screen name='Fri' component={ScheduleScreen} />
			<Tab.Screen name='Sat' component={ScheduleScreen} /> */}
		</Tab.Navigator>
	);
};
const styles = StyleSheet.create({});
export default Tabs;
