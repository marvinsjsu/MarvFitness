import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { getMetricMetaInfo, timeToString } from '../utils/helpers';
import MarvSlider from './MarvSlider';
import MarvStepper from './MarvStepper';
import DateHeader from './DateHeader';
import TextButton from './TextButton';

export default class AddEntry extends Component {

  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0,
  };

  increment = (metric) => {
    const { max, step } = getMetricMetaInfo(metric);

    this.setState((state) => {
      const count = state[metric] + step;

      return {
        ...state,
        [metric]: count > max ? max : count
      };
    });
  };

  decrement = (metric) => {
    this.setState((state) => {
      const count = state[metric] - getMetricMetaInfo(metric).step;

      return {
        ...state,
        [metric]: count < 0 ? 0 : count,
      };
    });
  };

  slide = (metric, value) => {
    this.setState(() => ({
      [metric]: value,
    }));
  };

  submit = () => {
    const key = timeToString();
    const entry = this.state;

    this.setState(() => ({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0,
    }));

    // update redux

    // navigate to home

    // save to database

    // clear local notification
  }

  reset = () => {
    const key = timeToString();

    // update redux

    // navigate to home

    // update db
  }

  render() {
    const metaInfo = getMetricMetaInfo();
    const { alreadyLogged } = this.props;

    if (alreadyLogged) {
      return (
        <View>
          <Ionicons
            name='ios-happy'
            size={100}
          />
          <Text>You already logged your information for today</Text>
          <TextButton onPress={this.reset}>
            Reset
          </TextButton>
        </View>
      );
    }

    return (
      <View>
        <DateHeader date={(new Date()).toLocaleDateString()} />
        {
          Object.keys(metaInfo).map((key) => {
            const { getIcon, type, ...rest } = metaInfo[key];
            const value = this.state[key];

            return (
              <View key={key}>
                {getIcon()}
                {type === 'slider'
                  ? <MarvSlider
                      value={value}
                      onChange={(value) => this.slide(key, value)}
                      {...rest}
                    />
                  : <MarvStepper
                      value={value}
                      onIncrement={() => this.increment(key)}
                      onDecrement={() => this.decrement(key)}
                      {...rest}
                    />
                }
                <SubmitBtn />
              </View>
            );
          })
        }
      </View>
    );
  }
}

function SubmitBtn ({ onPress }) {
  return (
    <TouchableOpacity
      style={styles.btn}
      onPress={this.submit}
    >
      <Text style={styles.btnText}>Submit</Text>
    </TouchableOpacity>
  );
};

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