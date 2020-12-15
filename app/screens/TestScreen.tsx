import React from 'react';
import { Text, View } from 'react-native';

const TestScreen: React.FC = ({}) => {
	return (
		<View
			style={{
				backgroundColor: 'red',
				width: '100%',
				flexGrow: 1,
				// height: '100%',
			}}
		>
			<Text>...</Text>
		</View>
	);
};
export default TestScreen;
