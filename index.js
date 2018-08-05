/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

if (process.env.NODE_ENV == 'development') {
  
} else {
  console.log = ()=>{}
  console.warn = ()=>{}
}

AppRegistry.registerComponent(appName, () => App);
