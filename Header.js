import React from "react";
import { View, TextInput, StyleSheet } from "react-native";



const Header = () => {
  return (
    <View style={styles.header}>
        <TextInput style ={styles.input} 
        placeholder="Buscar..."
        placeholderTextColor="#888"

        />
      
    </View>
  )
}

const styles = StyleSheet.create({
    header: {
      backgroundColor: 'white',
      marginTop :15,
      padding: 15,
      justifyContent: 'center',
    },
    input: {
      backgroundColor: '#E8E8E9', // color de fondo 232, 232, 233
      borderRadius: 8,
      padding: 10,
      width: '100%',
    },
  });

export default Header
