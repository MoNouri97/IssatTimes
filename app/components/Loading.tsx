import React, { useContext, useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AppText from './AppText';
import WebScrap from './WebScrap';
import { loadingStates } from '../types';
import { theme } from '../config/color';
import LottieView from 'lottie-react-native';
import defaultStyles from '../config/defaultStyles';
import { ThemeContext } from '../context/Theme/ThemeContext';

type Props = { onLoaded: () => void };
const Loading: React.FC<Props> = ({ onLoaded }) => {
	const [state, setState] = useState<loadingStates>('Loading Site ...');
	useEffect(() => {
		if (state === 'Done') {
			onLoaded();
		}
	}, [state]);
	const themeCon = useContext(ThemeContext);
	const color = useMemo(
		() => (themeCon.theme == 'dark' ? theme.darkTheme : theme.lightTheme),
		[themeCon],
	);
	return (
		<View style={[styles.container, { backgroundColor: color.lighter }]}>
			<View style={styles.loadingAnim}>
				<LottieView autoPlay loop source={require('../assets/loading.json')} />
			</View>
			<AppText style={[styles.title, { color: color.fg }]}>{state}</AppText>
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

		paddingHorizontal: 40,
		width: '100%',
	},

	loadingAnim: {
		width: '100%',
		height: 300,
	},
	title: {
		fontSize: 50,

		fontFamily: 'Lato_900Black',
	},
});

export default Loading;
