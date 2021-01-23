import React from 'react';
import { groupInfo } from '../../types';
import { useGroupState } from './useGroupState';

export const GroupContext = React.createContext<{
	group: groupInfo | undefined;
	setGroup: React.Dispatch<React.SetStateAction<groupInfo>> | undefined;
}>({
	group: undefined,
	setGroup: undefined,
});

export const GroupProvider: React.FC = ({ children }) => {
	const groupValue = useGroupState();

	return (
		<GroupContext.Provider value={groupValue}>{children}</GroupContext.Provider>
	);
};
