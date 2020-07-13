import React from 'react';
import {View, FlatList, Dimensions, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import CountryStatItem from './CountryStatItem';
const {width, height} = Dimensions.get('window');

const CountryStats = (props) => {
  const {
    countryStatData,
    sortData,
    handleCountryStatSorting = (f) => f,
  } = props;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        width: width - 14,
        height,
        alignItems: 'center',
        // marginTop: 4,
        borderColor: '#e6e6e6',
        borderWidth: 1,
        // borderRadius: 4,
        elevation: 2,
        marginBottom: 4
      }}>
      <View
        style={{
          flexDirection: 'row',
          width: width - 16,
          height: 50,
          alignItems: 'center',
          backgroundColor: '#ffffff',
          // borderTopLeftRadius: 4,
          // borderTopRightRadius: 4,
          borderBottomColor: '#e6e6e6',
          borderBottomWidth: 1,
          // elevation: 2
        }}>
        <TouchableOpacity
          onPress={() =>
            handleCountryStatSorting({
              ...sortData,
              country: true,
              countrySortType:
                sortData.countrySortType === null
                  ? 'asc'
                  : sortData.countrySortType === 'asc'
                  ? 'desc'
                  : null,
              confirmed: false,
              recovered: false,
              deaths: false,
            })
          }>
          <View
            style={{
              justifyContent: 'center',
              width: (width - 16) / 4,
              height: 50,
            }}>
            <Text style={{textAlign: 'center', fontWeight: '500'}}>
              {'Country'}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            handleCountryStatSorting({
              ...sortData,
              confirmed: true,
              confirmedSortType:
                sortData.confirmedSortType === null ||
                sortData.confirmedSortType === 'desc'
                  ? 'asc'
                  : 'desc',
              country: false,
              recovered: false,
              deaths: false,
            })
          }>
          <View
            style={{
              justifyContent: 'center',
              width: (width - 16) / 4,
              height: 50,
            }}>
            <Text style={{textAlign: 'center'}}>{'Confirmed'}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            handleCountryStatSorting({
              ...sortData,
              recovered: true,
              recoveredSortType: sortData.recoveredSortType === null ||
              sortData.recoveredSortType === 'desc'
                ? 'asc'
                : 'desc',
              country: false,
              confirmed: false,
              deaths: false,
            })
          }>
          <View
            style={{
              justifyContent: 'center',
              width: (width - 16) / 4,
              height: 50,
            }}>
            <Text style={{textAlign: 'center'}}>{'Recovered'}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            handleCountryStatSorting({
              ...sortData,
              deaths: true,
              deathsSortType:
                sortData.deathsSortType === null ||
                sortData.deathsSortType === 'desc'
                  ? 'asc'
                  : 'desc',
              country: false,
              confirmed: false,
              recovered: false,
            })
          }>
          <View
            style={{
              justifyContent: 'center',
              width: (width - 16) / 4,
              height: 40,
            }}>
            <Text style={{textAlign: 'center'}}>{'Deaths'}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <FlatList
        style={{flex: 1, width: width - 16, height}}
        data={countryStatData}
        renderItem={({item, index}) => (
          <CountryStatItem item={item} index={index} />
        )}
        keyExtractor={(item) => item.Country}
      />
    </SafeAreaView>
  );
};

export default CountryStats;
