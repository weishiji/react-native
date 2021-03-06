# react-native-redux-starter-kit-Stylewe
[![Dependency Status](https://david-dm.org/LeoLeBras/react-native-redux-starter-kit.svg?style=flat)](https://david-dm.org/LeoLeBras/react-native-redux-starter-kit)
[![devDependency Status](https://david-dm.org/LeoLeBras/react-native-redux-starter-kit/dev-status.svg?style=flat)](https://david-dm.org/LeoLeBras/react-native-redux-starter-kit#info=devDependencies)

A starter boilerplate for a mobile app using React Native and Redux.

## Requirements
- [Node](https://nodejs.org) `4.x` or newer
- [React Native](http://facebook.github.io/react-native/docs/getting-started.html) for development
- [Xcode](https://developer.apple.com/xcode/) for iOS development
- [Android SDK](https://developer.android.com/sdk/) for Android development
- [Android Lollipop](https://www.android.com/versions/lollipop-5-0/) or better for Android device testing

See [Getting Started](https://facebook.github.io/react-native/docs/getting-started.html) to install requirement tools.

## Stack
- [React Native](https://facebook.github.io/react-native/) `0.26.0` for building native apps using react
- [Redux](http://rackt.github.io/redux/index.html) `3.5.x` a predictable state container for Javascript apps
- [Babel](http://babeljs.io/) `6.x.x` for ES6+ support
- [Immutable](https://facebook.github.io/immutable-js/) Immutable persistent data collections for Javascript
- [React Native Router Flux](https://github.com/aksonov/react-native-router-flux) a router based on new React Native Navigation API
- [Flow](http://flowtype.org/) adds static typing to JavaScript to improve developer productivity and code quality.
- [apisauce](https://github.com/skellock/apisauce) HTTP REQUEST
- [react-native-vector-icons]https://github.com/oblador/react-native-vector-icons ICON FONT

## Make the awesome
Just clone the repo
and start :
```shell
$ git clone https://github.com/LeoLeBras/react-native-redux-starter-kit.git myAwesomeApp
$ cd myAwesomeApp
$ npm i                         # Install Node.js components listed in ./package.json
```

### How to use ?
```shell
$ npm start                     # or: node_modules/react-native/packager/packager.sh
```
This will start a lightweight development server.

###### iOS:
Open `App.xcodeproj` in Xcode, build and run the project.

###### Android:
```shell
$ npm run android-setup-port    # adb reverse tcp:8081 tcp:8080
```
Start your emulator or connect your device.

## Debugging
[Access the in-app developer menu](https://facebook.github.io/react-native/docs/debugging.html) and select ``Debug in Chrome``.

#### Run Reactotron
```shell
$ npm run reactotron
```

![](https://github.com/skellock/reactotron/blob/master/images/Reactotron.gif)

See the [Reacotron docs](https://github.com/skellock/reactotron) for more features.

## Create a release build
* Navigate to Product > Scheme > Edit Scheme... in Xcode and change Build Configuration to *Release*.
* Run in terminal :

###### iOS:
```shell
$ npm run build-ios
```
###### Android:
```shell
$ npm run build-android
```

* Open ios/Wino/AppDelegate.m, comment line 34 and uncomment line 44.
* Press "Build and run" and :boom: !

## Issues
If you run into any issues please see the [Getting Started](http://facebook.github.io/react-native/docs/getting-started.html) guide for React Native before submitting an issue.
