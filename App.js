import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  // TouchableHighlight,
  // TouchableNativeFeedback,
  // TouchableOpacity,
  // TouchableWithoutFeedback,

} from 'react-native';
import AddEntry from './components/AddEntry';
import MarvForm from './components/MarvForm';

export default class App extends Component {

  state = {
    value: 0,
  };

  handlePress = (e) => {
    console.log('handlePress.e: ', e);
  };

  render() {

    const { value } = this.state;

    return (
      <View style={styles.container}>
        <Text>Hello World! MarvFitness</Text>
        <MarvForm />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    backgroundColor: '#E53224',
    padding: 10,
    paddingLeft: 50,
    paddingRight: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  btnText: {
    color: '#FFF',
  }
});
