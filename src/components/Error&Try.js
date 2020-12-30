import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';

const ErrornTry = ({onPress}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>Data Fetching Failed</Text>
      <Button
        onPress={onPress}
        title="Try Again"
        type="outline"
        buttonStyle={styles.button}
        titleStyle={styles.buttonText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  txt: {
    color: 'dimgray',
    fontSize: 25,
  },
  buttonText: {
    fontSize: 20,
    color: 'dimgray',
  },
  button: {
    borderWidth: 2,
    // borderStyle: 'dotted',
    height: 60,
    width: 300,
    margin: 20,
    borderColor: 'dimgray',
    borderRadius: 10,
  },
});

export default ErrornTry;
