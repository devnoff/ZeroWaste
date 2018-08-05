import React, { Component } from 'react';
import { View, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'

export default class LearnView extends Component {

  state = {
    code: this.props.navigation.getParam('code', '')
  }

  constructor(props) {
    super(props);


  }

  _onPressClose() {
    this.props.navigation.navigate('Home')
  }

  render() {
    const {
      code
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
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <Text>Info View</Text>
          <Text>Code: {code}</Text>
        </View>
        <View style={{flex: 1, backgroundColor: 'blue'}}>

        </View>
      </SafeAreaView>
    )
  }
}
