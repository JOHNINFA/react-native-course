import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Vibration, ActivityIndicator, Alert } from 'react-native';
import { CheckBox } from 'react-native-elements';

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
        const response = await fetch('https://script.google.com/macros/s/AKfycbwKTX9dJZlO97w_D9FHBW2q60X_WMjgthihTsXK416R3OHM0WNm7ryVndaZLAhRwGbh-g/exec');
        const data = await response.json();

        const initialQuantities = productos.reduce((acc, product) => {
          const foundProduct = data.find(p => p.product === product);
          acc[product] = foundProduct ? foundProduct.quantity || '0' : '0';
          return acc;
        }, {});

        const initialCheckedItems = productos.reduce((acc, product) => {
          const foundProduct = data.find(p => p.product === product);
          acc[product] = {
            D: foundProduct ? foundProduct.checked || false : false,
            V: false
          };
          return acc;
        }, {});

        setQuantities(initialQuantities);
        setCheckedItems(initialCheckedItems);
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
        const dataToSend = [
          {
            product: productName,
            checked: !checkedItems[productName]?.V // Enviar el estado invertido de la casilla "V"
          }
        ];

        const response = await fetch('https://script.google.com/macros/s/AKfycbxkYfepyL6g0-kXdhDrhKUVKFnsvdkpVcapSrJX8evyrrKZz7UEykzcYTPoaeQiySPWTw/exec', {
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

  const handleSave = async () => {
    try {
      const dataToSend = Object.entries(checkedItems)
        .filter(([productName, states]) => states.V === true) // Solo enviar los productos que están marcados
        .map(([productName, states]) => ({
          product: productName,
          checked: states.V // Enviar el estado del checkbox 'V'
        }));

      const response = await fetch('https://script.google.com/macros/s/AKfycby0vmsqIxyW9U-VjCnrt6XA0RTTJHQ0_FDsQafb0t7Ss8UIGmTb9ZkzNm3ykCoedqWIPA/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        Alert.alert('Éxito', 'Datos guardados correctamente.');
      } else {
        Alert.alert('Error', 'Hubo un problema al guardar los datos.');
      }
    } catch (error) {
      console.error('Error al enviar datos en handleSave:', error);
      Alert.alert('Error', 'Hubo un problema al enviar los datos.');
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
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Guardar</Text>
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
    marginLeft: 7,
  },
  checkbox: {
    width: 19,
    height: 23,
    padding: 1,
    borderColor: '#66b3ff',
    marginRight: 7,
  },
  saveButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Cargue;
