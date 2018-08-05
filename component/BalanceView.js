import React, { Component } from 'react';
import { View, FlatList, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'
import AWIcon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import _ from 'lodash';

import eos from '../library/eos';
const account_name = 'robinsonpark';

export default class BalanceView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      my_balance: '0.0000 WIZ',
      account_histories: []
    };

    this._onPressClose = this._onPressClose.bind(this);
    this.setBalance = this.setBalance.bind(this);

    eos.getBalance(account_name, (res) => {
      this.setBalance(res);
    }, (err) => {
      this.setBalance('0.0000 WIZ');
    });

    eos.getAccountHistory(account_name, (account_histories) => {
      var sorted = _.sortBy(account_histories, ['blockId'], [false])
      this.setState({
        account_histories: sorted
      });
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
    const { my_balance, account_histories } = this.state;
    console.log(account_histories);

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
          <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <AWIcon name="user" size={30} />
            <Text>{ account_name }</Text>
            <Text style={{fontSize: 25, marginTop: 20, fontWeight: 'bold'}}>{ my_balance }</Text>
          </View>
          <View style={{flex: 1, marginTop: 20, padding: 20}}>
            <FlatList
              data={ account_histories ? account_histories : [] }
              renderItem={({item}) => (
                <View style={{
                  backgroundColor: '#fff',
                  marginBottom: 10,
                  minHeight: 44,
                  justifyContent: 'center',
                  padding: 5

                }} key={item.id}>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{fontWeight: 'bold'}}>{item.data.quantity}</Text>
                    <Text style={{fontWeight: 'normal', color:'#999', fontSize: 11}}>#{item.blockId}</Text>
                  </View>
                  <View>
                    <Text>{item.data.memo}</Text>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      </SafeAreaView>
    )
  }
}
