'use strict';

import React, {Component,PropTypes} from 'react';

import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	PixelRatio,
} from 'react-native';

import {
	MKTextField,
	MKColor,
	mdl,
	MKButton,
} from 'react-native-material-kit';


import ToolbarAndroid from 'ToolbarAndroid';
import TabBar from '../../Components/TabBar';
import api from '../../Network/api.js'
import RefreshableListView from '../../Components/RefreshableListView'
import axios from 'axios';

const styles = Object.assign({}, StyleSheet.create({
	col: {
		flex: 1,
		flexDirection: 'column',
		// alignItems: 'center', // this will prevent TFs from stretching horizontal
		marginLeft: 7, marginRight: 7,
		// backgroundColor: MKColor.Lime,
	},
	textfield: {
		height: 28,  // have to do it on iOS
		marginTop: 32,
	},
	textfieldWithFloatingLabel: {
		height: 48,  // have to do it on iOS
		marginTop: 10,
	},
}));

const Textfield = MKTextField.textfield()
	.withPlaceholder('Text...')
	.withStyle(styles.textfield)
	.build();

const TextfieldWithFloatingLabel = MKTextField.textfieldWithFloatingLabel()
	.withPlaceholder('Number...')
	.withStyle(styles.textfieldWithFloatingLabel)
	.withFloatingLabelFont({
		fontSize: 10,
		fontStyle: 'italic',
		fontWeight: '200',
	})
	.withKeyboardType('numeric')
	.build();

const ColoredTextfield = mdl.Textfield.textfieldWithFloatingLabel()
	.withPlaceholder('Email')
	.withDefaultValue('')
	.withHighlightColor(MKColor.Lime)
	.withStyle(styles.textfieldWithFloatingLabel)
	.withOnFocus(() => console.log('Focus'))
	.withOnBlur(() => console.log('Blur'))
	.withOnEndEditing((e) => console.log('EndEditing', e.nativeEvent.text))
	.withOnSubmitEditing((e) => console.log('SubmitEditing', e.nativeEvent.text))
	.withOnTextChange((e) => console.log('TextChange', e))
	.withOnChangeText((e) => console.log('ChangeText', e))
	.build();

const PasswordInput = mdl.Textfield.textfieldWithFloatingLabel()
	.withPassword(true)
	.withPlaceholder('Password')
	.withDefaultValue('')
	.withHighlightColor(MKColor.Lime)
	.withStyle(styles.textfieldWithFloatingLabel)
	.withOnFocus(() => console.log('Focus'))
	.withOnBlur(() => console.log('Blur'))
	.withOnEndEditing((e) => console.log('EndEditing', e.nativeEvent.text))
	.withOnSubmitEditing((e) => console.log('SubmitEditing', e.nativeEvent.text))
	.withOnTextChange((e) => console.log('TextChange', e))
	.withOnChangeText((e) => console.log('ChangeText', e))
	.build();


class TextFields extends Component{
	componentDidMount () {
		setTimeout((() => {
			if (this.refs.defaultInput) {
				//this.refs.defaultInput.focus();
			}
		}), 1000);
	}

	render () {
		return (
			<ScrollView style={styles.scrollView}
			            contentContainerStyle={styles.container}>
				<View style={styles.row}>
					<View style={styles.col}>
						<ColoredTextfield/>
						<Text style={styles.legendLabel}>Textfield</Text>
					</View>
					<View style={styles.col}>
						<PasswordInput/>
						<Text style={styles.legendLabel}>With floating label</Text>
					</View>
					<View>
						<MKButton
							backgroundColor={MKColor.Teal}
							shadowRadius={2}
							shadowOffset={{width:0, height:2}}
							shadowOpacity={.7}
							shadowColor="black"
							onPress={() => {
                                console.log('hi, raised button!');
                            }}
						>
							<Text pointerEvents="none"
							      style={{color: 'white', fontWeight: 'bold',}}>
								RAISED BUTTON
							</Text>
						</MKButton>
					</View>
				</View>
			</ScrollView>
		)
		/*return (
			<ScrollView style={styles.scrollView}
			            contentContainerStyle={styles.container}>
				<View style={styles.row}>
					<View style={styles.col}>
						<Textfield/>
						<Text style={styles.legendLabel}>Textfield</Text>
					</View>
					<View style={styles.col}>
						<TextfieldWithFloatingLabel ref="defaultInput"/>
						<Text style={styles.legendLabel}>With floating label</Text>
					</View>
				</View>
				<View style={styles.row}>
					<View style={styles.col}>
						<ColoredTextfield/>
						<Text style={styles.legendLabel}>Textfield</Text>
					</View>
					<View style={styles.col}>
						<PasswordInput/>
						<Text style={styles.legendLabel}>With floating label</Text>
					</View>
				</View>
			</ScrollView>
		);*/
	}
}

module.exports = TextFields;

