import React from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

const CountryStatItem = ({item, index, userLocation}) => {
  if (item) {
    return (
      <View
        key={`stat_${index}`}
        style={[
          styles.countryStatItemView,
          {
            borderWidth: index === '_0' ? 1 : 0,
            borderBottomColor: index === '_0' ? '#33ccff' : null,
            backgroundColor:
              item.Country === userLocation ? '#99ffcc' : '#1a1a1a',
          },
        ]}>
        <View style={styles.countryStatCell}>
          <Text
            numberOfLines={2}
            style={[
              styles.countryStatItemText,
              {color: item.Country === userLocation ? '#333333' : '#33cccc'},
            ]}>
            {item.Country}
          </Text>
        </View>
        <View style={styles.countryStatCell}>
          <Text
            style={[
              styles.countryStatItemText,
              {color: item.Country === userLocation ? '#333333' : '#ff3300'},
            ]}>
            {item.TotalConfirmed}
          </Text>
        </View>
        <View style={styles.countryStatCell}>
          <Text
            style={[
              styles.countryStatItemText,
              {color: item.Country === userLocation ? '#333333' : '#00cc00'},
            ]}>
            {item.TotalRecovered}
          </Text>
        </View>
        <View style={styles.countryStatCell}>
          <Text
            style={[
              styles.countryStatItemText,
              {color: item.Country === userLocation ? '#333333' : '#979797'},
            ]}>
            {item.TotalDeaths}
          </Text>
        </View>
      </View>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  countryStatItemView: {
    // flex: 1,
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
