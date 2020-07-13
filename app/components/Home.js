import React, {Component} from 'react';
import {
  View,
  Dimensions,
  // AsyncStorage,
  PermissionsAndroid,
  ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from 'react-native-geolocation-service';

import AppBar from './AppBar';
import GlobalStats from './GlobalStats';
import FilterSection from './FilterSection';
import FilterModal from './FilterModal';
import CountryStats from './CountryStats';

const {width, height} = Dimensions.get('window');

const http = require('../models/fetch');

// STATIC DATA
const statsData = require('../data/stats');
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
        column: '',
        comparator: '',
        number: 0,
      },
    };
  }

  componentDidMount = () => {
    // GET USER LOCATION
    this.getUserLocation();

    // TODO: API call to get covid stats in interval of 2 minutes
    let countryStatData = statsData.default.Countries;
    let globalStatData = statsData.default.Global;
    // Sort data by Total Confirmed cases in descending order
    countryStatData.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed);
    // Remove zero cases countries
    countryStatData = countryStatData.filter((a) => a.TotalConfirmed !== 0);
    this.setState({
      countryStatData,
      globalStatData,
      totalStatData: countryStatData,
    });
  };

  getUserLocation = async () => {
    let userLocation = await AsyncStorage.getItem('userLocation');
    // console.log(userLocation);
    if (userLocation) {
      let filteredData = this.state.countryStatData.filter(
        (a) => a.Country.toLowerCase() !== userLocation.toLowerCase(),
      );
      // Filter user location data and push it on to the top
      let userLocationData = this.state.countryStatData.filter(
        (a) => a.Country.toLowerCase() === userLocation.toLowerCase(),
      );
      filteredData.unshift(userLocationData[0]);
      this.setState({
        userLocation,
        countryStatData: filteredData,
        totalStatData: filteredData,
      });
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
          console.log('You can acess the location');
          Geolocation.getCurrentPosition(
            (position) => {
              // console.log(position);
              // TODO: API call to get user location
              const url = `http://api.geonames.org/findNearbyPlaceNameJSON?formatted=true&lat=${position.coords.latitude}&lng=${position.coords.longitude}&username=codeelite2345&style=full`;
              http.get(url, null, (err, res) => {
                if (err) {
                  ToastAndroid.show(
                    'Error getting location',
                    ToastAndroid.SHORT,
                  );
                }
                if (res) {
                  // console.log(res);
                  AsyncStorage.setItem(
                    'userLocation',
                    res.geonames[0].countryName,
                  );
                  userLocation = res.geonames[0].countryName;
                  let filteredData = this.state.countryStatData.filter(
                    (a) => a.Country.toLowerCase() !== userLocation,
                  );
                  let userLocationData = this.state.countryStatData.filter(
                    (a) => a.Country.toLowerCase() === userLocation,
                  );
                  filteredData = filteredData.unshift(userLocationData);
                  this.setState({
                    userLocation,
                    countryStatData: filteredData,
                    totalStatData: countryStatData,
                  });
                }
              });
            },
            (error) => {
              // See error code charts below.
              console.log(error.code, error.message);
            },
            {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000},
          );
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  handleFilterSort(filterData) {
    let {totalStatData, countryStatData} = this.state;
    countryStatData = totalStatData;
    let userLocationData = countryStatData.slice(0, 1);
    let filteredData = countryStatData.slice(1, countryStatData.length);
    filteredData = filteredData.filter((a) => {
      let b = filterData.comparator === '>='
        ? a[filterData.column] >= parseInt(filterData.number)
        : a[filterData.column] <= parseInt(filterData.number);
      return b;
    });
    countryStatData = userLocationData.concat(filteredData);
    this.setState({filterPopupOpen: false, countryStatData});
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
      },
    });
  }

  onChangeFilterComparator(comparator) {
    let {filterData} = this.state;
    this.setState({
      filterData: {
        ...filterData,
        comparator,
      },
    });
  }

  onChangeFilterNumber(number) {
    let {filterData} = this.state;
    this.setState({
      filterData: {
        ...filterData,
        number,
      },
    });
  }

  handleCountryStatSorting(sortData) {
    // console.log(sortData);
    let {countryStatData} = this.state;
    let userLocationData = countryStatData.slice(0, 1);
    let remainingData = countryStatData.slice(1, countryStatData.length);
    if (sortData.country) {
      if (sortData.countrySortType === 'asc') {
        // Sort in ascending order
        sortData.countrySortType = 'asc';
        remainingData.sort((a, b) => a.Country.localeCompare(b.Country));
      } else if (sortData.countrySortType === 'desc') {
        // Sort in descending order
        sortData.countrySortType = 'desc';
        remainingData.sort((a, b) => b.Country.localeCompare(a.Country));
      } else {
        // Sort by TotalConfirmed cases - original case
        sortData.countrySortType = null;
        remainingData.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed);
      }
    } else if (sortData.recovered) {
      if (sortData.recoveredSortType === 'asc') {
        // Sort in ascending order
        sortData.recoveredSortType = 'asc';
        remainingData.sort((a, b) => a.TotalRecovered - b.TotalRecovered);
      } else {
        // Sort in descending order
        sortData.recoveredSortType = 'desc';
        remainingData.sort((a, b) => b.TotalRecovered - a.TotalRecovered);
      }
    } else if (sortData.deaths) {
      if (sortData.deathsSortType === 'asc') {
        // Sort in ascending order
        sortData.deathsSortType = 'asc';
        remainingData.sort((a, b) => a.TotalDeaths - b.TotalDeaths);
      } else {
        // Sort in descending order
        sortData.deathsSortType = 'desc';
        remainingData.sort((a, b) => b.TotalDeaths - a.TotalDeaths);
      }
    } else {
      // default case: cofirmed based sort
      if (sortData.confirmedSortType === 'asc') {
        // Sort in ascending order
        sortData.confirmedSortType = 'asc';
        remainingData.sort((a, b) => a.TotalConfirmed - b.TotalConfirmed);
      } else {
        // Sort in descending order
        sortData.confirmedSortType = 'desc';
        remainingData.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed);
      }
    }
    countryStatData = userLocationData.concat(remainingData);
    this.setState({sortData, countryStatData});
  }

  render() {
    const {
      globalStatData,
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
        }}>
        <AppBar handleFilterPopup={() => this.handleFilterPopup()} />
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            width,
            height: height - 50,
            alignItems: 'center',
            backgroundColor: '#f4f4f4',
          }}>
          <GlobalStats globalStatData={globalStatData} />
          {/* <FilterSection /> */}
          <CountryStats
            sortData={sortData}
            countryStatData={countryStatData}
            handleCountryStatSorting={(sortData) =>
              this.handleCountryStatSorting(sortData)
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
            handleFilterSort={(filterData) => this.handleFilterSort(filterData)}
          />
        )}
      </View>
    );
  }
}
