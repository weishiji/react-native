import React from 'react';
import {PropTypes} from "react";
import {StyleSheet, Text, View} from "react-native";
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';
import Toolbar from '@components/Toolbar';

const contextTypes = {
  drawer: React.PropTypes.object,
};

const propTypes = {
  name: PropTypes.string,
  sceneStyle: View.propTypes.style,
  title: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    borderColor: 'red',
  },
});

const HomeView = (props, context) => {
  const drawer = context.drawer;
  return (
    <View style={[styles.container, props.sceneStyle ]}>
      <Toolbar drawer={drawer} />
      <Text>Tab {props.title}</Text>
      <Button onPress={Actions.pop}>Back</Button>
      <Button onPress={() => { drawer.open(); }}>Call left Menu</Button>
    </View>
  );
};

HomeView.contextTypes = contextTypes;
HomeView.propTypes = propTypes;

export default HomeView;
