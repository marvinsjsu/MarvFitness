import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';

import { getMetricMetaInfo, timeToString, getDailyReminderValue } from '../utils/helpers';
import MarvSlider from './MarvSlider';
import MarvStepper from './MarvStepper';
import DateHeader from './DateHeader';
import TextButton from './TextButton';
import { submitEntry, removeEntry } from '../utils/api';
import { addEntry } from '../actions';

class AddEntry extends Component {

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
    const { dispatch} = this.props;
    const key = timeToString();
    const entry = this.state;

    // update redux
    dispatch(addEntry({
      [key]: entry
    }));

    this.setState(() => ({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0,
    }));


    // navigate to home

    // save to database
    submitEntry(key, entry);

    // clear local notification
  };

  reset = () => {
    const { dispatch } = this.props;
    const key = timeToString();

    // update redux
    dispatch(addEntry({
      [key]: getDailyReminderValue()
    }));
    // navigate to home

    // update db

    removeEntry(key);
  };

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
      <View style={styles.container}>
        <DateHeader style={styles.date} date={(new Date()).toLocaleDateString()} />
        {
          Object.keys(metaInfo).map((key) => {
            const { getIcon, type, ...rest } = metaInfo[key];
            const value = this.state[key];

            return (
              <View style={styles.rowContainer} key={key}>
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
              </View>
            );
          })
        }
        <SubmitBtn style={styles.btn} onPress={this.submit} />
      </View>
    );
  }
}

function SubmitBtn ({ onPress }) {
  return (
    <TouchableOpacity
      style={styles.btn}
      onPress={onPress}
    >
      <Text style={styles.btnText}>Submit</Text>
    </TouchableOpacity>
  );
};

function mapStateToProps(state) {
  const key = timeToString();

  return {
    alreadyLogged: state[key] && typeof state[key].today === 'undefined'
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    borderRadius: 20,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  btn: {
    backgroundColor: '#E53224',
    padding: 10,
    paddingLeft: 50,
    paddingRight: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 5,
  },
  btnText: {
    color: '#FFF',
  },
  date: {
    alignSelf: 'flex-end',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  }
});

export default connect(mapStateToProps)(AddEntry);