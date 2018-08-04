import React, { Component } from 'react';
import { AppState, View, StatusBar, SafeAreaView, AppRegistry, Text, Button, TouchableOpacity } from 'react-native';
import RNCamera from 'react-native-camera';

var __detected = false;

export default class CameraView extends Component {
	constructor(props) {
		super(props);
		this.camera = null;
		this.barcodeCodes = [];

		this.state = {
			camera: {
				aspect: RNCamera.constants.Aspect.fill,
				captureTarget: RNCamera.constants.CaptureTarget.cameraRoll,
				type: RNCamera.constants.Type.back,
				orientation: RNCamera.constants.Orientation.auto,
				flashMode: RNCamera.constants.FlashMode.auto,
				barcodeFinderVisible: true
			},
			appState: 'active'
		};
	}

	componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

	_handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!')
    } else {

    }
    this.setState({appState: nextAppState});
  }

  _handleDetectBarcode(code) {
    this.props.navigation.navigate('Info', {
      code: code
    });
    setTimeout(function() {
      __detected = false;
    }, 1000)
  }

  _onPressBalance() {
    console.log('pressed balance button');
    this.props.navigation.navigate('Balance');
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
		const { appState } = this.state;
		const styles = this.defaultStyles();
		return (
			<SafeAreaView style={styles.container}>
				<StatusBar
			     backgroundColor="black"
			     barStyle="light-content"
			  />
				<View style={styles.balanceBox}>
					<TouchableOpacity style={styles.balanceButton} onPress={this._onPressBalance.bind(this)}>
						<Text style={styles.balanceText}>
							100000.00 WIZ
						</Text>
					</TouchableOpacity>
				</View>
				{ appState === 'active'
				? <RNCamera
						ref={cam => {
							this.camera = cam;
						}}
						style={styles.preview}
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
					/>
			  : <View style={{flex: 1}}></View> }
				<View style={[styles.overlay, styles.topOverlay]}>
					<Text style={styles.scanScreenMessage}>Please scan the barcode.</Text>
				</View>
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
				backgroundColor: 'red',
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
				flex: 1,
				justifyContent: 'flex-end',
				alignItems: 'center'
			},
			overlay: {
				padding: 16,
				top: 0,
				right: 0,
				left: 0,
				alignItems: 'center'
			},
			topOverlay: {
				top: 0,
				flex: 1,
				flexDirection: 'row',
				justifyContent: 'space-between',
				alignItems: 'center'
			},
			bottomOverlay: {
				bottom: 0,
				backgroundColor: 'rgba(0,0,0,0.4)',
				flexDirection: 'row',
				justifyContent: 'center',
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
			}
		};
	}
}
