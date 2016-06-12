'use strict';

import React, {Component,PropTypes} from 'react';

import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableHighlight
} from 'react-native';

import {
	getTheme,
} from 'react-native-material-kit';

const theme = getTheme();

import api from '../../Network/api.js'
import axios from 'axios';

export default class Product extends Component{
	constructor(props) {
		super(props);
		this.state = {
			loading : false
			,product : null
		}
	}
	componentWillMount () {
		axios.get(api.PRODUCT_DETAIL + this.props.product_id)
			.then((dt) => {
				this.setState({
					'loading' : true
					,'product' : dt['data']
				});
			})
	}
	componentDidMount () {

	}
	render () {
		if(this.state.loading){
			var product = this.state.product;
			return (
				<View style={theme.cardStyle}>
					<Image source={{uri : 'http://www.stylewe.com/image_cache/resize/300x300/' + product.image}} style={theme.cardImageStyle} />
					<Text style={theme.cardContentStyle}>
						{product.model}
					</Text>
					<Text style={theme.cardContentStyle}>{product.name}</Text>
				</View>
			)
		}else{
			return (null)
		}

	}

}

