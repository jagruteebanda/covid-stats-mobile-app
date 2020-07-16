import React from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const {width} = Dimensions.get('window');

const AppBar = (props) => {
  return (
    <View style={styles.appBarView}>
      <Icon name={'chart-line'} size={20} color={'#fff'} />
      <Text style={styles.appName}>{'COVID-19 Stats'}</Text>
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
    backgroundColor: '#0d0d0d',
    elevation: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#33ccff',
  },
  appName: {
    fontFamily: 'SourceSansPro-SemiBold',
    fontSize: 20,
    color: '#ffffff',
    marginLeft: 8,
  },
});

export default AppBar;
