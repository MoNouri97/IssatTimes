import React, { useEffect, useRef, useState } from 'react';
import {
	Modal,
	Pressable,
	StyleSheet,
	Text,
	View,
	TouchableHighlight,
	TouchableWithoutFeedback,
	Animated,
	Dimensions,
	Easing,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AppBtn from '../components/AppBtn';
import AppText from '../components/AppText';
import TasksModal from '../components/TasksModal';
import color from '../config/color';

interface Props {
	visible: boolean;
	onRequestClose: () => void;
	info: { day: number; subject: string };
}
const SCREEN_H = Dimensions.get('window').height;
const ModalScreen: React.FC<Props> = ({ visible, onRequestClose, info }) => {
	const translateY = useRef(new Animated.Value(SCREEN_H)).current;
	useEffect(() => {
		if (!visible) {
			return;
		}
		Animated.timing(translateY, {
			// toValue: 0,
			toValue: SCREEN_H * 0.2,
			duration: 300,
			useNativeDriver: true,
		}).start();
	}, [visible]);
	const handleDismiss = () => {
		Animated.timing(translateY, {
			toValue: SCREEN_H,
			duration: 100,
			useNativeDriver: true,
		}).start(onRequestClose);
	};

	return (
		<>
			<Modal
				visible={visible}
				transparent
				onRequestClose={handleDismiss}
				onDismiss={handleDismiss}
				// animationType='fade'
				statusBarTranslucent
			>
				<View style={styles.overlay}>
					<View style={styles.container}>
						<Pressable
							style={styles.closeBtn}
							onPress={handleDismiss}
						></Pressable>
						<Animated.View
							style={[styles.modal, { transform: [{ translateY }] }]}
						>
							<ScrollView contentContainerStyle={{}}>
								<TasksModal {...info} />
							</ScrollView>
						</Animated.View>
					</View>
				</View>
			</Modal>
		</>
	);
};
const styles = StyleSheet.create({
	closeBtn: { flex: 1, backgroundColor: '#00000000' },
	overlay: {
		width: '100%',
		height: '100%',
		position: 'absolute',
		top: 0,
		backgroundColor: '#000000bb',
		zIndex: 1,
	},
	container: {
		flex: 1,
		height: '100%',
	},
	modal: {
		position: 'absolute',
		// bottom: 0,
		height: SCREEN_H * 0.8,
		top: 0,
		borderTopEndRadius: 27,
		borderTopLeftRadius: 27,
		zIndex: 1,
		width: '100%',
		backgroundColor: color.bg,
		padding: 27,
	},
});
export default ModalScreen;
