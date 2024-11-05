import React, { useState, useEffect, useCallback, useRef } from 'react';
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
      GET: `https://script.google.com/macros/s/AKfycbzG6JaJl2hhHsuXmRd8O_gl5dIXcWUnYw5go2TGxmGkxm5TxF-ghL7CYKsT1Vqwuayk/exec?userId=${userId}`,
      POST: `https://script.google.com/macros/s/AKfycbzW2s4XcpXhBneFTb_LgtJuVmPjJhdlDFDdjugqz6JE2jx8sBR3V1pUWibXGM1k1KSd/exec?userId=${userId}`,
    },
    Martes: {
      GET: `https://script.google.com/macros/s/AKfycbzzqdDnqwknS2bK7xqGvxcP0YMzsALe59aafbIg5KOaB5A5ur-6MgcnWCoyCWZ1CHkO/exec?userId=${userId}`,
      POST: `https://script.google.com/macros/s/AKfycbz2lYszS5rFbxePsdyCo5iEWyiuiJN9UJBeWDLiSzvzVuCnjU8lBkMao49Vw79WSQc/exec?userId=${userId}`,
    },
    Miércoles: {
      GET: `https://script.google.com/macros/s/AKfycbzOzY7ShAxaWZ1zQTYCAVxU2GfiMvnpEDaAMQmMdVDqo_UKqCNERpy4YPyXsqRVsC4/exec?userId=${userId}`,
      POST: `https://script.google.com/macros/s/AKfycbwqrnajtsm5P1NxOu90u6huxvw1BDhfkc1iGXUvvYzmiPoVnE6pM-L_DKNT6pa4GLDr/exec?userId=${userId}`,
    },
    Jueves: {
      GET: `https://script.google.com/macros/s/AKfycbxAxFfQzZCxxHJ0clpS3Lzym3hFIAJ4IegV7Es_fLDZ2Z5yHPkvA7cAz3wsWURvApQV/exec?userId=${userId}`,
      POST: `https://script.google.com/macros/s/AKfycbzE5sCtzpNuUkLnJ7MXqI4VHTf_IYZty276GHu8kAo56z1JzPvC8ujXaOroZzcxUww/exec?userId=${userId}`,
    },
    Viernes: {
      GET: `https://script.google.com/macros/s/AKfycbxXpKzH0tuvKHCfrcJKGbXyGS55Ik2K0G4yx3sHNJDOQH6w3jGx-UsRdTV0yKOOxKf9/exec?userId=${userId}`,
      POST: `https://script.google.com/macros/s/AKfycbwMBIXzT769iTet5QDGM_DWTrAV709AdaEY9g607NOt3JK3OWu6XozjZUvOyIRf410/exec?userId=${userId}`,
    },
    Sábado: {
      GET: `https://script.google.com/macros/s/AKfycby9dmz5U6qssacj3z_ZfeQBrdikY_Ek4kjODCUKK2JcU68pMjagRM2HtzlpFcre5nUY/exec?userId=${userId}`,
      POST: `https://script.google.com/macros/s/AKfycbz-7Qyf1c3cZ-HIym_GSlqHW1M3Irvr2zU9Jlm_onnBp9LcHnyFtMWdgR0bjCbgF6Mb/exec?userId=${userId}`,
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
    setLoading(true); // Muestra el indicador de carga
    try {
      // Resetea el estado al cambiar de día
      setCheckedItems({});
      setQuantities({});
  
      const storedCheckedItems = await AsyncStorage.getItem(`checkedItems_${userId}_${selectedDay}`);
      const storedQuantities = await AsyncStorage.getItem(`quantities_${userId}_${selectedDay}`);
  
      const initialCheckedItems = storedCheckedItems ? JSON.parse(storedCheckedItems) : {};
      const initialQuantities = storedQuantities ? JSON.parse(storedQuantities) : {};
  
      const response = await fetch(dayUrls[selectedDay].GET);
      const data = await response.json();
  
      const updatedQuantities = productos.reduce((acc, product) => {
        acc[product] = data[product]?.quantity || '0';
        return acc;
      }, {});
  
      const updatedCheckedItems = productos.reduce((acc, product) => {
        const isQuantityZero = updatedQuantities[product] === '0';
  
        // Si la cantidad es 0, desmarca el checkbox de 'V'
        acc[product] = {
          D: data[product]?.checked || false,
          V: isQuantityZero ? false : initialCheckedItems[product]?.V || false,
        };
  
        return acc;
      }, {});
  
      setQuantities(updatedQuantities);
      setCheckedItems(updatedCheckedItems);
  
      // Guardar en AsyncStorage
      await AsyncStorage.setItem(`quantities_${userId}_${selectedDay}`, JSON.stringify(updatedQuantities));
      await AsyncStorage.setItem(`checkedItems_${userId}_${selectedDay}`, JSON.stringify(updatedCheckedItems));
  
      // Enviar los datos actualizados al servidor si hay cambios en los checks de 'V'
      const itemsToUpdate = Object.fromEntries(
        Object.entries(updatedCheckedItems).filter(([product, item]) => item.V !== initialCheckedItems[product]?.V)
      );
      if (Object.keys(itemsToUpdate).length > 0) {
        syncDataToServerDebounced(itemsToUpdate);
      }
  
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };
  
  
  useEffect(() => {
    // Limpiar los datos de cantidades y de checks cuando se cambia el día
    setCheckedItems({});
    setQuantities({});
    setLoading(true);
    
    // Llamar a fetchData para cargar los datos del día seleccionado
    fetchData();
    
    // Establecer intervalo para actualizar datos cada 50 segundos
    const intervalId = setInterval(fetchData, 50000);
  
    return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar o cambiar de día
  }, [userId, selectedDay]); // Añadir dependencia a selectedDay para que se ejecute cada vez que cambies el día
  

  const syncDataToServer = async (newCheckedItems) => {
    const dataToSend = Object.entries(newCheckedItems).map(([product, item]) => ({
      product,
      checked: item.V
    }));
  

    try {
      const response = await fetch(dayUrls[selectedDay].POST, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        Alert.alert('Error', 'Hubo un problema al enviar los datos.');
        console.log('Error en la respuesta del servidor:', response.status); 
      }
    } catch (error) {
      console.error('Error al enviar datos:', error);
      Alert.alert('Error', 'Hubo un problema al enviar los datos.');
    }
  };

  const syncDataToServerDebounced = useCallback(debounce(syncDataToServer, 300), [selectedDay]);

  const handleCheckChange = useCallback((productName, type) => {
    if (checkedItems[productName]?.[type]) return;

    if (type === 'V' && quantities[productName] === '0') {
      Alert.alert('Atención', 'No puedes marcar este producto porque la cantidad es cero.');
      return;
    }

    if (!scaleAnims[productName]) {
      scaleAnims[productName] = new Animated.Value(2);
    }

    const newCheckedItems = {
      ...checkedItems,
      [productName]: { ...checkedItems[productName], [type]: !checkedItems[productName][type] },
    };

    setCheckedItems(newCheckedItems);
    Vibration.vibrate(30);

    Animated.sequence([
      Animated.timing(scaleAnims[productName], {
        toValue: 1.05,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnims[productName], {
        toValue: 1,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();

    AsyncStorage.setItem(`checkedItems_${userId}_${selectedDay}`, JSON.stringify(newCheckedItems));
    syncDataToServerDebounced(newCheckedItems);
  }, [checkedItems, quantities, selectedDay]);

  const handleReload = async () => {
    setLoading(true);
    await fetchData();
  };

  const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  const renderProduct = ({ item }) => {
    const scale = scaleAnims[item] || new Animated.Value(1);

    return (
      <View style={styles.productContainer}>
        <Animated.View style={{ transform: [{ scale }] }}>
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
      <Text style={[styles.title, styles.titleCheckbox, styles.titleV]}>V</Text>
      <Text style={[styles.title, styles.titleCheckbox, styles.titleD]}>D</Text>
      <Text style={[styles.title, styles.titleQuantity, styles.titleC]}>Cantidad</Text>
     <Text style={[styles.title, styles.titledescripcion, styles.titleP]}>Producto</Text>
   </View>

      {loading ? (
        <ActivityIndicator size="large" color="#033468" />
      ) : (
        <FlatList
        data={productos}
        keyExtractor={item => item}
        renderItem={renderProduct}
        initialNumToRender={5} // Número de elementos a renderizar inicialmente
        maxToRenderPerBatch={5} // Máximo número de elementos por lote
        windowSize={10} // Tamaño de la ventana
        removeClippedSubviews={true} // Mejora el rendimiento
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
    flexDirection: 'row', // Asegúrate de que los elementos estén en fila
    alignItems: 'center', // Alinea los elementos verticalmente en el centro
    backgroundColor: '#003d88',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginTop: -10,
    marginBottom: 10,
  },
  title: {
    // Otros estilos generales para el texto
    fontSize: 16,
  },
  titleCheckbox: {
    flex: 0.5,
    paddingLeft: 0,
    paddingRight: 0,
  },
  titleV: {
    marginLeft:2,
    marginRight: -4, // Ajusta este valor para mover "V" hacia la derecha
  },
  titleD: {
    marginRight: -11, // Ajusta este valor para mover "D" un poco hacia la derecha
  },
  titleC: {
    marginRight: 29, // Ajusta este valor para mover "C" hacia la izquierda
  },

  titleP: {
    marginRight: 60, // Ajusta este valor para mover "C" hacia la izquierda
  },
  titleQuantity: {
    // Otros estilos específicos para la cantidad si es necesario
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