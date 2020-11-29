import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import color from '../config/color';
import { Subject } from '../types';
import AppText from './AppText';
import defaultStyles from '../config/defaultStyles';

const AppCard: React.FC<Subject> = ({
	name,
	teacher,
	type,
	location,
	regime,
}) => {
	return (
		<View style={styles.container}>
			<View
				style={[
					styles.tag,
					{ backgroundColor: type === 'C' ? color.primary : color.secondary },
				]}
			>
				<Feather name='user' size={20} color={color.white} />
				<AppText style={styles.tagText}>{teacher}</AppText>
			</View>
			<View style={styles.row}>
				<AppText style={styles.title}>{name}</AppText>
			</View>
			<AppText style={styles.type}>{type}</AppText>
			<View style={styles.subTitleContainer}>
				<View style={styles.subTitle}>
					<MaterialCommunityIcons
						name='clock-outline'
						color={color.medium}
						size={20}
					/>
					<AppText style={styles.mediumText}>{regime} </AppText>
				</View>
				<View style={styles.subTitle}>
					<MaterialCommunityIcons
						name='map-marker-outline'
						color={color.medium}
						size={20}
					/>
					<AppText style={styles.mediumText}>{location} </AppText>
				</View>
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		// height: 280,
		backgroundColor: color.white,
		// backgroundColor: color.light,
		width: '100%',
		borderRadius: 20,
		overflow: 'hidden',
		marginBottom: 10,
		paddingVertical: 10,
		paddingHorizontal: 30,
		alignItems: 'flex-start',
		// elevation: 1,
	},
	mediumText: {
		fontWeight: 'bold',
		color: color.medium,
		marginHorizontal: 10,
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
		color: color.white,
	},
	title: {
		fontSize: 20,
		textTransform: 'uppercase',
		color: color.black,
		fontWeight: 'bold',
	},
	type: {
		position: 'absolute',
		top: 0,
		right: 0,
		fontSize: 50,
		zIndex: -1,
		fontWeight: 'bold',
		color: color.light,
	},

	textContainer: {
		padding: 20,
	},
});
export default AppCard;
