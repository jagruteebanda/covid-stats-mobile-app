import React from 'react';
import {
  Modal,
  View,
  Text,
  Picker,
  TextInput,
  TouchableHighlight,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const {width, height} = Dimensions.get('window');

const FilterModal = ({
  filterPopupOpen,
  filterData,
  closeFilterPopup = (f) => f,
  resetFilter = (f) => f,
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
      <View style={styles.modalCentricView}>
        <View style={styles.modalView}>
          <View style={styles.modalHeadingView}>
            <Text style={styles.modalHeading}>{'Search Filter'}</Text>
            <TouchableOpacity onPress={() => closeFilterPopup()}>
              <View style={{marginLeft: 4}}>
                <Icon name={'times-circle'} size={24} color={'#33ccff'} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{width: width - 50, height: 180}}>
            <View style={styles.columnView}>
              <View style={styles.columnHeading}>
                <Text style={styles.columnText}>{'Column'}</Text>
              </View>
              <View style={styles.pickerView}>
                <Picker
                  selectedValue={filterData.column}
                  style={styles.picker}
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
            <View style={styles.columnView}>
              <View style={styles.columnHeading}>
                <Text style={styles.columnText}>{'Comparator'}</Text>
              </View>
              <View style={styles.pickerView}>
                <Picker
                  selectedValue={filterData.comparator}
                  style={styles.picker}
                  onValueChange={(itemValue, itemIndex) =>
                    onChangeFilterComparator(itemValue)
                  }>
                  <Picker.Item label="Select comparator" value="" />
                  <Picker.Item label="greater than" value=">=" />
                  <Picker.Item label="less than" value="<=" />
                </Picker>
              </View>
            </View>
            <View style={styles.columnView}>
              <View style={styles.columnHeading}>
                <Text style={styles.columnText}>{'No. of cases'}</Text>
              </View>
              <View
                style={{
                  width: (2 * (width - 50)) / 3 - 10,
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TextInput
                  style={styles.textInput}
                  keyboardType={'numeric'}
                  onChangeText={(number) => onChangeFilterNumber(number)}
                  value={filterData.number}
                  placeholder={'e.g. 1000'}
                  placeholderTextColor={'#fff'}
                />
              </View>
            </View>
          </View>
          <View style={styles.actionButtonsView}>
            <TouchableHighlight onPress={() => resetFilter()}>
              <View style={styles.buttonView}>
                <Text style={styles.buttonText}>{'Reset'}</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => handleFilterSort(filterData)}>
              <View style={[styles.buttonView, { backgroundColor: 'rgba(51, 204, 255, 0.2)' }]}>
                <Text style={styles.buttonText}>{'Apply'}</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalCentricView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalView: {
    width: width - 50,
    height: 280,
    backgroundColor: '#262626',
  },
  modalHeadingView: {
    flexDirection: 'row',
    width: width - 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#33ccff',
    paddingLeft: 16,
    paddingRight: 16,
  },
  modalHeading: {
    fontFamily: 'SourceSansPro-Regular',
    color: '#fff',
    fontSize: 16,
  },
  columnView: {
    flexDirection: 'row',
    width: width - 50,
    height: 60,
    alignItems: 'center',
  },
  columnHeading: {
    width: (width - 50) / 3,
    height: 50,
    // alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 16,
  },
  columnText: {
    fontFamily: 'SourceSansPro-Regular',
    textAlign: 'left',
    color: '#fff',
  },
  pickerView: {
    width: (2 * (width - 50)) / 3 - 10,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#33ccff',
    borderWidth: 1,
    borderRadius: 25,
  },
  picker: {
    height: 50,
    width: (2 * (width - 50)) / 3 - 16,
    marginLeft: 8,
    color: '#fff',
    fontFamily: 'SourceSansPro-Regular',
  },
  textInput: {
    width: (2 * (width - 50)) / 3 - 10,
    height: 40,
    borderColor: '#33ccff',
    borderWidth: 1,
    borderRadius: 25,
    paddingLeft: 16,
    fontFamily: 'SourceSansPro-Regular',
    color: '#fff',
  },
  actionButtonsView: {
    flexDirection: 'row',
    width: width - 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#33ccff',
  },
  buttonView: {
    width: (width - 50) / 2,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'SourceSansPro-Regular',
    textAlign: 'center',
    color: '#33ccff',
    fontSize: 16
  },
});

export default FilterModal;
