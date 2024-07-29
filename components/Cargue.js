// components/Cargue.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';

const Cargue = () => {
  const [selectedDay, setSelectedDay] = useState('Lunes');
  const [quantities, setQuantities] = useState({});

  const products = [
    "AREPA TIPO OBLEA",
    "AREPA MEDIANA",
    "AREPA TIPO PINCHO",
    "AREPA CON QUESO - CORRIENTE",
    "AREPA CON QUESO- ESPECIAL GRANDE",
    "AREPA CON QUESO- ESPECIAL PEQUEÑA",
    "AREPA CON QUESO MINI X 10",
    "AREPA CON QUESO CUADRADA",
    "AREPA DE CHOCLO-CORRIENTE",
    "AREPA DE CHOCLO CON QUESO GRANDE",
    "AREPA DE CHOCLO CON QUESO PEQUEÑA",
    "AREPA BOYACENSE X5",
    "AREPA BOYACENSE X10",
    "AREPA SANTADERANA",
    "ALMOJABANAS X5",
    "ALMOJABANAS X10",
    "AREPA CON SEMILLA DE QUINUA",
    "AREPA CON SEMILLA DE CHIA",
    "AREPA CON SEMILLA DE AJONJOLI",
    "AREPA CON SEMILLA DE LINANZA",
    "AREPA CON SEMILLA DE GIRASOL",
    "AREPA CHORICERA",
    "AREPA LONCHERIA",
    "AREPA CON MARGARINA Y SAL",
    "YUCAREPA",
    "AREPA TIPO ASADERO X 10",
    "AREPA PARA RELLENAR # 1",
    "AREPA PARA RELLENAR #2",
    "AREPA PARA RELLENAR #3",
    "PORCION DE AREPAS X 2 UND",
    "PORCION DE AREPAS X 3 UND",
    "PORCION DE AREPAS X 4 UND",
    "PORCION DE AREPAS X 5 UND",
    "AREPA SUPER OBLEA",
    "LIBRAS DE MASA",
    "MUTE BOYACENSE",
    "LIBRA DE MAIZ PETO",
    "ENVUELTO DE MAIZ X 5 UND"
  ];

  useEffect(() => {
    // Initialize quantities for each product with 0
    const initialQuantities = products.reduce((acc, product) => {
      acc[product] = '0';
      return acc;
    }, {});
    setQuantities(initialQuantities);
  }, []);

  const handleQuantityChange = (productName, quantity) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productName]: quantity
    }));
  };

  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.daysContainer}>
          {days.map(day => (
            <TouchableOpacity 
              key={day} 
              style={[styles.dayButton, selectedDay === day && styles.selectedDayButton]} 
              onPress={() => setSelectedDay(day)}
            >
              <Text style={[styles.dayText, selectedDay === day && styles.selectedDayText]}>{day}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Productos</Text>
        <Text style={styles.title}>Cantidad</Text>
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <View style={styles.descriptionContainer}>
              <Text style={styles.description}>{item}</Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="0"
                keyboardType="numeric"
                value={quantities[item]}
                onChangeText={(text) => handleQuantityChange(item, text)}
                textAlign="center"
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  navbar: {
    marginBottom: 10, // Reduced margin to decrease space between navbar and title
  },
  daysContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  dayButton: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 3,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 30, // Reduced margin to decrease space between day buttons
  },
  selectedDayButton: {
    backgroundColor: '#66b3ff',
  },
  dayText: {
    fontSize: 14,
    color: '#000',
  },
  selectedDayText: {
    color: '#fff',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#003d88',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginTop: -10, // Reduced margin to bring title closer to the days
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    flex: 1,
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  descriptionContainer: {
    flex: 1,
    marginRight: 10,
    backgroundColor: '#fff',
    borderColor: '#66b3ff',
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
  },
  description: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  inputContainer: {
    width: 70,
  },
  input: {
    height: 35,
    borderColor: '#003d88',
    borderWidth: 0.5,
    borderRadius: 10,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
  },
});

export default Cargue;
