import React, { useEffect, useState } from 'react';
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import {
	View,
	TouchableOpacity,
	Pressable,
	Animated as AnimatedRn,
} from 'react-native';
import Animated, { interpolateColors } from 'react-native-reanimated';
import AppText from './AppText';
import color from '../config/color';
import {
	TouchableHighlight,
	TouchableWithoutFeedback,
} from 'react-native-gesture-handler';

const AppTabBarAnimated: React.FC<MaterialTopTabBarProps> = ({
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

				const inputRange = state.routes.map((_, i) => i);
				const opacity = Animated.interpolate(position, {
					inputRange,
					outputRange: inputRange.map(i => (i === index ? 1 : 0.5)),
				});
				const scale = Animated.interpolate(position, {
					inputRange,
					outputRange: inputRange.map(i => (i === index ? 1.2 : 0.8)),
				});
				const color = Animated.interpolateColors(position, {
					inputRange,
					outputColorRange: inputRange.map(i =>
						i === index ? 'black' : 'white',
					),
				});

				const interpolateBackgroundColor = {
					borderRadius: 10,
					paddingVertical: 10,
					backgroundColor: interpolateColors(position, {
						inputRange,
						outputColorRange: inputRange.map(i =>
							i === index ? 'white' : 'transparent',
						),
					}),
				};

				return (
					<Pressable
						android_ripple={{ borderless: true }}
						key={index}
						onPress={onPress}
						style={{ flex: 1 }}
					>
						<Animated.View style={[interpolateBackgroundColor as any]}>
							<Animated.Text
								style={{
									opacity,
									// color,
									fontWeight: '100',
									borderRadius: 10,
									margin: 5,
									padding: 5,
									paddingVertical: 10,
									textAlign: 'center',
									transform: [{ scale }],
								}}
							>
								{label}
							</Animated.Text>
						</Animated.View>
					</Pressable>
				);
			})}
		</View>
	);
};
export default AppTabBarAnimated;
