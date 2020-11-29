import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import color from '../config/color';

interface Props {
	title: string;
	subTitle: string;
	image: string;
}

const ListItem: React.FC<Props> = ({ title, subTitle, image }) => {
	return (
		<View style={styles.container}>
			<Image
				style={styles.image}
				source={{
					uri: 'https://via.placeholder.com/200',
					width: 200,
					height: 200,
				}}
			/>
			<View>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.subTitle}>{subTitle}</Text>
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		padding: 15,
	},
	image: {
		width: 70,
		height: 70,
		borderRadius: 35,
		marginRight: 10,
	},
	title: {
		fontWeight: '500',
	},
	subTitle: {
		fontWeight: '100',
		color: color.medium,
	},
});
export default ListItem;
