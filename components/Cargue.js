import React, { useState, useEffect, useCallback,useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Vibration, ActivityIndicator, Alert, Animated } from 'react-native';
import { CheckBox } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import debounce from 'lodash.debounce';

const Cargue = ({ userId }) => {
  const [selectedDay, setSelectedDay] = useState('Lunes');
  const [quantities, setQuantities] = useState({});
  const [checkedItems, setCheckedItems] = useState({});
  const [loading, setLoading] = useState(true);

  const scaleAnims = useRef({}).current;

  const dayUrls = {
    Lunes: {
      GET: `https://script.google.com/macros/s/AKfycbyHwYBeNjh5HjfKkZgMdQkAYi6bq1Ho2LQmbhTUQ9DqxGpbcuCx1d0FS_D8C6Dd_yMusw/exec?userId=${userId}`,
      POST: `https://script.google.com/macros/s/AKfycbwiKA3t2PGxOIFLgJwa4bJsIZNqOKhnAwU1SkroRMeeq0EwEpSnb4-Sb70lV5LmPUJFSg/exec?userId=${userId}`,
    },
    Martes: {
      GET: `https://script.google.com/macros/s/tu-url-de-martes-get`,
      POST: `https://script.google.com/macros/s/tu-url-de-martes-post`,
    },
    Miércoles: {
      GET: `https://script.google.com/macros/s/tu-url-de-miercoles-get`,
      POST: `https://script.google.com/macros/s/tu-url-de-miercoles-post`,
    },
    Jueves: {
      GET: `https://script.google.com/macros/s/tu-url-de-jueves-get`,
      POST: `https://script.google.com/macros/s/tu-url-de-jueves-post`,
    },
    Viernes: {
      GET: `https://script.google.com/macros/s/tu-url-de-viernes-get`,
      POST: `https://script.google.com/macros/s/tu-url-de-viernes-post`,
    },
    Sábado: {
      GET: `https://script.google.com/macros/s/tu-url-de-sabado-get`,
      POST: `https://script.google.com/macros/s/tu-url-de-sabado-post`,
    },
    Domingo: {
      GET: `https://script.google.com/macros/s/tu-url-de-domingo-get`,
      POST: `https://script.google.com/macros/s/tu-url-de-domingo-post`,
    },
  };

  const { GET: BASE_GET_URL, POST: BASE_POST_URL } = dayUrls[selectedDay];

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

 

  const fetchData = async () => {
    try {
      // Usar claves que incluyan el userId
      const storedCheckedItems = await AsyncStorage.getItem(`checkedItems_${userId}`);
      const storedQuantities = await AsyncStorage.getItem(`quantities_${userId}`);
  
      const initialCheckedItems = storedCheckedItems ? JSON.parse(storedCheckedItems) : {};
      const initialQuantities = storedQuantities ? JSON.parse(storedQuantities) : {};
  
      const response = await fetch(BASE_GET_URL);
      const data = await response.json();
  
      const updatedQuantities = productos.reduce((acc, product) => {
        const foundProduct = data[product];
        acc[product] = foundProduct ? foundProduct.quantity || '0' : '0';
        return acc;
      }, {});
  
      setQuantities(prevQuantities => ({ ...prevQuantities, ...updatedQuantities }));
  
      const updatedCheckedItems = productos.reduce((acc, product) => {
        const foundProduct = data[product];
        acc[product] = {
          D: foundProduct ? foundProduct.checked || false : false,
          V: initialCheckedItems[product]?.V || false
        };
        return acc;
      }, {});
  
      setCheckedItems(prevCheckedItems => ({ ...prevCheckedItems, ...updatedCheckedItems }));
  
      const allQuantitiesZero = Object.values(updatedQuantities).every(q => q === '0');
      if (allQuantitiesZero) {
        const resetCheckedItems = productos.reduce((acc, product) => {
          acc[product] = {
            D: checkedItems[product]?.D || false,
            V: false,
          };
          return acc;
        }, {});
  
        setCheckedItems(resetCheckedItems);
        await AsyncStorage.setItem(`checkedItems_${userId}`, JSON.stringify(resetCheckedItems));
  
        const dataToSend = productos.map(product => ({
          product,
          checked: false
        }));
  
        const postResponse = await fetch(BASE_POST_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend),
        });
  
        if (!postResponse.ok) {
          Alert.alert('Error', 'Hubo un problema al enviar los datos actualizados.');
        }
      }
  
      // Guardar los nuevos datos usando el userId en la clave
      await AsyncStorage.setItem(`quantities_${userId}`, JSON.stringify(updatedQuantities));
  
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 10000);
    return () => clearInterval(intervalId);
  }, [userId]);

  const syncDataToServer = async (newCheckedItems) => {
    const dataToSend = Object.entries(newCheckedItems).map(([product, item]) => ({
      product,
      checked: item.V // Cambia esto según tu lógica
    }));

    try {
      const response = await fetch(BASE_POST_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        Alert.alert('Error', 'Hubo un problema al enviar los datos.');
      }
    } catch (error) {
      console.error('Error al enviar datos:', error);
      Alert.alert('Error', 'Hubo un problema al enviar los datos.');
    }
  };

  const syncDataToServerDebounced = useCallback(debounce(syncDataToServer, 300), []);

  const handleCheckChange = useCallback((productName, type) => {
    if (type === 'V' && quantities[productName] === '0') {
      Alert.alert('Atención', 'No puedes marcar este producto porque la cantidad es cero.');
      return;
    }
  
    if (!scaleAnims[productName]) {
      scaleAnims[productName] = new Animated.Value(1);
    }
  
    Animated.sequence([
      Animated.timing(scaleAnims[productName], {
        toValue: 1.1,
        duration: 130,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnims[productName], {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  
    const newCheckedItems = {
      ...checkedItems,
      [productName]: {
        ...checkedItems[productName],
        [type]: true,
      },
    };
  
    setCheckedItems(newCheckedItems);
    Vibration.vibrate(50);
  
    // Guardar en AsyncStorage usando userId como parte de la clave
    AsyncStorage.setItem(`checkedItems_${userId}`, JSON.stringify(newCheckedItems));
  
    syncDataToServerDebounced(newCheckedItems);
  }, [checkedItems, quantities]);
  

  const handleReload = async () => {
    setLoading(true);
    await fetchData();
  };
  const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  const renderProduct = ({ item }) => {
    const scale = scaleAnims[item] || new Animated.Value(1);
  
    return (
    
        <View style={styles.productContainer}>
        <Animated.View style={{ transform: [{ scale }] }} key={item}>
          <CheckBox
            checked={checkedItems[item]?.V}
            onPress={() => handleCheckChange(item, 'V')}
            containerStyle={styles.checkbox}
            checkedColor="#28a745"
          />
          </Animated.View>
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
  };
  
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