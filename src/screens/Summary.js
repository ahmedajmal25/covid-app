/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useMemo} from 'react';
import {StyleSheet, View, FlatList, Text} from 'react-native';
import AppContext from '../appContext/appContext';
import {SearchBar, Divider} from 'react-native-elements';
import {ActivityIndicator} from 'react-native-paper';
import SummaryDetailCard from '../components/SummaryDetailCard';
import ErrorMsg from '../components/Error&Try';
// import {ScrollView} from 'react-native-gesture-handler';

const Summary = () => {
  const appContext = useContext(AppContext);
  const {
    getSummary,
    summary,
    error,
    setError,
    filteredSummary,
    clearSummary,
    filterSummary,
  } = appContext;

  const keyExtractor = (_, index) => index.toString();

  const renderItem = ({item}) => <SummaryDetailCard summary={item} />;

  const onClick = () => {
    setError(false);
    getSummary();
  };

  useMemo(() => {
    getSummary();
  }, []);

  const onChangeText = (txt) => {
    if (txt !== '') {
      filterSummary(txt);
    } else {
      clearSummary();
    }
  };

  if (error) {
    return <ErrorMsg onPress={onClick} />;
  }

  if (summary === null) {
    return (
      <View style={styles.indicator}>
        <ActivityIndicator size="large" color="dimgray" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Filter Summary List..."
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
        data={filteredSummary === null ? summary : filteredSummary}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListFooterComponent={<View style={styles.divider}></View>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchBar: {
    backgroundColor: 'white',
    marginLeft: 2,
  },
  txt: {
    fontSize: 30,
  },
  emptyView: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {marginBottom: 40},
});

export default Summary;
