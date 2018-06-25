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
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<Props> {

  state = {
    query: '',
  }

  onPressFetch() {
    if (this.state.query === '') {
      alert('Please input query')
      return
    }
    let url = "https://api.github.com/search/repositories?q=" + this.state.query
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        alert(responseJson.total_count);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  onChangeQuery(query) {
    this.setState({ query })
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.queryInput}
          value={this.state.query}
          onChangeText={query => this.onChangeQuery(query)}
        />
        <TouchableOpacity style={styles.fetchButton} onPress={() => this.onPressFetch()}>
          <Text style={styles.fetchButtonText}>Fetch</Text>
        </TouchableOpacity>
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
  queryInput: {
    height: 40,
    width: '90%',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#EEE',
  },
  fetchButton: {
    backgroundColor: '#55A',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  fetchButtonText: {
    color: '#FFF',
  },
});
