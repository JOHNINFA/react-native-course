import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Vibration, ActivityIndicator, Alert } from 'react-native';
import { CheckBox } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Cargue = () => {
  const [selectedDay, setSelectedDay] = useState('Lunes');
  const [quantities, setQuantities] = useState({});
  const [checkedItems, setCheckedItems] = useState({});
  const [loading, setLoading] = useState(true);

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
    const fetchData = async () => {
      try {
        // Primero, carga el estado guardado
        const storedCheckedItems = await AsyncStorage.getItem('checkedItems');
        const storedQuantities = await AsyncStorage.getItem('quantities');

        const initialCheckedItems = storedCheckedItems ? JSON.parse(storedCheckedItems) : {};
        const initialQuantities = storedQuantities ? JSON.parse(storedQuantities) : {};

        setCheckedItems(initialCheckedItems);
        setQuantities(initialQuantities);

        // Luego, carga los datos del servidor
        const response = await fetch('https://script.google.com/macros/s/AKfycbx_deSF4M2f20mkMSAVdczW_BKD1peqyHixHh2una9VhlyygJl1SwcGz7UxioKOXzApRQ/exec');
        const data = await response.json();

        const updatedQuantities = productos.reduce((acc, product) => {
          const foundProduct = data.find(p => p.product === product);
          acc[product] = foundProduct ? foundProduct.quantity || '0' : '0';
          return acc;
        }, {});

        setQuantities(prevQuantities => ({ ...prevQuantities, ...updatedQuantities }));

        const updatedCheckedItems = productos.reduce((acc, product) => {
          const foundProduct = data.find(p => p.product === product);
          acc[product] = {
            D: foundProduct ? foundProduct.checked || false : false,
            V: initialCheckedItems[product]?.V || false
          };
          return acc;
        }, {});

        setCheckedItems(prevCheckedItems => ({ ...prevCheckedItems, ...updatedCheckedItems }));

        // Verificar y desmarcar checkboxes si todas las cantidades son 0
        const allQuantitiesZero = Object.values(updatedQuantities).every(q => q === '0');
        if (allQuantitiesZero) {
          const resetCheckedItems = productos.reduce((acc, product) => {
            acc[product] = {
              D: checkedItems[product]?.D || false,
              V: false, // Desmarcar checkbox V
            };
            return acc;
          }, {});

          setCheckedItems(resetCheckedItems);
          await AsyncStorage.setItem('checkedItems', JSON.stringify(resetCheckedItems));

          // Enviar estado false al servidor para los productos con cantidades en 0
          const dataToSend = productos.map(product => ({
            product,
            checked: false // Establecer estado a false
          }));

          const response = await fetch('https://script.google.com/macros/s/AKfycbynyJKU6Wz716_kFO6ufThuaBqvMESj6y3xDgUGuCEHMuPSA-A5tic0auYmbUcHzD6EoA/exec', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
          });

          if (!response.ok) {
            Alert.alert('Error', 'Hubo un problema al enviar los datos actualizados.');
          }
        }

        // Guardar estado actualizado en AsyncStorage
        await AsyncStorage.setItem('quantities', JSON.stringify(updatedQuantities));

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCheckChange = useCallback(async (productName, type) => {
    const newCheckedItems = {
      ...checkedItems,
      [productName]: {
        ...checkedItems[productName],
        [type]: !checkedItems[productName][type],
      }
    };

    setCheckedItems(newCheckedItems);
    Vibration.vibrate(50);

    if (type === 'V') {
      try {
        // Guardar estado en AsyncStorage
        await AsyncStorage.setItem('checkedItems', JSON.stringify(newCheckedItems));

        const dataToSend = [
          {
            product: productName,
            checked: newCheckedItems[productName]?.V // Enviar el estado actual de la casilla "V"
          }
        ];

        const response = await fetch('https://script.google.com/macros/s/AKfycbynyJKU6Wz716_kFO6ufThuaBqvMESj6y3xDgUGuCEHMuPSA-A5tic0auYmbUcHzD6EoA/exec', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend),
        });

        if (!response.ok) {
          Alert.alert('Error', 'Hubo un problema al guardar los datos.');
        }
      } catch (error) {
        console.error('Error al enviar datos en handleCheckChange:', error);
        Alert.alert('Error', 'Hubo un problema al enviar los datos.');
      }
    }
  }, [checkedItems]);

  const handleReload = async () => {
    setLoading(true);
    try {
      // Actualizar datos desde el servidor
      const response = await fetch('https://script.google.com/macros/s/AKfycbx_deSF4M2f20mkMSAVdczW_BKD1peqyHixHh2una9VhlyygJl1SwcGz7UxioKOXzApRQ/exec');
      const data = await response.json();

      const updatedQuantities = productos.reduce((acc, product) => {
        const foundProduct = data.find(p => p.product === product);
        acc[product] = foundProduct ? foundProduct.quantity || '0' : '0';
        return acc;
      }, {});

      setQuantities(prevQuantities => ({ ...prevQuantities, ...updatedQuantities }));

      const updatedCheckedItems = productos.reduce((acc, product) => {
        const foundProduct = data.find(p => p.product === product);
        acc[product] = {
          D: foundProduct ? foundProduct.checked || false : false,
          V: checkedItems[product]?.V || false
        };
        return acc;
      }, {});

      setCheckedItems(prevCheckedItems => ({ ...prevCheckedItems, ...updatedCheckedItems }));

      // Verificar y desmarcar checkboxes si todas las cantidades son 0
      const allQuantitiesZero = Object.values(updatedQuantities).every(q => q === '0');
      if (allQuantitiesZero) {
        const resetCheckedItems = productos.reduce((acc, product) => {
          acc[product] = {
            D: checkedItems[product]?.D || false,
            V: false, // Desmarcar checkbox V
          };
          return acc;
        }, {});

        setCheckedItems(resetCheckedItems);
        await AsyncStorage.setItem('checkedItems', JSON.stringify(resetCheckedItems));

        // Enviar estado false al servidor para los productos con cantidades en 0
        const dataToSend = productos.map(product => ({
          product,
          checked: false // Establecer estado a false
        }));

        const response = await fetch('https://script.google.com/macros/s/AKfycbynyJKU6Wz716_kFO6ufThuaBqvMESj6y3xDgUGuCEHMuPSA-A5tic0auYmbUcHzD6EoA/exec', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend),
        });
       
        if (!response.ok) {
          Alert.alert('Error', 'Hubo un problema al enviar los datos actualizados.');
        }
      }

      // Guardar estado actualizado en AsyncStorage
      await AsyncStorage.setItem('quantities', JSON.stringify(updatedQuantities));

    } catch (error) {
      console.error('Error fetching data during reload:', error);
      Alert.alert('Error', 'Hubo un problema al recargar los datos.');
    } finally {
      setLoading(false);
    }
  };

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
        disabled
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
        <Text style={[styles.title, styles.titleQuantity]}>Cantidades</Text>
        <Text style={styles.title}>Producto</Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#033468" />
      ) : (
        <FlatList
          data={productos}
          keyExtractor={item => item}
          renderItem={renderProduct}
          contentContainerStyle={styles.listContent}
        />
      )}
      <TouchableOpacity style={styles.reloadButton} onPress={handleReload}>
        <Text style={styles.reloadButtonText}>Recargar</Text>
      </TouchableOpacity>
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  selectedDayButton: {
    backgroundColor: '#F0F0F0',
    elevation: 3,
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
    marginRight: 13,
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
    padding: 6,
    height: '100%',
  },
  description: {
    fontSize: 10.5,
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
    marginLeft: 7,
  },
  checkbox: {
    width: 19,
    height: 23,
    padding: 1,
    borderColor: '#66b3ff',
    marginRight: 7,
  },
  reloadButton: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  reloadButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Cargue;