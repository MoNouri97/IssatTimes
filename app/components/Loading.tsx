import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AppText from './AppText';
import WebScrap from './WebScrap';
import { loadingStates } from '../types';
import color from '../config/color';
import LottieView from 'lottie-react-native';
import defaultStyles from '../config/defaultStyles';

type Props = { onLoaded: () => void };
const Loading: React.FC<Props> = ({ onLoaded }) => {
	const [state, setState] = useState<loadingStates>('Loading Site ...');
	useEffect(() => {
		if (state === 'Done') {
			onLoaded();
		}
	}, [state]);

	return (
		<View style={styles.container}>
			<View style={styles.loadingAnim}>
				<LottieView autoPlay loop source={require('../assets/loading.json')} />
			</View>
			<AppText style={defaultStyles.title}>{state}</AppText>
			<WebScrap loadingState={state} setLoadingState={setState} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		bottom: 0,
		height: '100%',
		alignItems: 'baseline',
		// justifyContent: 'center',
		backgroundColor: color.bg,
		paddingHorizontal: 40,
		width: '100%',
	},

	loadingAnim: {
		width: '100%',
		height: 300,
	},
});

export default Loading;
