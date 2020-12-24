import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
	route: any;
	index: any;
	label: string;
}

const TabHeader: React.FC<Props> = ({ route, index, label }) => {
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

	return (
		<View
			// android_ripple={{ borderless: true }}
			key={index}
			// onPress={onPress}
			style={{ flex: 1 }}
		>
			<Animated.Text
				style={{
					opacity,
					backgroundColor: color.bg,
					color: color.fg,
					fontWeight: '100',
					borderRadius: 10,
					margin: 5,
					padding: 5,
					paddingVertical: 10,
					textAlign: 'center',
					// transform: [{ scale }],
				}}
			>
				{label}
			</Animated.Text>
		</View>
	);
};
const styles = StyleSheet.create({});
export default TabHeader;
