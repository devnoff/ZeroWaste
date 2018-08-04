import React, { Component } from 'react';
import { StyleSheet, View, SafeAreaView, Text, TouchableOpacity, Image, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'

import eos from '../library/eos';
const account_name = 'robinsonpark';

export default class InfoView extends Component {

  state = {
    code: this.props.navigation.getParam('code', ''),
    photo: this.props.navigation.getParam('photo', null),
  }

  constructor(props) {
    super(props);

    this.state = {
      account_histories: []
    };

    console.log(this.props.navigation.getParam('photo', null))

    eos.getAccountHistory(account_name, (res) => {
      console.log('account_histories', res);
      this.setState({
        account_histories
      });
    });
  }

  _onPressClose() {
    this.props.navigation.navigate('Home')
  }

  render() {
    const {
      code,
      photo
    } = this.state

    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{height: 50, flexDirection: 'row'}}>
          <View style={{flex: 1, height: 50, alignItems: 'flex-end', justifyContent: 'center'}}>
            <TouchableOpacity style={{marginRight: 20}} onPress={this._onPressClose.bind(this)}>
              <Icon name="x" size={20}/>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{height: 100, backgroundColor: 'white', flexDirection: 'row', padding: 10}}>
          <Image source={{uri: photo.path}} style={{width: 60, height: 60*1.33}} />
          <View style={{flexDirection: 'column', justifyContent: 'center', paddingLeft: 10}}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>{code}</Text>
            <Text>Coca Cola Company</Text>
            <Text>Manufactured in NSW, Australia</Text>
          </View>
        </View>
        <View style={{flex: 1, backgroundColor: '#efefef', padding: 20}}>
          <View style={{
            width: '100%',
            backgroundColor: 'orange',
            alignItems: 'center',
            padding: 10,
            paddingVertical: 40,
            borderRadius: 10
          }}>
            <Text style={{
              fontSize: 42,
              fontWeight: '600',
              color: 'rgba(0,0,0,0.5)',
              shadowColor: '#fff',
              // shadowOffset: { width: 1, height: 1 },
              // shadowOpacity: 1,
              // shadowRadius: 0,
            }}>10 WIZ</Text>
            <Text style={{fontSize: 20, fontWeight: '600', color: '#333'}}>REWARD</Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <TouchableOpacity style={[styles.button, styles.left]}>
              <Text style={styles.buttonText}>Add to Wallet</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.right]}>
              <Image source={{uri: 'http://www.wwf.org.au/ecThemes/3/Images/wwf-logo.svg'}} />
              <Text style={styles.buttonText}>Donate</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 5
  },
  buttonText: {
    color: 'white',
    textAlign: 'center'
  },
  left: {
    backgroundColor: 'red',
    marginRight: 5
  },
  right: {
    backgroundColor: 'blue',
    marginLeft: 5
  }
});
