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
  TextInput,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import TodoList from './TodoList';

export default class App extends Component<Props> {
  
  state = {
    newTodo: '',
    todos: [],
  }

  constructor(props) {
    super(props);
    this.loadTodos();
  }
  
  onChangeText(newTodo) {
    this.setState({ newTodo });
  }

  onPressAdd() {
    const { newTodo } = this.state;
    if (newTodo === '') return;
    this.setState ({
      newTodo: '',
      todos: [ newTodo, ...this.state.todos],
    }, () => this.storeTodos())
  }

  onPressDelete(index) {
    this.setState ({
      todos: this.state.todos.filter((todo, idx) => idx !== index),
    }, () => this.storeTodos());
  }

  storeTodos() {
    const todosStr = JSON.stringify(this.state.todos);
    AsyncStorage.setItem('todos', todosStr);
  }

  loadTodos() {
    AsyncStorage.getItem('todos').then((todosStr) => {
      const todos = todosStr ? JSON.parse(todosStr) : [];
      this.setState({ todos });
    })
  }
  
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          value={this.state.newTodo}
          style={styles.form}
          onChangeText={text => this.onChangeText(text)}
        />
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => this.onPressAdd()}
        >
          <Text style={styles.addButtonText}>ADD</Text>
        </TouchableOpacity>
        <TodoList 
          todos={this.state.todos} 
          onPressDelete={(index) => this.onPressDelete(index)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  form: {
    backgroundColor: '#EEE',
    padding: 10,
  },
  addButton: {
    backgroundColor: '#55A',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  addButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
