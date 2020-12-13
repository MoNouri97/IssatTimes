import React, { useContext, useState } from 'react';
import {
	ScrollView,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import AppText from '../components/AppText';
import AppScreen from '../components/AppScreen';
import color from '../config/color';
import { GroupContext } from '../context/Group/GroupContext';
import { groupInfo } from '../types';
import { groupList } from '../utils/groupList';
import defaultStyles from '../config/defaultStyles';

const SelectGroup: React.FC = () => {
	const [search, setSearch] = useState('');
	const [subGroup, setSubGroup] = useState<1 | 2>(1);
	const { setGroup } = useContext(GroupContext);
	const handleSelectGroup = (selection: { name: string; id: string }) => {
		setSearch(selection.name);
		setGroup!({ ...selection, subGroup });
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
							value={search}
							onChange={e => {
								setSearch(e.nativeEvent.text);
							}}
						/>
						<Feather style={styles.inputIcon} name='search' size={15} />
					</View>
					<TouchableOpacity onPress={toggleSubGroup}>
						<AppText style={[styles.subBtn]}>{subGroup}</AppText>
					</TouchableOpacity>
				</View>
				<ScrollView style={styles.list}>
					{groupList
						.filter(grp =>
							grp.name.toLowerCase().includes(search.toLowerCase()),
						)
						.slice(0, 3)
						.map(grp => {
							return (
								<TouchableOpacity
									key={grp.id}
									onPress={() => {
										handleSelectGroup(grp);
									}}
								>
									<AppText style={styles.listItem}> {grp.name}</AppText>
								</TouchableOpacity>
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
		// paddingTop: 50,
	},
	input: {
		fontSize: 20,
		flex: 1,
		padding: 20,
	},
	inputIcon: {
		minWidth: 30,
	},
	inputContainer: {
		backgroundColor: color.light,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderRadius: 5,
		flex: 1,
		// margin: 10,
	},
	list: {
		backgroundColor: color.light,
		marginTop: 10,
		borderRadius: 5,
		maxHeight: '80%',
		height: 220,
		// marginBottom: 100,
	},
	listItem: {
		fontSize: 20,
		padding: 20,
		color: color.medium,
	},
	subBtn: {
		backgroundColor: color.black,
		color: color.white,
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 5,
		width: 70,
		marginLeft: 10,
		textAlign: 'center',
		padding: 20,
	},
	row: {
		flexDirection: 'row',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
});
export default SelectGroup;
