import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import Navbar from './Navbar'; // Importa el componente Navbar

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
  "LIBRAS DE MASA",
  "MUTE BOYACENSE",
  "LIBRA DE MAIZ PETO",
  "ENVUELTO DE MAIZ X 5 UND"
];

const Vencidas = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [quantities, setQuantities] = useState({});

  const renderItem = ({ item }) => {
    const vencidas = quantities[item]?.vencidas || '0';
    const devoluciones = quantities[item]?.devoluciones || '0';
    const total = parseInt(vencidas) + parseInt(devoluciones);

    return (
      <View style={styles.productContainer}>
        <TouchableOpacity style={styles.productButton}>
          <Text style={styles.productName}>{item}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quantityButton}>
          <Text style={styles.quantityText}>{vencidas}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quantityButton}>
          <Text style={styles.quantityText}>{devoluciones}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quantityButton}>
          <Text style={styles.quantityText}>{total}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Navbar con selección de días */}
      <View style={styles.navbarWrapper}>
        <Navbar selectedDay={selectedDay} onDaySelected={setSelectedDay} />
      </View>

      <View style={styles.contentContainer}>
        {/* Títulos de columnas fijos */}
        <View style={styles.headerRow}>
        <Text style={[styles.headerText, styles.productHeader]}>PRODUCTO</Text>
        <Text style={[styles.headerText, styles.vencidasHeader]}>VENCIDAS</Text>
        <Text style={[styles.headerText, styles.devolucionHeader]}>DEVOLUCION</Text>
        <Text style={[styles.headerText, styles.totalHeader]}>TOTAL</Text>
        </View>

        {!selectedDay && (
          <Text style={styles.alertText}>Por favor, seleccione un día para ingresar cantidades.</Text>
        )}

        {selectedDay && (
          <FlatList
            data={orderOfProducts}
            renderItem={renderItem}
            keyExtractor={(item) => item}
            contentContainerStyle={styles.scrollViewContent}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Gris suave
  },
  navbarWrapper: {
    marginTop: 0, // Ajusta según la altura del Navbar
    zIndex: 10, // Asegúrate de que esté por encima de otros elementos
  },
  contentContainer: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 20,
  },
  alertText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 5,
    marginBottom: 3,
    backgroundColor: '#f5f5f5', // Igual al fondo de la pantalla
  },
  headerText: {
    fontSize: 11,
    fontWeight: 'bold',
    borderRadius: 8,
    textAlign: 'center',
    color: '#696969',
  },
  
  productHeader: {
    width: '40%', // El ancho de la columna "PRODUCTO"
    marginLeft: 24, // Mueve "PRODUCTO" hacia la derecha
  },
  
  vencidasHeader: {
    width: '15%',
    marginRight: 1,
    marginLeft: 22, // Mueve "VENCIDAS" hacia la derecha
  },
  
  devolucionHeader: {
    width: '25%',
    marginRight: 1, // Mueve "DEVOLUCION" hacia la izquierda
    marginLeft:5,
  },
  
  totalHeader: {
    width: '18%',
   
    marginRight:15, 
    marginLeft:-15,
  },
  productHeader: {
    width: '35%', // Ajustar el ancho de la columna de productos
  },
  quantityHeader: {
    width: '20%', // Ajustar el ancho de las columnas de cantidad, devoluciones y total
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    justifyContent: 'space-between', // Asegura que los botones estén separados
  },
  productButton: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 9,
    borderWidth: 1,
    borderColor: 'green',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    width: '40%',
    minHeight: 47, // Asegura una altura mínima
    justifyContent: 'center',
    alignItems: 'center', // Centra el contenido
  }
  ,
  productName: {
    fontSize: 11,
    fontWeight: '900',
    color: 'black',
    textAlign: 'center',
  },
  quantityButton: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: 'green',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    width: '19%',
    minHeight: 47, // Asegura una altura mínima
    justifyContent: 'center',
    alignItems: 'center', // Centra el contenido
  },
  quantityText: {
    fontSize: 12,
    fontWeight: '900',
    textAlign: 'center',
    color: '#808080',
  },
});

export default Vencidas;
