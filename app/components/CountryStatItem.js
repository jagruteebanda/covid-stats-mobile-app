import React from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

const CountryStatItem = ({item, index}) => {
  return (
    <View
      key={`stat_${index}`}
      style={[
        styles.countryStatItemView,
        {
          backgroundColor: index === 0 ? '#99ffcc' : '#1a1a1a',
        },
      ]}>
      <View style={styles.countryStatCell}>
        <Text
          style={[
            styles.countryStatItemText,
            {color: index === 0 ? '#333333' : '#33cccc'},
          ]}>
          {item.Country}
        </Text>
      </View>
      <View style={styles.countryStatCell}>
        <Text
          style={[
            styles.countryStatItemText,
            {color: index === 0 ? '#333333' : '#ff3300'},
          ]}>
          {item.TotalConfirmed}
        </Text>
      </View>
      <View style={styles.countryStatCell}>
        <Text
          style={[
            styles.countryStatItemText,
            {color: index === 0 ? '#333333' : '#00cc00'},
          ]}>
          {item.TotalRecovered}
        </Text>
      </View>
      <View style={styles.countryStatCell}>
        <Text
          style={[
            styles.countryStatItemText,
            {color: index === 0 ? '#333333' : '#979797'},
          ]}>
          {item.TotalDeaths}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  countryStatItemView: {
    flex: 1,
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    marginBottom: 2,
    width: width - 16,
  },
  countryStatCell: {
    justifyContent: 'center',
    height: 50,
    width: (width - 16) / 4,
  },
  countryStatItemText: {
    fontFamily: 'SourceSansPro-Regular',
    textAlign: 'center',
    padding: 4,
  },
});

export default CountryStatItem;
