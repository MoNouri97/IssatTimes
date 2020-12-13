import React from 'react';
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import { View, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import AppText from './AppText';
import color from '../config/color';
import { TouchableHighlight } from 'react-native-gesture-handler';

const AppTabBar: React.FC<MaterialTopTabBarProps> = ({
	state,
	descriptors,
	navigation,
	position,
}) => {
	return (
		<View style={{ flexDirection: 'row', backgroundColor: color.light }}>
			{state.routes.map((route, index) => {
				const { options } = descriptors[route.key];
				const label =
					options.tabBarLabel !== undefined
						? options.tabBarLabel
						: options.title !== undefined
						? options.title
						: route.name;

				const isFocused = state.index === index;

				const onPress = () => {
					const event = navigation.emit({
						type: 'tabPress',
						target: route.key,
						canPreventDefault: true,
					});

					if (!isFocused && !event.defaultPrevented) {
						navigation.navigate(route.name);
					}
				};

				const onLongPress = () => {
					navigation.emit({
						type: 'tabLongPress',
						target: route.key,
					});
				};

				const inputRange = state.routes.map((_, i) => i);
				const opacity = Animated.interpolate(position, {
					inputRange,
					outputRange: inputRange.map(i => (i === index ? 1 : 0.1)),
				});
				const scale = Animated.interpolate(position, {
					inputRange,
					outputRange: inputRange.map(i => (i === index ? 2 : 1)),
				});
				// const opacity = Animated.int

				return (
					<TouchableOpacity key={index} onPress={onPress} style={{ flex: 1 }}>
						<Animated.Text
							style={{
								opacity,
								backgroundColor: color.white,
								borderRadius: 10,
								margin: 5,
								padding: 5,
								textAlign: 'center',
								transform: [{ scale }],
							}}
						>
							{label}
						</Animated.Text>
					</TouchableOpacity>
				);
			})}
		</View>
	);
};
export default AppTabBar;
