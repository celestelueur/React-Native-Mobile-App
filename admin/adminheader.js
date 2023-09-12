
import React from 'react';
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import logo from '../img/pl.png'
const AdminHeader=()=>{
    return (
        <View style={styles.container}>
            <ScrollView>
              <View style={styles.box}>
                <Image source={logo} style={styles.logo} />
                <Text style={styles.title}>Pléthore</Text>
              </View>
            </ScrollView>

        </View>
      );



}
export default AdminHeader

const styles = StyleSheet.create({
    container: {
      flex: 1,
      
      backgroundColor: '#fff',
      maxHeight:40
    },
    box:{
     
      display:'flex',
      flexDirection:'row',
      justifyContent:'center'
    
    },
    title:{
      color:'red',
      marginTop:6,
      fontSize:16,
      fontFamily:'serif',
      fontWeight:'bold'
    },
    logo:{
      width:60,
      height:60
    }
  });
  

