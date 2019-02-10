import React, { Component } from 'react';
import {
  View,
  Text,
  Switch,
  TextInput,
  KeyboardAvoidingView,
  Image,
  StyleSheet
} from 'react-native';

export default class MarvForm extends Component {
  state = {
    input: '@marvinsjsu',
    showInput: false,
  };

  handleToggleSwitch = () => {
    this.setState((state) => ({
      showInput: !state.showInput,
    }));
  };

  handleTextChange = (input) => {
    this.setState((state) => ({
      input: input
    }));
  };

  render() {
    const { input, showInput } = this.state;

    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Image style={styles.img} source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}/>
        <View style={{margin: 50}}/>
        <Image style={styles.img} source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}/>

        <Switch
          value={showInput}
          onValueChange={this.handleToggleSwitch}
        />

        {showInput === true && (
          <TextInput
            value={input}
            style={styles.input}
            onChangeText={this.handleTextChange}
          />
        )}
      </KeyboardAvoidingView>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  input: {
    width: 250,
    height: 50,
  },
});