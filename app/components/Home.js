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
      globalStatData: {},
      countryStatData: [],
      userLocation: '',
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
    this.setState({countryStatData, globalStatData});
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
      this.setState({userLocation, countryStatData: filteredData});
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
                  console.log('userLocation', userLocation);
                  let filteredData = this.state.countryStatData.filter(
                    (a) => a.Country.toLowerCase() !== userLocation,
                  );
                  let userLocationData = this.state.countryStatData.filter(
                    (a) => a.Country.toLowerCase() === userLocation,
                  );
                  console.log(userLocationData);
                  filteredData = filteredData.unshift(userLocationData);
                  this.setState({userLocation, countryStatData: filteredData});
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
          console.log('Camera permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  render() {
    const {globalStatData, countryStatData, userLocation} = this.state;
    return (
      <View style={{flex: 1, width, height}}>
        <AppBar />
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            width,
            height: height - 50,
            alignItems: 'center',
            backgroundColor: '#f4f4f4'
          }}>
          <GlobalStats globalStatData={globalStatData} />
          <FilterSection />
          <CountryStats
            countryStatData={countryStatData}
            userLocation={userLocation}
          />
        </View>
      </View>
    );
  }
}
