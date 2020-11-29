import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import AppText from '../components/AppText';
import AppCard from '../components/Card';
import Screen from '../components/Screen';
import WebScrap from '../components/WebScrap';

const TestScreen: React.FC = ({}) => {
	const runFirst = `
	const j = document.getElementById('jeton').value;
	const c = document.cookie
	const payload = { jeton: j, cookie: c };
	window.alert(j)
	window.ReactNativeWebView.postMessage(JSON.stringify(payload))
	true; // note: this is required, or you')'ll sometimes get silent failures
    `;
	return (
		// <Screen style={{ width: '95%' }}>
		// 	<AppCard
		// 		teacher='ACHOUR Sami'
		// 		name='7505-Veille -FI-GL-SE5'
		// 		location='A distance'
		// 		regime='H'technologique
		// 		type='C'
		// 	/>
		// 	<AppText>Hello world </AppText>
		<WebScrap />
		// {/* </Screen> */}
	);
};
const styles = StyleSheet.create({});
export default TestScreen;
