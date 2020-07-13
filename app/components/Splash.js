import React, {Component} from 'react';
import {View, Text, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export default class Splash extends Component {

  componentDidMount = () => {
    setTimeout(() => {
      this.props.navigation.navigate('Home');
    }, 3000);
  }

  render() {
    return (
      <View style={{flex: 1, width, height, backgroundColor: '#00cc99'}}>
        <Text>{'splash'}</Text>
      </View>
    );
  }
}
