import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import color from '../config/color';
import { Subject } from '../types';
import AppText from './AppText';
import defaultStyles from '../config/defaultStyles';
import { time } from 'faker';

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
const AppCard: React.FC<Subject> = ({
	name,
	teacher,
	type,
	location,
	regime,
	time,
}) => {
	return (
		<View style={styles.mainContent}>
			<View
				style={[
					styles.tag,
					{ backgroundColor: type === 'C' ? color.primary : color.secondary },
				]}
			>
				<Feather name='user' size={20} color={color.lighter} />
				<AppText style={styles.tagText}>{teacher}</AppText>
			</View>
			<View style={[styles.titleContainer]}>
				<AppText style={styles.title}>{name}</AppText>
				<View style={styles.time}>
					<AppText>{time}</AppText>
					<AppText style={styles.timeClock}>
						{`${timesArr[time]?.from}\n\n${timesArr[time]?.to}`}
					</AppText>
				</View>
			</View>
			<AppText style={styles.type}>{type}</AppText>
			<View style={styles.subTitleContainer}>
				<View style={styles.subTitle}>
					<MaterialCommunityIcons
						name='clock-outline'
						color={color.medium}
						size={20}
					/>
					<AppText style={styles.subtitleText}>{regime} </AppText>
				</View>
				<View style={styles.subTitle}>
					<MaterialCommunityIcons
						name='map-marker-outline'
						color={color.medium}
						size={20}
					/>
					<AppText style={styles.subtitleText}>{location} </AppText>
				</View>
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
	},
	mainContent: {
		// height: 280,
		backgroundColor: color.lighter,
		// backgroundColor: color.light,
		borderRadius: 20,
		flex: 1,
		overflow: 'hidden',
		marginBottom: 10,
		paddingVertical: 10,
		paddingLeft: 30,
		paddingRight: 10,
		alignItems: 'flex-start',
		// elevation: 1,
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
		fontWeight: '100',
		color: color.medium,
		marginHorizontal: 10,
		fontSize: 13,
	},
	subTitleContainer: {
		marginVertical: 20,
	},
	tag: {
		flexDirection: 'row',
		backgroundColor: color.primary,
		borderRadius: 20,
		paddingVertical: 10,
		paddingHorizontal: 20,
		maxWidth: '70%',
		marginBottom: 20,
		alignItems: 'center',
		...defaultStyles.shadow,
		opacity: 0.8,
	},
	tagText: {
		marginHorizontal: 10,
		color: color.medium,
		fontSize: 15,
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
		color: color.fg,
		fontWeight: 'bold',
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
		right: 0,
		fontSize: 50,
		zIndex: -1,
		fontWeight: 'bold',
		color: color.bg,
	},

	textContainer: {
		padding: 20,
	},
});
export default AppCard;
