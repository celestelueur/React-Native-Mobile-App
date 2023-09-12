//
import { View, Text, Dimensions, useColorScheme, FlatList, StyleSheet, PermissionsAndroid, TextInput, Image, BackHandler, TouchableHighlight, Keyboard, TouchableOpacity, ActivityIndicator } from "react-native"
import RNRestart from 'react-native-restart'
import defaultProfilPic from '../img/pof.png'
//import { Button } from "react-native-elements/dist/buttons/Button"
import {firebase, db} from '../fbconfig'
import { useState, useEffect } from "react"
import { Entypo } from "@expo/vector-icons"
//import { TouchableOpacity } from "react-native-gesture-handler"
import * as ImagePicker from 'expo-image-picker'
import LinearGradient from "react-native-linear-gradient"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Pressable } from "react-native"
import TimeAgo from "javascript-time-ago"
import fr from 'javascript-time-ago/locale/fr.json'

const phoneWidth=Dimensions.get('window').width
const phoneHeight=Dimensions.get('window').height
const Historic=({navigation})=>{

    const theme=useColorScheme()
    const isDarkTheme=theme==="dark"

    TimeAgo.addLocale(fr)
    const timeAgo=new TimeAgo('fr-FR')

    const [users, setUsers]=useState([])
    const [currentUserId, setCurrentUserId]=useState('')
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

    const [deleting, setDelete]=useState(false)
    const [shipping, setShipping]=useState(false)

    const deleteAll=()=>{
        setDelete(true)

        for(let x of users){
            if(x.userId===currentUserId){
               if(x.activities){
                    db.child(`users/${x.id}/activities`).set([])
                        .then(()=>{
                            navigation.navigate('Accueil')
                            setDelete(false)
                    })
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

        return(
            <View style={{backgroundColor:isDarkTheme? "#222":'#fff', width:phoneWidth, height:phoneHeight}}>

               

                <Pressable onPress={()=>deleteAll()} style={{marginBottom:'5%', marginTop:'5%', marginLeft:'3%', backgroundColor:isDarkTheme? "#111":"#ddd", width:phoneWidth*0.32, borderRadius:20, height:phoneHeight/18, alignItems:'center', justifyContent:'center'}}>
                    {
                        deleting?
                        <ActivityIndicator size={"large"} color={"#aaa"}/>:
                        <Text style={{color:isDarkTheme? "#aaa":"#222"}}>Tout effacer <Entypo name="trash" size={20} color={isDarkTheme? '#aaa':"#444"} /></Text>
        
                    }
                          </Pressable>
                 {
                Object.keys(users).map((i, v)=>{
                    if(users[i].userId===currentUserId){

                        return(
                            <FlatList key={v} data={[...users[i].activities].reverse()}
                            
                            numColumns={1}
              renderItem={({item})=>(
                                     
                  
                <LinearGradient style={[...users[i].activities].reverse().indexOf(item)===[...users[i].activities].reverse().length-1? {justifyContent:'center', marginBottom:'18%', borderRadius:10, marginLeft:'2.5%', width:phoneWidth/1.05, height:140, borderColor:'#ddd'}:{justifyContent:'center',  borderRadius:10, marginLeft:'2.5%', width:phoneWidth/1.05, height:140, marginBottom:'1%',  borderColor:'#ddd'} } colors={isDarkTheme? ['#444', '#111']: ['white', '#eee']} >
    
    {
        item.shipped===true? 
        ''
    :
    <Pressable style={{width:"41%", height:'20%', borderRadius:6, justifyContent:'center', alignItems:'center', backgroundColor:'rgba(250, 60, 10, 0.6)'}} onPress={()=>{
                                setShipping(true)
                                Object.keys(users).map((v, k)=>{
                                    if(users[v].userId===currentUserId){
                                        for(let one of users[v].activities){
                                            let i=users[v].activities.indexOf(item)
                                            if(one.id===item.id){
                                                if(i!==-1){
                                                    //if(timeAgo.format(item.orderTime-60*1000)==='il y a 30 minutes'){
                                                        db.child(`users/${users[v].id}/activities/${i}/shipped`).set(true)
                                                        .then(()=>{
                                                            setShipping(false)
                                                        })
                                                  //  }

                                                    
                                                }
                                               
                                            }
                                        }}
                                })
                              //  timeAgo.format(item.orderTime-60*1000)==='il y a 40 minutes'?
                                
    }}>
        <Text ellipsizeMode="tail" numberOfLines={1} style={{fontSize:11, color:"#fff"}}>{
        shipping?
        <ActivityIndicator size={'small'} color={'#fff'} />:"Cliquer ici si vous l'avez reçu"}</Text>
     </Pressable>
                        

}

      
                <View style={{width:'100%', flexDirection:'row', alignItems:'center'}}>
               
                {item.imgurl? <Image source={{uri:item.imgurl[0]}} style={{width:'40%', marginLeft:'1%', height:100, borderRadius:8, resizeMode:'contain'}} />:''}
                            
                           
                            <Text ellipsizeMode="tail" style={{marginLeft:'3%', color:'#aaa', letterSpacing:1, maxWidth:"42%", fontSize:16}} numberOfLines={1} >{item.name}</Text>
                                        
                            <Text style={{position:'absolute', right:'3%', fontSize:22, color:isDarkTheme? '#bbb': '#444', fontWeight:'bold'}}>{item.category==="Promo"? item.promoPrice:item.price}$</Text>
                            <Text style={{position:'absolute', bottom:'0%', left:'44%', color:'#aaa'}}>Commande {item.articleCount>1? `de ${item.articleCount} pièces`:''}</Text>
                            <Text style={{color:'#aaa', fontSize:12, position:'absolute', top:'0%', left:'44%'}} >{timeAgo.format(item.orderTime-60*1000)==='il y a 1 minute'? "A l'instant":timeAgo.format(item.orderTime-60*1000)}</Text>
                       

                       {
                        item.shipped===true?
                        <View style={{position:'absolute', width:'28%', height:phoneHeight/18, right:"1%", top:'-13%', borderRadius:10, backgroundColor:'#151'}}>
                        <View style={{width:"100%", height:"100%", justifyContent:'center', alignItems:'center'}}>
                            <Text ellipsizeMode="tail" numberOfLines={1} style={{color:'#eee', fontSize:11}}>Livré avec succès</Text>
                        </View>
                        
                    </View>
                        :
                        <View style={{position:'absolute', width:'28%', height:phoneHeight/18, right:"1%", top:'-13%', borderRadius:10, backgroundColor:'#511'}}>
                        <View style={{width:"100%", height:"100%", justifyContent:'center', alignItems:'center'}}>
                            <Text ellipsizeMode="tail" numberOfLines={1} style={{color:'#eee', fontSize:11}}>Livraison en attente</Text>
                        </View>
                        
                    </View>
                       }
                          

                          {
                            item.shipped===true?
""
                            :

                            <View style={{position:'absolute', bottom:0, right:"3%"}}>
                            <ActivityIndicator size={'small'} color={'#aaa'} />
                        </View>
                          }

                         
            </View>
            
            
            
            
            
            </LinearGradient>

              )}/>
                        )

              }
            })}

              
            </View>
        )


}
export default Historic