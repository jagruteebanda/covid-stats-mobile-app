import React from 'react';
import {
  View,
  FlatList,
  Dimensions,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import CountryStatItem from './CountryStatItem';
import Icon from 'react-native-vector-icons/FontAwesome5';

const {width, height} = Dimensions.get('window');

const CountryStats = (props) => {
  const {
    userLocation,
    countryStatData,
    sortData,
    handleCountryStatSorting = (f) => f,
  } = props;

  const _keyExtractor = (item, index) => `countryStat_${index}`;

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.tableHeadingView}>
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
              confirmedSortType: null,
              recovered: false,
              recoveredSortType: null,
              deaths: false,
              deathsSortType: null,
            })
          }>
          <View style={styles.tableHeadingCell}>
            <Text style={styles.tableHeadingText}>{'Country'}</Text>
            {sortData.countrySortType ===
            null ? null : sortData.countrySortType === 'asc' ? (
              <Icon name={'sort-up'} size={10} color={'#00cc99'} />
            ) : (
              <Icon name={'sort-down'} size={10} color={'#00cc99'} />
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            handleCountryStatSorting({
              ...sortData,
              confirmed: true,
              confirmedSortType:
                sortData.confirmedSortType === null
                  ? null
                  : sortData.confirmedSortType === 'desc'
                  ? 'asc'
                  : 'desc',
              country: false,
              countrySortType: null,
              recovered: false,
              recoveredSortType: null,
              deaths: false,
              deathsSortType: null,
            })
          }>
          <View style={styles.tableHeadingCell}>
            <Text style={styles.tableHeadingText}>{'Confirmed'}</Text>
            {sortData.confirmedSortType ===
            null ? null : sortData.confirmedSortType === 'desc' ? (
              <Icon name={'sort-down'} size={10} color={'#00cc99'} />
            ) : (
              <Icon name={'sort-up'} size={10} color={'#00cc99'} />
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            handleCountryStatSorting({
              recovered: true,
              recoveredSortType:
                sortData.recoveredSortType === null ||
                sortData.recoveredSortType === 'desc'
                  ? 'asc'
                  : 'desc',
              country: false,
              countrySortType: null,
              confirmed: false,
              confirmedSortType: null,
              deaths: false,
              deathsSortType: null,
            })
          }>
          <View style={styles.tableHeadingCell}>
            <Text style={styles.tableHeadingText}>{'Recovered'}</Text>
            {sortData.recoveredSortType ===
            null ? null : sortData.recoveredSortType === 'desc' ? (
              <Icon name={'sort-down'} size={10} color={'#00cc99'} />
            ) : (
              <Icon name={'sort-up'} size={10} color={'#00cc99'} />
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            handleCountryStatSorting({
              deaths: true,
              deathsSortType:
                sortData.deathsSortType === null ||
                sortData.deathsSortType === 'desc'
                  ? 'asc'
                  : 'desc',
              country: false,
              countrySortType: null,
              confirmed: false,
              confirmedSortType: null,
              recovered: false,
              recoveredSortType: null,
            })
          }>
          <View style={styles.tableHeadingCell}>
            <Text style={styles.tableHeadingText}>{'Deaths'}</Text>
            {sortData.deathsSortType ===
            null ? null : sortData.deathsSortType === 'desc' ? (
              <Icon name={'sort-down'} size={10} color={'#00cc99'} />
            ) : (
              <Icon name={'sort-up'} size={10} color={'#00cc99'} />
            )}
          </View>
        </TouchableOpacity>
      </View>
      {countryStatData && countryStatData.length > 0 && (
        <FlatList
          style={{flex: 1, width: width - 24, height}}
          data={countryStatData}
          renderItem={({item, index}) => (
            <CountryStatItem
              item={item}
              index={index}
              userLocation={userLocation}
            />
          )}
          keyExtractor={_keyExtractor}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    width: width - 14,
    height,
    alignItems: 'center',
    // marginTop: 4,
    // borderColor: '#e6e6e6',
    borderWidth: 1,
    borderRadius: 4,
    // elevation: 2,
    marginBottom: 4,
    padding: 4,
    backgroundColor: '#262626',
  },
  tableHeadingView: {
    flexDirection: 'row',
    width: width - 24,
    height: 50,
    alignItems: 'center',
    backgroundColor: '#262626',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomColor: '#33ccff',
    borderBottomWidth: 1,
    // elevation: 2
  },
  tableHeadingCell: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: (width - 16) / 4,
    height: 50,
  },
  tableHeadingText: {
    fontFamily: 'SourceSansPro-SemiBold',
    fontSize: 16,
    textAlign: 'center',
    color: '#00ccff',
    marginRight: 4,
  },
});

export default CountryStats;
