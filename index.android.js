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

console.disableYellowBox = true;

var _navigator;
BackAndroid.addEventListener('hardwareBackPress', () => {
	if (_navigator.getCurrentRoutes().length === 1  ) {
		return false;
	}
	_navigator.pop();
	return true;
});
import Dashboard from './App/Views/Dashboard/index.android';
import Product from './App/Views/Product/index.android';
import User from './App/Views/User/index.android'

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
			case 'Product' :
				return (<Product product_id={route.product_id} navigator={navigator} />);
				break;
			case 'User' :
				return (<User user_id={route.user_id} navigator={navigator} />);
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
