import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import CameraView from './component/CameraView';
import InfoView from './component/InfoView';
import BalanceView from './component/BalanceView';
import LearnView from './component/LearnView';
import WebView from './component/WebView';

const RootStack = createStackNavigator(
	{
	  Home: {
	    screen: CameraView
	  },
		Info: {
			screen: InfoView
		},
		Balance: {
			screen: BalanceView
		},
		Learn: {
			screen: LearnView
		},
		Web: {
			screen: WebView
		}
	},
	{
		mode: 'modal',
		headerMode: 'none'
	}
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
