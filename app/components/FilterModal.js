import React from 'react';
import {
  Modal,
  View,
  Text,
  Picker,
  TextInput,
  TouchableHighlight,
  Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const FilterModal = ({
  filterPopupOpen,
  filterData,
  closeFilterPopup = (f) => f,
  onChangeFilterColumn = (f) => f,
  onChangeFilterComparator = (f) => f,
  onChangeFilterNumber = (f) => f,
  handleFilterSort = (f) => f,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={filterPopupOpen}
      onRequestClose={() => {
        // Alert.alert('Modal has been closed.');
      }}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
        <View
          style={{
            width: width - 50,
            height: 280,
            backgroundColor: '#ffffff',
          }}>
          <View
            style={{
              width: width - 50,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              borderBottomWidth: 1,
              borderBottomColor: '#e6e6e6',
            }}>
            <Text style={{textAlign: 'center'}}>{'Search Filter'}</Text>
          </View>
          <View style={{width: width - 50, height: 180}}>
            <View
              style={{
                flexDirection: 'row',
                width: width - 50,
                height: 60,
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: (width - 50) / 3,
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{textAlign: 'center'}}>{'Column'}</Text>
              </View>
              <View
                style={{
                  width: (2 * (width - 50)) / 3 - 10,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: '#e6e6e6',
                  borderWidth: 1,
                }}>
                <Picker
                  selectedValue={filterData.column}
                  style={{height: 50, width: (2 * (width - 50)) / 3}}
                  onValueChange={(itemValue, itemIndex) =>
                    onChangeFilterColumn(itemValue)
                  }>
                  <Picker.Item label="Select column" value="" />
                  <Picker.Item label="Confirmed" value="TotalConfirmed" />
                  <Picker.Item label="Recovered" value="TotalRecovered" />
                  <Picker.Item label="Deaths" value="TotalDeaths" />
                </Picker>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: width - 50,
                height: 60,
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: (width - 50) / 3,
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{textAlign: 'center'}}>{'Comparator'}</Text>
              </View>
              <View
                style={{
                  width: (2 * (width - 50)) / 3 - 10,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: '#e6e6e6',
                  borderWidth: 1,
                }}>
                <Picker
                  selectedValue={filterData.comparator}
                  style={{height: 50, width: (2 * (width - 50)) / 3}}
                  onValueChange={(itemValue, itemIndex) =>
                    onChangeFilterComparator(itemValue)
                  }>
                  <Picker.Item label="Select comparator" value="" />
                  <Picker.Item label="greater than" value=">=" />
                  <Picker.Item label="less than" value="<=" />
                </Picker>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: width - 50,
                height: 60,
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: (width - 50) / 3,
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{textAlign: 'center'}}>{'No. of cases'}</Text>
              </View>
              <View
                style={{
                  width: (2 * (width - 50)) / 3 - 10,
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TextInput
                  style={{
                    width: (2 * (width - 50)) / 3 - 10,
                    height: 40,
                    borderColor: '#e6e6e6',
                    borderWidth: 1,
                  }}
                  keyboardType={'numeric'}
                  onChangeText={(number) => onChangeFilterNumber(number)}
                  value={filterData.number}
                  placeholder={'e.g. 1000'}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: width - 50,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              borderTopWidth: 1,
              borderTopColor: '#e6e6e6',
            }}>
            <TouchableHighlight onPress={() => closeFilterPopup()}>
              <View
                style={{
                  width: (width - 50) / 2,
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{textAlign: 'center'}}>{'Cancel'}</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => handleFilterSort(filterData)}>
              <View
                style={{
                  width: (width - 50) / 2,
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{textAlign: 'center'}}>{'Apply'}</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;
