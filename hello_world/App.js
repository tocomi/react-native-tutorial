/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

  state = {
    message: 'Reaaaaaaaaaaaaaact Native!',
    count: 0,
  }

  render() {
    return (
      <View style={styles.container}>
        <HelloWorld message={ this.state.message } count={ this.state.count }/>
        <Text
          style={styles.welcome}
          onPress={() => this.setState({ message: 'clicked', count: this.state.count + 1 })}
        >
          { this.state.message }
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
    );
  }
}

class HelloWorld extends Component {
  render() {
    return (
      <View>
        <Text>Hello World { this.props.message }</Text>
        <Text>click count: { this.props.count }</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
