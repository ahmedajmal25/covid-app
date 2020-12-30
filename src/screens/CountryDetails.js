import React, {useContext, useMemo} from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import DayDetailCard from '../components/DayDetailCard';
import AppContext from '../appContext/appContext';
import {ActivityIndicator} from 'react-native-paper';
import ErrorMsg from '../components/Error&Try';
// import {ScrollView} from 'react-native-gesture-handler';

const CountryDetails = ({navigation: {setOptions}}) => {
  const appContext = useContext(AppContext);
  const {
    getDetail,
    detail,
    current,
    clearCurrent,
    error,
    setError,
  } = appContext;
  const keyExtractor = (item, index) => index.toString();

  const onClick = () => {
    setError(false);
    getDetail(current.Slug);
    // clearCurrent();
  };

  useMemo(() => {
    getDetail(current.Slug);
    // clearCurrent();
  }, []);

  const renderItem = ({item, index}) => (
    <DayDetailCard
      title={'Day ' + (detail.length - index)}
      data={item}
      margin={40}
    />
  );

  if (error) {
    return <ErrorMsg onPress={onClick} />;
  }

  if (detail === null) {
    return (
      <View style={styles.indicator}>
        <ActivityIndicator size="large" color="dimgray" />
      </View>
    );
  }
  const len = detail.length;
  if (len === 0) {
    return (
      <View style={styles.nodata}>
        <Text style={{fontSize: 30}}>No Data Available</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={detail}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListFooterComponent={<View style={styles.divider}></View>}
      />
    </View>
  );
  {
    /* <View style={styles.divider}></View> */
  }

  {
    /* <ScrollView
        showsVerticalScrollIndicator={false}
        // horizontal={true}
        style={{flex: 1}}
        contentContainerStyle={{
          backgroundColor: 'transparent',
        }}>
        <DayDetailCard title={'Day One'} data={detail[0]} margin={60} />
        <View style={styles.divider}></View>
        <DayDetailCard
          title={'Last Day Reported'}
          data={detail[1]}
          margin={0}
        />
      </ScrollView> */
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  indicator: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardView: {
    marginTop: 60,
  },
  divider: {marginBottom: 40},
  nodata: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default CountryDetails;
