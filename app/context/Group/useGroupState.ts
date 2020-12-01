import { useState } from 'react';
import { groupInfo } from '../../types';

export const useGroupState = () => {
	const [group, setGroup] = useState<groupInfo>({
		name: 'FIA3-GL-AL-02',
		id: 'MXZhMDMwMGY=',
	});
	return {
		group,
		setGroup,
	};
};
