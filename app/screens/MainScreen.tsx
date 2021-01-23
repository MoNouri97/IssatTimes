import React from 'react';
import {
	createStackNavigator,
	StackNavigationProp,
	TransitionPresets,
} from '@react-navigation/stack';
import { ParamList } from '../types';
import Tabs from './Tabs';
import TasksModal from '../components/TasksModal';

interface props {
	navigation: StackNavigationProp<ParamList, 'Main'>;
}

// creating modal stack
const Stack = createStackNavigator();

const MainScreen: React.FC<props> = ({}) => {
	return (
		<Stack.Navigator
			headerMode='none'
			mode='modal'
			screenOptions={{
				gestureEnabled: true,
				cardOverlayEnabled: true,
				gestureResponseDistance: { vertical: 999 },
				...TransitionPresets.ModalPresentationIOS,
			}}
		>
			<Stack.Screen name={'Tabs'} component={Tabs} />
			<Stack.Screen name={'Modal'} component={TasksModal} />
		</Stack.Navigator>
	);
};

export default MainScreen;
