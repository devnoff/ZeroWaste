import React, { Component } from 'react';
import { Alert, StyleSheet, View, SafeAreaView, Text, TouchableOpacity, Image, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import SvgUri from 'react-native-svg-uri';

import eos from '../library/eos';
const account_name = 'robinsonpark';


const __preset = {
  '9300675009829': {
    number: '9300675009829',
    product: 'Coca Cola',
    company: 'Coca Cola Company',
    location: 'Sydney NSW Australia'
  },
  '93435697': {
    product: 'The Juice Farm',
    company: 'The Juice Farm',
    location: 'Marrickville NSW Australia'
  },
  '9300624005377': {
    product: 'Mount Franklin',
    company: 'Australian Spring Water',
    location: 'Northmead NSW Australia'
  },
  'Plastic Bottle': {
    product: 'Plastic Bottle',
    company: 'Plastic Bottle',
    location: 'n/a'
  }
}

export default class InfoView extends Component {

  state = {
    code: this.props.navigation.getParam('code', ''),
    photo: this.props.navigation.getParam('photo', null),
  }

  constructor(props) {
    super(props);

    console.log(this.props.navigation.getParam('photo', null))
  }

  _onPressClose() {
    this.props.navigation.navigate('Home')
  }

  _onPressDonate() {
    this.props.navigation.navigate('Web', {url: 'https://donate.wwf.org.au/donate'})
  }

  _onPressAdd() {
    eos.take(() => {
      Alert.alert(
        'Thank You!',
        '',
        [
          {text: 'Cool :)', onPress: () => {this.props.navigation.navigate('Home')}},
        ],
        { cancelable: false }
      )
    }, (err) => {
      console.log(err)
    })
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
            <TouchableOpacity style={{marginRight: 20, paddingVertical: 10, paddingLeft: 20}} onPress={this._onPressClose.bind(this)}>
              <Icon name="x" size={20}/>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{height: 100, backgroundColor: 'white', flexDirection: 'row', padding: 10}}>
          <Image source={{uri: photo.path}} style={{width: 60, height: 60*1.33}} />
          <View style={{flexDirection: 'column', justifyContent: 'center', paddingLeft: 10}}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>{code}</Text>
            <Text>{__preset[code].company}</Text>
            <Text>{__preset[code].location}</Text>
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
            <TouchableOpacity style={[styles.button, styles.left]} onPress={this._onPressAdd.bind(this)}>
              <Text style={styles.buttonText}>Add to Wallet</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.right]} onPress={this._onPressDonate.bind(this)}>
              {/* <SvgUri source={{uri: 'http://www.wwf.org.au/ecThemes/3/Images/wwf-logo.svg'}} /> */}
              <Text style={[styles.buttonText, {color: '#666'}]}>Donate</Text>
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
    padding: 15,
    borderRadius: 5
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  left: {
    backgroundColor: 'red',
    marginRight: 5
  },
  right: {
    borderColor: '#999',
    borderWidth: 1,
    backgroundColor: 'white',
    marginLeft: 5
  }
});
