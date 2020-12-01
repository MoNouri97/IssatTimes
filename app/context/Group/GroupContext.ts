import React from 'react';
import { groupInfo } from '../../types';

export const GroupContext = React.createContext<{
	group: groupInfo;
	setGroup: React.Dispatch<React.SetStateAction<groupInfo>> | undefined;
}>({
	group: { id: '', name: '' },
	setGroup: undefined,
});
