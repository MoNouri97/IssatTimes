import React, {
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
} from 'react';
import {
	Animated,
	Appearance,
	Pressable,
	StyleSheet,
	useColorScheme,
	View,
} from 'react-native';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { theme } from '../config/color';
import { Subject } from '../types';
import AppText from './AppText';
import defaultStyles from '../config/defaultStyles';
import { ThemeContext } from '../context/Theme/ThemeContext';

const timesArr = {
	S1: {
		from: '08.30',
		to: '10.00',
	},
	S2: {
		from: '10.10',
		to: '11.40',
	},
	S3: {
		from: '11.50',
		to: '13.20',
	},
	S4: {
		from: '13.50',
		to: '15.20',
	},
	S5: {
		from: '15.30',
		to: '17.00',
	},
	S6: {
		from: '17.10',
		to: '18.40',
	},
	"S4'": {
		from: '13.30',
		to: '15.00',
	},
};

// let color = theme.darkTheme;
type Props = Subject & { onPress: (s: string) => void; bubble?: boolean };
const AppCard: React.FC<Props> = ({
	name,
	teacher,
	type,
	location,
	regime,
	time,
	onPress,
	bubble = false,
}) => {
	const scale = useRef(new Animated.Value(1)).current;
	const handlePress = useCallback(() => {
		Animated.timing(scale, {
			toValue: 0.9,
			useNativeDriver: true,
			duration: 50,
		}).start(() => {
			Animated.timing(scale, {
				toValue: 1,
				useNativeDriver: true,
				duration: 50,
				// }).start();
			}).start(() => onPress(time));
		});
	}, [onPress]);

	const themeCon = useContext(ThemeContext);
	const color = useMemo(
		() => (themeCon.theme == 'dark' ? theme.darkTheme : theme.lightTheme),
		[themeCon],
	);

	return (
		<Pressable collapsable onPress={handlePress}>
			<Animated.View
				style={[
					{ backgroundColor: color.lighter },
					styles.mainContent,
					{ transform: [{ scale }] },
				]}
			>
				<View
					style={[
						styles.tag,
						{ backgroundColor: type === 'C' ? color.primary : color.secondary },
					]}
				>
					<Feather name='user' size={20} color={color.lighter} />
					<AppText style={[styles.tagText, { color: theme.lightTheme.bg }]}>
						{teacher}
					</AppText>
				</View>
				<View style={[styles.titleContainer]}>
					<AppText
						style={[
							{
								color: color.fg,
							},
							styles.title,
						]}
						numberOfLines={3}
					>
						{name}
					</AppText>
					<View style={styles.time}>
						<AppText>{time}</AppText>
						<AppText style={styles.timeClock}>
							{`${timesArr[time]?.from}\n|\n${timesArr[time]?.to}`}
						</AppText>
					</View>
				</View>
				<AppText style={[{ color: color.bg }, styles.type]}>{type}</AppText>
				{bubble && (
					<View
						style={{
							position: 'absolute',
							width: 10,
							height: 10,
							top: 10,
							right: 10,
							borderRadius: 10,
							backgroundColor: 'tomato',
							...defaultStyles.shadow,
						}}
					></View>
				)}
				<View style={styles.subTitleContainer}>
					<View style={styles.subTitle}>
						<MaterialCommunityIcons
							name='clock-outline'
							color={color.medium}
							size={20}
						/>
						<AppText style={[{ color: color.medium }, styles.subtitleText]}>
							{regime}{' '}
						</AppText>
					</View>
					<View style={styles.subTitle}>
						<MaterialCommunityIcons
							name='map-marker-outline'
							color={color.medium}
							size={20}
						/>
						<AppText style={[{ color: color.medium }, styles.subtitleText]}>
							{location}{' '}
						</AppText>
					</View>
				</View>
			</Animated.View>
		</Pressable>
	);
};
const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
	},
	mainContent: {
		borderRadius: 27,
		flex: 1,
		overflow: 'hidden',
		marginBottom: 10,
		paddingVertical: 10,
		paddingLeft: 30,
		paddingRight: 10,
		alignItems: 'flex-start',
		// elevation: 5,
	},

	row: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	subTitle: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	subtitleText: {
		fontFamily: 'Lato_300Light',
		marginHorizontal: 10,
		fontSize: 13,
	},
	subTitleContainer: {
		marginVertical: 20,
	},
	tag: {
		flexDirection: 'row',
		borderRadius: 20,
		paddingVertical: 10,
		paddingHorizontal: 20,
		maxWidth: '70%',
		marginBottom: 20,
		alignItems: 'center',
		...defaultStyles.shadow,
	},
	tagText: {
		marginHorizontal: 10,
		fontSize: 15,
		fontFamily: 'Lato_300Light',
	},
	time: {
		flexDirection: 'row',
		width: 100,
		marginBottom: 5,
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	timeClock: {
		fontSize: 12,
		flex: 1,
	},
	title: {
		fontSize: 15,
		textTransform: 'uppercase',
		fontFamily: 'Lato_900Black',
		flexShrink: 1,
		maxWidth: '50%',
	},
	titleContainer: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	type: {
		position: 'absolute',
		bottom: 0,
		right: 10,
		fontSize: 50,
		fontFamily: 'Lato_900Black',
	},

	textContainer: {
		padding: 20,
	},
});
export default React.memo(AppCard);
