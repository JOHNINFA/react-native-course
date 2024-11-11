import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';

const Navbar = ({ selectedDay, onDaySelected }) => {
  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  
  return (
    <View style={styles.header}>
      <TextInput
        style={styles.input}
        placeholder="Notas..."
        placeholderTextColor="#888"
      />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.daysContainer}>
        {days.map(day => (
          <TouchableOpacity 
            key={day} 
            style={[styles.dayButton, selectedDay === day && styles.selectedDayButton]} 
            onPress={() => onDaySelected(day)}
          >
            <Text style={[styles.dayText, selectedDay === day && styles.selectedDayText]}>{day}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'rgba(245, 245, 245, 0.6)',
    marginTop: 25,
    padding: 15,
    justifyContent: 'center',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  daysContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dayButton: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 3,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginRight: 17,
  },
  selectedDayButton: {
    backgroundColor: '#003d88',
  },
  dayText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 14,
  },
  selectedDayText: {
    color: 'white',
  },
});

export default Navbar;
