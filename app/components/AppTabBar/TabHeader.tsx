import React from 'react';
import {
	Animated,
	StyleSheet,
	View,
	Dimensions,
	Pressable,
} from 'react-native';
import color from '../../config/color';

const { width } = Dimensions.get('window');
interface Props {
	scrollX: Animated.Value;
	labels: string[];
	onClick: (index: number) => void;
}

const TabHeader: React.FC<Props> = ({ labels, scrollX, onClick }) => {
	// const isFocused = state.index === index;

	const onPress = (i: number) => {
		onClick(i);
	};

	return (
		<View
			style={{
				backgroundColor: color.bg,
				flexDirection: 'row',
				paddingBottom: 10,
				width: '100%',
				justifyContent: 'space-evenly',
			}}
		>
			{labels.map((dayLabel, index) => {
				const textLabel = dayLabel.split('\n');
				const inputRange = [
					(index - 1) * width,
					index * width,
					(index + 1) * width,
				];

				const scale = scrollX.interpolate({
					inputRange,
					outputRange: [0.8, 1, 0.8],
					extrapolate: 'clamp',
				});

				const bg = scrollX.interpolate({
					inputRange,
					outputRange: [color.bg, color.fg, color.bg],
					extrapolate: 'clamp',
				});
				const fg = scrollX.interpolate({
					inputRange,
					outputRange: [color.fg, color.bg, color.fg],

					extrapolate: 'clamp',
				});
				const animatedStyle = {
					backgroundColor: bg,
				};
				const animatedText = {
					color: fg,
				};

				return (
					<Animated.View
						key={index}
						style={[
							{
								borderRadius: 17,
								margin: 5,
								padding: 5,
								minWidth: '13%',
								transform: [{ scale }],
							},
							animatedStyle,
						]}
					>
						<Pressable
							android_ripple={{ borderless: true, color: color.lighter }}
							onPress={() => onPress(index)}
						>
							<Animated.Text
								style={[
									{
										color: color.fg,
										fontFamily: 'Lato_300Light',
										padding: 5,
										textAlign: 'center',
									},
									animatedText,
								]}
							>
								{textLabel[0]}
							</Animated.Text>
							<Animated.Text
								style={[
									{
										color: color.fg,
										fontFamily: 'Lato_900Black',
										fontSize: 20,
										margin: 0,
										textAlign: 'center',
									},
									animatedText,
								]}
							>
								{textLabel[1]}
							</Animated.Text>
						</Pressable>
					</Animated.View>
				);
			})}
		</View>
	);
};
export default TabHeader;
