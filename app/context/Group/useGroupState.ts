import { useEffect, useState } from 'react';
import { keys } from '../../config/vars';
import { groupInfo } from '../../types';
import {
	loadStateFromStorage,
	saveStateToStorage,
} from '../../utils/ManageAsyncStorage';

export const useGroupState = () => {
	const [group, setGroup] = useState<groupInfo>({ id: '', name: '' });

	useEffect(() => {
		if (!group) {
			return;
		}
		saveStateToStorage(group, keys.GROUP);
	}, [group]);

	return {
		group,
		setGroup,
	};
};
