import React, { useContext, useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import WebView, { WebViewMessageEvent } from 'react-native-webview';

import { loadingStates, Subject } from '../types';
import { SubjectsContext } from '../context/Subjects/SubjectsContext';
import { GroupContext } from '../context/Group/GroupContext';
import { scrapData } from '../utils/scrapData';

interface Props {
	// onDataLoad: (data: Subject[][]) => void;
	loadingState: loadingStates;
	setLoadingState: React.Dispatch<React.SetStateAction<loadingStates>>;
}

const WebScrap: React.FC<Props> = ({ loadingState, setLoadingState }) => {
	const { dispatch } = useContext(SubjectsContext);
	const { group } = useContext(GroupContext);

	const webViewRef = useRef<WebView | null>(null);
	const injectedJs = `
			const tab = document.querySelector("#dvContainer");
			if(tab){
				window.ReactNativeWebView.postMessage(tab.innerHTML)
			}else{
				document.querySelector("#form1 > table > tbody > tr > td:nth-child(2) > select").value = '${
					group!.id
				}';
				document.querySelector("#form1").submit();
			}
			true; // note: this is required, or you')'ll sometimes get silent failures
		`;

	const handleOnLoad = () => {
		console.log('loaded ....');

		setLoadingState(
			loadingState === 'Loading Site ...'
				? 'Choosing Group ...'
				: 'Collecting Data ...',
		);
		webViewRef.current?.injectJavaScript(injectedJs);
		console.log(`injected : group id'${group!.id}'`);
	};

	const handleOnMessage = async (event: WebViewMessageEvent) => {
		const week: Subject[][] = scrapData(event);

		if (dispatch) {
			setLoadingState('Done');
			dispatch({ type: 'UPDATE', payload: week });
		} else {
			console.log('error : dispatch is undefined');
		}
	};

	useEffect(() => {
		if (dispatch) {
			dispatch({ type: 'START_LOADING' });
		} else {
			console.log('error : dispatch is undefined');
		}
	}, []);

	return (
		<WebView
			startInLoadingState={false}
			containerStyle={{ display: 'none' }}
			// containerStyle={{ height: 0, width: 0, display: 'none' }}
			ref={webViewRef}
			onLoadEnd={handleOnLoad}
			originWhitelist={['*']}
			source={{ uri: 'http://www.issatso.rnu.tn/fo/emplois/emploi_groupe.php' }}
			onMessage={handleOnMessage}
			style={{
				width: '100%',
				flex: 1,
				borderWidth: 2,
				borderColor: '#000',
			}}
		/>
	);
};
export default WebScrap;
