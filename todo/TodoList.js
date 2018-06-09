import React from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default (props) => (
  <ScrollView>
    {
      props.todos.map((todo, index) => (
        <View key={index} style={styles.todoContainer}>
          <Text>- {todo}</Text>
          <TouchableOpacity onPress={() => props.onPressDelete(index)} style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      ))
    }
  </ScrollView>
);

const styles = StyleSheet.create({
  todoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#EEE',
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#D55',
  },
  deleteButtonText: {
    color: '#FFF',
  },
});
