import React from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';

const {width} = Dimensions.get('window');

const AppBar = (props) => {
  return (
    <View style={styles.appBarView}>
      {/* <View style={{padding: 18, marginLeft: 8}}>
        <Text style={{fontSize: 16, opacity: 0}}>{'<'}</Text>
      </View> */}
      <Text
        style={styles.appName}>
        {'COVID-19 Stats'}
      </Text>
      {/* <TouchableOpacity onPress={() => handleFilterPopup()}>
        <View style={{padding: 16, marginRight: 8, opacity: 0}}>
          <Text style={{fontSize: 16}}>{'='}</Text> */}
      {/* <Icon name={"sliders-h"} size={30} color="#900" /> */}
      {/* </View>
      </TouchableOpacity> */}
    </View>
  );
};



const styles = StyleSheet.create({
  appBarView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width,
    height: 50,
    backgroundColor: '#00cc99',
    elevation: 2,
  },
  appName: {
    fontFamily: 'SourceSansPro-SemiBold',
    fontSize: 20,
    color: '#ffffff',
  }
});

export default AppBar;
