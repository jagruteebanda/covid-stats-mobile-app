import React from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
// import {Picker} from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/FontAwesome5';

const {width} = Dimensions.get('window');

const FilterSection = ({
  filterData,
  resetFilter = (f) => f,
  handleFilterPopup = (f) => f,
}) => {
  const filterText = !filterData.reset
    ? `${filterData.column} ${filterData.comparator} ${filterData.number}`
    : 'No filters selected';
  return (
    <View style={styles.filterSectionView}>
      <View style={styles.filterDataView}>
        <View style={[styles.filterTextView, {width: filterText.length * 10}]}>
          <Text style={styles.filterTextDataView}>{filterText}</Text>
          {!filterData.reset && (
            <TouchableOpacity onPress={() => resetFilter()}>
              <View style={{marginLeft: 7}}>
                <Icon name={'times-circle'} size={16} color={'#fff'} />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <TouchableOpacity onPress={() => handleFilterPopup()}>
        <View style={{width: 36}}>
          <Icon name="sliders-h" size={20} color="#33ccff" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  filterSectionView: {
    flexDirection: 'row',
    backgroundColor: '#262626',
    width: width - 14,
    height: 50,
    // marginTop: 4,
    borderWidth: 1,
    borderBottomColor: '#33ccff',
    // borderRadius: 4,
    // elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterDataView: {
    flexDirection: 'row',
    width: width - 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterTextView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(153, 255, 204, 0.2)',
    // height: 30,
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 6,
    borderColor: '#99ffcc',
    borderWidth: 1,
    borderRadius: 25,
  },
  filterTextDataView: {
    fontFamily: 'SourceSansPro-Regular',
    color: '#fff',
    textAlign: 'center',
    // marginRight: 7,
  },
});

export default FilterSection;
