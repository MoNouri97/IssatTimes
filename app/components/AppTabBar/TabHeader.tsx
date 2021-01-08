import React from 'react';
import {
	Animated,
	StyleSheet,
	Text,
	View,
	Dimensions,
	Pressable,
} from 'react-native';
import color from '../../config/color';
import AppText from '../AppText';

const { width } = Dimensions.get('window');
interface Props {
	scrollX: Animated.Value;
	labels: string[];
}

const TabHeader: React.FC<Props> = ({ labels, scrollX }) => {
	// const isFocused = state.index === index;

	const onPress = (i: number) => {
		console.log('press' + i);
	};

	return (
		<View
			style={{
				flexDirection: 'row',
				marginVertical: 20,
				width: '100%',
				justifyContent: 'space-evenly',
			}}
		>
			{labels.map((lab, index) => {
				const inputRange = [
					(index - 1) * width,
					index * width,
					(index + 1) * width,
				];
				const inputRange2 = labels.map((_, i) => i * width);

				const scale = scrollX.interpolate({
					inputRange,
					outputRange: [0.8, 1.2, 0.8],
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
					color: fg,
				};

				return (
					<Pressable
						android_ripple={{ borderless: true }}
						key={index}
						onPress={() => onPress(index)}
						// style={{ flex: 1 }}
					>
						<Animated.Text
							style={[
								{
									backgroundColor: color.bg,
									color: color.fg,
									fontWeight: '100',
									borderRadius: 10,
									margin: 5,
									padding: 5,
									width: 40,
									textAlign: 'center',
									transform: [{ scale }],
								},
								animatedStyle,
							]}
						>
							{lab}
						</Animated.Text>
					</Pressable>
				);
			})}
		</View>
	);
};
const styles = StyleSheet.create({});
export default TabHeader;
