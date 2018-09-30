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
  FlatList,
} from 'react-native';

export default class App extends Component<Props> {

  state = {
    query: '',
    items: [],
    refreshing: false,
  }
  page = 0;

  fetchRepositories(refreshing = false, isPush = false) {
    if (this.state.query === '') {
      alert('Please input query');
      return;
    }
    const newPage = refreshing || isPush ? 1 : this.page + 1;
    this.setState({ refreshing })
    let url = `https://api.github.com/search/repositories?q=${this.state.query}&page=${newPage}`
    return fetch(url)
      .then((response) => response.json())
      .then(({ items }) => {
        if (items === undefined) {
          return;
        }
        this.page = newPage;
        if (isPush) {
          this.setState({ items })
        } else if (refreshing) {
          this.setState({ items, refreshing: false });
        } else {
          this.setState({ items: [...this.state.items, ...items], refreshing: false });
        }
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
        <TouchableOpacity style={styles.fetchButton} onPress={() => this.fetchRepositories(false, true)}>
          <Text style={styles.fetchButtonText}>Fetch</Text>
        </TouchableOpacity>
        <View style={styles.resultView}>
          <FlatList
            data={this.state.items}
            renderItem={({ item }) => 
              <View>
                <Text>{item.id}: {item.name} @{item.owner.login}</Text>
              </View>
            }
            keyExtractor={(item) => item.id}
            onEndReached={() => this.fetchRepositories()}
            onEndReachedThreshold={0.5}
            onRefresh={() => this.fetchRepositories(true)}
            refreshing={this.state.refreshing}
          />
        </View>
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
  resultView: {
    height: 400,
    width: '80%',
    marginTop: 10,
  },
});
