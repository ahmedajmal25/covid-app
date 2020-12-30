import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Surface, Text} from 'react-native-paper';

const CountryBriefCard = ({data: {name, cases, deaths}}) => {
  return (
    <Surface style={styles.surface}>
      <Text style={styles.header}>{name}</Text>
      <View style={styles.view}>
        <Text style={styles.text}>Confirmed Cases:</Text>
        <Text style={[styles.text, {color: 'grey'}]}>{cases}</Text>
      </View>
      <View style={styles.view}>
        <Text style={styles.text}>Deaths:</Text>
        <Text style={[styles.text, {color: 'red'}]}>{deaths}</Text>
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  surface: {
    flex: 1,
    marginTop: 40,
    padding: 28,
    height: '18%',
    width: '80%',
    elevation: 8,
    borderRadius: 28,
    alignSelf: 'center',
  },
  text: {
    fontSize: 17,
  },
  view: {
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {alignSelf: 'center', fontSize: 25, marginBottom: 45},
});

export default CountryBriefCard;
