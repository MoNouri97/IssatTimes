import { useEffect, useState } from 'react';
import { keys } from '../../config/vars';
import { groupInfo } from '../../types';
import {
	loadStateFromStorage,
	saveStateToStorage,
} from '../../utils/ManageAsyncStorage';

export const useGroupState = () => {
	const [group, setGroup] = useState<groupInfo>(() => {
		const init = { id: '', name: '', subGroup: 1 as const };
		loadStateFromStorage<groupInfo>(keys.GROUP).then(data => {
			setGroup(data ? data : init);
		});
		return { ...init };
	});

	useEffect(() => {
		if (!group || group.name == '') {
			return;
		}
		saveStateToStorage(group, keys.GROUP);
	}, [group]);

	return {
		group,
		setGroup,
	};
};
