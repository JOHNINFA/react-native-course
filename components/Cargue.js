// components/Cargue.js
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Vibration } from 'react-native';
import { CheckBox } from 'react-native-elements';

const Cargue = () => {
  const [selectedDay, setSelectedDay] = useState('Lunes');
  const [quantities, setQuantities] = useState({});
  const [checkedItems, setCheckedItems] = useState({});

  const productos = [
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
    "AREPA SANTANDEREANA",
    "ALMOJÁBANAS X5",
    "ALMOJÁBANAS X10",
    "AREPA CON SEMILLA DE QUINUA",
    "AREPA CON SEMILLA DE CHÍA",
    "AREPA CON SEMILLA DE AJONJOLÍ",
    "AREPA CON SEMILLA DE LINAZA",
    "AREPA CON SEMILLA DE GIRASOL",
    "AREPA CHORICERA",
    "AREPA LONCHERÍA",
    "AREPA CON MARGARINA Y SAL",
    "YUCAREPA",
    "AREPA TIPO ASADERO X 10",
    "AREPA PARA RELLENAR # 1",
    "AREPA PARA RELLENAR #2",
    "AREPA PARA RELLENAR #3",
    "PORCIÓN DE AREPAS X 2 UND",
    "PORCIÓN DE AREPAS X 3 UND",
    "PORCIÓN DE AREPAS X 4 UND",
    "PORCIÓN DE AREPAS X 5 UND",
    "AREPA SUPER OBLEA",
    "LIBRAS DE MASA",
    "MUTE BOYACENSE",
    "LIBRA DE MAÍZ PETO",
    "ENVUELTO DE MAÍZ X 5 UND"
  ];

  useEffect(() => {
    // Inicializar cantidades y checkedItems para cada producto
    const initialQuantities = productos.reduce((acc, producto) => {
      acc[producto] = '0';
      return acc;
    }, {});
    const initialCheckedItems = productos.reduce((acc, producto) => {
      acc[producto] = { V: false, D: false };
      return acc;
    }, {});
    setQuantities(initialQuantities);
    setCheckedItems(initialCheckedItems);
  }, []);

  const handleCheckChange = useCallback((productName, type) => {
    setCheckedItems(prevCheckedItems => ({
      ...prevCheckedItems,
      [productName]: {
        ...prevCheckedItems[productName],
        [type]: !prevCheckedItems[productName][type],
      }
    }));
    Vibration.vibrate(50); // Agregar vibración
  }, []);

  const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  const renderProduct = ({ item }) => (
    <View style={styles.productContainer}>
      <CheckBox
        checked={checkedItems[item]?.V}
        onPress={() => handleCheckChange(item, 'V')}
        containerStyle={styles.checkbox}
        checkedColor="#28a745"
      />
      <CheckBox
        checked={checkedItems[item]?.D}
        onPress={() => handleCheckChange(item, 'D')}
        containerStyle={styles.checkbox}
      />
      <View style={styles.inputContainer}>
        <Text style={styles.quantity}>{quantities[item] || '0'}</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>{item}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.daysContainer}>
          {dias.map(dia => (
            <TouchableOpacity 
              key={dia} 
              style={[styles.dayButton, selectedDay === dia && styles.selectedDayButton]} 
              onPress={() => setSelectedDay(dia)}
            >
              <Text style={[styles.dayText, selectedDay === dia && styles.selectedDayText]}>{dia}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.titleContainer}>
        <Text style={[styles.title, styles.titleCheckbox]}>V</Text>
        <Text style={[styles.title, styles.titleCheckbox]}>D</Text>
        <Text style={[styles.title, styles.titleQuantity]}>CANTIDAD</Text>
        <Text style={[styles.title, styles.titleProduct]}>PRODUCTO</Text>
      </View>
      <FlatList
        data={productos}
        keyExtractor={(item) => item}
        renderItem={renderProduct}
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
    marginBottom: 10,
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
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 30,
    elevation: 2,
    shadowColor: '#000', // Añadido para efecto de sombra en iOS
    shadowOffset: { width: 0, height: 2 }, // Añadido para efecto de sombra en iOS
    shadowOpacity: 0.1, // Añadido para efecto de sombra en iOS
    shadowRadius: 2, // Añadido para efecto de sombra en iOS
  },
  selectedDayButton: {
    backgroundColor: '#F0F0F0',
    elevation: 3, // Mayor elevación para el botón seleccionado
    shadowOpacity: 0.3,
  },
  dayText: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
  },
  selectedDayText: {
    color: 'black',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#003d88',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginTop: -10,
    marginBottom: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  titleCheckbox: {
    flex: 0.5,
    paddingLeft: 0,
    paddingRight: 0,
  },
  titleQuantity: {
    flex: 1,
    textAlign: 'center',
  },
  titleProduct: {
    flex: 2,
    textAlign: 'center',
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  descriptionContainer: {
    flex: 2,
    backgroundColor: 'white',
    borderColor: '#66b3ff',
    borderWidth: 1,
    borderRadius: 10,
    padding: 7,
    width: '60%',
  },
  description: {
    fontSize: 11,
    fontWeight: '900',
    color: '#808080',
  },
  inputContainer: {
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
    width: '20%',
  },
  quantity: {
    fontSize: 12,
    fontWeight: '900',
    textAlign: 'center',
    padding: 8,
    borderColor: '#66b3ff',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    width: '100%',
    color: '#808080',
  },
  checkbox: {
    width: 19,
    height: 21,
    borderRadius: 2,
    padding: 0,
    margin: 0,
  },
});

export default Cargue;
