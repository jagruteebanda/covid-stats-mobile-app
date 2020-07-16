import React, {Component} from 'react';
import {View, Text, Dimensions, StyleSheet, Image} from 'react-native';

const {width, height} = Dimensions.get('window');

export default class Splash extends Component {
  componentDidMount = () => {
    setTimeout(() => {
      this.props.navigation.navigate('Home');
    }, 3000);
  };

  render() {
    return (
      <View style={styles.splashView}>
        <Image style={styles.image} source={require('../images/logo.png')} />
        <Text style={styles.appTitle}>{'COVID-19 Stats'}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  splashView: {
    flex: 1,
    width,
    height,
    backgroundColor: '#262626',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {width: 150, height: 150},
  appTitle: {
    fontFamily: 'SourceSansPro-SemiBold',
    fontSize: 20,
    color: '#ffffff',
    marginTop: 10,
  },
});
