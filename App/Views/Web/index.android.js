'use strict';

import React, {Component,PropTypes} from 'react';

import {
	StyleSheet,
	Text,
	View,
	Image,
	WebView,
	BackAndroid,
	Platform,
	TouchableHighlight,
	ToolbarAndroid,
} from 'react-native';

import {
	getTheme,
	MKProgress,
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
	componentWillMount() {
		if (Platform.OS === 'android') {
			BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
		}
	}
	onBackAndroid = () => {
		const nav = this.props.navigator;


		this.goBack();
		return true;
		const routers = nav.getCurrentRoutes();
		if (routers.length > 1) {
			const top = routers[routers.length - 1];


			if (top.ignoreBack || top.component.ignoreBack){
				// 路由或组件上决定这个界面忽略back键
				return true;
			}
			const handleBack = top.handleBack || top.component.handleBack;
			if (handleBack) {
				// 路由或组件上决定这个界面自行处理back键
				return handleBack();
			}
			// 默认行为： 退出当前界面。
			nav.pop();
			return true;
		}
		return false;
	}
	componentWillUnmount() {
		if (Platform.OS === 'android') {
			BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
		}
	}
	onNavigationStateChange (navState) {
		console.log(navState.loading,'is loading')
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

	}
	_onLoadEnd () {

	}
	_renderLoading (e) {
	}
	render () {
		var Progress = this.state.loading ? (<MKProgress
			ref="progBarWithBuffer"
			progress={0.2}
			buffer={0.3}
		/>) : (null);
		return (
			<View style={{flex: 1}}>
				<View style={{'height' : 5}}>
					{Progress}
				</View>
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
					onLoadEnd={this._onLoadEnd.bind(this)}
					startInLoadingState={true}
					renderLoading={this._renderLoading.bind(this)}
				/>
			</View>

		)
	}

}

