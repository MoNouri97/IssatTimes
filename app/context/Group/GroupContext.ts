import React from 'react';
import { groupInfo } from '../../types';

export const GroupContext = React.createContext<{
	group: groupInfo | undefined;
	setGroup: React.Dispatch<React.SetStateAction<groupInfo>> | undefined;
}>({
	group: undefined,
	setGroup: undefined,
});
