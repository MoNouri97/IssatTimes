import React from 'react';
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import { View, TouchableOpacity, Pressable } from 'react-native';
import Animated from 'react-native-reanimated';
import AppText from './AppText';
import color from '../config/color';
import {
	TouchableHighlight,
	TouchableWithoutFeedback,
} from 'react-native-gesture-handler';

const AppTabBar: React.FC<MaterialTopTabBarProps> = ({
	state,
	descriptors,
	navigation,
	position,
}) => {
	return (
		<View style={{ flexDirection: 'row', backgroundColor: color.bg }}>
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
					outputRange: inputRange.map(i => (i === index ? 1 : 0.5)),
				});
				const scale = Animated.interpolate(position, {
					inputRange,
					outputRange: inputRange.map(i => (i === index ? 1.2 : 0.8)),
				});
				const backgroundColor = Animated.interpolate(position, {
					inputRange,
					outputRange: inputRange.map(i => (i === index ? color.fg : color.bg)),
				});

				// const opacity = Animated.int

				return (
					<Pressable
						android_ripple={{ borderless: true }}
						key={index}
						onPress={onPress}
						style={{ flex: 1 }}
					>
						<Animated.Text
							style={{
								opacity,
								// backgroundColor,
								color: color.fg,
								fontWeight: '100',
								borderRadius: 10,
								margin: 5,
								padding: 5,
								textAlign: 'center',
								transform: [{ scale }],
							}}
						>
							{label}
						</Animated.Text>
					</Pressable>
				);
			})}
		</View>
	);
};
export default AppTabBar;
