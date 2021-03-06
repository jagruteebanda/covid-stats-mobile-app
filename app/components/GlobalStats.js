import React from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const {width} = Dimensions.get('window');

const GlobalStats = (props) => {
  const {globalStatData, localStatData} = props;
  return (
    <View style={[styles.globalStatView, {marginTop: globalStatData ? 4 : 0}]}>
      <View style={styles.globalStatHeadingView}>
        <Icon
          name={
            globalStatData
              ? 'globe-americas'
              : localStatData
              ? 'font-awesome-flag'
              : null
          }
          size={18}
          color={'#33ccff'}
        />
        <Text style={styles.globalStatHeading}>
          {globalStatData
            ? 'Global Stats'
            : localStatData
            ? `Country Stat: ${localStatData.Country}`
            : null}
        </Text>
      </View>
      <View style={styles.globalCasesView}>
        <View style={styles.caseView}>
          <Text style={[styles.globalStatCases, {color: '#ff3300'}]}>
            {globalStatData
              ? globalStatData.TotalConfirmed
              : localStatData
              ? localStatData.TotalConfirmed
              : null}
          </Text>
          <Text style={styles.globalStatSubHeading}>{'Confirmed'}</Text>
        </View>
        <View style={styles.caseView}>
          <Text style={[styles.globalStatCases, {color: '#00cc00'}]}>
            {globalStatData
              ? globalStatData.TotalRecovered
              : localStatData
              ? localStatData.TotalRecovered
              : null}
          </Text>
          <Text style={styles.globalStatSubHeading}>{'Recovered'}</Text>
        </View>
        <View style={styles.caseView}>
          <Text style={[styles.globalStatCases, {color: '#979797'}]}>
            {globalStatData
              ? globalStatData.TotalDeaths
              : localStatData
              ? localStatData.TotalDeaths
              : null}
          </Text>
          <Text style={styles.globalStatSubHeading}>{'Deaths'}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  globalStatView: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: width - 14,
    height: 90,
    marginTop: 4,
    borderWidth: 1,
    borderBottomColor: '#33ccff',
    // borderRadius: 4,
    backgroundColor: '#262626',
    // elevation: 2,
  },
  globalStatHeadingView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  globalStatHeading: {
    fontFamily: 'SourceSansPro-Regular',
    textAlign: 'left',
    color: '#33ccff',
    fontSize: 18,
    marginLeft: 8,
  },
  globalCasesView: {flexDirection: 'row'},
  caseView: {
    width: (width - 32) / 3,
    height: 50,
    justifyContent: 'center',
  },
  globalStatCases: {
    fontFamily: 'SourceSansPro-SemiBold',
    fontSize: 18,
    textAlign: 'center',
  },
  globalStatSubHeading: {
    fontFamily: 'SourceSansPro-Light',
    textAlign: 'center',
    color: '#fff',
  },
});

export default GlobalStats;
