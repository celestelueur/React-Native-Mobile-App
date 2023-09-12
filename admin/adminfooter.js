import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Entypo, AntDesign, MaterialIcons, Ionicons, Feather} from '@expo/vector-icons'
import AdminHome from './adminhome';
import {firebase} from '../fbconfig'
import Add from './add';
import { View, Text } from 'react-native';
import AdminMore from './adminmore';
import Notifications from './notification';
import AdminProfil from './profil';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from '@react-navigation/native';
import { Platform } from 'react-native';
import Chat from './chat';
const Stack=createNativeStackNavigator()
const AdminFooter=({navigation})=>{
    const Tab=createBottomTabNavigator()
    
    useEffect(()=>{
        firebase.auth().onAuthStateChanged((authenticated)=>{
          if(authenticated){
            //const email=firebase.auth().currentUser.email
            if(!(authenticated && firebase.auth().currentUser.email==="altokudos@gmail.com")){ 
              navigation.navigate('Login')
            }
        }
    })}, [])


   
    return(
        <View style={{display:'flex', flex:1, flexDirection:'row'}}>
        <NavigationContainer independent >
        <Tab.Navigator screenOptions={{
            "tabBarActiveTintColor": "orangered",
  "tabBarInactiveTintColor": "#222",
  "tabBarInactiveBackgroundColor":"white",
  //"tabBarActiveBackgroundColor": "black",
  "tabBarLabelStyle":{
    "fontSize":12
  },
  "tabBarStyle": [
    {
      "display": "flex",
      
    },
    null
  ]
        }} >
            <Tab.Screen name='Accueil' component={AdminHome} options={{tabBarIcon:({color, size})=>(
                <MaterialIcons name='home' color={color} size={26} />), headerStyle:{
                    backgroundColor:'#111',
                   
                }, headerShown:false, headerTintColor:'white', headerTitleAlign:'left', headerTitleStyle:{ letterSpacing:1, fontSize:18, fontFamily:'Helvetica'}}}
             />

            <Tab.Screen name='Ajouter' component={Add} options={{tabBarIcon:({color, size})=>(
                <MaterialIcons name='add' color={color} size={26} />), headerStyle:{
                    backgroundColor:'#111',
                    
                }, headerTintColor:'white', headerShown:false, headerTitleAlign:'center', headerTitleStyle:{ letterSpacing:1, fontSize:18, fontFamily:'Helvetica'}}}
             />

            <Tab.Screen name='Notifications' component={Notifications} options={{tabBarIcon:({color, size})=>(
                <MaterialIcons name='notifications' color={color} size={26} />), headerStyle:{
                    backgroundColor:'#111'
                }, headerTintColor:'white', headerShown:false, headerTitleAlign:'center', headerTitleStyle:{ letterSpacing:1, fontSize:18, fontFamily:'Helvetica'}}}
             />

            <Tab.Screen name='Chat' component={Chat} options={{tabBarIcon:({color, size})=>(
                <Ionicons name='chatbox' color={color} size={24} />), headerStyle:{
                    backgroundColor:'#111'
                }, headerTintColor:'white', headerShown:false, headerTitleAlign:'center', headerTitleStyle:{ letterSpacing:1, fontSize:18, fontFamily:'Helvetica'}}}
             />

            <Tab.Screen name='Options' component={AdminMore} options={{tabBarIcon:({color, size})=>(
                <MaterialIcons name="bar-chart" color={color} size={22} />), headerStyle:{
                    backgroundColor:'#111'
                }, headerTintColor:'white', headerShown:false,title:'Statistiques', headerTitleAlign:'center', headerTitleStyle:{ letterSpacing:1, fontSize:18, fontFamily:'Helvetica'}}}
             />






        </Tab.Navigator>
        
       

        </NavigationContainer>

       
        </View>
        
    )

}
export default AdminFooter