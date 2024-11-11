import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet, Alert, ActivityIndicator, View, TextInput} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Product from './Product';
import productos from './Productos'


const orderOfProducts = [
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
  "BLOQUE DE MASA",
  "LIBRAS DE MASA",
  "MUTE BOYACENSE",
  "LIBRA DE MAIZ PETO",
  "ENVUELTO DE MAIZ X 5 UND"
  
];

const getUrlByDay = (selectedDay, userId) => {
  const urls = {
    Lunes: `https://script.google.com/macros/s/AKfycbwadFyKaLcxopk-wwZUso66qjyB0x8USwsML7wDHi-4c9izm3WxUcvjzB3HvPi4npo/exec?userId=${userId}`,
    Martes: `https://script.google.com/macros/s/AKfycbzOxY9DkMLiVHui-kJDNRYZLmSJ_mAtLxzgTWfJnlvvt3IEdK6o2RkqqacG2GgqaI7G/exec?userId=${userId}`,
    Miércoles: `https://script.google.com/macros/s/AKfycbz0oBHhnPrl2HJjQX8LPMuQ653QQJtORAT45wcckHYBKqDArHvb-p_f1EBCHO33BA/exec?userId=${userId}`,
    Jueves: `https://script.google.com/macros/s/AKfycbwdmsDhEVO1ucl2v672zuFGa6QcBc3FuO1qCBtpeEvWayLdnVjyCqf-RUSrtRBA-w5k/exec?userId=${userId}`,
    Viernes: `https://script.google.com/macros/s/AKfycbzUdzf5gFtQACMm3mWkaYJTxnw5IHuRd6FApvub1l5JPqKl67JL1HjujwS4mCgcreFD/exec?userId=${userId}`,
    Sábado: `https://script.google.com/macros/s/AKfycbz-F9sz31L2QR-VLwOK2Rl2ofSr-_AOsxduuT_ycSimcezdZgSPSGB3ud0Ehfn_G0A/exec?userId=${userId}`,
   
  };
  return urls[selectedDay] || null;
};
const ProductList = ({ selectedDay, userId }) => {
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
 

  const handleQuantityChange = (productName, quantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productName]: quantity,
    }));
  };
  
 

  const handleSendPress = () => {
    if (!loading && selectedDay) {
      setShowDatePicker(true); // Abre el DatePicker para seleccionar fecha
    }
  };

  const handleDateChange = async (event, selectedDate) => {
    setShowDatePicker(false); // Cierra el DatePicker

    // Detectar si el usuario seleccionó "Cancelar" en lugar de confirmar la fecha
    if (event.type === 'dismissed') {
      setLoading(false); // No enviar si se canceló
      return;
    }

    setDate(selectedDate); // Actualiza la fecha seleccionada
    setLoading(true); // Activa el estado de carga

     // Ajustar la fecha a la zona horaria local
  const localDate = new Date(selectedDate);
  localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset());

    try {
      const url = getUrlByDay(selectedDay, userId);
      if (!url) {
        Alert.alert('Error', 'Día no seleccionado o no válido.');
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append('userId', userId);
      formData.append('date', selectedDate.toISOString().split('T')[0]);

      orderOfProducts.forEach(productName => {
        const quantity = quantities[productName] || '0';
        formData.append(productName, quantity);
      });

      const response = await fetch(url, { method: 'POST', body: formData });
      const responseText = await response.text();
      

      if (!response.ok) throw new Error('Error al enviar las cantidades');

      if (responseText.includes("Error: No se pueden enviar datos hasta que las celdas estén vacías")) {
        Alert.alert('Error', 'No se pueden enviar datos hasta que las celdas estén vacías en la hoja de cálculo.');
      } else {
        Alert.alert('Éxito', '¡Cantidades enviadas exitosamente!');
        setQuantities({});
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Hubo un error al enviar las cantidades');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {!selectedDay && (
        <Text style={styles.alertText}>Por favor, seleccione un día para ingresar cantidades.</Text>
      )}
      {orderOfProducts.map((productName, index) => (
        <Product
          key={index}
          product={productos[index]}
          quantity={quantities[productName] || '0'}
          onQuantityChange={handleQuantityChange}
          editable={!!selectedDay}
        />
      ))}
       

      <TouchableOpacity
        onPress={handleSendPress}
        style={styles.sendButton}
        disabled={loading || !selectedDay}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.sendButtonText}>Enviar Todas las Cantidades</Text>
        )}
      </TouchableOpacity>

      {/* Selector de fecha */}
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  alertText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
  sendButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#003d88',
    borderRadius: 5,
    alignItems: 'center',
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ProductList;