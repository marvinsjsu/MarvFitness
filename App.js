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
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import actions from './actions';

export default class App extends Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
          <AddEntry />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
