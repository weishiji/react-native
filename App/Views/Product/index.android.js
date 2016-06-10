'use strict';

import React, {Component,PropTypes} from 'react';

import {
	StyleSheet,
	Text,
	View,
	TouchableHighlight
} from 'react-native';

import ToolbarAndroid from 'ToolbarAndroid';
import TabBar from '../../Components/TabBar';
import api from '../../Network/api.js'
import RefreshableListView from '../../Components/RefreshableListView'
import axios from 'axios';

export default class Product extends Component{
	constructor(props) {
		super(props);
	}
	render () {
		return(
			<Text>hell this {this.props.product_id}</Text>
		)
	}

}

