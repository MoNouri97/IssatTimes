import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppScreen from '../components/AppScreen';

interface Props {}

const settingsScreen: React.FC<Props> = ({}) => {
	return (
		<AppScreen>
			<Text>Hello From settingsScreen</Text>
		</AppScreen>
	);
};
const styles = StyleSheet.create({});
export default settingsScreen;
