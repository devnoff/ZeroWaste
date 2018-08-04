import React, { Component } from 'react';
import { View, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'

export default class BalanceView extends Component {

  constructor(props) {
    super(props);

  }

  _onPressClose() {
    this.props.navigation.navigate('Home')
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{height: 50, flexDirection: 'row'}}>
          <View style={{flex: 1, height: 50, alignItems: 'flex-end', justifyContent: 'center'}}>
            <TouchableOpacity style={{marginRight: 20}} onPress={this._onPressClose.bind(this)}>
              <Icon name="x" size={20}/>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 1, backgroundColor: 'blue'}}>
          <Text>Balance</Text>
        </View>
      </SafeAreaView>
    )
  }
}
