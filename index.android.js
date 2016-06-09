/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
	AppRegistry,
	StyleSheet,
	Navigator,
	Text,
	View,
	Image,
	BackAndroid
} from 'react-native';
import Dashboard from './App/Views/Dashboard/index.android';

var _navigator;
BackAndroid.addEventListener('hardwareBackPress', () => {
	if (!this.onMainScreen()) {
		this.goBack();
		return true;
	}
	_navigator.pop();
	return true;
});


class AwesomeProject extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {

	}
	navigatorRenderScene (route, navigator) {
		_navigator = navigator;
		switch (route.id) {
			case 'Dashboard':
				return (<Dashboard navigator={navigator} />);
				break;
		}
	}
	render() {
		return (
			<Navigator
				style={styles.container}
				tintColor='#FF6600'
				initialRoute={{id: 'Dashboard'}}
				renderScene={this.navigatorRenderScene}/>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 0,
	}
});
AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
