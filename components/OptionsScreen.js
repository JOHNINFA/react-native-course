// components/OptionsScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const OptionsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Main')}>
        <Text style={styles.optionText}>Sugeridos</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Cargue')}>
        <Text style={styles.optionText}>Cargue</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Devoluciones')}>
        <Text style={styles.optionText}>Devoluciones</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  option: {
    backgroundColor: '#66b3ff',
    padding: 20,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    borderRadius: 10,
  },
  optionText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default OptionsScreen;