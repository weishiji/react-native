
import React, {Component,PropTypes} from 'react';

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
	TouchableHighlight,
    Platform
} from 'react-native';

import GiftedListView from 'react-native-gifted-listview';
import GiftedSpinner from 'react-native-gifted-spinner';

export default class RefreshableListView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			renderRow: props.renderRow,
			backgroundColor: props.backgroundColor ? props.backgroundColor : '#FFFFFF',
			loadMoreText: props.loadMoreText ? props.loadMoreText : 'Load More...',
			renderHeader: props.renderHeader ? props.renderHeader : null,
		}
	}
	_onFetch  (page = 1, callback, options) {
		setTimeout(() => {
			var header = 'Header '+page;
			var rows = {};
			rows[header] = ['row '+((page - 1) * 3 + 1), 'row '+((page - 1) * 3 + 2), 'row '+((page - 1) * 3 + 3)];
			if (page === 5) {
				callback(rows, {
					allLoaded: true, // the end of the list is reached
				});
			} else {
				callback(rows);
			}

		}, 1000);
	}
	_onPress (rowData) {
		console.log(rowData,'lxg')
	}
	_renderRowView (rowData) {
		return (
			<TouchableHighlight
				style={customStyles.row}
				underlayColor='#c8c7cc'
				onPress={() => this._onPress(rowData)}
			>
				<Text>{rowData}</Text>
			</TouchableHighlight>
		);
	}
	_renderSectionHeaderView(sectionData, sectionID) {
		return (
			<View style={customStyles.header} key={sectionID}>
				<Text style={customStyles.headerTitle}>
					{sectionID}
				</Text>
			</View>
		);
	}
	_renderRefreshableWaitingView(refreshCallback) {
		if (Platform.OS !== 'android') {
			return (
				<View style={customStyles.refreshableView}>
					<Text style={customStyles.actionsLabel}>
						↓
					</Text>
				</View>
			);
		} else {
			return (
				<TouchableHighlight
					underlayColor='#c8c7cc'
					onPress={refreshCallback}
					style={customStyles.refreshableView}
				>
					<Text style={customStyles.actionsLabel}>
						↻
					</Text>
				</TouchableHighlight>
			);
		}
	}
	_renderRefreshableWillRefreshView() {
		return (
			<View style={customStyles.refreshableView}>
				<Text style={customStyles.actionsLabel}>
					↻
				</Text>
			</View>
		);
	}
	_renderRefreshableFetchingView() {
		return (
			<View style={customStyles.refreshableView}>
				<GiftedSpinner />
			</View>
		);
	}
	_renderPaginationWaitingView(paginateCallback) {
		return (
			<TouchableHighlight
				underlayColor='#c8c7cc'
				onPress={paginateCallback}
				style={customStyles.paginationView}
			>
				<Text style={[customStyles.actionsLabel, {fontSize: 13}]}>
					Load more
				</Text>
			</TouchableHighlight>
		);
	}
	_renderPaginationFetchigView() {
		return (
			<View style={customStyles.paginationView}>
				<GiftedSpinner />
			</View>
		);
	}
	_renderPaginationAllLoadedView() {
		return (
			<View style={customStyles.paginationView}>
				<Text style={customStyles.actionsLabel}>
					~
				</Text>
			</View>
		);
	}
	_renderEmptyView(refreshCallback) {
		return (
			<View style={customStyles.defaultView}>
				<Text style={customStyles.defaultViewTitle}>
					Sorry, there is no content to display
				</Text>

				<TouchableHighlight
					underlayColor='#c8c7cc'
					onPress={refreshCallback}
				>
					<Text>
						↻
					</Text>
				</TouchableHighlight>
			</View>
		);
	}
	_renderSeparatorView(sectionID, rowID) {
		return (
			<View style={customStyles.separator} key={sectionID}/>
		);
	}
	render() {
		return (
			<View style={screenStyles.container}>
				<View style={screenStyles.navBar}>
					<Text style={screenStyles.navBarTitle}>Gifted ListView</Text>
				</View>
				<GiftedListView
					rowView={this._renderRowView}

					onFetch={this._onFetch}
					initialListSize={12} // the maximum number of rows displayable without scrolling (height of the listview / height of row)

					firstLoader={true} // display a loader for the first fetching

					pagination={true} // enable infinite scrolling using touch to load more
					paginationFetchigView={this._renderPaginationFetchigView}
					paginationAllLoadedView={this._renderPaginationAllLoadedView}
					paginationWaitingView={this._renderPaginationWaitingView}

					refreshable={true} // enable pull-to-refresh for iOS and touch-to-refresh for Android
					refreshableViewHeight={50} // correct height is mandatory
					refreshableDistance={40} // the distance to trigger the pull-to-refresh - better to have it lower than refreshableViewHeight
					refreshableFetchingView={this._renderRefreshableFetchingView}
					refreshableWillRefreshView={this._renderRefreshableWillRefreshView}
					refreshableWaitingView={this._renderRefreshableWaitingView}

					emptyView={this._renderEmptyView}

					renderSeparator={(sectionID, rowID) => this._renderSeparatorView}

					withSections={true} // enable sections
					sectionHeaderView={this._renderSectionHeaderView}

					PullToRefreshViewAndroidProps={{
			            colors: ['#fff'],
			            progressBackgroundColor: '#003e82',
		            }}
				/>
			</View>
		);
	}
}


/*export default class RefreshableListView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			renderRow: props.renderRow,
			backgroundColor: props.backgroundColor ? props.backgroundColor : '#FFFFFF',
			loadMoreText: props.loadMoreText ? props.loadMoreText : 'Load More...',
			renderHeader: props.renderHeader ? props.renderHeader : null,
		}
	}
	onRefresh = (page=1, callback, options) =>{
		this.props.onRefresh(page, callback);
	}
	renderRow = (row) =>{
		return this.state.renderRow(row);
	}
	render (){
		return(
			<View style={[styles.container, {backgroundColor: this.state.backgroundColor}, this.props.style]}>
				<View style={styles.navBarSpace} />
				<GiftedListView rowView={this.renderRow}
				                onFetch={this.onRefresh}
				                paginationAllLoadedView={this.renderPaginationAllLoadedView}
				                paginationWaitingView={this.renderPaginationWaitingView}
				                headerView={this.renderHeaderView}
				                enableEmptySections={true}
				                PullToRefreshViewAndroidProps={{
	                                    colors: ['#F6F6EF'],
	                                    progressBackgroundColor: '#FF6600',
	                                }}
				                customStyles={{
	                                                refreshableView: {
	                                                    backgroundColor: this.state.backgroundColor,
	                                                    justifyContent: 'flex-end',
	                                                    paddingBottom: 12,
	                                                },
	                                                paginationView: {
	                                                    backgroundColor: this.state.backgroundColor,
	                                                    height: 60
	                                                }
	                                }}/>
			</View>
		);
	}
	renderPaginationAllLoadedView (){
		return(
			<View />
		);
	}
	renderPaginationWaitingView = (paginateCallback) =>{
		return (
			<TouchableOpacity style={styles.paginationView}
			                  onPress={paginateCallback}>
				<Text style={styles.loadMoreText}>
					{this.state.loadMoreText}
				</Text>
			</TouchableOpacity>
		);
	}
	renderHeaderView = (sectionData, sectionID) => {
		console.log(this.state.renderHeader,'render header')

		if(this.state.renderHeader){
			return this.props.renderHeader();
		}
		return (<View style={styles.header}>
			<Text style={styles.headerTitle}>
				{sectionID}
			</Text>
		</View>);
	}
}*/

var styles = StyleSheet.create({
    container: {
        flex: 1
    },
    navBarSpace: {
        height: (Platform.OS !== 'android') ? 64 : 0,
    },
    rowContainer: {
        paddingRight: 15,
        paddingLeft: 10,
        flexDirection: 'row'
    },
    paginationView: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20
    },
    loadMoreText: {
        fontSize: 15,
        color: 'gray',
    },
	header: {
		backgroundColor: '#50a4ff',
		padding: 10,
	},
	headerTitle: {
		color: '#fff',
	},
});

var customStyles = {
	separator: {
		height: 1,
		backgroundColor: '#CCC'
	},
	refreshableView: {
		height: 50,
		backgroundColor: '#fff',
		justifyContent: 'center',
		alignItems: 'center',
	},
	actionsLabel: {
		fontSize: 20,
		color: '#007aff',
	},
	paginationView: {
		height: 44,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FFF',
	},
	defaultView: {
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
	},
	defaultViewTitle: {
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: 15,
	},
	row: {
		padding: 10,
		height: 44,
	},
	header: {
		backgroundColor: '#50a4ff',
		padding: 10,
	},
	headerTitle: {
		color: '#fff',
	},
};

var screenStyles = {
	container: {
		flex: 1,
		backgroundColor: '#FFF',
	},
	navBar: {
		height: 64,
		backgroundColor: '#007aff',

		justifyContent: 'center',
		alignItems: 'center',
	},
	navBarTitle: {
		color: '#fff',
		fontSize: 16,
		marginTop: 12,
	}
};