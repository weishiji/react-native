/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';


class AwesomeProject extends Component {
  constructor(props){
    super(props);
    this.state = {
      'product' : {}
    };
  }
  componentWillMount(){
    this.fetchData();
  }
  fetchData(){
    fetch('http://www.stylewe.com/rest/product/716')
      .then((response) => response.json())
      .then((dt) => {
        this.setState({'product' : dt})
      }).done();
  }
  render() {
    return (<View style={styles.container}>
      <ScrollableTabView initialPage={0} renderTabBar={() => <ScrollableTabBar />}>
        <Text tabLabel='Tab #1'>My</Text>
        <Text tabLabel='Tab #2'>favorite</Text>
        <Text tabLabel='Tab #3'>project</Text>
        <Text tabLabel='Tab #4'>favorite</Text>
        <Text tabLabel='Tab #5'>project</Text>
      </ScrollableTabView>
    </View>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
