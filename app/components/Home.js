/* eslint-disable no-new */
import React, {Component} from 'react';
import {
  View,
  Dimensions,
  // AsyncStorage,
  PermissionsAndroid,
  ToastAndroid,
  BackHandler,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from 'react-native-geolocation-service';

import AppBar from './AppBar';
import GlobalStats from './GlobalStats';
import FilterSection from './FilterSection';
import FilterModal from './FilterModal';
import CountryStats from './CountryStats';

// navigator.geolocation = require('@react-native-community/geolocation');

const {width, height} = Dimensions.get('window');

const http = require('../models/fetch');

let intervalCall;

// STATIC DATA
// const statsData = require('../data/stats');
// const locationData = require('../data/location');

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: [],
      totalStatData: [],
      globalStatData: {},
      countryStatData: [],
      userLocation: '',
      userLocationData: {},
      sortData: {
        country: false,
        countrySortType: null,
        confirmed: true,
        confirmedSortType: 'desc',
        recovered: false,
        recoveredSortType: null,
        deaths: false,
        deathsSortType: null,
        filterPopupOpen: false,
      },
      filterData: {
        reset: true,
        column: 'TotalConfirmed',
        comparator: '>=',
        number: '0',
      },
    };
  }

  componentDidMount = () => {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

    // first stat data call
    this.getCountryStatData();

    // GET USER LOCATION
    this.getUserLocation();

    // API call to get covid stats in interval of 2 minutes
    intervalCall = setInterval(
      function () {
        setTimeout(
          function () {
            this.getCountryStatData();
          }.bind(this),
          60000 * 2,
        );
      }.bind(this),
      60000 * 2,
    );
  };

  handleBackPress = () => {
    Alert.alert(
      'Exit COVID-19 Stats',
      'Are you sure you want to exit the app?',
      [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'OK', onPress: () => BackHandler.exitApp()},
      ],
    );
    return true;
  };

  componentWillUnmount = () => {
    clearInterval(intervalCall);
    BackHandler.removeEventListener('hardwareBackPress');
  };

  setStatData = (statData) => {
    let {
      globalStatData,
      countryStatData,
      userLocation,
      userLocationData,
    } = this.state;
    countryStatData = statData.Countries;
    globalStatData = statData.Global;
    // Sort data by Total Confirmed cases in descending order
    countryStatData.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed);
    // Remove zero cases countries
    countryStatData = countryStatData.filter((a) => a.TotalConfirmed !== 0);

    // Filter user location data and push it on to the top
    if (userLocation) {
      userLocationData = countryStatData.filter(
        (a) => a.Country.toLowerCase() === userLocation.toLowerCase(),
      );
      AsyncStorage.setItem(
        'userLocationData',
        JSON.stringify(userLocationData[0]),
      );
    }
    // console.log(filteredData[0]);
    this.setState({
      userLocation,
      userLocationData,
      globalStatData,
      countryStatData: countryStatData,
      totalStatData: countryStatData,
    });
    AsyncStorage.setItem(
      'statData',
      JSON.stringify({
        Global: statData.Global,
        Countries: countryStatData,
      }),
    );
  };

  getCountryStatData() {
    const url = 'https://api.covid19api.com/summary';
    http.get(url, null, async (err, res) => {
      // console.log(err, res.Global);
      if (err) {
        try {
          let {globalStatData, countryStatData} = this.state;
          let statData = await AsyncStorage.getItem('statData');
          statData = JSON.parse(statData);
          countryStatData = statData.Countries;
          globalStatData = statData.Global;
          this.setState({
            countryStatData,
            globalStatData,
            totalStatData: countryStatData,
          });
        } catch (error) {
          ToastAndroid.show(
            'There was some error fetching data!',
            ToastAndroid.SHORT,
          );
        }
      }
      if (res) {
        ToastAndroid.show('Refreshing your data!', ToastAndroid.SHORT);
        // console.log(res.Global);
        this.setStatData(res);
      }
    });
  }

  getUserCountry = (position) => {
    const url = `http://api.geonames.org/findNearbyPlaceNameJSON?formatted=true&lat=${position.coords.latitude}&lng=${position.coords.longitude}&username=codeelite2345&style=full`;
    http.get(url, null, (err, res) => {
      // console.log(err, res);
      if (err) {
        ToastAndroid.show(
          'Could not track you! Please try again later.',
          ToastAndroid.SHORT,
        );
        this.getCountryStatData();
      }
      if (res) {
        // console.log(res);
        AsyncStorage.setItem('userLocation', res.geonames[0].countryName);
        // this.state.userLocation = res.geonames[0].countryName;
        let userLocationData = this.state.countryStatData.filter(
          (a) =>
            a.Country.toLowerCase() ===
            res.geonames[0].countryName.toLowerCase(),
        );
        this.setState({
          userLocation: res.geonames[0].countryName,
          userLocationData,
        });
        this.getCountryStatData();
      }
    });
  };

  getUserLocation = async () => {
    let positionCoords = await AsyncStorage.getItem('userLocation');
    let userLocation = await AsyncStorage.getItem('userLocation');
    if (userLocation) {
      this.state.userLocation = userLocation;
      let userLocationData = JSON.parse(
        await AsyncStorage.getItem('userLocationData'),
      );
      this.state.userLocationData = userLocationData;
      this.getCountryStatData();
    } else {
      if (positionCoords) {
        positionCoords = JSON.parse(positionCoords);
        this.getUserCountry(positionCoords);
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Access Location Permission',
              message: 'COVID Stats needs your location information',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // console.log('You can acess the location');
            Geolocation.getCurrentPosition(
              (position) => {
                // console.log(position);
                AsyncStorage.setItem('positionCoords', position);
                // TODO: API call to get user location
                this.getUserCountry(position);
              },
              (error) => {
                ToastAndroid.show(
                  'Could not track you! Please try again later.',
                  ToastAndroid.SHORT,
                );
                this.getCountryStatData();
              },
              {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
            );
          } else {
            ToastAndroid.show(
              'Location permission denied! We will track your country when you want!',
              ToastAndroid.SHORT,
            );
            this.getCountryStatData();
          }
        } catch (err) {
          // console.warn(err);
          ToastAndroid.show(
            'Could not track you! Please try again later.',
            ToastAndroid.SHORT,
          );
          this.getCountryStatData();
        }
      }
    }
  };

  resetFilter() {
    this.setState({
      countryStatData: this.state.totalStatData,
      filterData: {
        reset: true,
        column: 'TotalConfirmed',
        comparator: '>=',
        number: 0,
      },
      filterPopupOpen: false,
    });
  }

  handleFilterSort(filterData) {
    let {totalStatData, countryStatData} = this.state;
    countryStatData = totalStatData;
    countryStatData = countryStatData.filter((a) => {
      let b =
        filterData.comparator === '>=' || filterData.comparator === ''
          ? a[filterData.column] >= parseInt(filterData.number, 10)
          : a[filterData.column] <= parseInt(filterData.number, 10);
      return b;
    });
    this.setState({
      filterPopupOpen: false,
      countryStatData,
      filterData: {
        reset: false,
        column: filterData.column,
        comparator:
          filterData.comparator === '>=' || filterData.comparator === ''
            ? '>='
            : '<=',
        number: parseInt(filterData.number, 10) >= 0 ? filterData.number : '0',
      },
    });
  }

  handleFilterPopup() {
    this.setState({filterPopupOpen: true});
  }

  closeFilterPopup() {
    this.setState({filterPopupOpen: false});
  }

  onChangeFilterColumn(column) {
    let {filterData} = this.state;
    this.setState({
      filterData: {
        ...filterData,
        column,
        reset: false,
      },
    });
  }

  onChangeFilterComparator(comparator) {
    let {filterData} = this.state;
    this.setState({
      filterData: {
        ...filterData,
        comparator,
        reset: false,
      },
    });
  }

  onChangeFilterNumber(number) {
    let {filterData} = this.state;
    this.setState({
      filterData: {
        ...filterData,
        number,
        reset: false,
      },
    });
  }

  handleCountryStatSorting(sortData) {
    let {countryStatData} = this.state;
    if (sortData.country) {
      if (sortData.countrySortType === 'asc') {
        // Sort in ascending order
        sortData.countrySortType = 'asc';
        countryStatData.sort((a, b) => a.Country.localeCompare(b.Country));
      } else if (sortData.countrySortType === 'desc') {
        // Sort in descending order
        sortData.countrySortType = 'desc';
        countryStatData.sort((a, b) => b.Country.localeCompare(a.Country));
      } else {
        // Sort by TotalConfirmed cases - original case
        sortData.countrySortType = null;
        countryStatData.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed);
      }
    } else if (sortData.recovered) {
      if (sortData.recoveredSortType === 'asc') {
        // Sort in ascending order
        sortData.recoveredSortType = 'asc';
        countryStatData.sort((a, b) => a.TotalRecovered - b.TotalRecovered);
      } else {
        // Sort in descending order
        sortData.recoveredSortType = 'desc';
        countryStatData.sort((a, b) => b.TotalRecovered - a.TotalRecovered);
      }
    } else if (sortData.deaths) {
      if (sortData.deathsSortType === 'asc') {
        // Sort in ascending order
        sortData.deathsSortType = 'asc';
        countryStatData.sort((a, b) => a.TotalDeaths - b.TotalDeaths);
      } else {
        // Sort in descending order
        sortData.deathsSortType = 'desc';
        countryStatData.sort((a, b) => b.TotalDeaths - a.TotalDeaths);
      }
    } else {
      // default case: cofirmed based sort
      if (sortData.confirmedSortType === 'asc') {
        // Sort in ascending order
        sortData.confirmedSortType = 'asc';
        countryStatData.sort((a, b) => a.TotalConfirmed - b.TotalConfirmed);
      } else {
        // Sort in descending order
        sortData.confirmedSortType = 'desc';
        countryStatData.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed);
      }
    }
    this.setState({sortData, countryStatData});
  }

  render() {
    const {
      globalStatData,
      userLocation,
      userLocationData,
      countryStatData,
      sortData,
      filterPopupOpen,
      filterData,
    } = this.state;
    return (
      <View
        style={{
          flex: 1,
          width,
          height,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1a1a1a',
        }}>
        <AppBar />
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            width,
            height: height - 50,
            alignItems: 'center',
            backgroundColor: '#1a1a1a',
          }}>
          <GlobalStats globalStatData={globalStatData} />
          {userLocationData && Object.keys(userLocationData).length > 0 && (
            <GlobalStats localStatData={userLocationData[0]} />
          )}
          <FilterSection
            filterData={filterData}
            resetFilter={() => this.resetFilter()}
            handleFilterPopup={() => this.handleFilterPopup()}
          />
          <CountryStats
            userLocation={userLocation}
            sortData={sortData}
            countryStatData={countryStatData}
            handleCountryStatSorting={(data) =>
              this.handleCountryStatSorting(data)
            }
          />
        </View>
        {filterPopupOpen && (
          <FilterModal
            filterPopupOpen={filterPopupOpen}
            filterData={filterData}
            onChangeFilterColumn={(column) => this.onChangeFilterColumn(column)}
            onChangeFilterComparator={(comparator) =>
              this.onChangeFilterComparator(comparator)
            }
            onChangeFilterNumber={(number) => this.onChangeFilterNumber(number)}
            closeFilterPopup={() => this.closeFilterPopup()}
            resetFilter={() => this.resetFilter()}
            handleFilterSort={(data) => this.handleFilterSort(data)}
          />
        )}
      </View>
    );
  }
}
