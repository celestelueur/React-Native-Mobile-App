import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Entypo, AntDesign, MaterialIcons, Ionicons, Feather, Foundation, FontAwesome, Octicons} from '@expo/vector-icons'
import AllUser from './userhome';
import {firebase, db} from '../fbconfig'
import Notification from './notification';
import Cart from './cart';
import { View, Text, TouchableOpacity, Image, Dimensions, useColorScheme } from 'react-native';
import UserProfil from './userprofil';
import Historic from './historic';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from '@react-navigation/native';
import { Platform } from 'react-native';
const Stack=createNativeStackNavigator()
const UserFooter=({navigation})=>{
    const theme=useColorScheme()
    const isDarkTheme=theme==="dark"
    const Tab=createBottomTabNavigator()
    //const [conn, setCOnn]=useState(false)
    const [users, setUsers] = useState([])
    
const phoneWidth=Dimensions.get('window').width
const phoneHeight=Dimensions.get('window').height
    const [offers, setOffers]=useState([])
    const [currentUserId, setCurrentUserId] = useState('')

    useEffect(()=>{
        db.child('products').on('value', (snapshot)=>{
            let update=[]
            snapshot.forEach((child)=>{
                update.push({
                    id:child.key,
                    name:child.val().name,
                    description:child.val().description,
                    price:child.val().price,
                    imgurl:child.val().imgArr,
                    promoPrice:child.val().promoPrice,
                    quantity:child.val().quantity,
                    time:child.val().time,
                    category:child.val().category
                })
            })  
            setOffers(update)
        })
    }, [])
    
    useEffect(()=>{
        db.child('users').on('value', (snapshot)=>{
            let update=[]
            snapshot.forEach((child)=>{
                update.push({
                    id:child.key,
                    username:child.val().username,
                    myCart:child.val().myCart,
                    activities:child.val().activities,
                    userId:child.val().userId,
                    pwd:child.val().pwd,
                    useradress:child.val().useradress,
                    phonenumber:child.val().phonenumber,
                    pic:child.val().pic
                })
            })  
            setUsers(update)
        })
    }, [])


    const countCart=()=>{
        for(let a of users){
            if(a.userId===currentUserId){
                if(!a.myCart){
                    return ""
                }
                else{

                    return a.myCart.length
                }

            }
        }
    }

    useEffect(()=>{
        firebase.auth().onAuthStateChanged((x)=>{
            if(x){
                setCurrentUserId(x.uid)
            }
            //setCurrentUserId(x.uid)
        })
    }, [])

    useEffect(()=>{
        firebase.auth().onAuthStateChanged((authenticated)=>{
            if(!authenticated){
                navigation.navigate('Login')
            }
            
            })
        }, [])

        const count=()=>{
            let arr=[]
            for(let a of offers){
                if(a.category==="Promo"){
                    arr=[...arr, a]
                }
            }
            return arr.length
        }

 
    return(
        <View style={{display:'flex', flex:1, flexDirection:'row'}}>
           
        <NavigationContainer independent >
    
        <Tab.Navigator screenOptions={{
            "tabBarActiveTintColor":isDarkTheme?'white': "orangered",
  "tabBarInactiveTintColor":isDarkTheme? "#eee":"#222",
  "tabBarInactiveBackgroundColor":isDarkTheme? "#111": "white",

  "tabBarActiveBackgroundColor":isDarkTheme?"#444": "white",
  "tabBarLabelStyle":{
    "fontSize":0,
    
  },
  
  "tabBarStyle": [
    {
      "display": "flex",
     "borderTopWidth":0,
     "borderLeftWidth":0.1,
                                    "borderRightWidth":0.1,
                                    'borderLeftWidth':0.1,
                                    "borderLeftColor":"#fff",
                                    "borderRightColor":"#fff",
                                    "borderTopColor":"#fff",
                                    "borderBottomColor":"#fff",
                                    //"borderTopLeftRadius":30,
                                    //"borderTopRightRadius":30,
                                    "borderTopLeftRadius":20,
                                    "borderTopRightRadius":20,
                                    "borderBottomLeftRadius":20,
                                    "borderBottomRightRadius":20,
      
    },
    null
  ]
        }} >
            <Tab.Screen name='Accueil' component={AllUser} options={{tabBarIcon:({color, size, focused})=>(
                focused?
                <Foundation name="home" color={'black'} size={26} />
                :
                <Octicons name="home" color={'#aaa'} size={20} />)  , headerStyle:{
                    backgroundColor:'#111',
                   
                }, headerShown:false, headerTintColor:'white', headerTitleAlign:'left', headerTitleStyle:{ letterSpacing:1, fontSize:18, fontFamily:'Helvetica'}}}
             />



            <Tab.Screen name='Panier' component={Cart} options={{tabBarBadge:countCart(), tabBarIcon:({color, size, focused})=>(
                focused?
                    <Ionicons name="md-cart" size={28} color={'black'} />
                    :
                    <Ionicons name="md-cart-outline" size={24} color={"#aaa"} />                

                  ), headerStyle:{
                    backgroundColor:'#111',
                    
                }, headerTintColor:'white', tabBarBadgeStyle:countCart()>0? {color:'white', backgroundColor:'orangered'}:{ backgroundColor:'transparent'}, headerShown:false, headerTitleAlign:'center', headerTitleStyle:{ letterSpacing:1, fontSize:18, fontFamily:'Helvetica'}}}
             />



            <Tab.Screen name={'Offres'} component={Notification} options={{tabBarBadge:count() ,tabBarIcon:({color, size, focused})=>(
                focused?
                    <AntDesign name='tag' color={'black'} size={24} />:
                    <AntDesign name='tago' color={'#aaa'} size={20} />


                )  , headerStyle:{
                    backgroundColor:'#111',
                   
                }, headerShown:false, headerTintColor:'white', headerTitleAlign:'left', headerTitleStyle:{ letterSpacing:1, fontSize:18, fontFamily:'Helvetica'}}}
             />



             {
 Object.keys(users).map((i, k)=>{
    if(users[i].userId===currentUserId){
        if(users[i].activities){
            return(
              <Tab.Screen key={k} name='Activités' component={Historic} options={{tabBarIcon:({color, size, focused})=>(
                <View key={k}>
               <MaterialIcons name="history" color={color} size={24} />
                <View style={{ marginBottom:"0%", borderWidth:1, borderColor:isDarkTheme?'#111': 'white', zIndex:11, left:"16%", position:'absolute', backgroundColor:'red', width:20, height:20, borderRadius:40}}>
                <View style={{width:"100%", height:'100%', justifyContent:'center',  alignItems:'center'}}>
                    <Text style={{color:'white', fontSize:12,}}>{[...users[i].activities].length}</Text>
                </View>
                
            </View></View>
                
              ), headerShown:false}} />
            )
            
        }
       
    }
  })
             }


           
{
    Object.keys(users).map((i, k)=>{
      if(users[i].userId===currentUserId){
          if(users[i].pic){
              return(
                <Tab.Screen key={k} name='Profil' component={UserProfil} options={{tabBarIcon:({color, size, focused})=>(
                      <Image  source={{uri:users[i].pic}} style={{width:32, height:32, borderRadius:64}} />
                ), headerShown:false, tabBarLabelStyle:{display:'none'}, tabBarActiveBackgroundColor:isDarkTheme? '#444':'black'}} />
              )
              
          }
          else{
            return(
            <Tab.Screen key={k} name='Profil' component={UserProfil} options={{tabBarIcon:({color, size, focused})=>(
            <FontAwesome name='user' color={color} size={26} />
            ), headerShown:false}}/>
            )
          }
       
      }
    })

}

        </Tab.Navigator>
        
        </NavigationContainer>

       
        </View>
        
    )
  
}

export default UserFooter