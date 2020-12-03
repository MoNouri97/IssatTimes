import { useEffect, useState } from 'react';
import { groupInfo } from '../../types';
import {
	loadStateFromStorage,
	saveStateToStorage,
} from '../../utils/ManageAsyncStorage';

export const useGroupState = () => {
	const [group, setGroup] = useState<groupInfo>({ id: '', name: '' });
	// useEffect(() => {
	// 	loadStateFromStorage<groupInfo>('group').then(data => {
	// 		if (!data) {
	// 			return;
	// 		}
	// 		setGroup(data);
	// 	});
	// }, []);

	useEffect(() => {
		if (!group) {
			return;
		}
		saveStateToStorage(group, 'group');
	}, [group]);
	return {
		group,
		setGroup,
	};
};
