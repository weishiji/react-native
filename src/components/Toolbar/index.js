'use strict';

import React, {Component,PropTypes} from 'react';

import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableHighlight,
	ToolbarAndroid,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  title: string,
  decrement: Function,
  increment: Function,
}

const Toolbar = (props: Props) => {
  const { value, decrement, increment } = props
  //onIconClicked={props.drawer.pop()}
  return (
    <Ionicons.ToolbarAndroid
      title="Home"
      titleColor="white"
      navIconName="md-arrow-back"

      actions={[
        { title: 'Settings', iconName: 'md-settings', iconSize: 30, show: 'always' },
        { title: 'Follow me on Twitter', iconName: 'logo-twitter', iconColor: "#4099FF", show: 'ifRoom' },
      ]}
      overflowIconName="md-more"
    />
  )
}

Toolbar.defaultProps = {
  title: 'Stylewe',
}

export default Toolbar
