/* @flow */
//
// import React from 'react'
// import {BackAndroid,ToastAndroid,} from 'react-native';
// import { Actions, Scene } from 'react-native-router-flux'
// import { styles } from '@components/NavigationBar'
// import LauchContainer from '@containers/LauchContainer'
// import CounterContainer from '@containers/CounterContainer'


import React from 'react';
import {AppRegistry, Navigator, StyleSheet, Text, View,BackAndroid,ToastAndroid,} from 'react-native';
import Button from "react-native-button";

// 迁移
import Home from '@containers/HomeContainer';


import Launch from './Example/Launch'
import Register from './Example/Register'
import Login from './Example/Login'
import Login2 from './Example/Login2'
import Login3 from './Example/Login3'
import {Scene, Reducer, Router, Switch, TabBar, Modal, Schema, Actions} from 'react-native-router-flux'
import Error from './Example/Error'
//import Home from './Example/Home'
import TabView from './Example/TabView'
import EchoView from './Example/EchoView'




class TabIcon extends React.Component {
    render(){
        return (
            <Text style={{color: this.props.selected ? "red" :"black"}}>{this.props.title}</Text>
        );
    }
}

class Right extends React.Component {
    render(){
        return <Text style={{
        width: 80,
        height: 37,
        position: "absolute",
        bottom: 4,
        right: 2,
        padding: 8,
    }}>Right</Text>
    }
}

const styles = StyleSheet.create({
    container: {flex:1, backgroundColor:"transparent",justifyContent: "center",
        alignItems: "center",}

});

const reducerCreate = params=>{
    const defaultReducer = Reducer(params);
    return (state, action)=>{
        console.log("ACTION:", action);
        return defaultReducer(state, action);
    }
};

// define this based on the styles/dimensions you use
const getSceneStyle = function (/* NavigationSceneRendererProps */ props, computedProps) {
  const style = {
    flex: 1,
    backgroundColor: '#fff',
    shadowColor: null,
    shadowOffset: null,
    shadowOpacity: null,
    shadowRadius: null,
  };
  if (computedProps.isActive) {
    style.marginTop = computedProps.hideNavBar ? 0 : 64;
    style.marginBottom = computedProps.hideTabBar ? 0 : 50;
  }
  return style;
};

let currentSwitchPage = 'text1';

const SwitcherPage = function (props) {
    return (
        <View>
            <Text style={{marginTop:100,textAlign:'center'}}>current page: {props.text}</Text>
            <Button
                onPress={() => {
                    currentSwitchPage = currentSwitchPage === 'text1' ? 'text2' : 'text1';
                    Actions.refresh({key: 'switcher'});
                }}
            >
              Switch!
            </Button>
            <Button
                onPress={() => {
                    Actions.launch({type:'reset'});
                }}
            >
                Exit
            </Button>
        </View>
    );
}


BackAndroid.addEventListener('hardwareBackPress', function() {
	try {
		Actions.pop();
       return true;
   }
   catch (err) {
       ToastAndroid.show("Cannot pop. Exiting the app...", ToastAndroid.SHORT);
       return true;
   }
});
// const scenes = Actions.create(
//   <Scene key="app" navigationBarStyle={styles.container}>
//     <Scene key="welcome" component={LauchContainer} title="Welcome" hideNavBar={true} />
//     <Scene key="counter" component={CounterContainer} title="Counter" hideNavBar={false} />
//     <Scene key="category" component={CounterContainer} />
//   </Scene>
// )
console.log(TabIcon,'this is what')
const scenes = Actions.create(
	<Router key='appRouter' createReducer={reducerCreate} getSceneStyle={getSceneStyle}>
		<Scene key="modal" component={Modal}>
	    <Scene key="root" hideNavBar hideTabBar>
	        <Scene key="echo" clone component={EchoView} getTitle={(navState) => navState.key} />
	        <Scene key="switcher" component={Switch} selector={(props) => {
	            return 'text1';
	        }}>
	            <Scene key="text1" text="text1" component={(props) => <SwitcherPage {...props} text={currentSwitchPage} />} />
	            <Scene key="text2" text="text2" component={(props) => <SwitcherPage {...props} text={currentSwitchPage} />} />
	        </Scene>
	        <Scene key="register" component={Register} title="Register"/>
	        <Scene key="register2" component={Register} title="Register2" duration={1}/>
	        <Scene key="home" component={Home} title="Replace" type="replace"/>
	        <Scene key="launch" component={Launch} title="Launch" />
	        <Scene key="login" direction="vertical"  >
	            <Scene key="loginModal" direction="vertical" component={Login} title="Login"/>
	            <Scene key="loginModal2" hideNavBar={true} component={Login2} title="Login2" panHandlers={null} duration={1}/>
	            <Scene key="loginModal3" hideNavBar={true} component={Login3} title="Login3" panHandlers={null} duration={1}/>
	        </Scene>
	        <Scene key="tabbar" component={Home} initial={true}>
	            <Scene key="main" tabs={true} >
	                <Scene key="tab1" initial={true}  title="Home" icon={TabIcon} navigationBarStyle={styles.container} titleStyle={{color:"white"}}>
	                    <Scene key="tab1_1" component={TabView} title="Dress" onRight={()=>alert("Right button")} rightTitle="Right" />
	                    <Scene key="tab1_2" component={TabView} title="Tops" titleStyle={{color:"black"}}/>
	                </Scene>
	                <Scene key="tab2" title="Tab #2" icon={TabIcon}>
	                    <Scene key="tab2_1" component={TabView} title="Tab #2_1" renderRightButton={()=><Right/>} />
	                    <Scene key="tab2_2" component={TabView} title="Tab #2_2" hideBackImage onBack={()=>alert("Left button!")} backTitle="Left" duration={1} panHandlers={null}/>
	                </Scene>
	                <Scene key="tab3" component={TabView} title="Tab #3" icon={TabIcon}/>
	                <Scene key="tab4" component={TabView} title="Tab #4" hideNavBar={false} icon={TabIcon}/>
	                <Scene key="tab5" component={TabView} title="Tab #5" hideTabBar={false} hideNavBar={true} icon={TabIcon}/>
	            </Scene>
	        </Scene>
	    </Scene>
	    <Scene key="error" component={Error}/>
  </Scene>
</Router>
)
export default scenes
