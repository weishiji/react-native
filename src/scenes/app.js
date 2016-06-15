/* @flow */

import React from 'react'
import {BackAndroid,ToastAndroid,} from 'react-native';
import { Actions, Scene } from 'react-native-router-flux'
import { styles } from '@components/NavigationBar'
import LauchContainer from '@containers/LauchContainer'
import CounterContainer from '@containers/CounterContainer'


BackAndroid.addEventListener('hardwareBackPress', function() {
	console.log(Actions,'this is actions')
	try {
		Actions.pop();
       return true;
   }
   catch (err) {
       ToastAndroid.show("Cannot pop. Exiting the app...", ToastAndroid.SHORT);
       return true;
   }
});
const scenes = Actions.create(
  <Scene key="app" navigationBarStyle={styles.container}>
    <Scene key="welcome" component={LauchContainer} title="Welcome" />
    <Scene key="counter" component={CounterContainer} title="Counter" />
  </Scene>
)

export default scenes
