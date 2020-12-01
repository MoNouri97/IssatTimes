import React, { useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import cheerioRN from 'react-native-cheerio';

import { loadingStates, Subject } from '../types';
import { SubjectsContext } from '../context/Subjects/SubjectsContext';
import { GroupContext } from '../context/Group/GroupContext';
import AppText from './AppText';

interface Props {
	// onDataLoad: (data: Subject[][]) => void;
	loadingState: loadingStates;
	setLoadingState: React.Dispatch<React.SetStateAction<loadingStates>>;
}

const WebScrap: React.FC<Props> = ({ loadingState, setLoadingState }) => {
	const { setSubjects } = useContext(SubjectsContext);
	const { group } = useContext(GroupContext);
	const [uri, setUri] = useState('');

	const getCookieAndTokenJs = `
		const j = document.getElementById('jeton').value;
		const c = document.cookie
		const payload = { jeton: j, cookie: c };
		window.ReactNativeWebView.postMessage(JSON.stringify(payload))
	`;
	const webViewRef = useRef<WebView | null>(null);
	const injectedJs = `
			const tab = document.querySelector("#dvContainer");
			if(tab){
				window.ReactNativeWebView.postMessage(tab.innerHTML)
			}else{
				document.querySelector("#form1 > table > tbody > tr > td:nth-child(2) > select").value = '${group.id}';
				document.querySelector("#form1").submit();
			}
			true; // note: this is required, or you')'ll sometimes get silent failures
		`;

	const handleOnLoad = () => {
		console.log('loaded ....');
		if (loadingState === 'Not Loading') {
			return;
		}
		setLoadingState(
			loadingState === 'Loading www.issatso.rnu.tn ...'
				? 'Choosing Group ...'
				: 'Collecting Data ...',
		);
		webViewRef.current?.injectJavaScript(injectedJs);
		console.log(
			`injected : document.querySelector("#form1 > table > tbody > tr > td:nth-child(2) > select").value = '${group.id}'`,
		);
	};
	const handleOnMessage = async (event: WebViewMessageEvent) => {
		const $ = cheerioRN.load(event.nativeEvent.data);

		// needed vars
		const week: Subject[][] = [];
		let dayArray: Subject[] = [];
		let dayNbr = -1;

		try {
			// extracting columns
			const days = $('.table-striped td:nth-child(1)');
			const times = $('.table-striped td:nth-child(2)');
			const subjects = $('.table-striped td:nth-child(5)');
			const teachers = $('.table-striped td:nth-child(6)');
			const types = $('.table-striped td:nth-child(7)');
			const locations = $('.table-striped td:nth-child(8)');
			const regimes = $('.table-striped td:nth-child(9)');

			days.each((i: any, d: any) => {
				const day = $(d).text() as string;

				if (day.length === 0) {
					// add subjects
					const name = ($(subjects.get(i)).text() as string).split('-')[1];

					if (name == undefined) {
						// empty row
						return;
					}

					const time = $(times.get(i)).text();
					const teacher = $(teachers.get(i)).text();
					const location = $(locations.get(i)).text();
					const type = $(types.get(i)).text();
					const regime = $(regimes.get(i)).text();
					const subject: Subject = {
						name,
						teacher,
						location,
						type,
						regime,
						time,
					};
					dayArray.push(subject);
				} else {
					if (!day.includes('di')) {
						return;
					}
					if (dayArray.length > 0) {
						week.push(dayArray);
						dayArray = [];
					}
					dayNbr += 1;
				}
			});
			// the last day needs to be added
			week.push(dayArray);
		} catch (error) {
			console.log(error.message);
		}

		if (setSubjects) {
			setSubjects(week);
			setLoadingState('Done');
		} else {
			console.log('error : setSubject is undefined');
		}
	};

	useEffect(() => {
		if (loadingState === 'Loading www.issatso.rnu.tn ...') {
			setUri('http://www.issatso.rnu.tn/fo/emplois/emploi_groupe.php');
		}
	}, [loadingState, setUri]);

	return (
		<WebView
			startInLoadingState={false}
			containerStyle={{ display: 'none' }}
			// containerStyle={{ height: 0, width: 0, display: 'none' }}
			ref={webViewRef}
			onLoadEnd={handleOnLoad}
			originWhitelist={['*']}
			source={{ uri }}
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
const styles = StyleSheet.create({});
export default WebScrap;
