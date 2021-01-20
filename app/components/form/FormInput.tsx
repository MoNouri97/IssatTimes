import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import {
	StyleSheet,
	Text,
	TextInput,
	TextInputProps,
	View,
} from 'react-native';
import color from '../../config/color';

interface Props {
	icon?: string;
	value: string;
	setValue: (v: string) => void;
}

const FormInput: React.FC<Props & TextInputProps> = ({
	icon,
	value,
	setValue,
	...props
}) => {
	return (
		<View style={styles.inputContainer}>
			<TextInput
				style={styles.input}
				placeholderTextColor={color.medium}
				value={value}
				onChange={e => {
					setValue(e.nativeEvent.text);
				}}
				{...props}
			/>
			{icon && (
				<Feather
					style={styles.inputIcon}
					name='search'
					size={15}
					color={color.fg}
				/>
			)}
		</View>
	);
};
const styles = StyleSheet.create({
	input: {
		color: color.fg,
		fontSize: 20,
		flex: 1,
		padding: 20,
	},
	inputIcon: {
		minWidth: 30,
	},
	inputContainer: {
		backgroundColor: color.lighter,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderRadius: 5,
		flex: 1,
	},
});
export default FormInput;
