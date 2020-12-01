import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AppText from './AppText';
import WebScrap from './WebScrap';
import { loadingStates } from '../types';

type Props = { onLoaded: () => void };
const Loading: React.FC<Props> = ({ onLoaded }) => {
	const [state, setState] = useState<loadingStates>(
		'Loading www.issatso.rnu.tn ...',
	);
	useEffect(() => {
		if (state === 'Done') {
			onLoaded();
		}
	}, [state]);

	return (
		<View style={{ backgroundColor: 'dodgerblue' }}>
			<AppText>{state}</AppText>
			<WebScrap loadingState={state} setLoadingState={setState} />
		</View>
	);
};
export default Loading;
