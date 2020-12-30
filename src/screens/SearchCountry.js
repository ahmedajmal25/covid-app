import React, {useContext, useEffect, useMemo} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {SearchBar, Divider} from 'react-native-elements';
import {Text, TouchableRipple, ActivityIndicator} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import ErrorMsg from '../components/Error&Try';

import AppContext from '../appContext/appContext';

const SearchCountry = ({navigation: {navigate}}) => {
  const appContext = useContext(AppContext);
  const {
    countries,
    filtered,
    current,
    loading,
    getCountries,
    setCurrent,
    filterCountries,
    clearFilter,
    clearCurrent,
    clearDetail,
    error,
    setError,
  } = appContext;

  const keyExtractor = (item, index) => index.toString();

  const onClick = () => {
    setError(false);
    getCountries();
  };

  useMemo(() => {
    getCountries();
  }, [loading]);

  const onSelect = async (index) => {
    clearCurrent();
    clearDetail();
    if (filtered === null) {
      await setCurrent(countries[index]);
      const params = {country: countries[index].Country};
      await navigate('Details', params);
    } else {
      await setCurrent(filtered[index]);
      const params = {country: filtered[index].Country};
      await navigate('Details', params);
    }
  };

  const renderItem = ({item, index}) => (
    <TouchableRipple
      onPress={() => onSelect(index)}
      rippleColor="rgba(0, 0, 0, .32)"
      style={styles.item}
      key={index}>
      <View style={styles.childItem}>
        <Text style={styles.text}>{item.Country + ' ' + item.ISO2}</Text>
        <Icon
          name="arrow-right"
          color="dimgray"
          size={20}
          iconStyle={styles.icon}
        />
      </View>
    </TouchableRipple>
  );

  const onChangeText = (txt) => {
    if (txt !== '') {
      filterCountries(txt);
    } else {
      clearFilter();
    }
  };

  if (error) {
    return <ErrorMsg onPress={onClick} />;
  }

  if (countries === null) {
    return (
      <View style={styles.indicator}>
        <ActivityIndicator size="large" color="dimgray" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search Country..."
        platform="android"
        value={null}
        inputContainerStyle={styles.searchBar}
        onChangeText={onChangeText}
      />
      <Divider />
      <FlatList
        ListEmptyComponent={
          <View style={styles.emptyView}>
            <Text style={styles.txt}>Not Available</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
        data={filtered === null ? countries : filtered}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        // extraData={current}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  item: {
    width: '100%',
    padding: 25,
  },
  searchBar: {
    backgroundColor: 'white',
    marginLeft: 3,
  },
  txt: {
    fontSize: 30,
  },
  emptyView: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  childItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 20,
  },
  indicator: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchCountry;
