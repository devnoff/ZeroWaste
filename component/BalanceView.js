import React, { Component } from 'react';
import { View, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'

import eos from '../library/eos';
const account_name = 'robinsonpark';

export default class BalanceView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      my_balance: '0.0000 WIZ'
    };

    this._onPressClose = this._onPressClose.bind(this);
    this.setBalance = this.setBalance.bind(this);

    eos.getBalance(account_name, (res) => {
      this.setBalance(res);
    }, (err) => {
      this.setBalance('0.0000 WIZ');
    });
  }

  setBalance(balance) {
    console.log(balance);
    this.setState({
      my_balance: balance
    });
  }

  _onPressClose() {
    this.props.navigation.navigate('Home')
  }

  render() {
    const { my_balance } = this.state;

    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{height: 50, flexDirection: 'row'}}>
          <View style={{flex: 1, height: 50, alignItems: 'flex-end', justifyContent: 'center'}}>
            <TouchableOpacity style={{marginRight: 20}} onPress={this._onPressClose}>
              <Icon name="x" size={20}/>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 1}}>
          <Text>Balance is { my_balance }</Text>
        </View>
      </SafeAreaView>
    )
  }
}
