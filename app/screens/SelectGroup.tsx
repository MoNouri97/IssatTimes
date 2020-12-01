import { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useContext, useState } from 'react';
import {
	ScrollView,
	StyleSheet,
	TextInput,
	TouchableHighlight,
	View,
} from 'react-native';
import AppText from '../components/AppText';
import AppScreen from '../components/AppScreen';
import color from '../config/color';
import { GroupContext } from '../context/Group/GroupContext';
import { groupInfo, ParamList } from '../types';
import { groupList } from '../utils/groupList';
import Loading from '../components/Loading';

type Props = StackScreenProps<ParamList, 'Choose Group'>;

const SelectGroup: React.FC<Props> = ({ navigation: { push } }) => {
	const [search, setSearch] = useState('');
	const { setGroup } = useContext(GroupContext);
	const [loading, setLoading] = useState(false);
	const handleSelectGroup = (selection: groupInfo) => {
		setSearch(selection.name);
		setGroup!(selection);
		setLoading(true);
		// push('Main');
	};
	const onDataLoaded = useCallback(() => {
		console.log('navigate');
		push('Main');
	}, [push]);

	return (
		<AppScreen style={styles.bg}>
			<View style={styles.container}>
				<Loading onLoaded={onDataLoaded} />

				<TextInput
					style={styles.input}
					placeholder='choose a group ...'
					value={search}
					onChange={e => {
						setSearch(e.nativeEvent.text);
					}}
				/>

				<ScrollView style={styles.list}>
					{groupList
						.filter(grp =>
							grp.name.toLowerCase().includes(search.toLowerCase()),
						)
						.slice(0, 3)
						.map(grp => {
							return (
								<TouchableHighlight
									key={grp.id}
									onPress={() => {
										handleSelectGroup(grp);
									}}
								>
									<AppText style={styles.listItem}> {grp.name}</AppText>
								</TouchableHighlight>
							);
						})}
				</ScrollView>
			</View>
		</AppScreen>
	);
};
const styles = StyleSheet.create({
	bg: {
		backgroundColor: color.white,
	},
	container: {
		width: '80%',
		paddingTop: 50,
	},
	input: {
		fontSize: 20,
		backgroundColor: color.light,
		padding: 20,
		borderRadius: 5,
	},
	list: {
		backgroundColor: color.light,
		marginTop: 10,
		borderRadius: 5,
		maxHeight: '80%',
		// marginBottom: 100,
	},
	listItem: {
		fontSize: 20,
		padding: 20,
		color: color.medium,
	},
});
export default SelectGroup;
