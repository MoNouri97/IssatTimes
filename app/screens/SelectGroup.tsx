import React, { useContext, useState } from 'react';
import {
	Pressable,
	ScrollView,
	StyleSheet,
	TextInput,
	View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import AppText from '../components/AppText';
import AppScreen from '../components/AppScreen';
import color from '../config/color';
import { GroupContext } from '../context/Group/GroupContext';
import { groupList } from '../utils/groupList';
import defaultStyles from '../config/defaultStyles';
import { SubjectsContext } from '../context/Subjects/SubjectsContext';
import { keys } from '../config/vars';
import { groupInfo } from '../types';
import { loadStateFromStorage } from '../utils/ManageAsyncStorage';
import { useBackHandler } from '@react-native-community/hooks';

const SelectGroup: React.FC = () => {
	const [search, setSearch] = useState('');
	const [subGroup, setSubGroup] = useState<1 | 2>(1);
	const { setGroup } = useContext(GroupContext);
	const { dispatch } = useContext(SubjectsContext);
	const handleSelectGroup = (selection: { name: string; id: string }) => {
		setSearch(selection.name);
		setGroup!({ ...selection, subGroup });
		dispatch!({ type: 'START_LOADING' });
	};
	const toggleSubGroup = () => {
		setSubGroup(subGroup == 1 ? 2 : 1);
	};

	return (
		<AppScreen style={styles.bg}>
			<View style={styles.container}>
				<AppText style={defaultStyles.title}>Select Your Group</AppText>

				<View style={styles.row}>
					<View style={styles.inputContainer}>
						<TextInput
							style={styles.input}
							placeholder='type to search'
							placeholderTextColor={color.medium}
							value={search}
							onChange={e => {
								setSearch(e.nativeEvent.text);
							}}
						/>
						<Feather
							style={styles.inputIcon}
							name='search'
							size={15}
							color={color.fg}
						/>
					</View>
					<Pressable
						android_ripple={{ borderless: true, color: color.bg }}
						onPress={toggleSubGroup}
						style={[styles.subBtn]}
					>
						<AppText
							style={{ textAlign: 'center', marginRight: 10 }}
						>{`${subGroup}`}</AppText>
						<Feather
							name={`${subGroup == 1 ? 'toggle-left' : 'toggle-right'}`}
							size={15}
							color={subGroup == 1 ? color.fg : color.secondary}
						/>
					</Pressable>
				</View>
				<ScrollView style={styles.list}>
					{groupList
						.filter(grp =>
							grp.name.toLowerCase().includes(search.toLowerCase()),
						)
						.slice(0, 6)
						.map(grp => {
							return (
								<Pressable
									android_ripple={{ borderless: false, color: color.bg }}
									key={grp.id}
									onPress={() => {
										handleSelectGroup(grp);
									}}
									style={styles.listItem}
								>
									<AppText style={styles.listItemText}> {grp.name}</AppText>
								</Pressable>
							);
						})}
				</ScrollView>
			</View>
		</AppScreen>
	);
};
const styles = StyleSheet.create({
	bg: {
		backgroundColor: color.bg,
	},
	container: {
		width: '80%',
		// paddingTop: 50,
	},
	input: {
		color: color.fg,
		fontSize: 20,
		flex: 1,
		padding: 10,
		paddingLeft: 20,
	},
	inputIcon: {
		minWidth: 30,
	},
	inputContainer: {
		backgroundColor: color.lighter,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderRadius: 5,
		flex: 1,
	},
	list: {
		marginTop: 10,
		borderRadius: 5,
		maxHeight: '50%',
		// height: 220,
		// marginBottom: 100,
	},
	listItem: {
		backgroundColor: color.lighter,

		padding: 20,

		borderBottomWidth: 1,
		borderBottomColor: color.bg,
	},
	listItemText: {
		fontSize: 20,
		color: color.medium,
	},
	subBtn: {
		backgroundColor: color.lighter,
		color: color.fg,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 5,
		marginLeft: 10,
		paddingHorizontal: 20,
	},
	row: {
		flexDirection: 'row',
		width: '100%',
		alignItems: 'stretch',
		justifyContent: 'space-between',
		marginTop: 30,
	},
});
export default SelectGroup;
