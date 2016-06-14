'use strict';

import React, {Component,PropTypes} from 'react';

import {
	StyleSheet,
	Text,
	View,
	Image,
	WebView,
	TouchableHighlight,
	ToolbarAndroid,
} from 'react-native';

import {
	getTheme,
} from 'react-native-material-kit';

import Ionicons from 'react-native-vector-icons/Ionicons';

const theme = getTheme();

import api from '../../Network/api.js'
import axios from 'axios';

var WEBVIEW_REF = 'webview';
var DEFAULT_URL = 'https://www.stylewe.com';

export default class Web extends Component{
	constructor(props) {
		super(props);
		this.state = {
			url: DEFAULT_URL,
			status: 'No Page Loaded',
			backButtonEnabled: false,
			forwardButtonEnabled: false,
			loading: true,
		}

	}
	componentWillMount () {

	}
	componentDidMount () {
		console.log('web view is running')
	}
	onNavigationStateChange (navState) {
		this.setState({
			backButtonEnabled: navState.canGoBack,
			forwardButtonEnabled: navState.canGoForward,
			url: navState.url,
			status: navState.title,
			loading: navState.loading,
			scalesPageToFit: true
		});
	}
	onShouldStartLoadWithRequest (event) {

		return true;
	}
	goBack () {
		this.refs[WEBVIEW_REF].goBack();
	}
	goForward () {
		this.refs[WEBVIEW_REF].goForward();
	}
	_onLoadStart () {
		//console.log(this.refs[WEBVIEW_REF],'this is name')
	}
	render () {
		return (
			<WebView
				ref={WEBVIEW_REF}
				automaticallyAdjustContentInsets={false}
				source={{uri: this.state.url}}
				javaScriptEnabled={true}
				domStorageEnabled={true}
				decelerationRate="normal"
				onNavigationStateChange={this.onNavigationStateChange.bind(this)}
				onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest.bind(this)}
				onLoadStart={this._onLoadStart.bind(this)}
				startInLoadingState={true}
			/>
		)
	}

}

