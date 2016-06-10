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

export default class Dashboard extends Component{
	constructor(props) {
		super(props);
		this.state = {
			topStoryIDs: null,
			lastIndex: 0
		}
	}
	render () {
		return(
			<TabBar structure={[{
                            title: 'Home',
                            iconName: 'home',
                            renderContent: () => {return(
                                <View style={{flex:1}}>
                                <ToolbarAndroid style={styles.toolbar}
                                                  title={'Home'}
                                                  titleColor={'#FFFFFF'}/>
                                  <RefreshableListView {...this.props}/>
                                </View>
                              );}
                          },
                          {
                            title: 'Discovery',
                            iconName: 'eye',
                            renderContent: () => {return(
                                <View style={{flex:1}}>
                                  <ToolbarAndroid style={styles.toolbar}
                                                  title={'Discovery'}
                                                  titleColor={'#FFFFFF'}/>
                                  <RefreshableListView {...this.props}/>
                                </View>
                              );}
                          },
                          {
                            title: 'Category',
                            iconName: 'star',
                            renderContent: () => {return(
                                <View style={{flex:1}}>
                                  <ToolbarAndroid style={styles.toolbar}
                                                  title={'Category'}
                                                  titleColor={'#FFFFFF'}/>
                                  <RefreshableListView renderRow={(row)=>this.renderListViewRow(row, 'Top Story')}
                                                       onRefresh={(page, callback)=>this.listViewOnRefresh(page, callback, api.HN_TOP_STORIES_ENDPOINT)}
                                                       backgroundColor={'#F6F6EF'}/>
                                </View>
                              );}
                          },
                          {
                            title: 'New',
                            iconName: 'level-up',
                            renderContent: () => {return(
                                <View style={{flex:1}}>
                                  <ToolbarAndroid style={styles.toolbar}
                                                  title={'New Stories'}
                                                  titleColor={'#FFFFFF'}/>
                                  <RefreshableListView renderRow={(row)=>this.renderListViewRow(row, 'New Story')}
                                                       onRefresh={(page, callback)=>this.listViewOnRefresh(page, callback, api.HN_NEW_STORIES_ENDPOINT)}
                                                       backgroundColor={'#F6F6EF'}/>
                                </View>
                              );}
                          },
                          {
                            title: 'Login',
                            iconName: 'user',
                            renderContent: () => {return(
                                <View style={{flex:1}}>
                                  <ToolbarAndroid style={styles.toolbar}
                                                  title={'Login'}
                                                  titleColor={'#FFFFFF'}/>
                                  <RefreshableListView renderRow={(row)=>this.renderListViewRow(row, 'Job Post')}
                                                       onRefresh={(page, callback)=>this.listViewOnRefresh(page, callback, api.HN_JOB_STORIES_ENDPOINT)}
                                                       backgroundColor={'#F6F6EF'}/>
                                </View>
                              );}
                          },]}
			        selectedTab={2}
			        activeTintColor={'#ff8533'}
			        iconSize={20}/>
		);
	}
	renderListViewRow = (row, pushNavBarTitle) => {
		//console.log(row,'this is row,===============+++++++++==============')
		return (
			<Text>
				{row.name}
			</Text>
		)
		/*return(
			<TouchableHighlight underlayColor={'#f3f3f2'}
			                    onPress={()=>this.selectRow(row, pushNavBarTitle)}>
				<View style={styles.rowContainer}>
					<Text style={styles.rowCount}>
						{row.count}
					</Text>
					<View style={styles.rowDetailsContainer}>
						<Text style={styles.rowTitle}>
							{row.title}
						</Text>
						<Text style={styles.rowDetailsLine}>
							Posted by {row.by} | {row.score} Points | {row.descendants} Comments
						</Text>
						<View style={styles.separator}/>
					</View>
				</View>
			</TouchableHighlight>
		);*/
	}
	listViewOnRefresh (page, callback, api_endpoint){
		var api_endpoint = 'http://www.stylewe.com/rest/product';

		if (page != 1 && this.state.topStoryIDs){
			this.fetchStoriesUsingTopStoryIDs(this.state.topStoryIDs, this.state.lastIndex, 5, callback);
		}else {
			axios.get(api_endpoint)
				.then((topStoryIDs) => {
					this.fetchStoriesUsingTopStoryIDs(topStoryIDs, 0, 12, callback);
					this.setState({topStoryIDs: topStoryIDs});
				})
			/*fetch(api_endpoint)
				.then((response) => response.json())
				.then((topStoryIDs) => {

					this.fetchStoriesUsingTopStoryIDs(topStoryIDs, 0, 12, callback);
					this.setState({topStoryIDs: topStoryIDs});
				})
				.done();*/
		}
	}
	fetchStoriesUsingTopStoryIDs (topStoryIDs, startIndex, amountToAdd, callback){
		var rowsData = [];
		var endIndex = (startIndex + amountToAdd) < topStoryIDs.length ? (startIndex + amountToAdd) : topStoryIDs.length;
		function iterateAndFetch(){
			if (startIndex < endIndex){
				fetch(api.HN_ITEM_ENDPOINT+topStoryIDs[startIndex]+".json")
					.then((response) => response.json())
					.then((topStory) => {
						topStory.count = startIndex+1;
						rowsData.push(topStory);
						startIndex++;
						iterateAndFetch();
					})
					.done();
			}
			else {
				callback(rowsData);
				return;
			}
		}
		//iterateAndFetch();
		callback(topStoryIDs);
		this.setState({lastIndex: endIndex});
	}
	selectRow = (row, pushNavBarTitle) => {
		this.props.navigator.push({
			id: 'Post',
			title: pushNavBarTitle+' #'+row.count,
			post: row,
		});
	}
}


var styles = StyleSheet.create({
    container: {
      flex: 1
    },
    toolbar: {
      height: 56,
      backgroundColor: '#FF6600'
    },
    rowContainer:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowCount: {
        fontSize: 20,
        textAlign: 'right',
        color: 'gray',
        margin: 10,
        marginLeft: 15,
    },
    rowDetailsContainer: {
        flex: 1,
    },
    rowTitle: {
        fontSize: 15,
        textAlign: 'left',
        marginTop: 10,
        marginBottom: 4,
        marginRight: 10,
        color: '#FF6600'
    },
    rowDetailsLine: {
        fontSize: 12,
        marginBottom: 10,
        color: 'gray',
    },
    separator: {
        height: 1,
        backgroundColor: '#CCCCCC'
    } 
});