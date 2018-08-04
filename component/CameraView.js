import React, { Component } from 'react';
import { AppState, View, StatusBar, SafeAreaView, AppRegistry, Text, Button, TouchableOpacity, Animated } from 'react-native';
import RNCamera from 'react-native-camera';
import OnLayout from 'react-native-on-layout';
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
import numeral from 'numeral';


const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '163ff5e16025415db9860580d29e505d'
});

const MODE_BARCODE = 'MODE_BARCODE';
const MODE_IR = 'MODE_IR';

var {height, width} = Dimensions.get('window');

var __detected = false;

export default class CameraView extends Component {
	constructor(props) {
		super(props);
		this.camera = null;
		this.barcodeCodes = [];

		this.state = {
			camera: {
				aspect: RNCamera.constants.Aspect.fill,
				captureTarget: RNCamera.constants.CaptureTarget.temp,
				type: RNCamera.constants.Type.back,
				orientation: RNCamera.constants.Orientation.auto,
				flashMode: RNCamera.constants.FlashMode.auto,
				barcodeFinderVisible: true
			},
			appState: 'active',
      cameraMode: MODE_BARCODE,
      fade: new Animated.Value(0.3)
		};
	}

	componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _showCapturebutton() {
    Animated.sequence([
      Animated.delay(100), // Option
      Animated.parallel([
        Animated.timing(
          this.state.fade,
          {
            toValue: 1,
            duration: 200,
          }
        )
      ])
    ]).start()
  }

  _hideCaptureButton() {
    Animated.sequence([
      Animated.delay(0), // Option
      Animated.parallel([
        Animated.timing(
          this.state.fade,
          {
            toValue: 0.3,
            duration: 200,
          }
        )
      ])
    ]).start()
  }

	_handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!')
    } else {

    }
    this.setState({appState: nextAppState});
  }

  _predictPhoto() {

  }

  _handleDetectBarcode(code) {
    this.camera.capture()
      .then((data) => {
        console.log(data)
        this.props.navigation.navigate('Info', {
          code: code,
          photo: data
        });

        setTimeout(function() {
          __detected = false;
        }, 1000)
      })
      .catch(err => {
        console.error(err)
        setTimeout(function() {
          __detected = false;
        }, 1000)
      });
  }

  _onPressBalance() {
    console.log('pressed balance button');
    this.props.navigation.navigate('Balance');
  }

  _onPressBarcodeMode() {
    this.setState({
      cameraMode: MODE_BARCODE
    });

    this._hideCaptureButton();
  }

  _onPressIrMode() {
    this.setState({
      cameraMode: MODE_IR
    });

    this._showCapturebutton();
  }

  _onPressCapture() {

    console.log('capture');

    this.camera.capture()
      .then((data) => {
        console.log(data)
      })
      .catch(err => {
        console.error(err)
      });
  }

  _onPressLearn() {
    this.camera.capture()
      .then((data) => {
        console.log(data)
      })
      .catch(err => {
        console.error(err)
      });
  }

	onBarCodeRead(scanResult) {
    if (__detected) return;

		console.log(scanResult.type);
		console.log(scanResult.data);
		if (scanResult.data != null) {
      this._handleDetectBarcode(scanResult.data);
			__detected = true;
		}
		return;
	}

	render() {
		const { appState, cameraMode, fade } = this.state;
		const styles = this.defaultStyles();
		return (
			<SafeAreaView style={styles.container}>
        <StatusBar
			     backgroundColor="black"
			     barStyle="light-content"
			  />
        <OnLayout style={{flex: 1}}>
          {({ width, height}) => (
            <View style={{flex: 1}}>
              <View style={styles.balanceBox}>
      					<TouchableOpacity style={styles.balanceButton} onPress={this._onPressBalance.bind(this)}>
      						<Text style={styles.balanceText}>
      							<Icon name="user" size={16} /> {numeral(100000).format('0,0.00')} WIZ
      						</Text>
      					</TouchableOpacity>

                <TouchableOpacity style={{padding: 5, marginTop: 10}} onPress={this._onPressLearn.bind(this)}>
      						<Text style={{color: 'blue'}}>
                    Learn
      						</Text>
      					</TouchableOpacity>
      				</View>
      				{ appState === 'active'
      				? <RNCamera
      						ref={cam => {
      							this.camera = cam;
      						}}
      						style={[styles.preview, {height: width * 1.33333}]}
      						aspect={this.state.camera.aspect}
      						captureTarget={this.state.camera.captureTarget}
      						type={this.state.camera.type}
      						flashMode={this.state.camera.flashMode}
      						onFocusChanged={() => {}}
      						onZoomChanged={() => {}}
      						defaultTouchToFocus
      						mirrorImage={false}
      						barcodeFinderVisible={this.state.camera.barcodeFinderVisible}
      						barcodeFinderWidth={280}
      						barcodeFinderHeight={220}
      						barcodeFinderBorderColor="red"
      						barcodeFinderBorderWidth={2}
      						onBarCodeRead={this.onBarCodeRead.bind(this)}
                  playSoundOnCapture={false}
      					/>
      			  : <View style={[styles.preview, {height: width * 1.33333}]}></View> }
      				<View style={[styles.overlay, styles.bottomOverlay]}>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={[{marginRight: 5}, styles.modeButton, cameraMode === MODE_BARCODE ? styles.selectedBox : undefined]}
                    onPress={this._onPressBarcodeMode.bind(this)}
                  >
                    <Text style={[{
                      color: '#999',
                      fontWeight: '500'
                    }, cameraMode === MODE_BARCODE ? styles.selectedText : undefined]}>Barcode</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[{marginLeft: 5}, styles.modeButton, cameraMode === MODE_IR ? styles.selectedBox : undefined]}
                    onPress={this._onPressIrMode.bind(this)}
                  >
                    <Text style={[{
                      color: '#999',
                      fontWeight: '500'
                    }, cameraMode === MODE_IR ? styles.selectedText : undefined]}>Image Recognition</Text>
                  </TouchableOpacity>
                </View>
                <Animated.View style={{padding: 10, opacity: fade}}>
                  <TouchableOpacity onPress={this._onPressCapture.bind(this)} disabled={cameraMode === MODE_BARCODE}>
                    <Icon name="circle" color="white" size={70} />
                  </TouchableOpacity>
                </Animated.View>
      				</View>
            </View>
          )}
				</OnLayout>
			</SafeAreaView>
		);
	}
	defaultStyles() {
		return {
			container: {
				flex: 1,
				backgroundColor: 'black'
			},
			balanceBox: {
				flex: 1,
				backgroundColor: 'black',
				justifyContent: 'center',
				alignItems: 'center'
			},
			balanceButton: {
				minWidth: 100,
				backgroundColor: 'orange',
				padding: 5,
				borderRadius: 5,
				borderColor: 'orange',
			},
			balanceText: {
				textAlign: 'center',
			},

			preview: {
				justifyContent: 'flex-end',
				alignItems: 'center'
			},
			overlay: {
				// padding: 16,
				top: 0,
				right: 0,
				left: 0,
				alignItems: 'center'
			},
			topOverlay: {
				top: 0,
				flexDirection: 'row',
				justifyContent: 'space-between',
				alignItems: 'center'
			},
			bottomOverlay: {
			  paddingTop: 5,
        flex: 1,
				backgroundColor: 'black',
				flexDirection: 'column',
				justifyContent: 'flex-start',
				alignItems: 'center'
			},
			enterBarcodeManualButton: {
				padding: 15,
				backgroundColor: 'white',
				borderRadius: 40
			},
			scanScreenMessage: {
				fontSize: 14,
				color: 'white',
				textAlign: 'center',
				alignItems: 'center',
				justifyContent: 'center'
			},
      modeButton: {
        padding: 3,
        borderBottomColor: 'orange'
      },
      selectedBox: {
        borderBottomWidth: 1.5
      },
      selectedText: {
        fontWeight: '500',
        color: 'orange'
      }
		};
	}
}
