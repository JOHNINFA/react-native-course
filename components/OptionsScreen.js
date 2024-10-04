import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const OptionsScreen = ({ navigation, userId }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Main', { userId })}>
        <Text style={styles.optionText}>Sugerido</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Cargue', { userId })}>
        <Text style={styles.optionText}>Despacho</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Vencidas', { userId })}>
        <Text style={styles.optionText}>Rendimiento</Text>
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
    backgroundColor: '#00ad53',
    padding: 20,
    marginVertical: 20,
    width: '80%',
    alignItems: 'center',
    borderRadius: 10,
    
  },
    optionText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
});

export default OptionsScreen;
