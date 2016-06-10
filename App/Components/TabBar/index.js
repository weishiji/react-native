import React, {Component} from 'react';
import {
	View,
	TabBarIOS,
	StyleSheet,
	Platform
} from 'react-native';

import ScrollableTabView, {ScrollableTabBar,} from 'react-native-scrollable-tab-view';
import CustomTabBar from './customTabBar.android';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class TabBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			structure: props.structure
		}
	}

	componentWillMount() {
	}
	handlerChangeTab (e) {
		//console.warn(e)
		//console.log(this)
	}
	render() {
		if (Platform.OS === 'android') {
			return (
				<ScrollableTabView
					renderTabBar={() => <CustomTabBar />}
					onChangeTab={(o)=>this.handlerChangeTab(o)}
					tabBarPosition={'bottom'}
					initialPage={this.state.selectedTab}>
					{this.state.structure.map((tabProps, tabIndex) =>
						<View style={{flex:1}}
						      tabLabel={tabProps.title+'!$#' +tabProps.iconName+'!$#'+this.state.iconSize}
						      key={tabIndex}>
							{tabProps.renderContent()}
						</View>
					)}
				</ScrollableTabView>
			)
		}else {
			return (
				<TabBarIOS tintColor={this.state.activeTintColor}
				           translucent={true}>
					{this.state.structure.map((tabProps, tabIndex) =>
						<Icon.TabBarItem title={tabProps.title}
						                 iconName={tabProps.iconName}
						                 iconSize={this.state.iconSize}
						                 selected={tabIndex == this.state.selectedTab}
						                 onPress={() => {this.setState({selectedTab: tabIndex});}}
						                 key={tabIndex}>
							{tabProps.renderContent()}
						</Icon.TabBarItem>
					)}
				</TabBarIOS>
			);
		}
	}
}

var styles = StyleSheet.create({});
