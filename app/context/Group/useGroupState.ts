import { useState } from 'react';
import { groupInfo } from '../../types';

export const useGroupState = () => {
	const [group, setGroup] = useState<groupInfo>({ id: '', name: '' });
	return {
		group,
		setGroup,
	};
};
