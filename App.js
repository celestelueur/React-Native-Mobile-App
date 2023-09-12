import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect, useRef, useCallback} from 'react';
import { StyleSheet, Text, View, BackHandler, FlatList, Pressable } from 'react-native';
import Login from './login';
import {firebase} from './fbconfig'
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import akIcon from './img/ak.png'
import Signup from './signup';
import { LogBox, Animated, Dimensions, Image, ActivityIndicator } from 'react-native';
import UserFooter from './user/userfooter';
import AdminFooter from './admin/adminfooter';
import martImg from './img/images-15.jpeg'
import mart2 from './img/images-17.jpeg'
import { ExpandingDot } from 'react-native-animated-pagination-dots';
import * as Animatable from 'react-native-animatable'
import plethore_icon from './img/ak.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { Entypo, Feather, FontAwesome, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native'
const Stack= createNativeStackNavigator()

const phoneWidth=Dimensions.get('window').width
const phoneHeight=Dimensions.get('window').height

const Welcome=({navigation})=>{
  const AppFeatures=()=>{
    return(
        <Animatable.View animation={"slideInUp"} delay={1000}  style={styles.pres}>
          <LinearGradient start={{x:1, y:1}} end={{x:0, y:0}} colors={["black", "black"]} style={{width:'100%', height:'100%', }}>
          <Animatable.View delay={600} animation="slideInDown" style={{flexDirection:'column', zIndex:222, backgroundColor:'', justifyContent:'center', alignItems:'center'}}>
            <Image source={akIcon} style={{width:phoneHeight*0.1, height:phoneHeight*0.1}}/>
           
          </Animatable.View>
          <Text style={{fontWeight:'bold', zIndex:111, fontSize:20, position:'absolute', right:'1%', top:"2.4%", color:'white', letterSpacing:2}}>ALTOKUDOS</Text>
          <View>
            <Image source={martImg} style={{width:"100%", height:phoneHeight*0.7, position:'absolute', left:0, top:0, zIndex:-111, borderTopLeftRadius:60, borderBottomRightRadius:60}} />
          </View>

          <View style={{width:phoneWidth, borderTopRightRadius:30, borderTopLeftRadius:30}}>
              <Animatable.View animation={"bounce"} duration={1600} iterationCount={'infinite'} style={styles.anim}><Text style={{color:'white', fontSize:20}}>paiement en ligne</Text><FontAwesome name="cc-visa" size={64} color='white' /></Animatable.View>
              <Animatable.View animation={"bounce"} duration={2400} iterationCount={'infinite'} style={styles.anim2}><Text style={{color:'white', fontSize:20}}>Achat Rapide </Text><FontAwesome name="shopping-cart" size={64} color='white' /></Animatable.View>
              <Animatable.View animation={"bounce"} duration={2800} iterationCount={'infinite'} style={styles.anim3}><Text style={{color:'white', fontSize:20}}>Livraison super rapide</Text><MaterialIcons name="local-shipping" size={64} color='white' /></Animatable.View>
          </View>

        
          </LinearGradient>
        </Animatable.View>
    )
  }
  
  const AppAces=()=>{
    return(
      <Animatable.View animation={"slideInUp"} delay={1000}  style={styles.pres}>
        <LinearGradient start={{x:1, y:1}} end={{x:0, y:0}} colors={["black", "black"]} style={{width:'100%', height:'100%', }}>
        <Animatable.View delay={600} animation="slideInDown" style={{flexDirection:'column', zIndex:222, backgroundColor:'', justifyContent:'center', alignItems:'center'}}>
          <Image source={akIcon} style={{width:phoneHeight*0.1, height:phoneHeight*0.1}}/>
         
        </Animatable.View>
        <Text style={{fontWeight:'bold', zIndex:111, fontSize:20, position:'absolute', right:'1%', top:"2.4%", color:'white', letterSpacing:2}}>ALTOKUDOS</Text>
        <View>
          <Image source={mart2} style={{width:"100%", height:phoneHeight*0.7, position:'absolute', left:0, top:0, zIndex:-111, borderTopLeftRadius:60,  borderBottomRightRadius:60}} />
        </View>

        <View style={{width:phoneWidth, borderTopRightRadius:30, borderTopLeftRadius:30}}>
            <Animatable.View animation={"bounce"} duration={1600} iterationCount={'infinite'} style={styles.anim}><Text style={{color:'white', fontSize:20}}>Application Stable et rapide</Text><MaterialIcons name="speed" size={64} color='white' /></Animatable.View>
            <Animatable.View animation={"bounce"} duration={2400} iterationCount={'infinite'} style={styles.anim2}><Text style={{color:'white', fontSize:20}}>Mode hors ligne supporté</Text><MaterialIcons name='signal-cellular-connected-no-internet-4-bar' size={64} color='white' /></Animatable.View>
            <Animatable.View animation={"bounce"} duration={2800} iterationCount={'infinite'} style={styles.anim3}><Text style={{color:'white', fontSize:20}}>Recherche de produit</Text><MaterialIcons name="search" size={64} color='white' /></Animatable.View>
        
        </View>

        <Animatable.View delay={4000} style={{ position:'absolute', bottom:"8%", right:"2%", justifyContent:'center', alignItems:'center', width:phoneWidth*0.35, height:phoneHeight*0.055, borderRadius:10, backgroundColor:'#222' }}>
            <TouchableOpacity onPress={()=>navigation.navigate('Login')} style={{alignItems:'center', width:"100%", height:"100%", justifyContent:'center'}}>
              <Text><FontAwesome name='arrow-right' size={24} color='white' /></Text>
            </TouchableOpacity>
          </Animatable.View>

        </LinearGradient>
      </Animatable.View>
  )
  }
  
  
  const [userIn, setUserIn]=useState(false)

  useFocusEffect(
    useCallback(()=>{
      const checker=async()=>{
    
        let savedMail=await AsyncStorage.getItem("@mail")
       let savedPwd=await AsyncStorage.getItem("@pass")
       if(savedMail && savedPwd){
        //setCurrentMail(savedMail)
        setUserIn(true)
        //setCurrentMail(savedMail)
        firebase.auth()
        .signInWithEmailAndPassword(savedMail, savedPwd)
        .then(()=>{
         
            if(savedMail=='altokudos@gmail.com'){
                navigation.navigate('Admin')
                
            }

            else{
                navigation.navigate('User')
                
            } 
        }
        )
        
    }
    else{
        setUserIn(false)
    }
    }

    checker()
    })
  )

  const scrollX=useRef(new Animated.Value(0)).current
  const st=<AppFeatures />
  const nd=<AppAces />
  const comps=[st, nd]
    return(
      <View>
          {
             userIn? 
             <View style={{flex:1, top:0, left:0, position:'absolute', flexDirection:'column', justifyContent:'center', alignItems:'center', width:phoneWidth, height:phoneHeight}}>
                  
                     <Image source={plethore_icon} style={{width:120, height:120}} />
     
             </View>: <View>
      <FlatList data={comps} horizontal showsHorizontalScrollIndicator={false} onScroll={Animated.event(
        [{nativeEvent: {contentOffset:{x:scrollX}}}],
        {useNativeDriver: false}
      )}
      pagingEnabled
      scrollEventThrottle={10}
  
      renderItem={({item})=>(
        
          item
      
  )}
      />
      
<ExpandingDot data={comps}
      expandingDotWidth={24}
      scrollX={scrollX}
      inActiveDotOpacity={0.6}
      activeDotColor="white"
      dotStyle={{
        width:10,
        height:10,
        borderWidth:4,
        borderColor:'white',
        color:'white',
        backgroundColor:'#233',
        borderRadius:20,
        marginHorizontal:5
      }}
      containerStyle={{ bottom:50}}
      />
      </View>
      
          }
      
     


      </View>
    )
}

export default function App({navigation}) {
  useEffect(()=>{
    BackHandler.addEventListener('hardwareBackPress', ()=>BackHandler.exitApp())
  })
  

  useEffect(()=>{
    LogBox.ignoreAllLogs()
  })

  return(
 
      //<View style={styles.container}>
        <NavigationContainer independent>
          <Stack.Navigator>

            <Stack.Screen name='Welcome' component={Welcome} options={{headerShown: false}} />
            <Stack.Screen name='Login' component={Login} options={{headerShown:false}} />
            <Stack.Screen name='Signup' component={Signup} options={{headerShown:false}}/>
            <Stack.Screen name='Admin' component={AdminFooter} options={{headerShown:false}} />
            <Stack.Screen name='User' component={UserFooter} options={{headerShown:false}} />
            
          </Stack.Navigator>
        </NavigationContainer>
     // </View>
    
  )
  
 

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    height:'100%',
    fontFamily:'Cochin',
    justifyContent: 'center',
  },

  pres:{
    width:phoneWidth,
    height:phoneHeight
  },
  anim:{
    width:phoneHeight*0.3,
    height:phoneHeight*0.3,
    borderRadius:phoneHeight*0.6,
    backgroundColor:'rgba(0, 215, 255, 0.9)',
    justifyContent:'center',
    flexDirection:'column',
    alignItems: 'center',
    top:phoneHeight*0.4,
    
    right:'-1%',
    position:'absolute',
    zIndex:-1
  },
  anim2:{
    width:phoneHeight*0.3,
    height:phoneHeight*0.3,
    borderRadius:phoneHeight*0.6,
    backgroundColor:'rgba(255, 69, 0, 0.9)',
    top:phoneHeight*0.25,
    left:'-1%',
    position:'absolute',
    justifyContent:'center',
   
    flexDirection:'column',
    alignItems: 'center',
    zIndex:-1
  },
  anim3:{
    width:phoneHeight*0.3,
    height:phoneHeight*0.3,
    borderRadius:phoneHeight*0.6,
    backgroundColor:'rgba(255, 140, 0, 0.9)',
    top:phoneHeight*0.1,
    right:'-1%',
    justifyContent:'center',
  
    flexDirection:'column',
    alignItems: 'center',
    position:'absolute',
    zIndex:-111
  }
});





